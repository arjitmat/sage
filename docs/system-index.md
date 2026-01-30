# System Index

**Purpose:** Complete map of the Sage AI system architecture and file structure

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                         User Browser                         │
└──────────────────────┬──────────────────────────────────────┘
                       │ HTTP Requests
                       ▼
┌─────────────────────────────────────────────────────────────┐
│              Next.js 15 Frontend (Port 7860)                │
│  ┌──────────────┐  ┌──────────────┐  ┌─────────────────┐  │
│  │   Routes     │  │   API Route  │  │   Components    │  │
│  │ /,/upload,   │──│ [...path]    │──│  UI Elements    │  │
│  │  /results    │  │ Proxy Layer  │  │  Results Cards  │  │
│  └──────────────┘  └──────┬───────┘  └─────────────────┘  │
└────────────────────────────┼──────────────────────────────┘
                             │ Proxies to
                             ▼
┌─────────────────────────────────────────────────────────────┐
│             FastAPI Backend (Port 8000)                      │
│  ┌──────────────┐  ┌──────────────┐  ┌─────────────────┐  │
│  │   Upload     │  │   Process    │  │   Results       │  │
│  │  /api/upload │  │ /api/process │  │  /api/results   │  │
│  └──────┬───────┘  └──────┬───────┘  └─────────────────┘  │
│         │                  │                                │
│         ▼                  ▼                                │
│  ┌──────────────────────────────────────────────────────┐  │
│  │         DocumentProcessor                            │  │
│  │         - Extracts text from PDFs/images             │  │
│  │         - Classifies document type                   │  │
│  └──────────────────────────────────────────────────────┘  │
│                             │                               │
│                             ▼                               │
│  ┌──────────────────────────────────────────────────────┐  │
│  │         OutputGenerators                             │  │
│  │         - 7 different output types                   │  │
│  │         - Uses Gemini 2.5 Flash API                  │  │
│  │         - Generates AI images via ImageGenerator    │  │
│  └──────────────────────────────────────────────────────┘  │
└────────────────────────┬────────────────────────────────────┘
                         │ API Calls
                         ▼
┌─────────────────────────────────────────────────────────────┐
│              Google Gemini 2.5 Flash API                     │
│              + Nano Banana Pro (Image Generation)            │
└─────────────────────────────────────────────────────────────┘
```

## Directory Structure

```
sage-app/
├── app/                          # Next.js 15 App Router
│   ├── api/                      # API Routes
│   │   └── [...path]/            # Catch-all API proxy
│   │       └── route.ts          # Handles /api/* with 5min timeout
│   ├── page.tsx                  # Landing page (/)
│   ├── layout.tsx                # Root layout
│   ├── about/                    # About page
│   │   └── page.tsx
│   ├── upload/                   # Upload page (/upload)
│   │   └── page.tsx
│   └── results/                  # Results page (/results)
│       └── page.tsx
│
├── components/                   # React Components
│   ├── shared/                   # Shared components
│   │   ├── Navbar.tsx           # Main navigation
│   │   ├── Footer.tsx           # Footer
│   │   └── RateLimitModal.tsx   # Rate limit notification
│   └── results/                  # Results page components
│       ├── SummaryCard.tsx
│       ├── FAQCard.tsx
│       ├── QuizCard.tsx
│       ├── DebateCard.tsx
│       ├── InteractiveMindMapCard.tsx
│       ├── SlidesCard.tsx
│       └── VisualCard.tsx
│
├── lib/                          # Utility libraries
│   ├── api.ts                    # API client (fetch wrappers)
│   ├── downloads.ts              # Download helpers
│   └── pdfExports.ts            # PDF export functions
│
├── types/                        # TypeScript types
│   └── index.ts                  # Shared type definitions
│
├── styles/                       # Global styles
│   └── globals.css              # Tailwind + custom CSS
│
├── backend/                      # Python FastAPI Backend
│   ├── main.py                   # FastAPI app + routes
│   ├── document_processor.py     # Document text extraction
│   ├── output_generators.py      # 7 output generators
│   ├── image_generator.py        # AI image generation
│   └── requirements.txt          # Python dependencies
│
├── public/                       # Static assets
│   └── (images, fonts, etc.)
│
├── docs/                         # Documentation
│   ├── claude.md                 # AI context & memory
│   ├── development-status.md     # Current status
│   ├── system-index.md          # This file
│   ├── navigation-guide.md       # User navigation guide
│   ├── resume-context.md         # Session handoff
│   └── project-explanation.md    # Project overview
│
├── Dockerfile                    # Multi-stage Docker build
├── next.config.ts               # Next.js configuration
├── tailwind.config.ts           # Tailwind CSS config
├── tsconfig.json                # TypeScript config
└── package.json                 # Node.js dependencies
```

## Core Files Explained

### Frontend (Next.js)

#### `app/api/[...path]/route.ts` 🔴 CRITICAL
**Purpose:** Proxy layer between frontend and backend
**Why it exists:** Handles long-running API calls (5-10 minutes) without timeout
**Key features:**
- `maxDuration = 300` (5 minutes)
- Supports both JSON and FormData
- Forwards cookies for session tracking
- Handles non-JSON error responses

#### `app/upload/page.tsx`
**Purpose:** Document upload and output selection interface
**Key features:**
- Drag-and-drop file upload
- Document classification display
- Output type selection (7 options)
- Loading message with time estimate
- Rate limit modal integration

#### `app/results/page.tsx`
**Purpose:** Display processed results with download options
**Key features:**
- Sticky download toolbar (no jumping!)
- 7 different result card types
- Individual and bulk download
- Share link functionality

#### `lib/api.ts`
**Purpose:** Centralized API client
**Key exports:**
- `api.uploadDocument()` - Upload file
- `api.processDocument()` - Generate outputs
- `api.getResults()` - Fetch results
- `RateLimitError` - Custom error class

### Backend (FastAPI)

#### `backend/main.py`
**Purpose:** FastAPI server with all API endpoints
**Key endpoints:**
- `POST /api/upload` - Upload and classify document
- `POST /api/process/{document_id}` - Generate outputs
- `GET /api/results/{document_id}` - Retrieve results
- `GET /api/health` - Health check

**Key features:**
- Rate limiting (4 docs per session)
- Session cookie management
- In-memory storage (documents & results)

#### `backend/output_generators.py`
**Purpose:** Generate all 7 output types using Gemini
**Key methods:**
- `generate_summary()` - Executive summary
- `generate_faqs()` - FAQ pairs
- `generate_quiz()` - Multiple choice questions
- `generate_debate()` - Pros/cons analysis
- `generate_mindmap_data()` - Hierarchical nodes
- `generate_slides_outline()` - Presentation slides + images
- `generate_visual_data()` - Infographic data + AI image

**Uses:** JSON schema validation with Gemini API

#### `backend/image_generator.py`
**Purpose:** AI image generation using Gemini Nano Banana Pro
**Key methods:**
- `generate_slide_visual()` - Generates images for slides
- Uses Gemini 3 Pro Image model

#### `backend/document_processor.py`
**Purpose:** Extract text from documents and classify
**Supports:** PDFs, images (OCR), text files

### Configuration

#### `Dockerfile` 🔴 CRITICAL
**Purpose:** Multi-stage build for Hugging Face Spaces
**Stages:**
1. `frontend-builder` - Build Next.js app
2. Final stage - Python + Node.js runtime

**Key elements:**
- `CACHEBUST` - Increment to force rebuild (currently 12)
- Verification steps for source files
- Startup script runs both backend and frontend

#### `next.config.ts`
**Purpose:** Next.js configuration
**Key:**  API routes handle proxying (no rewrites needed)

## Data Flow

### Upload Flow
```
User uploads file
    ↓
