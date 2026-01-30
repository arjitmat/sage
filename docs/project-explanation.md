# Project Explanation

## What is Sage AI?

Sage AI is a **document intelligence platform** that transforms uploaded documents into 7 different AI-powered outputs designed to help users understand, retain, and present information more effectively.

Think of it as a "document transformation engine" - you put in a document, and it creates multiple perspectives and formats from that same content.

## The Problem It Solves

When people read documents (research papers, articles, reports, textbooks), they often need to:
- Summarize the key points
- Create study materials (quizzes, FAQs)
- Present the information (slides, visuals)
- Understand different perspectives (debates)
- See relationships between concepts (mind maps)

Doing all this manually takes hours or days. Sage AI does it in minutes.

## The Solution

Upload a document → Select outputs you want → Get AI-generated materials in 5-10 minutes

### The 7 Outputs

1. **Summary** - Executive summary with key findings and conclusions
   - **Use case:** Quick understanding, TL;DR
   - **Format:** Structured text with bullets

2. **FAQs** - Frequently asked questions with detailed answers
   - **Use case:** Study guide, reference material
   - **Format:** Q&A pairs

3. **Quiz** - Multiple choice questions with explanations
   - **Use case:** Testing comprehension, exam prep
   - **Format:** Interactive questions with correct answers marked

4. **Debate** - Multi-perspective analysis (pros and cons)
   - **Use case:** Critical thinking, balanced view
   - **Format:** Arguments for and against, balanced conclusion

5. **Mind Map** - Visual concept hierarchy
   - **Use case:** Understanding relationships, big picture view
   - **Format:** Interactive node diagram with center topic and branches

6. **Slides** - Presentation outline with AI-generated visuals
   - **Use case:** Presenting to others, creating decks
   - **Format:** 6-8 slides with titles, bullets, and custom images

7. **Visual** - One-page infographic
   - **Use case:** Visual summary, social sharing, posters
   - **Format:** Comprehensive infographic with stats, charts, highlights

## How It Works (Simple Explanation)

```
User uploads document
    ↓
AI reads and understands the content
    ↓
AI generates text in 7 different formats
    ↓
AI creates custom images for visual outputs
    ↓
User downloads or shares the results
```

## How It Works (Technical Explanation)

```
Frontend (Next.js)
    ↓ User uploads file
Backend (FastAPI)
    ↓ Extracts text from document
    ↓ Sends to Gemini API
Gemini 2.5 Flash
    ↓ Generates text for each output type
    ↓ Uses JSON schema for structure
Gemini Nano Banana Pro
    ↓ Generates custom images
Backend
    ↓ Combines all results
Frontend
    ↓ Displays results with download options
```

## Technology Stack

### Frontend
- **Next.js 15** - React framework for web app
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Styling
- **React Components** - Modular UI

### Backend
- **FastAPI** - Python web framework
- **Google Gemini 2.5 Flash** - AI text generation
- **Gemini Nano Banana Pro** - AI image generation
- **Python** - Backend language

### Deployment
- **Docker** - Containerization
- **Hugging Face Spaces** - Free hosting platform
- **Git** - Version control (GitHub + Hugging Face)

## Key Features

### User Features
- ✅ Drag-and-drop file upload
- ✅ Support for PDFs, images, text files
- ✅ Select which outputs to generate (or all 7)
- ✅ Download individual outputs or all as ZIP
- ✅ Share results via link
- ✅ Dark mode support
- ✅ Mobile-friendly design

### Technical Features
- ✅ Long-running API calls (5-10 minutes) without timeout
- ✅ Rate limiting (4 documents per session)
- ✅ Session tracking with cookies
- ✅ AI-generated images (not stock photos!)
- ✅ JSON schema validation for consistent output
- ✅ Error handling and user feedback

## Architecture Decisions

### Why Next.js 15?
- Modern React framework
- App Router for clean routing
- Built-in API routes
- Server-side rendering capabilities
- Great developer experience

### Why FastAPI?
- Fast, modern Python framework
- Async support for better performance
- Automatic API documentation
- Easy integration with Python AI libraries
- Type hints for reliability

### Why Gemini?
- State-of-the-art AI model (comparable to GPT-4)
- JSON mode for structured outputs
- Image generation capabilities
- Free tier for development
- Google's reliability

### Why Hugging Face Spaces?
- Free hosting for AI projects
- Built-in Docker support
- Auto-deployment from Git
- Good for demos and prototypes
- Generous resource limits

## Unique Selling Points

