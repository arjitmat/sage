"""
Sage - FastAPI Backend Server
Handles document upload, processing, and result generation
"""

import os
import uuid
import shutil
from pathlib import Path
from typing import List, Dict, Any
from fastapi import FastAPI, UploadFile, File, HTTPException, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
from google import genai
from datetime import datetime, timedelta

from document_processor import DocumentProcessor
from output_generators import OutputGenerators

# Load environment variables
load_dotenv()

# Initialize FastAPI app
app = FastAPI(title="Sage API", version="1.0.0")

# CORS middleware for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "https://*.hf.space",  # Hugging Face Spaces
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Gemini API
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY not found in environment variables")

client = genai.Client(api_key=GEMINI_API_KEY)
document_processor = DocumentProcessor(api_key=GEMINI_API_KEY)
output_generators = OutputGenerators(client=client)

# Storage
UPLOAD_DIR = Path("./uploads")
RESULTS_DIR = Path("./results")
UPLOAD_DIR.mkdir(exist_ok=True)
RESULTS_DIR.mkdir(exist_ok=True)

# In-memory storage (replace with database in production)
documents = {}
results_storage = {}

# Rate limiting configuration
DOCUMENTS_PER_SESSION = 4
session_tracker = {}  # {session_id: {"count": int, "last_reset": datetime}}


def get_or_create_session_id(request: Request, response: Response) -> str:
    """Get existing session ID from cookie or create new one"""
    session_id = request.cookies.get("sage_session_id")
    if not session_id:
        session_id = str(uuid.uuid4())
        response.set_cookie(
            key="sage_session_id",
            value=session_id,
            max_age=86400,  # 24 hours
            httponly=True,
            samesite="lax"
        )
    return session_id


def check_rate_limit(session_id: str) -> tuple[bool, int]:
    """
    Check if session has exceeded rate limit
    Returns: (is_allowed, remaining_count)
    """
    if session_id not in session_tracker:
        session_tracker[session_id] = {
            "count": 0,
            "last_reset": datetime.now()
        }

    session = session_tracker[session_id]

    # Reset counter if more than 24 hours have passed
    if datetime.now() - session["last_reset"] > timedelta(hours=24):
        session["count"] = 0
        session["last_reset"] = datetime.now()

    remaining = DOCUMENTS_PER_SESSION - session["count"]
    is_allowed = session["count"] < DOCUMENTS_PER_SESSION

    return is_allowed, remaining


def increment_session_count(session_id: str):
    """Increment the document count for a session"""
    if session_id in session_tracker:
        session_tracker[session_id]["count"] += 1


class ProcessRequest(BaseModel):
    selected_outputs: List[str]


@app.get("/api/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "ok",
        "gemini_configured": bool(GEMINI_API_KEY)
    }


@app.post("/api/upload")
async def upload_document(file: UploadFile = File(...)):
    """
    Upload and classify a document
    Returns: document_id, document_type, filename
    """
    try:
        # Generate unique document ID
        document_id = str(uuid.uuid4())

        # Save uploaded file
        file_path = UPLOAD_DIR / f"{document_id}_{file.filename}"
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        # Process document (extract text and classify)
        mime_type = file.content_type or "application/octet-stream"

        # Determine processing method based on MIME type
        if mime_type.startswith("image/"):
            doc_data = document_processor.process_image(str(file_path))
        else:
            doc_data = document_processor.process_document(str(file_path), mime_type)

        # Store document info
        documents[document_id] = {
            "id": document_id,
            "filename": file.filename,
            "file_path": str(file_path),
            "text": doc_data["text"],
            "classification": doc_data["classification"],
            "mime_type": mime_type
        }

        return {
            "document_id": document_id,
            "document_type": doc_data["classification"],
            "filename": file.filename
        }

    except Exception as e:
        import traceback
        print(f"Upload error: {str(e)}")
        print(traceback.format_exc())
        raise HTTPException(status_code=500, detail=f"Upload failed: {str(e)}")


@app.post("/api/process/{document_id}")
async def process_document(
    document_id: str,
    request: ProcessRequest,
    req: Request,
    response: Response
):
    """
    Process document and generate selected outputs
    Returns: Processing status and results
    """
    try:
        # Get or create session ID
        session_id = get_or_create_session_id(req, response)

        # Check rate limit
        is_allowed, remaining = check_rate_limit(session_id)
        if not is_allowed:
            raise HTTPException(
                status_code=429,
                detail={
                    "error": "rate_limit_exceeded",
                    "message": "You have reached the limit of 4 documents per session. Personalised dashboard and subscriptions coming soon!",
                    "limit": DOCUMENTS_PER_SESSION,
                    "remaining": 0
                }
            )

        # Retrieve document
        if document_id not in documents:
            raise HTTPException(status_code=404, detail="Document not found")

        doc = documents[document_id]
        document_text = doc["text"]

        # Generate selected outputs
        results = {}

        for output_type in request.selected_outputs:
            try:
                if output_type == "summary":
                    results["summary"] = output_generators.generate_summary(document_text)

                elif output_type == "faqs":
                    results["faqs"] = output_generators.generate_faqs(document_text)

                elif output_type == "quiz":
                    results["quiz"] = output_generators.generate_quiz(document_text)

                elif output_type == "debate":
                    results["debate"] = output_generators.generate_debate(document_text)

                elif output_type == "mindmap":
                    results["mindmap"] = output_generators.generate_mindmap_data(document_text)

                elif output_type == "slides":
                    results["slides"] = output_generators.generate_slides_outline(document_text)

                elif output_type == "visual":
                    results["visual"] = output_generators.generate_visual_data(document_text)

            except Exception as e:
                print(f"Error generating {output_type}: {str(e)}")
                results[output_type] = {"error": str(e)}

        # Store results
        results_storage[document_id] = {
            "document_id": document_id,
            "status": "complete",
            "results": results
        }

        # Increment session count after successful processing
        increment_session_count(session_id)

        return results_storage[document_id]

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Processing failed: {str(e)}")


@app.get("/api/results/{document_id}")
async def get_results(document_id: str):
    """
    Retrieve results for a processed document
    Returns: Complete results object
    """
    try:
        if document_id not in results_storage:
            raise HTTPException(status_code=404, detail="Results not found")

        return results_storage[document_id]

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to retrieve results: {str(e)}")


@app.delete("/api/documents/{document_id}")
async def delete_document(document_id: str):
    """Delete a document and its results"""
    try:
        # Delete file
        if document_id in documents:
            file_path = Path(documents[document_id]["file_path"])
            if file_path.exists():
                file_path.unlink()
            del documents[document_id]

        # Delete results
        if document_id in results_storage:
            del results_storage[document_id]

        return {"status": "deleted", "document_id": document_id}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Deletion failed: {str(e)}")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
