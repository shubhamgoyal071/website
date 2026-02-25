@echo off
REM Local Development Startup Script for Windows
REM This script helps you start both frontend and backend services

echo 🚀 Starting Reyansh School Website Locally...
echo.

REM Check if backend .env exists
if not exist "backend\.env" (
    echo ⚠️  Backend .env file not found!
    echo Creating from .env.example...
    if exist "backend\.env.example" (
        copy backend\.env.example backend\.env
        echo ✓ Created backend\.env
        echo ⚠️  Please edit backend\.env with your MongoDB connection string!
    ) else (
        echo Error: backend\.env.example not found
        exit /b 1
    )
)

REM Check if frontend .env exists
if not exist "frontend\.env" (
    echo ⚠️  Frontend .env file not found!
    echo Creating frontend\.env...
    echo REACT_APP_BACKEND_URL=http://localhost:8000 > frontend\.env
    echo ✓ Created frontend\.env
)

echo.
echo 📦 Setting up backend...
cd backend

REM Create virtual environment if it doesn't exist
if not exist "venv" (
    echo Creating Python virtual environment...
    python -m venv venv
)

REM Activate virtual environment
call venv\Scripts\activate.bat

REM Install dependencies
echo Installing Python dependencies...
pip install -r requirements.txt

echo ✓ Backend dependencies ready
cd ..

echo.
echo 📦 Setting up frontend...
cd frontend

REM Install dependencies
if not exist "node_modules" (
    echo Installing Node.js dependencies...
    call yarn install
)

echo ✓ Frontend dependencies ready
cd ..

echo.
echo ✅ Setup complete!
echo.
echo Starting services...
echo.
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo   Backend:  http://localhost:8000
echo   Frontend: http://localhost:3000
echo   API Docs: http://localhost:8000/docs
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.
echo Press Ctrl+C to stop all services
echo.

REM Start backend in new window
start "Backend Server" cmd /k "cd backend && venv\Scripts\activate.bat && uvicorn server:app --reload --host 0.0.0.0 --port 8000"

REM Wait a moment for backend to start
timeout /t 3 /nobreak >nul

REM Start frontend in new window
start "Frontend Server" cmd /k "cd frontend && yarn start"

echo.
echo Services started in separate windows.
echo Close the windows or press Ctrl+C in each to stop.
