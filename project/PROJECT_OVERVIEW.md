# AI Interview Assistant - Complete Platform

An intelligent, automated interview system that provides real-time video interviews with AI-powered question generation, automatic transcription, and comprehensive performance evaluation.

## Overview

This platform revolutionizes the interview process by:
- Generating personalized questions based on job requirements and candidate resume
- Conducting live video interviews with automatic recording
- Transcribing and analyzing responses using AI
- Providing detailed feedback and scoring for each answer
- Exporting professional PDF reports

## Key Features

### For Interviewers/Recruiters
- **Automated Question Generation**: AI creates relevant questions based on job description and resume
- **Consistent Evaluation**: Every candidate evaluated with same criteria
- **Time Efficient**: No need to manually conduct interviews
- **Detailed Analytics**: Comprehensive scoring and feedback for each response
- **Professional Reports**: Export interview results as PDF

### For Candidates
- **Practice Mode**: Great for interview preparation
- **Flexible Scheduling**: Take interview anytime
- **Clear Feedback**: Understand strengths and areas for improvement
- **Model Answers**: Learn from ideal responses
- **Professional Experience**: Real interview simulation with camera

## Technology Stack

### Backend (Python)
- **FastAPI**: High-performance web framework
- **MongoDB**: Flexible document database
- **Groq API**: Fast LLM for question generation
- **OpenAI API**: GPT-4 for answer evaluation
- **Faster-Whisper**: Speech-to-text transcription
- **PyPDF2**: Resume text extraction
- **ReportLab**: PDF report generation

### Frontend (React)
- **React 18**: Modern UI framework
- **Vite**: Fast build tool
- **MediaRecorder API**: Audio recording
- **getUserMedia API**: Camera access
- **CSS3**: Modern styling and animations

### Database Collections

**interview_sessions**
```javascript
{
  id: "uuid",
  job_description: "string",
  resume_text: "string",
  duration_seconds: 300,
  questions: [
    {
      id: "q1",
      text: "Question text",
      estimated_seconds: 90
    }
  ],
  status: "created|in_progress|analyzed",
  created_at: "timestamp"
}
```

**interview_answers**
```javascript
{
  id: "uuid",
  session_id: "uuid",
  question_id: "q1",
  audio_path: "uploads/file.webm",
  transcript: "Transcribed answer",
  score: 8,
  feedback: ["feedback point 1", "feedback point 2"],
  model_answer: "Ideal answer text",
  created_at: "timestamp",
  updated_at: "timestamp"
}
```

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend (React)                      │
│  ┌──────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │  Setup   │→ │  Interview   │→ │   Results    │         │
│  │  Screen  │  │    Screen    │  │    Screen    │         │
│  └──────────┘  └──────────────┘  └──────────────┘         │
└────────────────────────┬────────────────────────────────────┘
                         │ HTTP/REST API
                         ↓
┌─────────────────────────────────────────────────────────────┐
│                      Backend (FastAPI)                       │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  │
│  │ Session  │  │  Upload  │  │ Analyze  │  │  Export  │  │
│  │  Routes  │  │  Routes  │  │  Routes  │  │  Routes  │  │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘  │
│       │             │              │             │          │
│  ┌────↓─────────────↓──────────────↓─────────────↓──────┐ │
│  │              Services Layer                            │ │
│  │  • PDF Service    • Transcription Service             │ │
│  │  • LLM Service    • Export Service                    │ │
│  └────────────────────────────────────────────────────────┘ │
└────────────────────────┬────────────────────────────────────┘
                         │
         ┌───────────────┼───────────────┐
         ↓               ↓               ↓
    ┌─────────┐    ┌─────────┐    ┌─────────┐
    │ MongoDB │    │ Groq AI │    │ OpenAI  │
    └─────────┘    └─────────┘    └─────────┘
```

## User Journey

### 1. Setup (2 minutes)
```
User uploads job description and resume
       ↓
Backend extracts text from PDF
       ↓
AI generates 3-10 personalized questions
       ↓
Session created, user proceeds to interview
```

### 2. Interview (5-20 minutes)
```
Camera feed starts automatically
       ↓
First question displayed
       ↓
Recording starts automatically
       ↓
Timer counts down
       ↓
Recording stops, answer uploads
       ↓
Next question appears
       ↓
[Repeat for all questions]
       ↓
Analysis begins automatically
```

### 3. Analysis (1-2 minutes)
```
Audio transcribed using Whisper
       ↓
For each question:
  - Generate reference answer
  - Compare candidate answer
  - Score on multiple dimensions
  - Provide specific feedback
       ↓
All results saved to database
```

### 4. Results (Any time)
```
View overall score
       ↓
