"""
Sage - Document Processor using Gemini API
Handles document upload, classification, and text extraction
"""

import os
import json
import mimetypes
import time
from typing import Dict, Any, BinaryIO
from google import genai
from google.genai import types, errors
import base64

class DocumentProcessor:
    """Process documents using Gemini API"""

    def __init__(self, api_key: str):
        """Initialize with Gemini API key"""
        self.client = genai.Client(api_key=api_key)
        self.model_name = "gemini-2.5-flash"  # Best price/performance for Sage

    def _retry_with_backoff(self, func, max_retries: int = 3):
        """Retry function with exponential backoff for rate limits"""
        for attempt in range(max_retries):
            try:
                return func()
            except errors.ClientError as e:
                if e.status_code == 429:  # Rate limit error
                    if attempt < max_retries - 1:
                        wait_time = (2 ** attempt) * 2  # 2s, 4s, 8s
                        print(f"Rate limit hit, waiting {wait_time}s before retry...")
                        time.sleep(wait_time)
                        continue
                raise
            except Exception as e:
                raise
        raise Exception("Max retries exceeded")

    def upload_file(self, file_path: str, mime_type: str) -> Any:
        """Upload file to Gemini Files API"""
        try:
            # Create upload config with mime_type
            config = types.UploadFileConfig(mime_type=mime_type)
            # Upload file with config
            with open(file_path, 'rb') as f:
                upload_file = self.client.files.upload(file=f, config=config)
            return upload_file
        except Exception as e:
            raise Exception(f"File upload failed: {str(e)}")

    def process_document(self, file_path: str, mime_type: str) -> Dict[str, Any]:
        """Process document and extract text content"""
        try:
            # Upload file with mime_type
            uploaded_file = self.upload_file(file_path, mime_type)

            # Extract text from document with retry logic
            extraction_prompt = """
            Extract all text content from this document.
            Provide the complete text in a structured format.
            Do not summarize, provide the full content.
            """

            def extract_text():
                return self.client.models.generate_content(
                    model=self.model_name,
                    contents=[uploaded_file, extraction_prompt]
                )

            response = self._retry_with_backoff(extract_text)
            document_text = response.text

            # Classify document type
            classification = self.classify_document(document_text)

            # Clean up uploaded file
            try:
                self.client.files.delete(name=uploaded_file.name)
            except:
                pass

            return {
                "text": document_text,
                "classification": classification,
                "mime_type": mime_type
            }

        except Exception as e:
            raise Exception(f"Document processing failed: {str(e)}")

    def classify_document(self, text: str) -> str:
        """Classify document into a category"""
        prompt = f"""
        Analyze this document and classify it into ONE of the following categories:
        - Research Paper
        - Business Document
        - Technical Documentation
        - General Article
        - Educational Material
        - Legal Document
        - Other

        Document excerpt:
        {text[:2000]}

        Respond with ONLY the category name, nothing else.
        """

        try:
            def classify():
                return self.client.models.generate_content(
                    model=self.model_name,
                    contents=prompt
                )

            response = self._retry_with_backoff(classify)
            return response.text.strip()
        except Exception as e:
            return "Unknown"

    def process_image(self, file_path: str) -> Dict[str, Any]:
        """Process image and extract text using OCR"""
        try:
            # Read image file
            with open(file_path, "rb") as f:
                image_data = base64.b64encode(f.read()).decode()

            # Determine MIME type
            mime_type, _ = mimetypes.guess_type(file_path)
            if not mime_type:
                mime_type = "image/jpeg"

            # Extract text from image with retry logic
            prompt = "Extract all text from this image. Provide the complete text content."

            def extract_image_text():
                return self.client.models.generate_content(
                    model=self.model_name,
                    contents=[
                        types.Content(
                            parts=[
                                types.Part.from_bytes(
                                    data=base64.b64decode(image_data),
                                    mime_type=mime_type
                                ),
                                types.Part.from_text(prompt)
                            ]
                        )
                    ]
                )

            response = self._retry_with_backoff(extract_image_text)
            document_text = response.text
            classification = self.classify_document(document_text)

            return {
                "text": document_text,
                "classification": classification,
                "mime_type": mime_type
            }

        except Exception as e:
            raise Exception(f"Image processing failed: {str(e)}")
