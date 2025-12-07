@echo off
echo Starting AI Interviewer Backend with MongoDB...
echo.

if not exist ".env" (
    echo Warning: .env file not found. Creating from .env.example...
    copy .env.example .env
    echo Please update .env with your actual API keys and MongoDB connection details.
    echo.
)

where python >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Error: Python is not installed or not in PATH
    exit /b 1
)

if not exist "venv" if not exist "env" (
    echo No virtual environment found. Consider creating one:
    echo   python -m venv venv
    echo   venv\Scripts\activate
    echo   pip install -r requirements.txt
    echo.
)

set PYTHONPATH=%PYTHONPATH%;%cd%

python run_backend.py
