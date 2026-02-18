# Anil Kumar Ravuri — Portfolio

Full-stack portfolio built with **React + TypeScript** (frontend) and **Python + FastAPI** (backend), deployed on **Vercel**.

## Project Structure

```
portfolio/
├── frontend/          # React + TypeScript (Vite)
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── types/
│   │   └── styles/
│   ├── package.json
│   └── vite.config.ts
├── backend/           # Python + FastAPI
│   ├── app/
│   │   ├── main.py
│   │   ├── routers/
│   │   └── models/
│   ├── requirements.txt
│   └── vercel.json
└── README.md
```

## Local Development

### Backend (FastAPI)
```bash
cd backend
python -m venv venv
source venv/bin/activate       # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
# API docs at http://localhost:8000/docs
```

### Frontend (React + Vite)
```bash
cd frontend
npm install
npm run dev
# App at http://localhost:5173
```

## Deploy to Vercel

### 1. Push to GitHub
```bash
git init
git add .
git commit -m "Initial portfolio"
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
git push -u origin main
```

### 2. Deploy Backend
- Go to https://vercel.com → New Project
- Import your repo, set **Root Directory** to `backend`
- Framework: **Other**
- Deploy → copy the URL (e.g. `https://portfolio-api.vercel.app`)

### 3. Deploy Frontend
- New Project → same repo, **Root Directory** = `frontend`
- Framework: **Vite**
- Add env variable: `VITE_API_URL=https://your-backend.vercel.app`
- Deploy

### 4. Update CORS
In `backend/app/main.py`, add your frontend Vercel URL to `allow_origins`.