1. **7-in-1 Tool** - Multiple outputs from single upload
2. **Visual AI** - Generates custom images, not templates
3. **No Sign-up** - Free to use immediately
4. **Fast** - 5-10 minutes for all outputs (comparable to NotebookLM)
5. **Download Everything** - Get all outputs as files
6. **Clean UI** - Beautiful, modern design with dark mode

## Similar Products

- **NotebookLM** (Google) - Similar concept but different outputs
- **ChatGPT** - Can do similar tasks but manual process
- **Notion AI** - Document summaries but limited outputs
- **Gamma** - Presentation generation only

**Sage's Advantage:** All outputs in one place, visual content, no login required

## Target Users

### Primary
- **Students** - Study materials, exam prep, presentations
- **Researchers** - Paper summaries, visual abstracts
- **Business Professionals** - Report summaries, presentation decks
- **Educators** - Teaching materials, quizzes, visuals

### Secondary
- Content creators
- Anyone who reads documents regularly
- Teams needing to share information

## Business Model (Future)

### Current: Free
- No monetization
- Rate limited to prevent abuse (4 docs/session)
- Demo/portfolio project

### Future Possibilities
- Freemium (more documents for paid users)
- Subscriptions for teams
- API access for developers
- White-label for enterprises
- Custom branding options

## Development Philosophy

### Principles
1. **User First** - Simple, intuitive interface
2. **Speed** - Fast enough to be useful (5-10 min acceptable)
3. **Quality** - High-quality AI outputs
4. **Stability** - Don't break working features
5. **Simplicity** - Minimal, clean codebase

### Technical Principles
1. **Separation of Concerns** - Frontend/backend split
2. **Type Safety** - TypeScript + Python type hints
3. **Error Handling** - Graceful failures with user feedback
4. **Documentation** - Clear comments and docs
5. **Testing** - Manual testing before deployment

## Project Timeline

### Phase 1: MVP (Completed)
- ✅ Document upload
- ✅ 7 output types
- ✅ Basic UI
- ✅ Deployment

### Phase 2: Polish (Completed)
- ✅ AI image generation
- ✅ Download functionality
- ✅ Rate limiting
- ✅ UX improvements
- ✅ Bug fixes

### Phase 3: Future (Not Started)
- User authentication
- Document history
- Subscription model
- API access
- Mobile app?

## Success Metrics

### Technical
- ✅ 100% uptime on Hugging Face
- ✅ < 5 second upload time
- ✅ 5-10 minute processing time
- ✅ Zero critical bugs
- ✅ All features working

### User Experience
- ✅ Intuitive flow (no user confusion)
- ✅ Clear feedback at each step
- ✅ Professional output quality
- ✅ Works on mobile and desktop

## Future Enhancements

### Priority 1 (If continuing)
- User accounts and saved documents
- Email notifications when processing completes
- Progress bar during processing
- More output formats (flashcards, outlines, etc.)

### Priority 2
- Collaboration features
- Document comparison
- Custom AI model selection
- Batch processing
- API for developers

### Priority 3
- Mobile apps (iOS, Android)
- Browser extension
- Integrations (Notion, Google Drive, etc.)
- Custom branding for teams

## Constraints and Limitations

### Current Limitations
1. **Processing time** - 5-10 minutes (due to image generation)
2. **Rate limiting** - 4 documents per session
3. **No persistence** - Results lost on server restart
4. **No authentication** - Anyone can use (good and bad)
5. **Free tier limits** - Dependent on Gemini API limits

### Technical Constraints
1. **Memory-based storage** - Not scalable long-term
2. **Single server** - No load balancing
3. **Synchronous processing** - One doc at a time per session
4. **No caching** - Same document requires re-processing

## Maintenance Requirements

### Regular
- Monitor Hugging Face Spaces status
- Check for Gemini API changes
- Review error logs

### Occasional
- Update dependencies (Next.js, FastAPI, etc.)
- Increment CACHEBUST for builds
- Review and update documentation

### As Needed
- Fix bugs reported by users
- Add requested features
- Optimize performance

## Contributing

The codebase is designed to be maintainable:
- Clear folder structure
- Well-documented code
- Type safety everywhere
- Minimal dependencies
- Comprehensive docs (this folder!)

New developers should:
1. Read all docs in `docs/` folder
2. Run locally to understand flow
3. Make small, targeted changes
4. Test thoroughly before deploying
5. Update docs when making changes

## License and Usage

**Current:** Private/portfolio project
**Future:** Open source possible

## Contact and Support

**Owner:** Arjit
**Repository:** https://github.com/arjitmat/sage
**Demo:** https://huggingface.co/spaces/arjitmat/sage-ai

---

**Last Updated:** 2026-01-30
**Version:** 1.0 (Stable)
