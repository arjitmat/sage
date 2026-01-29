# Sage - AI-Powered Document Analysis

Transform documents into wisdom with 7 intelligent output formats powered by Google's Gemini AI.

## 🚀 Features

- **7 Output Formats**: Summary, FAQs, Quiz, Debate, Mind Map, Slides, Visual
- **Gemini 2.5 Flash**: Latest AI model for fast, accurate analysis
- **Universal Upload**: PDF, images, text files
- **Beautiful UI**: Dark mode, responsive design, smooth animations
- **No Storage**: Secure, temporary processing
- **Rate Limiting**: Session-based limiting (4 documents/24hrs) for cost control
- **Export Options**: Download outputs individually or as complete ZIP package

## 📁 Project Structure

```
sage-app/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Landing page
│   ├── app/               # Upload & selection page
│   ├── results/           # Results display page
│   ├── tech/              # Tech/about page
│   └── layout.tsx         # Root layout
├── components/
│   ├── shared/            # Navbar, Footer, Logo, ThemeToggle
│   └── results/           # Result display components (7)
├── lib/
│   ├── api.ts             # API client
│   └── designSystem.ts    # Design constants
├── styles/
│   └── globals.css        # Global styles
├── types/
│   └── index.ts           # TypeScript types
└── backend/
    ├── main.py            # FastAPI server
    ├── document_processor.py
    ├── output_generators.py
    ├── requirements.txt
    └── .env               # API key (DO NOT COMMIT)
```

## 🛠️ Setup Instructions

### Prerequisites

- Node.js 18+ and npm
- Python 3.9+
- Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey)

### 1. Backend Setup

```bash
cd sage-app/backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Verify .env file exists with your API key
# backend/.env should contain:
# GEMINI_API_KEY=your_api_key_here

# Start backend server
python main.py
```

Backend will run at: `http://localhost:8000`

### 2. Frontend Setup

```bash
cd sage-app

# Install dependencies
npm install

# Verify .env.local exists
# Should contain:
# NEXT_PUBLIC_API_URL=http://localhost:8000

# Start development server
npm run dev
```

Frontend will run at: `http://localhost:3000`

## 🧪 Testing the Application

### 1. Health Check

Visit: `http://localhost:8000/api/health`

Should return:
```json
{
  "status": "ok",
  "gemini_configured": true
}
```

### 2. Complete Workflow Test

1. Open `http://localhost:3000`
2. Click "Try Sage Free" or navigate to `/app`
3. Upload a document (PDF or image)
4. Wait for classification
5. Select outputs (try "Select All")
6. Click "Generate Insights"
7. View results at `/results?document_id=...`

### 3. Test Each Output Type

Verify all 7 outputs display correctly:
- ✅ Summary - Shows key findings, arguments, conclusions
- ✅ FAQs - Expandable Q&A pairs
- ✅ Quiz - Interactive multiple choice
- ✅ Debate - Pro/con arguments
- ✅ Mind Map - Visual hierarchy
- ✅ Slides - Presentation with navigation
- ✅ Visual - Infographic summary

## 🎨 Design System

**Colors:**
- Sage: `#7A9B76` (light), `#8FAA8B` (dark)
- Terracotta: `#C07855` (light), `#D4906F` (dark)
- Cream: `#FDFBF7` (light), `#2A2820` (dark)

**Typography:**
- Headings: Outfit (700, 600)
- Body: Inter (400, 500, 600)

**Components:**
- Logo: 24px × 24px
- Navbar: 64px height, 48px padding
- Border radius: 8px, 12px, 16px, 24px

## 📡 API Endpoints

### Backend Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| POST | `/api/upload` | Upload document |
| POST | `/api/process/{id}` | Generate outputs |
| GET | `/api/results/{id}` | Retrieve results |
| DELETE | `/api/documents/{id}` | Delete document |

### API Request Examples

