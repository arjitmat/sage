# Resume Context - Session Handoff

**Purpose:** Quick context restoration for new AI assistant sessions
**Last Updated:** 2026-01-30 19:00

## ⚡ Quick Start Checklist

When starting a new session, do these in order:

1. ✅ Read `docs/claude.md` - Understand project identity & constraints
2. ✅ Read `docs/development-status.md` - Check what's working/broken
3. ✅ Run `git status` - See any uncommitted changes
4. ✅ Run `git log --oneline -5` - See recent commits
5. ✅ Check Hugging Face build status (if user mentions issues)
6. ✅ Read this file completely - Understand current state

## 🎯 Current State Summary

### System Status: ✅ FULLY FUNCTIONAL

**Last Working Version:** Commit `43ba4f5`
**Deployment:** Live on Hugging Face Spaces
**All Features:** ✅ Working perfectly

### What Just Happened (Last Session)

This session focused on **fixing Hugging Face deployment issues**:

1. **Landing page not showing** → Fixed by renaming `/app` to `/upload`
2. **API proxy timeout** → Fixed with custom API route (5min timeout)
3. **Upload failing** → Fixed FormData handling in API route
4. **Build errors** → Fixed Next.js 15 async params
5. **UX issues** → Added loading message, fixed sticky button

### Commits from Last Session

```
43ba4f5 - Fix sticky button jumping by moving margin to content
596334e - Improve UX with loading message and fix sticky button
901bdbc - Fix API route to handle FormData uploads and non-JSON responses
b3f1ddf - Fix Next.js 15 async params in API route
978aec7 - Fix proxy timeout for long-running document processing
bb19891 - Rename /app to /upload, update all references
```

## 🚨 Critical Context (DO NOT FORGET)

### User's Top Priority
**"Please be careful not to disturb the working parts"**

The user wants:
- Minimal, targeted changes only
- Preservation of existing functionality
- Clear explanation of changes
- Tested changes before deployment

### Technical Gotchas You MUST Remember

1. **Next.js 15 Async Params**
   ```typescript
   // ❌ WRONG (will break)
   export async function GET(req, { params }: { params: { path: string[] } })

   // ✅ CORRECT
   export async function GET(req, context: { params: Promise<{ path: string[] }> }) {
     const { path } = await context.params;
   }
   ```

2. **API Route Handles Both FormData and JSON**
   - Upload endpoint sends FormData
   - Process endpoint sends JSON
   - Must detect and handle both

3. **CACHEBUST Must Be Incremented**
   - Current value: **12**
   - Location: `Dockerfile` line 16
   - Increment when changing source files

4. **Empty API_BASE is Correct**
   - `lib/api.ts` uses empty string
   - API routes proxy to backend
   - Don't change this!

5. **Processing Takes 5-10 Minutes**
   - This is normal due to image generation
   - Don't try to "optimize" this
   - User is okay with it (comparable to NotebookLM)

## 📍 Where Things Are

### Most Frequently Modified Files

1. **`app/upload/page.tsx`** - Upload interface
2. **`app/results/page.tsx`** - Results display
3. **`app/api/[...path]/route.ts`** - API proxy layer (CRITICAL!)
4. **`Dockerfile`** - Build configuration (CACHEBUST)
5. **`backend/output_generators.py`** - AI generation logic

### Files You Should NEVER Touch (Unless Absolutely Necessary)

- `backend/main.py` - Working perfectly
- `backend/document_processor.py` - Stable
- `backend/image_generator.py` - Stable
- `lib/api.ts` - Just fixed
- `next.config.ts` - Just fixed (no rewrites)

## 🐛 Known Issues: NONE

All issues have been resolved. The system is stable.

## 🔮 If User Reports an Issue

### Step-by-Step Debugging Process

1. **Ask for specifics:**
   - Which page? (landing, upload, results)
   - What action? (upload, process, download)
   - Error message? (screenshot helpful)
   - Browser console errors?

2. **Check deployment:**
   - Run `git log -1` to see current commit
   - Check if local matches deployed version
   - Look at Hugging Face build logs if provided

