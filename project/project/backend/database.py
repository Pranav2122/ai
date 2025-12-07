from pymongo import MongoClient
from pymongo.database import Database
from contextlib import contextmanager
from backend.config import get_settings
import os

_client = None
_db = None

def get_mongodb_client():
    global _client, _db

    if _client is None:
        mongodb_uri = os.getenv("MONGODB_URI", "mongodb://localhost:27017/")
        _client = MongoClient(mongodb_uri)
        db_name = os.getenv("MONGODB_DB_NAME", "ai_interviewer")
        _db = _client[db_name]

        _db.interview_sessions.create_index("id", unique=True)
        _db.interview_answers.create_index("id", unique=True)
        _db.interview_answers.create_index([("session_id", 1), ("question_id", 1)])

    return _db

@contextmanager
def get_db():
    db = get_mongodb_client()
    try:
        yield db
    finally:
        pass

def close_db():
    global _client, _db
    if _client:
        _client.close()
        _client = None
        _db = None
