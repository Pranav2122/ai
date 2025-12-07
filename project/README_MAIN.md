# AI Interview Assistant

A complete AI-powered interview platform featuring live video interviews, automatic recording, speech-to-text transcription, and intelligent performance evaluation.

## What This Does

This application simulates a professional interview experience:
1. Upload a job description and your resume
2. AI generates personalized interview questions
3. Take the interview with your camera on (no manual recording needed)
4. Get instant transcription and AI-powered evaluation
5. View detailed performance analysis with scores and feedback

## Features at a Glance

- **Smart Question Generation**: AI analyzes job requirements and your resume to create relevant questions
- **Live Camera Feed**: Professional interview experience with real-time video
- **Auto-Recording**: No buttons to press - recording happens automatically
- **Speech-to-Text**: Automatic transcription of your answers
- **AI Evaluation**: Detailed scoring and feedback on technical accuracy, clarity, and depth
- **Performance Dashboard**: See all your scores, feedback, and model answers
- **PDF Export**: Download professional interview reports

## Quick Start

### Prerequisites
- Python 3.8+, Node.js 16+, MongoDB, FFmpeg
- API Keys: Groq (free) and OpenAI (pay-as-you-go)

### 5-Minute Setup

1. **Configure environment:**
```bash
cp .env.example .env
# Edit .env with your API keys
```

2. **Install and start backend:**
```bash
pip install -r requirements.txt
python run_backend.py
```

3. **Install and start frontend (new terminal):**
```bash
npm install
npm run dev
```

4. **Open browser:**
```
http://localhost:5173
```

Done! You're ready to take your first AI interview.

## Documentation

- **[QUICKSTART.md](QUICKSTART.md)** - Get running in 5 minutes
- **[SETUP_GUIDE.md](SETUP_GUIDE.md)** - Complete setup with troubleshooting
- **[PROJECT_OVERVIEW.md](PROJECT_OVERVIEW.md)** - Architecture and technical details
- **[API_DOCUMENTATION.md](API_DOCUMENTATION.md)** - Complete API reference
- **[FRONTEND_README.md](FRONTEND_README.md)** - Frontend-specific documentation

## How It Works

### 1. Setup Interview (2 minutes)
- Paste job description
- Upload resume PDF
- Select interview duration (3-20 minutes)
- AI generates 3-10 personalized questions

### 2. Live Interview (5-20 minutes)
- Camera feed starts automatically
- Questions appear one by one
- Recording starts automatically per question
- Timer counts down
- Auto-uploads when time is up
- Moves to next question automatically

### 3. Get Results (Instant)
- AI transcribes all your answers
- Evaluates each response on multiple dimensions
- Provides scores (0-10) and detailed feedback
- Shows model answers for comparison
- Export as professional PDF report

## Tech Stack

**Backend:**
- FastAPI (Python web framework)
- MongoDB (Database)
- Groq API (Question generation - fast & free tier)
- OpenAI GPT-4 (Answer evaluation - accurate)
- Faster-Whisper (Speech-to-text)
- FFmpeg (Audio processing)

**Frontend:**
- React 18 + Vite
- MediaRecorder API (Audio recording)
- getUserMedia API (Camera access)
- Modern CSS3 animations

## Requirements

### System
- Operating System: Windows, Mac, or Linux
- RAM: 4GB minimum, 8GB recommended
- Disk: 2GB free space

### Software
- Python 3.8 or higher
- Node.js 16 or higher
- MongoDB (local or Atlas cloud)
- FFmpeg (audio processing)
- Modern browser (Chrome 80+, Firefox 75+, Safari 14+)

### API Keys
- **Groq API**: Free tier available - https://console.groq.com/keys
- **OpenAI API**: Pay-as-you-go - https://platform.openai.com/api-keys

## Project Structure

