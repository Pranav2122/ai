#!/usr/bin/env python3
import os
import sys
from pathlib import Path

project_root = Path(__file__).parent
sys.path.insert(0, str(project_root))

if __name__ == "__main__":
    import uvicorn
    from backend.main import app

    print("Starting AI Interviewer Backend with MongoDB...")
    print(f"Project root: {project_root}")
    print(f"MongoDB URI: {os.getenv('MONGODB_URI', 'mongodb://localhost:27017/')}")
    print(f"Database: {os.getenv('MONGODB_DB_NAME', 'ai_interviewer')}")
    print("\nAPI will be available at: http://0.0.0.0:8000")
    print("API docs will be available at: http://0.0.0.0:8000/docs")

    uvicorn.run(
        app,
        host="0.0.0.0",
        port=8000,
        reload=True
    )
