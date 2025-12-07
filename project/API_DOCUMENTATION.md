# API Documentation

Base URL: `http://localhost:8000`

## Endpoints

### 1. Create Interview Session

**POST** `/api/create-session`

Creates a new interview session with AI-generated questions.

**Request:**
- Method: `POST`
- Content-Type: `multipart/form-data`
- Body:
  - `job_description` (string, required): Full job description text
  - `resume` (file, required): Resume PDF file
  - `duration` (integer, required): Interview duration in seconds

**Example:**
```javascript
const formData = new FormData()
formData.append('job_description', 'Software Engineer position...')
formData.append('resume', pdfFile)
formData.append('duration', 300)

const response = await fetch('http://localhost:8000/api/create-session', {
  method: 'POST',
  body: formData
})
```

**Response:**
```json
{
  "session_id": "uuid-string",
  "questions": [
    {
      "id": "q1",
      "text": "Tell me about your experience with React",
      "estimated_seconds": 90
    }
  ],
  "duration_seconds": 300
}
```

---

### 2. Upload Answer

**POST** `/api/upload-answer/{session_id}/{question_id}`

Uploads audio recording of answer and gets transcript.

**Request:**
- Method: `POST`
- Content-Type: `multipart/form-data`
- Path Parameters:
  - `session_id` (string, required): Session UUID
  - `question_id` (string, required): Question ID (e.g., "q1")
- Body:
  - `audio` (file, required): Audio file (WebM, MP3, WAV)

**Example:**
```javascript
const formData = new FormData()
formData.append('audio', audioBlob, 'answer.webm')

const response = await fetch(
  `http://localhost:8000/api/upload-answer/${sessionId}/${questionId}`,
  {
    method: 'POST',
    body: formData
  }
)
```

**Response:**
```json
{
  "transcript": "I have 3 years of experience with React...",
  "audio_path": "uploads/uuid.webm"
}
```

---

### 3. Analyze Interview

**POST** `/api/analyze/{session_id}`

Analyzes all answers and generates scores and feedback.

**Request:**
- Method: `POST`
- Path Parameters:
  - `session_id` (string, required): Session UUID

**Example:**
```javascript
const response = await fetch(
  `http://localhost:8000/api/analyze/${sessionId}`,
  { method: 'POST' }
)
```

**Response:**
```json
{
  "status": "success",
  "message": "Analysis complete"
}
```

**Note:** This endpoint may take 1-2 minutes to complete as it:
1. Generates reference answers for each question
2. Evaluates each candidate answer
3. Provides detailed feedback and scores

---

### 4. Get Session Results

**GET** `/api/session/{session_id}`

Retrieves complete session data including all answers, scores, and feedback.

**Request:**
- Method: `GET`
- Path Parameters:
  - `session_id` (string, required): Session UUID

**Example:**
```javascript
const response = await fetch(
  `http://localhost:8000/api/session/${sessionId}`
)
```

**Response:**
```json
{
  "session": {
    "id": "uuid",
    "job_description": "Software Engineer...",
    "resume_text": "Extracted resume text...",
    "duration_seconds": 300,
    "questions": [...],
    "status": "analyzed",
    "created_at": "2024-01-01T00:00:00"
  },
  "answers": [
    {
      "id": "answer-uuid",
      "session_id": "session-uuid",
      "question_id": "q1",
      "audio_path": "uploads/uuid.webm",
      "transcript": "My answer text...",
      "score": 8,
      "feedback": [
        "Good technical depth",
        "Could provide more specific examples"
      ],
      "model_answer": "Ideal answer would be...",
      "created_at": "2024-01-01T00:00:00"
    }
  ]
}
```

---

### 5. Export PDF

**GET** `/api/export-pdf/{session_id}`

Exports interview results as a formatted PDF report.

**Request:**
- Method: `GET`
- Path Parameters:
  - `session_id` (string, required): Session UUID

**Example:**
```javascript
const response = await fetch(
  `http://localhost:8000/api/export-pdf/${sessionId}`
)
const blob = await response.blob()

// Download file
const url = window.URL.createObjectURL(blob)
const a = document.createElement('a')
a.href = url
a.download = `interview_results.pdf`
a.click()
```

**Response:**
- Content-Type: `application/pdf`
- Binary PDF file

---

## Status Codes

- `200` - Success
- `400` - Bad Request (invalid input)
- `404` - Not Found (session not found)
- `500` - Server Error

## Error Response Format

```json
{
  "detail": "Error message describing what went wrong"
}
```

## Data Models

### Session Status
- `created` - Session created, no answers yet
- `in_progress` - User is answering questions
- `analyzed` - All answers analyzed with scores

### Score Range
- Scores are 0-10 for each answer
- Overall score is average of all question scores

### Feedback Format
- Array of strings
- Each string is a specific, actionable feedback point

## Rate Limits

No rate limits on local deployment.

For production:
- Consider implementing rate limiting
- Monitor API key usage (Groq/OpenAI)

## Interactive API Docs

FastAPI provides interactive documentation:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

You can test all endpoints directly from the Swagger UI.

## Example Full Flow

```javascript
// 1. Create session
const sessionResponse = await fetch('/api/create-session', {
  method: 'POST',
  body: formData
})
const { session_id, questions } = await sessionResponse.json()

// 2. For each question, upload answer
for (const question of questions) {
  const audioFormData = new FormData()
  audioFormData.append('audio', audioBlob)

  await fetch(`/api/upload-answer/${session_id}/${question.id}`, {
    method: 'POST',
    body: audioFormData
  })
}

// 3. Analyze all answers
await fetch(`/api/analyze/${session_id}`, {
  method: 'POST'
})

// 4. Get results
const resultsResponse = await fetch(`/api/session/${session_id}`)
const results = await resultsResponse.json()

// 5. Export PDF (optional)
const pdfResponse = await fetch(`/api/export-pdf/${session_id}`)
const pdfBlob = await pdfResponse.blob()
```

## Backend Technologies

- FastAPI (Python web framework)
- MongoDB (Database)
- PyPDF2 (PDF text extraction)
- Faster-Whisper (Speech-to-text transcription)
- Groq API (Question generation)
- OpenAI API (Answer evaluation)
- ReportLab (PDF generation)
