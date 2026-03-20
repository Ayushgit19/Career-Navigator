# Skill-Bridge Career Navigator — Design Documentation

## Overview

Skill-Bridge Career Navigator is an AI-powered web application that helps tech professionals accelerate their careers. It provides four intelligent tools: a career chat assistant, resume analysis, interview preparation, and skill gap analysis — all powered by Google's Gemini AI.

**Live Demo:** [career-navigator-frontend-eight.vercel.app](https://career-navigator-frontend-eight.vercel.app)

---

## Table of Contents

1. [Features](#features)
2. [Technical Stack](#technical-stack)
3. [Architecture](#architecture)
4. [Design Choices](#design-choices)
5. [API Design](#api-design)
6. [Deployment](#deployment)
7. [Challenges & Solutions](#challenges--solutions)
8. [Future Improvements](#future-improvements)

---

## Features

### 1. Career Chat 💬
An interactive AI chat assistant personalized to the user's role, experience level, and focus area. Supports multi-turn conversations with markdown-formatted responses.

### 2. Resume Analysis 📄
Users paste their resume text to receive ATS optimization suggestions, keyword analysis, missing skills, and formatting tips tailored for tech roles.

### 3. Interview Preparation 🎯
Generates customized interview questions based on the user's experience level, target company, and company size. Covers technical, behavioral, and system design questions.

### 4. Skill Gap Analysis 📊
Analyzes the gap between a user's current skills and their target role, providing a personalized learning roadmap with recommended resources.

---

## Technical Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 18 | UI framework |
| Vite | Build tool and dev server |
| Tailwind CSS | Utility-first styling |
| Axios | HTTP client for API calls |
| React Markdown | Rendering AI markdown responses |

### Backend
| Technology | Purpose |
|---|---|
| Node.js | Runtime environment |
| Express.js | Web framework |
| Google Gemini AI (`@google/generative-ai`) | AI model for generating responses |
| CORS | Cross-origin request handling |
| dotenv | Environment variable management |

### Deployment
| Service | Purpose |
|---|---|
| Vercel (Frontend) | Hosting the React application |
| Vercel (Backend) | Serverless Node.js API |

---

## Architecture

```
┌─────────────────────────────────────────┐
│              Frontend (React)            │
│                                         │
│  ┌──────────┐  ┌──────────────────────┐ │
│  │  Career  │  │  Resume  │ Interview │ │
│  │   Chat   │  │ Analysis │   Prep    │ │
│  └──────────┘  └──────────────────────┘ │
│                                         │
│         Axios HTTP Requests             │
└──────────────────┬──────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────┐
│           Backend (Express.js)           │
│                                         │
│  POST /api/career-chat                  │
│  POST /api/resume-analysis              │
│  POST /api/interview-prep               │
│  POST /api/skill-gap                    │
│                                         │
│         geminiServices.js               │
└──────────────────┬──────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────┐
│         Google Gemini AI API            │
│         (gemini-2.0-flash-lite)         │
└─────────────────────────────────────────┘
```

### Project Structure

```
Career Navigator/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Chat.jsx
│   │   │   ├── Resume.jsx
│   │   │   ├── Interview.jsx
│   │   │   └── Skill.jsx
│   │   └── App.jsx
│   ├── .env
│   ├── .env.production
│   └── package.json
│
└── backend/
    ├── config/
    │   └── gemini.js
    ├── controllers/
    │   └── aiController.js
    ├── routes/
    │   └── aiRoutes.js
    ├── services/
    │   └── geminiServices.js
    ├── server.js
    ├── index.js
    ├── vercel.json
    └── package.json
```

---

## Design Choices

### UI/UX Design

**Dark Theme**
The application uses a dark color palette (`#111827`, `#172033`, `#1e293b`) inspired by professional developer tools. This reduces eye strain during extended use and gives the app a modern, technical aesthetic.

**Component-based Layout**
Each feature is a self-contained React component with a consistent two-column layout — inputs on the left, AI output on the right. This creates a predictable, learnable interface.

**Thinking Indicators**
Animated bouncing dots appear while waiting for AI responses, giving users clear visual feedback that the system is processing. Each feature uses a color-coded indicator matching its theme (green for Resume/Skill Gap, orange for Interview Prep, blue for Chat).

**Markdown Rendering**
AI responses are rendered with `react-markdown` with custom-styled components, ensuring headings, bullet points, and bold text display correctly in the dark theme rather than appearing as raw markdown symbols.

### Backend Design

**Separation of Concerns**
The backend follows a clean MVC-like structure:
- `routes/` — defines API endpoints
- `controllers/` — handles request/response logic
- `services/` — abstracts the Gemini API calls
- `config/` — manages the Gemini client initialization


---

## API Design

### `POST /api/career-chat`
```json
Request:
{
  "messages": [{ "role": "user", "content": "..." }],
  "role": "Full Stack Developer",
  "experience": "Mid Level (3-5 years)",
  "focus": "Job Applications"
}

Response:
{ "reply": "AI generated markdown response" }
```

### `POST /api/resume-analysis`
```json
Request:
{ "resumeText": "Paste resume content here..." }

Response:
{ "response": "ATS suggestions and improvements in markdown" }
```

### `POST /api/interview-prep`
```json
Request:
{
  "role": "Mid Level (3-5 years)",
  "company": "Google",
  "size": "Enterprise (10,000+ employees)"
}

Response:
{ "response": "Customized interview questions in markdown" }
```

### `POST /api/skill-gap`
```json
Request:
{
  "role": "Full Stack Developer",
  "skills": "React, Node.js, MongoDB"
}

Response:
{ "response": "Skill gap analysis and roadmap in markdown" }
```

---

## Deployment

### Frontend (Vercel)
- Built with `npm run build` (Vite)
- `VITE_BACKEND_API` environment variable set to the deployed backend URL in Vercel dashboard
- Auto-deploys on push to main branch

### Backend (Vercel)
Requires a `vercel.json` in the backend folder:
```json
{
  "version": 2,
  "builds": [{ "src": "server.js", "use": "@vercel/node" }],
  "routes": [{ "src": "/(.*)", "dest": "server.js" }]
}
```
- `GEMINI_API_KEY` environment variable set in Vercel dashboard
- Express app exported (no `app.listen`) for serverless compatibility

---

## Challenges & Solutions

### 1. PDF Parsing on Serverless
**Challenge:** Libraries like `pdfjs-dist` require browser APIs (`DOMMatrix`, `canvas`) unavailable in Node.js serverless environments.

**Solution:** Removed file upload functionality entirely. Users paste resume text directly, eliminating the dependency on PDF parsing libraries. This simplified the codebase and improved reliability.


### 2. ESM/CJS Module Conflicts
**Challenge:** Several Node.js packages had conflicts between ES Modules and CommonJS in the backend.

**Solution:** Used dynamic `import()` for problematic packages and `createRequire` from the `module` package where needed.

### 3. CORS on Deployment
**Challenge:** Frontend on one Vercel domain couldn't reach backend on another due to CORS restrictions.

**Solution:** Configured explicit CORS origins in `server.js` to allow both `localhost:5173` (development) and the production frontend URL.


---

## Future Improvements

- **Job Board Integration** — fetch live job listings matching the user's profile
- **Resume Builder** — generate a polished resume from structured input
- **Progress Tracking** — save skill gap analyses and track improvement over time
- **Authentication** — user accounts to persist chat history and analyses
- **PDF Export** — download resume analysis and interview prep as PDF reports
- **Multiple AI Models** — allow users to switch between Gemini, GPT-4, and Claude

---


