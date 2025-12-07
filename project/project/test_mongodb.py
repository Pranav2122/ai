#!/usr/bin/env python3
import sys
from pathlib import Path

project_root = Path(__file__).parent
sys.path.insert(0, str(project_root))

def test_mongodb_connection():
    print("Testing MongoDB Connection...")
    print("-" * 50)

    try:
        from backend.database import get_mongodb_client
        import os

        mongodb_uri = os.getenv("MONGODB_URI", "mongodb://localhost:27017/")
        db_name = os.getenv("MONGODB_DB_NAME", "ai_interviewer")

        print(f"MongoDB URI: {mongodb_uri}")
        print(f"Database Name: {db_name}")
        print()

        db = get_mongodb_client()

        print("✓ Successfully connected to MongoDB!")
        print()

        collections = db.list_collection_names()
        print(f"Existing collections: {collections if collections else 'None (will be created on first use)'}")
        print()

        print("Testing write operation...")
        test_doc = {"test": "connection", "status": "success"}
        result = db.test_collection.insert_one(test_doc)
        print(f"✓ Write test successful! Inserted ID: {result.inserted_id}")

        print("\nTesting read operation...")
        found_doc = db.test_collection.find_one({"_id": result.inserted_id})
        print(f"✓ Read test successful! Found: {found_doc}")

        print("\nCleaning up test data...")
        db.test_collection.delete_one({"_id": result.inserted_id})
        print("✓ Cleanup successful!")

        print()
        print("=" * 50)
        print("MongoDB is properly configured and working!")
        print("=" * 50)
        return True

    except ImportError as e:
        print(f"✗ Import Error: {e}")
        print("\nPlease install dependencies:")
        print("  pip install -r requirements.txt")
        return False

    except Exception as e:
        print(f"✗ Connection Error: {e}")
        print("\nPossible solutions:")
        print("1. Ensure MongoDB is installed and running")
        print("2. Check your .env file for correct MONGODB_URI")
        print("3. Verify MongoDB service is active:")
        print("   - Windows: Check Services for 'MongoDB'")
        print("   - Linux/Mac: sudo systemctl status mongod")
        print("4. For MongoDB Atlas, ensure:")
        print("   - Your IP is whitelisted")
        print("   - Username/password are correct")
        print("   - Connection string format is correct")
        return False

if __name__ == "__main__":
    success = test_mongodb_connection()
    sys.exit(0 if success else 1)
