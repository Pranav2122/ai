# AI Interview Assistant - User Flow

## Visual Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        START APPLICATION                         │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ↓
┌─────────────────────────────────────────────────────────────────┐
│                     SETUP SCREEN                                 │
│                                                                  │
│  ┌────────────────────────────────────────────────────────┐    │
│  │  1. Paste Job Description                              │    │
│  │     "We are looking for a Senior React Developer..."   │    │
│  └────────────────────────────────────────────────────────┘    │
│                             │                                    │
│  ┌────────────────────────────────────────────────────────┐    │
│  │  2. Upload Resume (PDF)                                │    │
│  │     [Choose File: john_doe_resume.pdf]                 │    │
│  └────────────────────────────────────────────────────────┘    │
│                             │                                    │
│  ┌────────────────────────────────────────────────────────┐    │
│  │  3. Select Duration                                    │    │
│  │     [▼ 5 minutes] [▼ 10 minutes] [▼ 15 minutes]       │    │
│  └────────────────────────────────────────────────────────┘    │
│                             │                                    │
│                   [Start Interview]                             │
└────────────────────────────┬────────────────────────────────────┘
                             │
                   Backend Processing (2-5 seconds)
                             │
                    • Extract resume text
                    • Generate AI questions
                    • Create session
                             │
                             ↓
┌─────────────────────────────────────────────────────────────────┐
│                    INTERVIEW SCREEN                              │
│                                                                  │
│  ┌─────────────────────┐  ┌──────────────────────────────┐    │
│  │                     │  │                              │    │
│  │   🎥 CAMERA FEED    │  │   QUESTION DISPLAY           │    │
│  │                     │  │                              │    │
│  │   [Your Face]       │  │  "Tell me about your         │    │
│  │                     │  │   experience with React      │    │
│  │   🔴 Recording      │  │   hooks and state           │    │
│  │                     │  │   management?"               │    │
│  │   ⏱️  1:30          │  │                              │    │
│  │                     │  │                              │    │
│  └─────────────────────┘  └──────────────────────────────┘    │
│                                                                  │
│  Progress: Question 2 of 5                                      │
│  [●][●][○][○][○]                                               │
│                                                                  │
│  Auto-flow:                                                     │
│  1. Question appears → Recording starts automatically           │
│  2. Timer counts down → You answer                             │
│  3. Time expires → Recording stops & uploads automatically      │
│  4. Next question → Loop continues                             │
└────────────────────────────┬────────────────────────────────────┘
                             │
                    (Repeat for all questions)
                             │
                   Backend Analysis (1-2 minutes)
                             │
                    • Transcribe audio (Whisper)
                    • Generate reference answers
                    • Evaluate responses (GPT-4)
                    • Calculate scores & feedback
                             │
                             ↓
┌─────────────────────────────────────────────────────────────────┐
│                     RESULTS SCREEN                               │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              OVERALL PERFORMANCE                         │  │
│  │                                                          │  │
│  │                     7.8/10                               │  │
│  │                      Good                                │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Q1: Tell me about React hooks... [8/10] [▼]            │  │
│  └──────────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Q2: Explain state management...     [7/10] [▼]         │  │
│  │  ┌────────────────────────────────────────────────────┐ │  │
│  │  │ Your Answer:                                       │ │  │
│  │  │ "I have experience with Redux and Context API..." │ │  │
│  │  │                                                    │ │  │
│  │  │ Feedback:                                          │ │  │
│  │  │ • Good explanation of Redux workflow               │ │  │
│  │  │ • Could include more about modern alternatives    │ │  │
│  │  │                                                    │ │  │
│  │  │ Model Answer:                                      │ │  │
│  │  │ "State management in React can be approached..." │ │  │
│  │  └────────────────────────────────────────────────────┘ │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
│         [Export as PDF]  [Start New Interview]                 │
└─────────────────────────────────────────────────────────────────┘
```

## Detailed Step-by-Step Flow

### Phase 1: Setup (2 minutes)

**User Actions:**
1. Opens application in browser
2. Pastes full job description into text area
3. Clicks "Choose File" and selects resume PDF
4. Selects interview duration from dropdown (3-20 minutes)
5. Clicks "Start Interview" button

**System Actions:**
1. Validates inputs (job description not empty, valid PDF)
2. Extracts text from resume PDF using PyPDF2
3. Sends job description + resume to Groq API
4. Groq generates 3-10 personalized questions
5. Creates session in MongoDB with questions
6. Returns session_id and questions to frontend
7. Navigates user to Interview Screen

**What Happens Behind the Scenes:**
```javascript
// Frontend
const formData = new FormData()
formData.append('job_description', jobDesc)
formData.append('resume', pdfFile)
formData.append('duration', 300)