**Upload Document:**
```bash
curl -X POST http://localhost:8000/api/upload \
  -F "file=@document.pdf"
```

**Process Document:**
```bash
curl -X POST http://localhost:8000/api/process/{document_id} \
  -H "Content-Type: application/json" \
  -d '{"selected_outputs": ["summary", "faqs", "quiz"]}'
```

**Get Results:**
```bash
curl http://localhost:8000/api/results/{document_id}
```

## 🔐 Security Notes

- API key stored in `.env` file (backend)
- Never commit `.env` or `.env.local` files
- Documents processed temporarily, not stored permanently
- CORS configured for localhost:3000 only

## 📦 Production Deployment

### Option 1: Docker Deployment

#### Using Docker Compose (Recommended for Local Testing)

1. Create `.env` file in root directory:
```env
GEMINI_API_KEY=your_gemini_api_key_here
```

2. Build and run:
```bash
docker-compose up --build
```

3. Access at `http://localhost:3000`

#### Using Dockerfile Only

```bash
docker build -t sage-ai .
docker run -p 3000:3000 -p 8000:8000 -e GEMINI_API_KEY=your_key sage-ai
```

### Option 2: Hugging Face Spaces Deployment

#### Prerequisites
- Hugging Face account
- GitHub repository (private recommended to protect code)
- Hugging Face access token

#### Deployment Steps

1. **Initialize Git and Push to GitHub:**
```bash
git init
git add .
git commit -m "Initial commit: Sage AI application"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/sage.git
git push -u origin main
```

2. **Create Hugging Face Space:**
   - Go to https://huggingface.co/new-space
   - Choose "Docker" as the SDK
   - Select visibility (Private recommended to protect code)
   - Link to your GitHub repository

3. **Configure Secrets in HF Space:**
   - Navigate to Space Settings → Variables and secrets
   - Add secret: `GEMINI_API_KEY` with your Google Gemini API key

4. **Deploy:**
   - Hugging Face will automatically build from your Dockerfile
   - App will be available at `https://your-username-sage.hf.space`

### Option 3: Traditional Deployment

#### Backend (Python)

```bash
# Install dependencies
pip install -r backend/requirements.txt

# Set environment variable
export GEMINI_API_KEY=your_api_key

# Run with uvicorn
uvicorn backend.main:app --host 0.0.0.0 --port 8000
```

#### Frontend (Next.js)

```bash
# Build production bundle
npm run build

# Start production server
npm start
```

Or deploy to Vercel:
```bash
vercel deploy
```

## 🐛 Troubleshooting

### Backend Issues

**"GEMINI_API_KEY not found"**
- Check `backend/.env` file exists
- Verify API key is valid at [Google AI Studio](https://aistudio.google.com)

**"Module not found"**
- Ensure virtual environment is activated
- Run `pip install -r requirements.txt` again

**"CORS error"**
- Check frontend URL matches CORS origins in `backend/main.py`
- Default is `http://localhost:3000`

### Frontend Issues

**"Failed to fetch"**
- Verify backend is running at `http://localhost:8000`
- Check `NEXT_PUBLIC_API_URL` in `.env.local`

**"Module not found"**
- Run `npm install` again
- Delete `node_modules` and `.next` folders, reinstall

**"Dark mode not working"**
- Check localStorage for `theme` key
- Clear browser cache

## 📄 License

This project uses:
- Gemini API (Google)
- Next.js (Vercel)
- FastAPI (Encode)
- Tailwind CSS (Tailwind Labs)

## 🤝 Support

For issues or questions:
1. Check this README
2. Review `/GEMINI_API_REFERENCE.md` for API details
3. Test with `/api/health` endpoint
4. Check browser console and terminal logs

## ✨ Credits

Built with:
- **Google Gemini 2.5 Flash** - AI processing
- **Next.js 15** - Frontend framework
- **FastAPI** - Backend API
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Lucide Icons** - UI icons

---

**Ready to transform documents into wisdom!** 🌿
