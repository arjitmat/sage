# Navigation Guide for Non-Technical Users

**Purpose:** Help non-technical users understand where to find things in the Sage AI codebase

## Quick Reference: "Where do I find...?"

### User-Facing Pages

**Landing Page** (What users see first)
- 📁 Location: `app/page.tsx`
- 🌐 URL: `/` (homepage)
- Contains: Hero section, features, how it works, call-to-action

**Upload Page** (Where users upload documents)
- 📁 Location: `app/upload/page.tsx`
- 🌐 URL: `/upload`
- Contains: File upload box, output selection checkboxes, generate button

**Results Page** (Where users see their generated outputs)
- 📁 Location: `app/results/page.tsx`
- 🌐 URL: `/results?document_id=XXX`
- Contains: Download buttons, all 7 output types displayed

**About Page**
- 📁 Location: `app/about/page.tsx`
- 🌐 URL: `/about`
- Contains: Information about Sage AI

### Visual Components

**Navigation Bar** (Top menu with links)
- 📁 Location: `components/shared/Navbar.tsx`
- Appears on: All pages
- Contains: Logo, Home/App/About links

**Footer** (Bottom section with links)
- 📁 Location: `components/shared/Footer.tsx`
- Appears on: All pages
- Contains: Copyright, social links

**Result Cards** (How each output is displayed)
- 📁 Location: `components/results/`
- Files:
  - `SummaryCard.tsx` - Shows summary with key findings
  - `FAQCard.tsx` - Shows Q&A accordion
  - `QuizCard.tsx` - Shows interactive quiz
  - `DebateCard.tsx` - Shows pros/cons
  - `InteractiveMindMapCard.tsx` - Shows concept map
  - `SlidesCard.tsx` - Shows presentation slides
  - `VisualCard.tsx` - Shows infographic

### Text and Copy

**Landing Page Text** (Marketing copy, headlines)
- 📁 Location: `app/page.tsx`
- Search for: "Transform Documents into Wisdom"

**Upload Page Text** (Instructions, labels)
- 📁 Location: `app/upload/page.tsx`
- Search for: "Transform Your Document"

**Button Labels**
- Upload page: `app/upload/page.tsx` (lines 240-258)
- Results page: `app/results/page.tsx` (lines 260-280)

**Loading Message** (5-10 minute wait time)
- 📁 Location: `app/upload/page.tsx` (lines 259-270)

### Styling and Colors

**Colors and Fonts** (Brand identity)
- 📁 Location: `tailwind.config.ts`
- Defines: sage green, terracotta, cream colors

**Global Styles** (CSS)
- 📁 Location: `styles/globals.css`
- Contains: Font imports, base styles

### Configuration

**Site Title and Metadata**
- 📁 Location: `app/layout.tsx`
- Contains: Page title, description, favicon

**Output Types** (7 different formats)
- 📁 Location: `app/upload/page.tsx` (lines 11-19)
- List:
  1. Summary
  2. FAQs
  3. Quiz
  4. Debate
  5. Mind Map
  6. Slides
  7. Visual

### Backend Logic

**Document Upload Handling**
- 📁 Location: `backend/main.py` (lines 122-167)
- Does: Receives file, extracts text, classifies document type

**Output Generation**
- 📁 Location: `backend/output_generators.py`
- Does: Generates all 7 output types using AI

**Rate Limiting** (4 documents per session)
- 📁 Location: `backend/main.py` (lines 59-107)
- Controls: How many documents users can process

## Common Tasks

### Changing Text

**To change landing page headline:**
1. Open `app/page.tsx`
2. Find line 23: `Transform Documents`
3. Edit the text
4. Save file

**To change upload instructions:**
1. Open `app/upload/page.tsx`
2. Find line 115-117: "Upload a document and select..."
3. Edit the text
4. Save file

**To change loading message:**
1. Open `app/upload/page.tsx`
2. Find lines 261-267
3. Edit the message
4. Save file

### Changing Styling

**To change colors:**
1. Open `tailwind.config.ts`
2. Find `colors:` section (around line 15)
3. Edit color values (hex codes)
4. Save file

**To change button appearance:**
1. Find the button in the respective page file
2. Look for `className=` attribute
3. Edit Tailwind classes (e.g., `bg-terracotta-500`)

### Changing Behavior

**To change rate limit (currently 4 documents):**
1. Open `backend/main.py`
2. Find line 60: `DOCUMENTS_PER_SESSION = 4`
3. Change the number
4. Save file

**To change processing time estimate:**
1. Open `app/upload/page.tsx`
2. Find line 265: "This may take 5-10 minutes"
3. Edit the text
4. Save file

## File Naming Conventions

- **`.tsx`** - React components (frontend UI)
- **`.ts`** - TypeScript code (logic, utilities)
- **`.py`** - Python code (backend logic)
- **`.css`** - Styling files
- **`.json`** - Configuration files
- **`.md`** - Documentation (like this file!)

## Understanding the Structure

### Think of it like a house:

**Frontend (`app/` folder)** = Rooms where users interact
- Landing page = Front door
- Upload page = Main workspace
- Results page = Display room

**Components (`components/` folder)** = Furniture and fixtures
- Navbar = Doorways between rooms
- Cards = Display cases for content
- Modals = Pop-up windows

**Backend (`backend/` folder)** = Kitchen (where the magic happens)
- Receives ingredients (documents)
- Processes them (AI generation)
- Serves the results (outputs)

**Styles (`styles/` folder)** = Paint and decoration
- Colors, fonts, spacing

**Config files (root folder)** = House blueprint
- Tells everything how to work together

## Where Changes Take Effect

| Change Location | Affects | Visible To Users? |
|----------------|---------|------------------|
| `app/page.tsx` | Landing page | ✅ Yes |
| `app/upload/page.tsx` | Upload flow | ✅ Yes |
| `app/results/page.tsx` | Results display | ✅ Yes |
| `components/` | UI elements | ✅ Yes |
| `backend/` | AI generation | ⏱️ After processing |
| `styles/` | Visual appearance | ✅ Yes |
| `tailwind.config.ts` | Colors/fonts | ✅ Yes |

## Getting Help

If you need to make changes and aren't sure where to look:

1. **Search for visible text** - If you see it on screen, search for it in the codebase
2. **Check this navigation guide** - Refers to common locations
3. **Look at file names** - They usually describe what's inside
4. **Read comments** - Files have comments explaining sections
5. **Ask for help** - Reach out to a developer

## Pro Tips

- Changes to frontend files (`.tsx`) show up immediately
- Changes to backend files (`.py`) require restart
- Changes to config files (`tailwind.config.ts`) may need rebuild
- Always test changes before deploying
- Keep a backup before editing
