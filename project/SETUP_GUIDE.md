# Complete Setup Guide - AI Interview Assistant

This guide will help you set up and run the complete AI Interview Assistant application.

## System Requirements

- Python 3.8 or higher
- Node.js 16 or higher
- MongoDB (local or Atlas)
- FFmpeg (for audio processing)
- Modern web browser with camera/microphone support

## Part 1: Backend Setup

### 1.1 Install MongoDB

**Option A: Local MongoDB**
1. Download from https://www.mongodb.com/try/download/community
2. Install and start the MongoDB service
3. Default connection: `mongodb://localhost:27017/`

**Option B: MongoDB Atlas (Cloud - Free)**
1. Sign up at https://www.mongodb.com/cloud/atlas/register
2. Create a free M0 cluster
3. Set up database access (username/password)
4. Whitelist your IP address
5. Get your connection string

### 1.2 Install FFmpeg

**Windows:**
```bash
winget install Gyan.FFmpeg
```

**Mac:**
```bash
brew install ffmpeg
```

**Linux:**
```bash
sudo apt-get install ffmpeg
```

### 1.3 Configure Backend

1. Copy the example environment file:
```bash
cp .env.example .env
```

2. Edit `.env` with your actual values:
```env
GROQ_API_KEY=your_groq_api_key
OPENAI_API_KEY=your_openai_api_key
MONGODB_URI=mongodb://localhost:27017/
MONGODB_DB_NAME=ai_interviewer
```

3. Get API Keys:
   - Groq API: https://console.groq.com/keys
   - OpenAI API: https://platform.openai.com/api-keys

### 1.4 Install Python Dependencies

```bash
# Create virtual environment (recommended)
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### 1.5 Test MongoDB Connection

```bash
python test_mongodb.py
```

You should see: "MongoDB is properly configured and working!"

### 1.6 Start Backend Server

**Windows:**
```bash
run_backend.bat
```

**Mac/Linux:**
```bash
./run_backend.sh
```

**Or directly:**
```bash
python run_backend.py
```

Backend will be available at: `http://localhost:8000`
API docs at: `http://localhost:8000/docs`

## Part 2: Frontend Setup

### 2.1 Install Node Dependencies

```bash
npm install
```

### 2.2 Start Frontend Development Server

```bash
npm run dev
```

Frontend will be available at: `http://localhost:5173`

## Part 3: Using the Application

### Step 1: Setup Interview

1. Open `http://localhost:5173` in your browser
2. Enter the job description (paste full job posting)
3. Upload your resume as PDF
4. Select interview duration (3-20 minutes)
5. Click "Start Interview"

### Step 2: Take Interview

1. Allow camera and microphone access when prompted
2. Your camera feed will appear
3. Read the question displayed on screen
4. Recording starts automatically
5. Answer the question naturally
6. Timer counts down automatically
7. When timer ends, answer uploads automatically
8. Next question appears automatically
9. Repeat until all questions are answered
10. Analysis begins automatically

### Step 3: View Results

1. Wait for analysis to complete (1-2 minutes)
2. View your overall score
3. Click on each question to see:
   - Your transcript
   - Score (0-10)
   - Detailed feedback
   - Model answer
4. Export results as PDF if needed
5. Start a new interview if desired

## Troubleshooting

### Backend Issues

**"ModuleNotFoundError"**
```bash
# Make sure you're in virtual environment
pip install -r requirements.txt
```

**"MongoDB connection error"**
```bash
# Check MongoDB is running
# Windows: Check Services for "MongoDB"
# Mac/Linux: sudo systemctl status mongod

# Verify connection string in .env
```

**"GROQ_API_KEY is required"**
```bash
# Edit .env file and add your API keys
nano .env
```

**"FFmpeg not found"**
```bash
# Install FFmpeg (see section 1.2)
# Make sure it's in your system PATH
```

### Frontend Issues

**"Failed to fetch"**
- Ensure backend is running on port 8000
- Check no firewall blocking localhost:8000

**"Camera not accessible"**
- Allow camera/microphone permissions in browser
- Close other apps using camera
- Try a different browser (Chrome recommended)

**"Upload failed"**
- Check network connection
- Verify backend logs for errors
- Try recording a shorter answer

## Browser Compatibility

**Recommended:**
- Chrome 80+
- Firefox 75+
- Edge 80+
- Safari 14+

**Required Features:**
- MediaRecorder API
- getUserMedia API
- WebRTC support

## Production Deployment

### Backend

1. Set environment variables on your server
2. Use production MongoDB URI
3. Use a production WSGI server:
```bash
pip install gunicorn
gunicorn -w 4 -k uvicorn.workers.UvicornWorker backend.main:app
```

### Frontend

1. Build the frontend:
```bash
npm run build
```

2. Serve the `dist` folder with a web server
3. Update API endpoint if backend is on different domain

## Performance Tips

1. Use a good quality microphone
2. Speak clearly and at moderate pace
3. Minimize background noise
4. Ensure good lighting for camera
5. Test your setup before actual interview

## Security Notes

- Never commit `.env` file to version control
- Keep API keys secure
- Use HTTPS in production
- Enable MongoDB authentication in production
- Set up proper CORS policies for production

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review backend logs in terminal
3. Check browser console for frontend errors
4. Verify all dependencies are installed correctly

## License

MIT License
