# AI Interview Assistant - Frontend

A modern, interactive interview platform with real-time camera feed, automatic recording, and AI-powered performance analysis.

## Features

- **Setup Screen**: Upload job description and resume to generate personalized interview questions
- **Live Interview**:
  - Real-time camera feed
  - Automatic recording (no manual button clicks)
  - Timer countdown for each question
  - Progress tracking across all questions
  - Automatic transition between questions
- **Results Dashboard**:
  - Overall score with visual indicators
  - Question-by-question breakdown
  - Detailed feedback for each answer
  - Model answers for comparison
  - PDF export functionality

## Prerequisites

- Node.js (v16 or higher)
- Backend server running on `http://localhost:8000`
- Camera and microphone access

## Installation

1. Install dependencies:
```bash
npm install
```

2. Make sure the backend is running:
```bash
# In the project root directory
python run_backend.py
```

## Running the Application

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## How It Works

### 1. Setup Phase
- User uploads a job description (text)
- User uploads their resume (PDF)
- User selects interview duration
- Backend generates personalized questions using AI

### 2. Interview Phase
- Camera feed starts automatically
- Each question is displayed one at a time
- Recording starts automatically when question appears
- Timer counts down based on estimated answer time
- When timer ends, answer is uploaded automatically
- Next question appears automatically
- Process repeats until all questions are answered

### 3. Analysis Phase
- Backend transcribes all audio answers
- AI evaluates each answer against model responses
- Scores and feedback are generated

### 4. Results Phase
- Overall score is displayed
- Each question can be expanded to view:
  - Your transcript
  - Score (0-10)
  - Detailed feedback
  - Model answer
- Results can be exported as PDF

## Browser Compatibility

The application requires:
- Modern browser (Chrome, Firefox, Safari, Edge)
- Camera and microphone permissions
- WebRTC support for media recording

## API Endpoints Used

- `POST /api/create-session` - Create interview session
- `POST /api/upload-answer/{session_id}/{question_id}` - Upload answer audio
- `POST /api/analyze/{session_id}` - Analyze interview
- `GET /api/session/{session_id}` - Get session results
- `GET /api/export-pdf/{session_id}` - Export results as PDF

## Troubleshooting

### Camera/Microphone Not Working
- Ensure browser has permission to access camera and microphone
- Check that no other application is using the camera
- Try reloading the page

### Upload Failing
- Check that backend server is running
- Verify network connection
- Check browser console for errors

### Results Not Showing
- Wait for analysis to complete (may take 1-2 minutes)
- Refresh the results page
- Check backend logs for errors

## Technology Stack

- React 18
- Vite
- MediaRecorder API for audio recording
- getUserMedia API for camera access
- CSS3 for animations and styling

## Project Structure

```
src/
├── components/
│   ├── SetupScreen.jsx       # Job description and resume upload
│   ├── SetupScreen.css
│   ├── InterviewScreen.jsx   # Live interview with camera
│   ├── InterviewScreen.css
│   ├── ResultsScreen.jsx     # Performance results
│   └── ResultsScreen.css
├── App.jsx                   # Main app component
├── App.css
├── main.jsx                  # Entry point
└── index.css                 # Global styles
```

## License

MIT
