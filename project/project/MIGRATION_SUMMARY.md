# MongoDB Migration Summary

Your backend has been successfully migrated from SQLite to MongoDB!

## What Changed

### New Files Created

1. **backend/database.py** - MongoDB connection handler
   - Connects to MongoDB using PyMongo
   - Creates database indexes for performance
   - Provides context manager for database operations

2. **requirements.txt** - Python dependencies including `pymongo==4.6.1`

3. **.env.example** - Template for environment variables

4. **backend/README_MONGODB.md** - Detailed MongoDB setup guide

5. **Startup Scripts**:
   - `run_backend.py` - Python startup script
   - `run_backend.sh` - Linux/Mac startup script
   - `run_backend.bat` - Windows startup script

### Modified Files

All route files have been updated to use MongoDB operations:

1. **backend/routes/session.py**
   - `db.interview_sessions.insert_one()` instead of SQL INSERT
   - `db.interview_sessions.find_one()` instead of SQL SELECT
   - MongoDB document structure with automatic `_id` handling

2. **backend/routes/upload.py**
   - `db.interview_answers.insert_one()` for new answers
   - `db.interview_answers.update_one()` for existing answers
   - `db.interview_sessions.update_one()` for status updates

3. **backend/routes/analyze.py**
   - `db.interview_sessions.find_one()` for fetching sessions
   - `db.interview_answers.find()` for fetching all answers
   - `db.interview_answers.update_one()` for saving scores/feedback

4. **backend/config.py**
   - Added `mongodb_uri` and `mongodb_db_name` settings

## Database Collections

### interview_sessions
Stores interview session metadata:
- `id`: Unique session identifier
- `job_description`: The job posting
- `resume_text`: Extracted resume content
- `duration_seconds`: Interview duration
- `questions`: Array of question objects
- `status`: Session status (created/in_progress/analyzed)
- `created_at`: Timestamp

### interview_answers
Stores candidate responses:
- `id`: Unique answer identifier
- `session_id`: Reference to session
- `question_id`: Question identifier
- `audio_path`: Path to audio file
- `transcript`: Transcribed text
- `score`: Evaluation score (populated after analysis)
- `feedback`: Array of feedback points
- `model_answer`: Reference answer
- `created_at`: Timestamp
- `updated_at`: Last update timestamp

## Setup Instructions

### 1. Install MongoDB

**Option A: Local MongoDB**
- Download from https://www.mongodb.com/try/download/community
- Install and start the service
- Default connection: `mongodb://localhost:27017/`

**Option B: MongoDB Atlas (Cloud)**
- Sign up at https://www.mongodb.com/cloud/atlas/register
- Create a free M0 cluster
- Get connection string and add to `.env`

### 2. Configure Environment

```bash
# Copy example file
cp .env.example .env

# Edit .env with your values
nano .env  # or use any text editor
```

Update these values:
```env
GROQ_API_KEY=your_groq_key
OPENAI_API_KEY=your_openai_key
MONGODB_URI=mongodb://localhost:27017/
MONGODB_DB_NAME=ai_interviewer
```

### 3. Install Dependencies

```bash
# Create virtual environment (recommended)
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

### 4. Run the Backend

**Linux/Mac:**
```bash
./run_backend.sh
```

**Windows:**
```bash
run_backend.bat
```

**Or directly with Python:**
```bash
python run_backend.py
```

**Or with uvicorn:**
```bash
uvicorn backend.main:app --reload --host 0.0.0.0 --port 8000
```

## API Endpoints

The API will be available at `http://localhost:8000`

- POST `/api/create-session` - Create new interview session
- GET `/api/session/{session_id}` - Get session details
- POST `/api/upload-answer/{session_id}/{question_id}` - Upload answer audio
- POST `/api/analyze/{session_id}` - Analyze all answers
- GET `/api/export-pdf/{session_id}` - Export results as PDF

API documentation: `http://localhost:8000/docs`

## Key Differences from SQLite

1. **No Schema**: MongoDB is schemaless, documents can have different fields
2. **Document Structure**: Data stored as JSON-like documents
3. **_id Field**: MongoDB adds automatic `_id` field (removed in API responses)
4. **Nested Data**: Questions and feedback stored directly as arrays
5. **No Joins**: Data is denormalized, answers linked by `session_id`

## Troubleshooting

### "Connection refused" error
- Ensure MongoDB service is running
- Check MongoDB is listening on port 27017
- Verify firewall settings

### "Authentication failed" error
- Check username/password in connection string
- Verify user has correct permissions

### "Module not found" error
- Install dependencies: `pip install -r requirements.txt`
- Ensure you're in the correct virtual environment

## Verifying Setup

Test MongoDB connection:
```bash
# Using mongosh
mongosh mongodb://localhost:27017/

# Check database
use ai_interviewer
show collections
db.interview_sessions.find().pretty()
```

## Next Steps

1. Ensure MongoDB is running
2. Update `.env` with your API keys and MongoDB URI
3. Install Python dependencies
4. Run the backend using one of the startup scripts
5. Test the API using the docs at http://localhost:8000/docs

For detailed MongoDB setup instructions, see `backend/README_MONGODB.md`
