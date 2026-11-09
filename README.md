# TeachBuddy AI 🎓

**Your Smart Teaching Companion** — An AI-powered web application that helps teachers, tutors, coding instructors, and STEM educators prepare learning materials faster and more efficiently.

---

## 1. Project Overview

TeachBuddy AI is a full-stack educational productivity tool powered by Google Gemini AI. It provides five specialized AI tools designed to reduce the time teachers spend preparing materials, writing notes, and creating assessments.

**Target Users:**
- School teachers
- Private tutors
- Coding instructors
- STEM educators
- Educational assistants

---

## 2. Main Features

| Tool | Description |
|---|---|
| 📋 **AI Lesson Planner** | Generate structured lesson plans with objectives, activities, assessments, and time allocations |
| 💡 **AI Concept Explainer** | Explain difficult concepts with analogies, practical examples, and language-specific code samples |
| 🎯 **AI Activity Generator** | Create coding activities, STEM experiments, classroom games, and group challenges |
| 📝 **AI Quiz & Worksheet** | Build quizzes with multiple question types (Multiple Choice, True/False, Short Answer, Fill in the Blanks, Mixed) with automatic answer keys |
| ✍️ **AI Teacher Notes** | Two modes — Structured (5 report templates including Milestone Certificates) and Improve My Writing (AI grammar correction for rough notes) |

**Additional Features:**
- 🕐 History management with LocalStorage persistence (save, view, copy, delete)
- 📱 Fully responsive design (desktop, tablet, mobile)
- ✅ Responsible AI notices on all generated content

---

## 3. Technology Stack

| Layer | Technology |
|---|---|
| **Frontend** | React.js, Vite, JavaScript, CSS |
| **Backend** | Node.js, Express.js |
| **AI Provider** | Google Gemini API (`gemini-1.5-flash`) |
| **State & Storage** | React useState, LocalStorage |
| **HTTP Client** | Axios |
| **Dev Tools** | Nodemon, Vite HMR |

---

## 4. Project Structure

```
CapstoneIbm_FavianRifqiRamadhan/
├── backend/
│   ├── routes/
│   │   ├── lessonPlanner.js         ← Lesson plan prompts & route
│   │   ├── conceptExplainer.js      ← Concept explanation prompts & route
│   │   ├── activityGenerator.js     ← Activity generation prompts & route
│   │   ├── quizWorksheet.js         ← Quiz/worksheet prompts & route
│   │   └── teacherNotes.js          ← Teacher notes (structured + improve)
│   ├── services/
│   │   └── geminiService.js         ← Centralized Gemini API caller
│   ├── server.js                    ← Express app entry point
│   ├── .env                         ← API key (NOT committed to git)
│   ├── .env.example                 ← Template for environment variables
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Layout/Layout.jsx    ← App shell (sidebar + topbar + outlet)
    │   │   ├── Sidebar/Sidebar.jsx  ← Navigation with active state
    │   │   ├── LoadingSpinner/      ← Shared loading indicator
    │   │   └── ResultBox/           ← Shared result display + copy/save/AI notice
    │   ├── pages/
    │   │   ├── Dashboard/           ← Hero, tool cards, recent history
    │   │   ├── LessonPlanner/       ← Lesson plan form + result
    │   │   ├── ConceptExplainer/    ← Concept form with subject selector
    │   │   ├── ActivityGenerator/   ← Activity form + result
    │   │   ├── QuizWorksheet/       ← Quiz form + result
    │   │   ├── TeacherNotes/        ← Mode A (structured) + Mode B (improve)
    │   │   └── History/             ← LocalStorage history browser
    │   ├── services/
    │   │   └── api.js               ← Axios API client (proxy to backend)
    │   └── utils/
    │       ├── history.js           ← LocalStorage CRUD helpers
    │       └── helpers.js           ← Formatting, copy, constants
    ├── index.html
    ├── vite.config.js               ← Proxy config: /api → localhost:5000
    └── package.json
```

---

## 5. Installation Instructions

