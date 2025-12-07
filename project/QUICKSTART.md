# Quick Start Guide

Get your AI Interview Assistant running in 5 minutes!

## Prerequisites Check

Before starting, make sure you have:
- [ ] Python 3.8+ installed
- [ ] Node.js 16+ installed
- [ ] MongoDB installed and running (or MongoDB Atlas account)
- [ ] FFmpeg installed
- [ ] Groq API key
- [ ] OpenAI API key

## Fast Setup (5 Steps)

### 1. Configure Environment (1 minute)

```bash
cp .env.example .env
```

Edit `.env` and add your keys:
```env
GROQ_API_KEY=your_key_here
OPENAI_API_KEY=your_key_here
MONGODB_URI=mongodb://localhost:27017/
MONGODB_DB_NAME=ai_interviewer
```

### 2. Install Backend Dependencies (2 minutes)

```bash
pip install -r requirements.txt
```

### 3. Start Backend (30 seconds)

```bash
python run_backend.py
```

Keep this terminal open. Backend runs on `http://localhost:8000`

### 4. Install Frontend Dependencies (1 minute)

Open a new terminal:
```bash
npm install
```

### 5. Start Frontend (30 seconds)

```bash
npm run dev
```

Frontend runs on `http://localhost:5173`

## You're Ready!

1. Open `http://localhost:5173` in your browser
2. Upload job description and resume
3. Allow camera/microphone access
4. Take your AI-powered interview!

## Common First-Time Issues

**MongoDB Connection Error?**
```bash
# Start MongoDB service
# Windows: Check Services app
# Mac: brew services start mongodb-community
# Linux: sudo systemctl start mongod
```

**FFmpeg Not Found?**
```bash
# Windows: winget install Gyan.FFmpeg
# Mac: brew install ffmpeg
# Linux: sudo apt-get install ffmpeg
```

**Port Already in Use?**
- Backend (8000): Stop other apps using port 8000
- Frontend (5173): Vite will automatically try 5174, 5175, etc.

## Need Help?

See `SETUP_GUIDE.md` for detailed instructions and troubleshooting.