Expand each question to see:
  - Your transcript
  - Score breakdown
  - Detailed feedback
  - Model answer
       ↓
Export as PDF if needed
       ↓
Start new interview or exit
```

## Project Structure

```
ai-interviewer/
├── backend/
│   ├── routes/
│   │   ├── session.py      # Session creation endpoints
│   │   ├── upload.py       # Answer upload endpoints
│   │   └── analyze.py      # Analysis endpoints
│   ├── services/
│   │   ├── llm_service.py        # AI/LLM integration
│   │   ├── transcription_service.py  # Audio transcription
│   │   ├── pdf_service.py        # PDF text extraction
│   │   └── export_service.py     # PDF report generation
│   ├── config.py           # Configuration settings
│   ├── database.py         # MongoDB connection
│   └── main.py             # FastAPI app
├── frontend/
│   └── src/
│       ├── components/
│       │   ├── SetupScreen.jsx       # Setup UI
│       │   ├── InterviewScreen.jsx   # Interview UI
│       │   └── ResultsScreen.jsx     # Results UI
│       ├── App.jsx           # Main app
│       └── main.jsx          # Entry point
├── uploads/                  # Audio recordings storage
├── requirements.txt          # Python dependencies
├── package.json             # Node.js dependencies
├── .env.example             # Environment template
├── run_backend.py           # Backend startup script
├── QUICKSTART.md            # Quick setup guide
├── SETUP_GUIDE.md           # Detailed setup
└── API_DOCUMENTATION.md     # API reference
```

## Quick Start

See `QUICKSTART.md` for 5-minute setup instructions.

## Detailed Documentation

- **QUICKSTART.md** - Get running in 5 minutes
- **SETUP_GUIDE.md** - Complete setup instructions
- **API_DOCUMENTATION.md** - Full API reference
- **FRONTEND_README.md** - Frontend details
- **MIGRATION_SUMMARY.md** - Database migration info

## Configuration

All configuration in `.env` file:

```env
# Required
GROQ_API_KEY=your_groq_key
OPENAI_API_KEY=your_openai_key

# Optional (defaults shown)
MONGODB_URI=mongodb://localhost:27017/
MONGODB_DB_NAME=ai_interviewer
```

## API Keys

### Groq API (Free Tier Available)
1. Sign up at https://console.groq.com
2. Navigate to API Keys section
3. Create new key
4. Used for: Question generation (fast, cost-effective)

### OpenAI API (Pay-as-you-go)
1. Sign up at https://platform.openai.com
2. Navigate to API Keys
3. Create new key
4. Used for: Answer evaluation (accurate, detailed feedback)

## Deployment

### Development
```bash
# Backend
python run_backend.py

# Frontend
npm run dev
```

### Production
```bash
# Backend
gunicorn -w 4 -k uvicorn.workers.UvicornWorker backend.main:app

# Frontend
npm run build
# Serve dist/ folder with nginx or similar
```

## Security Considerations

- API keys stored in `.env` (never committed)
- MongoDB authentication enabled in production
- CORS properly configured
- HTTPS required in production
- File uploads validated and sanitized
- User data encrypted at rest

## Performance

- Question generation: ~2-5 seconds
- Audio transcription: ~5-10 seconds per minute of audio
- Answer evaluation: ~3-8 seconds per answer
- PDF export: ~1-2 seconds

## Scalability

- Horizontal scaling supported (stateless backend)
- MongoDB sharding for large datasets
- CDN for static frontend assets
- Load balancer for multiple backend instances
- Async processing for heavy tasks

## Future Enhancements

- [ ] Multi-language support
- [ ] Video recording (not just audio)
- [ ] Live coding challenges
- [ ] Behavioral question analysis
- [ ] Custom question banks
- [ ] Interview scheduling system
- [ ] Team collaboration features
- [ ] Analytics dashboard
- [ ] Mobile app version
- [ ] Integration with ATS systems

## Troubleshooting

See `SETUP_GUIDE.md` for detailed troubleshooting steps.

Common issues:
- MongoDB connection: Check service is running
- FFmpeg not found: Install and add to PATH
- Camera access denied: Check browser permissions
- API errors: Verify API keys in `.env`

## Contributing

1. Fork the repository
2. Create feature branch
3. Make changes
4. Test thoroughly
5. Submit pull request

## License

MIT License - See LICENSE file

## Support

For issues, questions, or contributions:
1. Check documentation files
2. Review troubleshooting guides
3. Check backend logs
4. Inspect browser console

## Acknowledgments

- FastAPI for excellent web framework
- MongoDB for flexible database
- Groq for fast LLM inference
- OpenAI for powerful language models
- Faster-Whisper for accurate transcription

---

Built with modern technologies for the future of interviews.
