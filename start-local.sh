#!/bin/bash

# Local Development Startup Script
# This script helps you start both frontend and backend services

set -e

echo "🚀 Starting Reyansh School Website Locally..."
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if backend .env exists
if [ ! -f "backend/.env" ]; then
    echo -e "${YELLOW}⚠️  Backend .env file not found!${NC}"
    echo "Creating from .env.example..."
    if [ -f "backend/.env.example" ]; then
        cp backend/.env.example backend/.env
        echo -e "${GREEN}✓ Created backend/.env${NC}"
        echo -e "${YELLOW}⚠️  Please edit backend/.env with your MongoDB connection string!${NC}"
    else
        echo "Error: backend/.env.example not found"
        exit 1
    fi
fi

# Check if frontend .env exists
if [ ! -f "frontend/.env" ]; then
    echo -e "${YELLOW}⚠️  Frontend .env file not found!${NC}"
    echo "Creating frontend/.env..."
    echo "REACT_APP_BACKEND_URL=http://localhost:8000" > frontend/.env
    echo -e "${GREEN}✓ Created frontend/.env${NC}"
fi

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check for Python
if ! command_exists python3; then
    echo "Error: python3 not found. Please install Python 3.11 or higher."
    exit 1
fi

# Check for Node.js
if ! command_exists node; then
    echo "Error: Node.js not found. Please install Node.js 18 or higher."
    exit 1
fi

# Check for Yarn
if ! command_exists yarn; then
    echo "Error: Yarn not found. Please install Yarn."
    echo "Install with: npm install -g yarn"
    exit 1
fi

echo "📦 Setting up backend..."
cd backend

# Create virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    echo "Creating Python virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
source venv/bin/activate

# Install dependencies if needed
if [ ! -d "venv/lib/python3.11/site-packages/fastapi" ]; then
    echo "Installing Python dependencies..."
    pip install -r requirements.txt
fi

echo -e "${GREEN}✓ Backend dependencies ready${NC}"
cd ..

echo ""
echo "📦 Setting up frontend..."
cd frontend

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "Installing Node.js dependencies..."
    yarn install
fi

echo -e "${GREEN}✓ Frontend dependencies ready${NC}"
cd ..

echo ""
echo -e "${GREEN}✅ Setup complete!${NC}"
echo ""
echo "Starting services..."
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  Backend:  http://localhost:8000"
echo "  Frontend: http://localhost:3000"
echo "  API Docs: http://localhost:8000/docs"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Press Ctrl+C to stop all services"
echo ""

# Start backend in background
cd backend
source venv/bin/activate
uvicorn server:app --reload --host 0.0.0.0 --port 8000 &
BACKEND_PID=$!
cd ..

# Wait a moment for backend to start
sleep 2

# Start frontend
cd frontend
yarn start &
FRONTEND_PID=$!
cd ..

# Function to cleanup on exit
cleanup() {
    echo ""
    echo "Stopping services..."
    kill $BACKEND_PID 2>/dev/null || true
    kill $FRONTEND_PID 2>/dev/null || true
    echo "Services stopped."
    exit 0
}

# Trap Ctrl+C
trap cleanup INT TERM

# Wait for both processes
wait
