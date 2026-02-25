# Local Development Setup

This guide will help you run the project on your local machine.

## Prerequisites

- **Node.js** (v18 or higher) and **Yarn** package manager
- **Python** (v3.11 or higher)
- **MongoDB** (local installation or MongoDB Atlas account)

## Step 1: Set Up Backend

### 1.1 Install Python Dependencies

```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### 1.2 Configure Environment Variables

Create a `.env` file in the `backend` directory:

```bash
cp .env.example .env
```

Edit `.env` and set your values:

**Required:**
- `MONGO_URL`: Your MongoDB connection string
  - Local: `mongodb://localhost:27017`
  - MongoDB Atlas: `mongodb+srv://username:password@cluster.mongodb.net/`
- `DB_NAME`: Database name (e.g., `reyansh_school`)

**Optional:**
- `CORS_ORIGINS`: Allowed origins (defaults to `*` if not set)
- Email settings (SMTP_HOST, SMTP_USER, etc.) - emails will be logged if not configured

### 1.3 Start MongoDB (if using local MongoDB)

**macOS (using Homebrew):**
```bash
brew services start mongodb-community
```

**Linux:**
```bash
sudo systemctl start mongod
```

**Windows:**
```bash
net start MongoDB
```

Or use MongoDB Atlas (cloud) - no local installation needed!

### 1.4 Run the Backend Server

```bash
cd backend
source venv/bin/activate  # On Windows: venv\Scripts\activate
uvicorn server:app --reload --host 0.0.0.0 --port 8000
```

The backend will be available at: `http://localhost:8000`
API documentation: `http://localhost:8000/docs`

## Step 2: Set Up Frontend

### 2.1 Install Dependencies

```bash
cd frontend
yarn install
```

### 2.2 Configure Environment Variables

Create a `.env` file in the `frontend` directory:

```bash
cd frontend
echo "REACT_APP_BACKEND_URL=http://localhost:8000" > .env
```

### 2.3 Run the Frontend

```bash
cd frontend
yarn start
```

The frontend will be available at: `http://localhost:3000`

## Quick Start Scripts

### Option 1: Run Both Services Manually

**Terminal 1 (Backend):**
```bash
cd backend
source venv/bin/activate
uvicorn server:app --reload --port 8000
```

**Terminal 2 (Frontend):**
```bash
cd frontend
yarn start
```

### Option 2: Use the Start Script

Run the provided start script (see below).

## Troubleshooting

### Backend Issues

- **MongoDB Connection Error**: 
  - Check if MongoDB is running: `mongosh` or `mongo`
  - Verify `MONGO_URL` in `.env` is correct
  - For MongoDB Atlas, ensure your IP is whitelisted

- **Port Already in Use**:
  - Change the port: `uvicorn server:app --reload --port 8001`
  - Update `REACT_APP_BACKEND_URL` in frontend `.env`

- **Module Not Found**:
  - Ensure virtual environment is activated
  - Reinstall dependencies: `pip install -r requirements.txt`

### Frontend Issues

- **Cannot Connect to Backend**:
  - Verify backend is running on port 8000
  - Check `REACT_APP_BACKEND_URL` in frontend `.env`
  - Ensure CORS is configured in backend (check `CORS_ORIGINS`)

- **Build Errors**:
  - Clear node_modules and reinstall: `rm -rf node_modules && yarn install`
  - Clear yarn cache: `yarn cache clean`

## Environment Variables Summary

### Backend (`backend/.env`)
- `MONGO_URL` (required)
- `DB_NAME` (required)
- `CORS_ORIGINS` (optional)
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD`, `ADMIN_EMAIL` (optional)

### Frontend (`frontend/.env`)
- `REACT_APP_BACKEND_URL` (required) - Backend API URL

## Testing the Setup

1. **Backend Health Check**: Visit `http://localhost:8000/api/`
2. **Frontend**: Visit `http://localhost:3000`
3. **API Docs**: Visit `http://localhost:8000/docs`

## Next Steps

- Set up MongoDB Atlas for cloud database
- Configure email service for notifications
- See [DEPLOYMENT.md](./DEPLOYMENT.md) for production deployment
