# 🚀 Skill-Bridge Career Navigator
An AI-powered career development platform for tech professionals — built as a case study submission for Palo Alto Networks.

---

## Candidate Name
Ayush Kumar — Delhi Technological University

---

## Scenario Chosen
**AI-Powered Career Navigator** — A platform that helps tech professionals with personalized career guidance, resume analysis, interview preparation, and skill gap analysis using Google Gemini AI.

---

## Estimated Time Spent
~5 hours

---

## Quick Start

### Prerequisites
- Node.js 18+
- Google Gemini API key → [aistudio.google.com](https://aistudio.google.com)
- Git

### Run Commands

**Backend:**
```bash
cd backend
npm install

# Create .env file
echo "GEMINI_API_KEY=your_key_here" > .env

node index.js
# Server running on http://localhost:5000
```

**Frontend:**
```bash
cd frontend
npm install

# Create .env file
echo "VITE_BACKEND_API=http://localhost:5000" > .env

npm run dev
# App running on http://localhost:5173
```

### Test Commands

Test backend is alive:
```bash
curl http://localhost:5000/
# Expected: "API running"
```

Test skill gap endpoint:
```bash
curl -X POST http://localhost:5000/api/skill-gap \
  -H "Content-Type: application/json" \
  -d '{"role": "Full Stack Developer", "skills": "React, Node.js"}'
```

Test career chat endpoint:
```bash
curl -X POST http://localhost:5000/api/career-chat \
  -H "Content-Type: application/json" \
  -d '{"messages": [{"role": "user", "content": "How do I get a job at Google?"}], "role": "Developer", "experience": "Mid Level", "focus": "Job Applications"}'
```

---

## AI Disclosure

### Did you use an AI assistant (Copilot, ChatGPT, etc.)?
Yes — ChatGPT, Claude (Anthropic) was used as an AI assistant during development.

### How did you verify the suggestions?
- Ran every code suggestion locally before accepting it
- Checked browser console and terminal logs for errors after each change
- Tested each API endpoint manually using the browser and console logs
- Verified deployment behavior on Vercel separately from local behavior
- Rejected suggestions that worked locally but caused issues in the serverless environment

### Give one example of a suggestion you rejected or changed:
The AI initially suggested using `pdfjs-dist` for PDF parsing on the backend. After testing, this caused a `DOMMatrix is not defined` crash in the serverless environment because `pdfjs-dist` depends on browser APIs unavailable in Node.js. The suggestion was rejected and the feature was redesigned — file upload was removed entirely and replaced with a text paste approach, which is simpler, more reliable, and works across all environments.

---

## Tradeoffs & Prioritization

### What did you cut to stay within the 4–6 hour limit?
- **File upload for resume** — PDF parsing in serverless environments proved too complex and time-consuming. Replaced with a simpler paste-text approach.
- **User authentication** — No login/signup system; the app is stateless by design to save time.
- **Chat history persistence** — Conversations reset on page refresh; no database integration.
- **Mobile responsiveness** — The UI is optimized for desktop only; mobile layout was deprioritized.

### What would you build next if you had more time?
- **User accounts** — Save chat history, past analyses, and track skill progress over time
- **Job Board Integration** — Fetch live job listings matching the user's role and skills
- **Resume Builder** — Generate a polished resume from structured user input
- **PDF Export** — Download resume analysis and interview prep as formatted PDF reports
- **Mobile responsive UI** — Fully responsive layout for phone and tablet users
- **Multiple AI model support** — Let users switch between Gemini, GPT-4, and Claude

### Known Limitations
- **Rate limits** — The app uses Google Gemini's free tier which has daily request limits. Heavy usage may result in temporary 429 errors.
- **No file upload** — Resume analysis requires pasting text manually; PDF upload is not supported due to serverless environment constraints.
- **No memory between sessions** — The career chat does not persist conversation history across page refreshes.
- **English only** — The AI prompts and UI are English-only; no multilingual support.
- **Cold starts** — The Vercel serverless backend may have a slight delay on the first request after a period of inactivity.

**🌐 Live Demo:** [career-navigator-frontend-eight.vercel.app](https://career-navigator-frontend-eight.vercel.app)

**🎬 Demo Video:** [YouTube Link](https://www.youtube.com/watch?v=qxoVC-LfoYE)
