# 🚀 Skill-Bridge Career Navigator

An AI-powered career development platform built for tech professionals. Get personalized career guidance, resume feedback, interview prep, and skill gap analysis — all in one place.

**🌐 Live Demo:** [career-navigator-frontend-eight.vercel.app](https://career-navigator-frontend-eight.vercel.app)

**🎬 Demo Video:** [YouTube Link](https://www.youtube.com/watch?v=P9Qoh3Xc6lg) <!-- Replace with your YouTube link -->

---

## ✨ Features

| Feature | Description |
|---|---|
| 💬 **Career Chat** | AI mentor personalized to your role, experience, and focus area |
| 📄 **Resume Analysis** | ATS optimization, keyword analysis, and formatting tips |
| 🎯 **Interview Prep** | Customized questions based on company, size, and experience level |
| 📊 **Skill Gap Analysis** | Personalized learning roadmap based on your target role |

---

## 🛠️ Tech Stack

**Frontend:** React, Vite, Tailwind CSS, Axios, React Markdown

**Backend:** Node.js, Express.js, Google Gemini AI

**Deployment:** Vercel (Frontend + Backend)

---

## 📁 Project Structure

```
Career Navigator/
├── frontend/                  # React + Vite app
│   ├── src/
│   │   ├── components/
│   │   │   ├── Chat.jsx
│   │   │   ├── Resume.jsx
│   │   │   ├── Interview.jsx
│   │   │   ├── Skill.jsx
│   │   │   └── Features.jsx
│   │   ├── pages/
│   │   │   └── Home.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .env
│   ├── .env.production
│   ├── .gitignore
│   └── package.json
│
└── backend/                   # Express.js API
    ├── config/
    │   └── gemini.js
    ├── controllers/
    │   └── aiController.js
    ├── routes/
    │   └── aiRoutes.js
    ├── services/
    │   └── geminiServices.js
    ├── .env
    ├── server.js
    └── package.json
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Google Gemini API key → [aistudio.google.com](https://aistudio.google.com)

### 1. Clone the repo
```bash
git clone https://github.com/your-username/career-navigator.git
cd career-navigator
```

### 2. Setup Backend
```bash
cd backend
npm install
```

Create a `.env` file:
```dotenv
GEMINI_API_KEY=your_gemini_api_key_here
```

Start the server:
```bash
node index.js
```

### 3. Setup Frontend
```bash
cd frontend
npm install
```

Create a `.env` file:
```dotenv
VITE_BACKEND_API=http://localhost:5000
```

Start the dev server:
```bash
npm run dev
```

### 4. Open the app
Visit `http://localhost:5173`

---

## 🌍 Deployment

### Backend (Vercel)
- Add `GEMINI_API_KEY` in Vercel environment variables
- Deploy the `backend/` folder
- Ensure `vercel.json` is present in the backend folder

### Frontend (Vercel)
- Add `VITE_BACKEND_API=https://your-backend.vercel.app` in Vercel environment variables
- Deploy the `frontend/` folder

---

## 📝 Documentation

See [DOCUMENTATION.md](./DOCUMENTATION.md) for full design documentation including architecture, design choices, API reference, and challenges faced.

---

## 🙌 Author

Built by **Ayush Kumar**