```
ai-interviewer/
├── backend/              # Python FastAPI backend
│   ├── routes/          # API endpoints
│   ├── services/        # Business logic
│   ├── config.py        # Configuration
│   ├── database.py      # MongoDB connection
│   └── main.py          # App entry point
├── src/                 # React frontend
│   ├── components/      # React components
│   │   ├── SetupScreen.jsx
│   │   ├── InterviewScreen.jsx
│   │   └── ResultsScreen.jsx
│   ├── App.jsx
│   └── main.jsx
├── uploads/             # Audio recordings
├── requirements.txt     # Python dependencies
├── package.json         # Node.js dependencies
└── .env                 # Environment variables (create from .env.example)
```

## Common Commands

```bash
# Backend
python run_backend.py           # Start backend server
python test_mongodb.py          # Test MongoDB connection

# Frontend
npm install                     # Install dependencies
npm run dev                     # Start development server
npm run build                   # Build for production

# Database
mongosh                         # Open MongoDB shell
```

## Troubleshooting

**Backend won't start?**
- Check MongoDB is running
- Verify API keys in `.env`
- Install FFmpeg if missing

**Frontend can't connect?**
- Ensure backend is running on port 8000
- Check browser console for errors

**Camera not working?**
- Allow camera/microphone permissions
- Close other apps using camera
- Try Chrome or Firefox

See [SETUP_GUIDE.md](SETUP_GUIDE.md) for detailed troubleshooting.

## API Endpoints

```
POST   /api/create-session              # Create interview session
POST   /api/upload-answer/:sid/:qid     # Upload answer audio
POST   /api/analyze/:sid                # Analyze interview
GET    /api/session/:sid                # Get session results
GET    /api/export-pdf/:sid             # Export PDF report
```

Full API docs: http://localhost:8000/docs (when backend is running)

## Configuration

Edit `.env` file:

```env
GROQ_API_KEY=your_groq_api_key          # Required
OPENAI_API_KEY=your_openai_api_key      # Required
MONGODB_URI=mongodb://localhost:27017/   # Optional (default shown)
MONGODB_DB_NAME=ai_interviewer          # Optional (default shown)
```

## Security

- API keys never exposed to frontend
- MongoDB authentication in production
- HTTPS required for production
- File uploads validated
- CORS properly configured

## Performance

- Question generation: ~3 seconds
- Audio transcription: ~5 seconds per minute
- Answer evaluation: ~5 seconds per question
- Total analysis time: 1-2 minutes for 5-question interview

## Browser Compatibility

**Recommended:**
- Chrome 80+
- Firefox 75+
- Edge 80+
- Safari 14+

**Required features:**
- MediaRecorder API
- getUserMedia API
- WebRTC support

## Production Deployment

### Backend
```bash
gunicorn -w 4 -k uvicorn.workers.UvicornWorker backend.main:app
```

### Frontend
```bash
npm run build
# Serve dist/ folder with nginx or similar
```

### Environment
- Use production MongoDB URI
- Enable MongoDB authentication
- Use HTTPS for all connections
- Set proper CORS origins
- Monitor API usage and costs

## Cost Estimates

**Development (per interview):**
- Groq API: Free tier (60 requests/minute)
- OpenAI API: ~$0.05-0.15 (5-10 questions)
- MongoDB: Free (local) or Free tier (Atlas M0)

**Production (1000 interviews/month):**
- Groq: Free
- OpenAI: ~$50-150
- MongoDB Atlas: Free (M0) to $57 (M10)
- Hosting: $5-50 depending on traffic

## Support & Contributing

**Need Help?**
1. Check troubleshooting sections in docs
2. Review backend logs in terminal
3. Check browser console for frontend errors

**Want to Contribute?**
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - Free to use, modify, and distribute

## Acknowledgments

Built with:
- FastAPI for the excellent web framework
- React for the powerful UI library
- MongoDB for flexible data storage
- Groq for blazing fast LLM inference
- OpenAI for intelligent evaluation
- Faster-Whisper for accurate transcription

---

**Ready to start?** See [QUICKSTART.md](QUICKSTART.md) for setup instructions.

**Questions?** Check [SETUP_GUIDE.md](SETUP_GUIDE.md) for detailed help.

**Technical details?** See [PROJECT_OVERVIEW.md](PROJECT_OVERVIEW.md) for architecture.