Next.js /upload page
    ↓
POST /api/upload (via API route proxy)
    ↓
FastAPI backend
    ↓
DocumentProcessor extracts text
    ↓
Gemini classifies document type
    ↓
Returns: { document_id, document_type, filename }
    ↓
Frontend displays classification
```

### Processing Flow
```
User selects outputs & clicks "Generate"
    ↓
POST /api/process/{document_id} (via API route)
    ↓
FastAPI backend
    ↓
For each selected output:
    OutputGenerators.generate_X()
        ↓
    Gemini API (text generation)
        ↓
    ImageGenerator (for slides/visual)
        ↓
    Gemini Nano Banana Pro (image generation)
    ↓
Returns: Complete results object
    ↓
Router pushes to /results?document_id=X
    ↓
Results page displays all outputs
```

## Environment Variables

### Backend
- `GEMINI_API_KEY` - Required for all AI operations

### Frontend (Docker runtime)
- `BACKEND_URL` - Backend URL (default: `http://localhost:8000`)
- `PORT` - Frontend port (7860 for Hugging Face)
- `NODE_ENV` - Set to `production`

## External Dependencies

### APIs
- **Google Gemini 2.5 Flash** - Text generation
- **Gemini Nano Banana Pro** - Image generation

### Services
- **Hugging Face Spaces** - Docker deployment platform
- **GitHub** - Source code repository

## Key Integrations

### Session Management
- Cookie-based (`sage_session_id`)
- 24-hour expiry
- Tracks document count for rate limiting

### Storage
- **In-memory** (current) - Lost on restart
- Files saved to `backend/uploads/` and `backend/results/`
- No persistent database

## Performance Characteristics

- **Upload:** < 5 seconds
- **Processing:** 5-10 minutes (with all 7 outputs + images)
- **Results Loading:** < 1 second
- **Download:** Instant (client-side generation)

## Security Considerations

- No authentication (public access)
- Rate limiting prevents abuse
- No sensitive data storage
- Files stored temporarily
- CORS enabled for localhost + Hugging Face

## Monitoring & Logging

- Backend: Python `print()` statements
- Frontend: `console.log()` and `console.error()`
- Deployment: Hugging Face Spaces build logs
