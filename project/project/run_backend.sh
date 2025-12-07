#!/bin/bash

echo "Starting AI Interviewer Backend with MongoDB..."
echo ""

if [ ! -f ".env" ]; then
    echo "Warning: .env file not found. Creating from .env.example..."
    cp .env.example .env
    echo "Please update .env with your actual API keys and MongoDB connection details."
    echo ""
fi

if ! command -v python3 &> /dev/null; then
    echo "Error: Python 3 is not installed or not in PATH"
    exit 1
fi

if [ ! -d "venv" ] && [ ! -d "env" ]; then
    echo "No virtual environment found. Consider creating one:"
    echo "  python3 -m venv venv"
    echo "  source venv/bin/activate"
    echo "  pip install -r requirements.txt"
    echo ""
fi

export PYTHONPATH="${PYTHONPATH}:$(pwd)"

python3 run_backend.py
