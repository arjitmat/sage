# 🚀 Quick Start Guide - Sage Application

## ⚡ Fastest Way to Start

### Step 1: Start Backend (Terminal 1)

```bash
cd sage-app/backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python main.py
```

✅ Backend running at: **http://localhost:8000**

### Step 2: Start Frontend (Terminal 2)

```bash
cd sage-app
npm install
npm run dev
```

✅ Frontend running at: **http://localhost:3000**

### Step 3: Test It!

1. Open browser: **http://localhost:3000**
2. Click "Try Sage Free"
3. Upload a document
4. Select outputs
5. Generate insights!

---

## 🔑 API Key Configuration

Your Gemini API key should be configured in:
- `backend/.env` (set `GEMINI_API_KEY=your_key_here`)

**⚠️ Important:** Never hardcode API keys in code or docs. Use environment variables only.

---

## 📋 Checklist Before Testing

- [ ] Python 3.9+ installed
- [ ] Node.js 18+ installed
- [ ] Both terminals running (backend + frontend)
- [ ] Backend health check: http://localhost:8000/api/health
- [ ] Frontend loads: http://localhost:3000

---

## 🎯 What to Test

### 1. Upload Workflow
- Try PDF upload
- Try image upload
- Check classification appears

### 2. Output Selection
- Select individual outputs
- Use "Select All"
- Verify checkmarks appear

### 3. Processing
- Click "Generate Insights"
- Watch loading state
- Verify redirect to /results

### 4. Results Display
All 7 outputs should render:
- ✅ **Summary** - Expandable sections
- ✅ **FAQs** - Click to expand/collapse
- ✅ **Quiz** - Take quiz, show results
- ✅ **Debate** - Pro/con columns
- ✅ **Mind Map** - Visual diagram with zoom
- ✅ **Slides** - Navigate with arrows
- ✅ **Visual** - Infographic layout

### 5. Dark Mode
- Click theme toggle in navbar
- Verify smooth transition
- Check all pages support dark mode

---

## 🐛 Common Issues & Fixes

### "GEMINI_API_KEY not found"
```bash
# Check backend/.env file exists
cat backend/.env
# Should show: GEMINI_API_KEY=AIzaSyA...
```

### "Port 8000 already in use"
```bash
# Kill existing process
lsof -ti:8000 | xargs kill -9
```

### "Module not found" (Python)
```bash
# Reinstall in virtual environment
cd backend
source venv/bin/activate
pip install --force-reinstall -r requirements.txt
```

### "Module not found" (Node)
```bash
# Clean install
rm -rf node_modules .next
npm install
```

### Backend not connecting to frontend
```bash
# Check CORS settings in backend/main.py
# Should include: http://localhost:3000
```

---

## 📊 Testing with Sample Documents

### Best Test Documents:
1. **Research Paper** - Tests technical content
2. **Business Report** - Tests structured data
3. **Article** - Tests general content
4. **Image with text** - Tests OCR capability

### Expected Processing Time:
- Upload: < 2 seconds
- Classification: 2-5 seconds
- Processing (all 7 outputs): 20-40 seconds

---

## 🎨 UI Elements to Verify

### Landing Page (/)
- Hero section with gradient text
- 3 feature cards
- "How It Works" section
- Use case list
- CTA buttons work

### App Page (/app)
- Drag & drop works
- File upload works
- Document classification shows
- Output selection responsive
- Generate button enables when ready

### Results Page (/results)
- Breadcrumb navigation
- Sticky action bar (scrolls)
- All output cards render
- Download/share buttons present
- "Process Another" works

### Tech Page (/tech)
- Tech stack cards
- Workflow diagram
- Features list
- Responsive layout

---

## ✅ Success Criteria

Your app is working if:
- ✅ Health check returns `{"status": "ok", "gemini_configured": true}`
- ✅ Document uploads successfully
- ✅ Classification appears (e.g., "Research Paper")
- ✅ All selected outputs generate
- ✅ Results page displays formatted content
- ✅ No console errors in browser
- ✅ No Python errors in terminal

---

## 🔥 Pro Tips

1. **Use Browser DevTools**: Check Network tab for API calls
2. **Check Terminal Logs**: Python backend shows detailed errors
3. **Test Dark Mode**: Toggle and reload pages
4. **Try Different Files**: PDFs work better than images
5. **Watch Processing Time**: First request may be slower

---

## 📞 Need Help?

1. Check README.md for detailed docs
2. Review GEMINI_API_REFERENCE.md for API details
3. Test /api/health endpoint first
4. Check both terminal logs for errors

---

## 🎉 You're Ready!

Everything is built and configured. Just start both servers and test!

**Happy Testing! 🌿**