### Prerequisites
- **Node.js** v18 or higher — [Download](https://nodejs.org/)
- **Google Gemini API key** — [Get one here](https://aistudio.google.com/app/apikey)

### Clone the repository
```bash
git clone <repository-url>
cd CapstoneIbm_FavianRifqiRamadhan
```

### Install Backend dependencies
```bash
cd backend
npm install
```

### Install Frontend dependencies
```bash
cd ../frontend
npm install
```

---

## 6. Environment Variable Setup

Create a `.env` file in the `backend/` directory:

```bash
# backend/.env
GEMINI_API_KEY=your_gemini_api_key_here
PORT=5000
```

> ⚠️ **Never commit `.env` to version control.** It is already listed in `.gitignore`.
> Use `.env.example` as a reference template.

```
# backend/.env.example
GEMINI_API_KEY=your_gemini_api_key_here
PORT=5000
```

---

## 7. How to Run the Frontend

```bash
cd frontend
npm run dev
```

The frontend will be available at **http://localhost:3000**

The Vite dev server automatically proxies all `/api/*` requests to `http://localhost:5000`.

---

## 8. How to Run the Backend

```bash
cd backend
npm start
```

For development with auto-restart on file changes:
```bash
cd backend
npm run dev
```

The backend API will be available at **http://localhost:5000**

Verify the backend is running:
```bash
curl http://localhost:5000/api/health
# Expected: {"status":"ok","message":"TeachBuddy AI Backend is running"}
```

---

## 9. Gemini API Configuration

### Getting your API key
1. Visit [https://aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click **"Create API key"**
4. Copy the key (it starts with `AIza...`)
5. Paste it into `backend/.env`

### API Model Used
```
gemini-1.5-flash
```
This model is fast and cost-effective for educational content generation.

### API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/health` | Health check |
| POST | `/api/lesson-planner/generate` | Generate lesson plan |
| POST | `/api/concept-explainer/generate` | Generate concept explanation |
| POST | `/api/activity-generator/generate` | Generate classroom activity |
| POST | `/api/quiz-worksheet/generate` | Generate quiz and worksheet |
| POST | `/api/teacher-notes/generate-structured` | Generate structured teacher note |
| POST | `/api/teacher-notes/improve-writing` | Improve rough teacher writing |

---

## 10. Testing Instructions

### Manual Testing Checklist

#### Dashboard
- [ ] Dashboard loads at `http://localhost:3000`
- [ ] All 5 tool cards are displayed
- [ ] Clicking a tool card navigates to the correct page
- [ ] Navigation sidebar works on desktop

#### AI Lesson Planner (`/lesson-planner`)
- [ ] Fill in all required fields and click Generate
- [ ] AI returns a structured lesson plan with all 8 sections
- [ ] Copy button works
- [ ] Save to History works
- [ ] Reset clears the form

#### AI Concept Explainer (`/concept-explainer`)
- [ ] Select a programming language → code example appears in result
- [ ] Select "Other / Custom Subject" → custom subject text input appears
- [ ] Select STEM & Science → no programming code in result
- [ ] Copy button works

#### AI Activity Generator (`/activity-generator`)
- [ ] Select activity type and fill in form
- [ ] Generated activity is practical and age-appropriate
- [ ] All 7 sections present in result

#### AI Quiz & Worksheet (`/quiz-worksheet`)
- [ ] Generate with Multiple Choice → 4 options per question
- [ ] Answer key is present and consistent
- [ ] Student worksheet is separated from answer key

#### AI Teacher Notes (`/teacher-notes`)
- [ ] **Mode A (Structured):**
  - Select "Regular Coding Class (Individual Student)" → name/pronoun fields appear
  - Select "Full Coding Class (Group)" → name field is optional
  - Select "Milestone Certificate" → milestone type dropdown appears
  - All 5 report types generate correctly
- [ ] **Mode B (Improve My Writing):**
  - Paste rough notes → improved professional text is returned
  - Pronouns are applied correctly
  - No invented content

#### History (`/history`)
- [ ] Saved items appear in history
- [ ] History persists after page refresh
- [ ] Filter by tool type works
- [ ] Expand/collapse individual entries works
- [ ] Copy individual entries works
- [ ] Delete individual entry works
- [ ] Clear All history works

#### Responsive Design
- [ ] Desktop (1366px+): Sidebar visible, two-column forms
- [ ] Tablet (768px): Layout adjusts, forms stack
- [ ] Mobile (375px): Hamburger menu, single-column layout, no horizontal scroll

#### Backend
- [ ] `GET /api/health` returns `{"status":"ok"}`
- [ ] Missing required fields return 400 with error message
- [ ] Invalid API key returns a clear error message (not a crash)

---

## Design System

| Token | Color |
|---|---|
| Primary Teal | `#14B8A6` |
| Accent Orange | `#F97316` |
| Highlight Indigo | `#6366F1` |
| Background Slate | `#F8FAFC` |
| Main Text | `#334155` |

---

## Responsible AI Statement

TeachBuddy AI is designed with responsible AI principles:

- **Human Oversight:** All AI-generated content is clearly labeled as a suggestion. Teachers are responsible for reviewing materials before use.
- **Privacy:** No student personal data is required. Teachers are encouraged to use pseudonyms.
- **Accuracy:** The AI is instructed never to invent student achievements or fabricate progress reports.
- **Age-Appropriate:** All content is adapted to the specified student age and learning level.

---

## Author

**Favian Rifqi Ramadhan**  
IBM Capstone Project — 2024
#   T e a c h i n g B u d d y  
 