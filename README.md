# 🕉️ Bhagavad Gita Platform

> *"Let right deeds be thy motive, not the fruit which comes from them."* — Bhagavad Gita, 2.47

A full-stack platform to read, explore, and converse with the timeless wisdom of the Bhagavad Gita. All 700 verses across 18 chapters — in Sanskrit, Hindi, and English — with an AI guide strictly grounded in Gita teachings.

---

## ✨ Features

| Feature | Description |
|---|---|
| 📖 **Chapter Reader** | All 18 chapters with Sanskrit, transliteration, word meanings, and English/Hindi translations |
| 🔍 **Cross-language Search** | Search across Sanskrit, transliteration, meanings, summaries, and translations simultaneously |
| ☀️ **Quote of the Day** | A fresh verse every morning at midnight IST — consistent all day, different every day |
| 🤖 **Ask Krishna** | Gemini-powered AI that answers questions strictly from Gita teachings, always citing chapter and verse |

---

## 🛠️ Tech Stack

**Backend**
- Python · FastAPI · SQLAlchemy · PostgreSQL
- Google GenAI SDK (Gemini 2.5 Flash)

**Frontend**
- React 19 · React Router · Vite
- Framer Motion · Lucide React · Axios

**Infrastructure**
- Docker · Docker Compose · Nginx

---

## 📁 Project Structure

```
gita-platform/
├── backend/
│   ├── app/
│   │   ├── main.py              # FastAPI app entry point
│   │   ├── models.py            # Chapter, Verse, Translation models
│   │   ├── schemas.py           # Pydantic schemas
│   │   ├── database.py          # DB session and connection
│   │   └── routers/
│   │       ├── gita.py          # Chapters, verses, search, quote
│   │       └── chat.py          # Gemini AI chat endpoint
│   ├── data/pranesh-gita/       # Source JSON verse data
│   ├── seed_db.py               # Database seeding script
│   ├── requirements.txt
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── components/          # Reusable UI components
│   │   ├── pages/               # Reader, Chapter, Ask Krishna pages
│   │   ├── contexts/            # ThemeContext
│   │   ├── lib/api.js           # Axios API client
│   │   └── styles/              # CSS stylesheets
│   └── Dockerfile
└── docker-compose.yml
```

---

## 🚀 Getting Started

### Prerequisites

- [Docker](https://www.docker.com/) and Docker Compose
- A free [Google AI Studio](https://aistudio.google.com/) API key

---

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/gita-platform.git
cd gita-platform
```

### 2. Set up environment variables

```bash
cp backend/.env.example backend/.env
```

Edit `backend/.env` and add your key:

```env
GEMINI_API_KEY=your_api_key_here
DATABASE_URL=postgresql://admin:admin123@gita-db:5432/gita-db
```

### 3. Start all services

```bash
docker compose up --build
```

This starts:
- 🐘 PostgreSQL on port `31705`
- ⚡ FastAPI backend on port `8005`
- ⚛️ React frontend on port `3005`

### 4. Seed the database

In a new terminal, once containers are running:

```bash
docker compose exec backend python seed_db.py
```

### 5. Open the app

```
http://localhost:3005
```

---

## 📡 API Reference

Base URL: `http://localhost:8005`

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/chapters` | All 18 chapters with metadata |
| `GET` | `/api/chapter/{id}` | All verses for a chapter with translations |
| `GET` | `/api/search?q=karma&page=1&limit=10` | Full-text search across all content |
| `GET` | `/api/quote` | Today's daily verse (IST timezone, date-seeded) |
| `POST` | `/api/chat/` | Ask a question to the Gita AI assistant |

Interactive docs: `http://localhost:8005/docs`

---

## 🖥️ Running Without Docker

**Backend**

```bash
cd backend
python -m venv venv
source venv/bin/activate       # Windows: venv\Scripts\activate
pip install -r requirements.txt
python seed_db.py
uvicorn app.main:app --reload --port 8005
```

**Frontend**

```bash
cd frontend
npm install
npm run dev
```

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">Built with 🙏 and the teachings of the Bhagavad Gita</p>