# Claude Context & Memory

**Last Updated:** 2026-01-30
**Project:** Sage AI - Document Intelligence Platform

## Project Identity

**Name:** Sage AI
**Purpose:** Transform documents into multiple intelligent outputs (summaries, FAQs, quizzes, debates, mind maps, slides, visual infographics)
**Tech Stack:** Next.js 15.5.10 (frontend) + FastAPI (backend) + Google Gemini 2.5 Flash API
**Deployment:** Hugging Face Spaces (Docker)
**Current Status:** ✅ Fully functional and deployed

## Key Context for AI Assistants

### What Sage Does
Sage is a document intelligence platform that takes uploaded documents (PDFs, images, text) and generates 7 different AI-powered outputs:

1. **Summary** - Executive summary with key findings
2. **FAQs** - Frequently asked questions with answers
3. **Quiz** - Multiple choice questions for comprehension
4. **Debate** - Multi-perspective analysis (pros/cons)
5. **Mind Map** - Visual concept hierarchy
6. **Slides** - Presentation outline with AI-generated images
7. **Visual** - One-page infographic with comprehensive layout

### Critical System Characteristics

**Processing Time:** 5-10 minutes for all outputs (especially with image generation)
**Image Generation:** Uses Gemini "Nano Banana Pro" (Gemini 3 Pro Image) for slides and infographics
**Rate Limiting:** 4 documents per session (24-hour window)
**Session Tracking:** Cookie-based session management

### Important Technical Constraints

1. **Next.js 15 Async Params:** Route params are now `Promise<T>` and must be awaited
2. **Docker Build Context:** Environment variables set at build time vs runtime matter
3. **API Proxy Timeout:** Custom API routes with `maxDuration = 300` (5 minutes) to handle long processing
4. **FormData Handling:** Upload endpoint uses `multipart/form-data`, process endpoint uses JSON

### User Preferences

**Owner:** Arjit
**Development Philosophy:**
- "Please be careful not to disturb the working parts"
- Targeted, minimal changes preferred
- Always preserve existing functionality
- Document all changes clearly

### Common Pitfalls to Avoid

1. ❌ **Don't** break the API route by assuming synchronous params
2. ❌ **Don't** add rewrites - use custom API routes instead
3. ❌ **Don't** forget to increment CACHEBUST in Dockerfile when changing source files
4. ❌ **Don't** parse FormData as JSON in API routes
5. ❌ **Don't** make changes without testing impact on working features

### Recent Major Issues Resolved

1. **Landing Page Not Showing** → Renamed `/app` to `/upload` (routing conflict)
2. **Proxy Timeout** → Created custom API route with 5-minute timeout
3. **Upload Failing** → Added FormData support in API route
4. **Sticky Button Jumping** → Moved margin from sticky container to content

### File Changes History (Last Session)

- `app/app/` → `app/upload/` (renamed route)
- `app/api/[...path]/route.ts` (created - handles long-running API calls)
- `next.config.ts` (removed rewrites)
- `lib/api.ts` (changed API_BASE to empty string)
- `Dockerfile` (CACHEBUST now at 12)
- `app/upload/page.tsx` (added loading message)
- `app/results/page.tsx` (fixed sticky button)

### Current Git State

**Latest Commit:** 43ba4f5 - "Fix sticky button jumping by moving margin to content"
**Branch:** main
**Remotes:**
- origin: https://github.com/arjitmat/sage.git
- space: https://huggingface.co/spaces/arjitmat/sage-ai

### Environment Variables Required

**Backend:**
- `GEMINI_API_KEY` - Set in Hugging Face Spaces secrets

**Frontend (Docker runtime):**
- `BACKEND_URL=http://localhost:8000`
- `PORT=7860`
- `NODE_ENV=production`
- `NEXT_TELEMETRY_DISABLED=1`

## Memory Anchors

When resuming context, always check:
1. `docs/development-status.md` for current work status
2. `docs/resume-context.md` for session handoff
3. Git log for recent changes: `git log --oneline -10`
4. Hugging Face build status
5. Working functionality: landing page, upload, processing, results

## Communication Style

- Concise, technical explanations
- No emojis unless requested
- Show file paths with line numbers (e.g., `file.ts:123`)
- Explain "why" not just "what"
- Ask clarifying questions before major changes