3. **Reproduce locally:**
   - Don't touch deployed code without testing first
   - Test changes in local environment
   - Verify fix works before deploying

4. **Make minimal changes:**
   - Target only the broken part
   - Don't refactor working code
   - Keep changes reversible

5. **Document what you did:**
   - Clear commit messages
   - Update `docs/development-status.md`
   - Update this file if needed

### Common User Issues & Quick Fixes

**"Upload isn't working"**
- Check: Is API route handling FormData? (`app/api/[...path]/route.ts`)
- Check: Is backend receiving the file? (container logs)
- Check: Any CORS errors? (backend/main.py CORS config)

**"Processing takes forever"**
- Expected: 5-10 minutes for all outputs
- Check: Did it actually fail? Or still processing?
- Check: Backend container logs for errors

**"Results page is blank"**
- Check: Does URL have `?document_id=` parameter?
- Check: Did processing complete successfully?
- Check: Browser console for errors

**"Download doesn't work"**
- Check: Which download? (All vs individual)
- Check: Browser console for errors
- Check: Is the download handler being called?

## 💾 Current Environment State

### Git
- **Branch:** main
- **Commit:** 43ba4f5
- **Remote origin:** https://github.com/arjitmat/sage.git
- **Remote space:** https://huggingface.co/spaces/arjitmat/sage-ai
- **Status:** Should be clean (no uncommitted changes)

### Docker
- **CACHEBUST:** 12
- **Base images:** node:20-slim, python:3.11-slim
- **Exposed port:** 7860

### Dependencies
- **Frontend:** Next.js 15.5.10
- **Backend:** FastAPI, google-genai 1.10.0
- **API:** Gemini 2.5 Flash + Nano Banana Pro

## 🎬 Starting Actions for Common Requests

### "Add a new feature"
1. Read `docs/system-index.md` to understand architecture
2. Identify which files need changes
3. Make changes in isolation
4. Test locally
5. Update CACHEBUST
6. Commit and deploy

### "Fix a bug"
1. Reproduce the bug
2. Identify root cause
3. Fix with minimal change
4. Test that fix works AND nothing else broke
5. Update CACHEBUST if needed
6. Commit and deploy

### "Change styling/text"
1. Find the component (use `docs/navigation-guide.md`)
2. Make the change
3. Verify visually
4. Update CACHEBUST
5. Commit and deploy

### "Explain how X works"
1. Check `docs/system-index.md` for architecture
2. Read the relevant source files
3. Explain in clear, concise terms
4. Don't make assumptions - verify in code

## 🔄 Deployment Process

```bash
# 1. Make changes
# 2. Test locally
# 3. Update CACHEBUST in Dockerfile (if source changed)
# 4. Commit
git add -A
git commit -m "Clear description"

# 5. Push to both remotes
git push origin main
git push space main

# 6. Wait for Hugging Face build (~2-3 minutes)
# 7. Test on live site
```

## 📚 Additional Resources

- **Claude Context:** `docs/claude.md`
- **System Map:** `docs/system-index.md`
- **Status:** `docs/development-status.md`
- **Navigation:** `docs/navigation-guide.md`
- **Project Info:** `docs/project-explanation.md`

## 🎓 Learning from Last Session

### What Worked Well
- Reading build logs carefully
- Making targeted, isolated fixes
- Testing each change before next one
- Clear commit messages
- Incrementing CACHEBUST consistently

### What Didn't Work
- Initial attempt to use Next.js rewrites (timeout issues)
- Assuming params were synchronous (Next.js 15 change)
- Not checking if FormData was being handled

### Key Lesson
**Always consider how Next.js/FastAPI handle data formats:**
- FormData for file uploads
- JSON for everything else
- Frontend can send either
- Backend must handle both

## ✅ Handoff Complete

You're now ready to help the user! Remember:
1. Be careful with working parts
2. Make minimal, targeted changes
3. Test before deploying
4. Update docs when done
5. Increment CACHEBUST when needed

Good luck! 🚀