// Backend
1. Extract: resume_text = extract_text_from_pdf(pdf_bytes)
2. Generate: questions = generate_questions(jd, resume_text, duration)
3. Save: db.interview_sessions.insert_one({...})
```

### Phase 2: Interview (5-20 minutes)

**Initial Setup:**
1. Browser requests camera and microphone permissions
2. User grants permission
3. Camera feed displays in left panel
4. First question displays in right panel

**For Each Question (Automatic Loop):**

**Step 1: Question Display**
- Question text appears
- Timer initializes (e.g., 90 seconds)
- Recording indicator shows "🔴 Recording"

**Step 2: User Answers**
- User speaks their answer
- Timer counts down: 90... 89... 88...
- Camera captures video (for user confidence, not saved)
- Audio recorded via MediaRecorder API

**Step 3: Auto-Upload**
- Timer reaches 0
- Recording stops automatically
- Audio blob created from recorded chunks
- FormData with audio sent to backend
- Backend saves audio file to uploads/ folder
- Whisper transcribes audio to text
- Transcript saved to MongoDB

**Step 4: Next Question**
- If more questions remain: Load next question
- If last question: Navigate to analysis

**Behind the Scenes:**
```javascript
// Frontend - Auto Recording Flow
useEffect(() => {
  if (cameraReady && currentQuestion) {
    startRecording()  // No button needed!
  }
}, [currentQuestionIndex])

// Timer expires → stops recording → uploads → next question
setTimeLeft((prev) => {
  if (prev <= 1) {
    stopRecording()  // Auto-trigger
    return 0
  }
  return prev - 1
})

// Backend - Process Answer
1. Save: audio_path = save_audio_file(audio_blob)
2. Transcribe: transcript = transcribe_audio(audio_path)
3. Store: db.interview_answers.insert_one({transcript, audio_path})
```

### Phase 3: Analysis (1-2 minutes)

**Triggered Automatically:**
- When last question is answered
- Frontend calls `/api/analyze/{session_id}`

**Analysis Process:**

**For Each Question:**

1. **Generate Reference Answer**
   ```python
   reference = generate_reference_answer(
       question=q.text,
       jd=job_description,
       resume=resume_text
   )
   ```

2. **Evaluate Candidate Answer**
   ```python
   evaluation = evaluate_answer(
       question=q.text,
       transcript=candidate_answer,
       reference_answer=reference
   )
   ```

3. **Score Dimensions** (Each 0-10)
   - Relevance: Does it answer the question?
   - Technical Accuracy: Are facts correct?
   - Depth: Shows understanding vs surface-level?
   - Clarity: Clear communication?
   - Fit: Matches job requirements?

4. **Calculate Total Score**
   - Average of all dimensions
   - Stored as single score (0-10)

5. **Generate Feedback**
   - Array of specific improvement points
   - Based on comparison to reference answer

6. **Save Results**
   ```python
   db.interview_answers.update_one(
       {"id": answer_id},
       {"$set": {
           "score": 8,
           "feedback": ["Point 1", "Point 2"],
           "model_answer": reference
       }}
   )
   ```

**Progress Indicator:**
```
Analyzing your interview...
├── Transcribing answers... ✓
├── Generating reference answers... ✓
├── Evaluating responses... ⏳
└── Calculating scores... ⏳
```

### Phase 4: Results (Anytime)

**Display:**

1. **Overall Score Card**
   - Average score: 7.8/10
   - Performance label: "Good"
   - Stats: Questions answered, duration

2. **Question Cards** (Collapsible)
   - Click any question to expand
   - Shows:
     - Question text
     - Your transcript
     - Score badge (color-coded)
     - Detailed feedback
     - Model answer

3. **Actions**
   - Export as PDF: Downloads formatted report
   - Start New Interview: Resets to setup screen

**PDF Export:**
```python
# Backend generates professional report
pdf = generate_pdf_report(session, answers)
# Contains:
# - Cover page with overall score
# - Each question with answer, feedback, score
# - Model answers for reference
```

## Timing Breakdown

**Total Time for 5-Question Interview:**

| Phase | Duration | Details |
|-------|----------|---------|
| Setup | 2 min | Upload files, generate questions |
| Question 1 | 1.5 min | 90 seconds to answer |
| Question 2 | 1.5 min | 90 seconds to answer |
| Question 3 | 1.5 min | 90 seconds to answer |
| Question 4 | 1.5 min | 90 seconds to answer |
| Question 5 | 1.5 min | 90 seconds to answer |
| Analysis | 2 min | AI evaluation |
| **TOTAL** | **12 min** | Complete interview cycle |

## No Manual Recording!

**Traditional Interview Apps:**
```
1. Read question
2. Click "Start Recording" 👎
3. Answer
4. Click "Stop Recording" 👎
5. Click "Submit" 👎
6. Wait
7. Click "Next Question" 👎
```

**AI Interview Assistant:**
```
1. Read question
2. Answer (recording automatic!) ✓
3. Timer expires → Auto-upload ✓
4. Next question appears ✓
```

**Just talk. Everything else is automatic.**

## Key Features Summary

- ✓ No recording button clicks
- ✓ No manual uploads
- ✓ No manual question navigation
- ✓ Automatic transcription
- ✓ Automatic AI evaluation
- ✓ Instant feedback
- ✓ Professional PDF reports

Ready to start? See [QUICKSTART.md](QUICKSTART.md)!
