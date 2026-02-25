# Deployment Guide

This guide will help you deploy your full-stack application using GitHub Actions.

## Overview

- **Frontend**: React app deployed to GitHub Pages
- **Backend**: FastAPI app deployed to Railway (or Render)

## Prerequisites

1. A GitHub repository with your code
2. A Railway account (or Render account) for backend hosting
3. MongoDB Atlas account (or your MongoDB instance)
4. Email service credentials (for sending notifications)

## Step 1: Enable GitHub Pages

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Pages**
3. Under **Source**, select **GitHub Actions** (not "Deploy from a branch")
4. Save the settings

## Step 2: Set Up Backend Environment Variables

### Option A: Using Railway (Recommended)

**Method 1: Railway GitHub Integration (Easiest - Recommended)**

Railway automatically deploys when you push to your repository. This is the simplest approach:

1. Create an account at [Railway](https://railway.app)
2. Create a new project
3. Click **New** → **GitHub Repo**
4. Select your repository
5. Railway will detect your backend. Configure it:
   - **Root Directory**: Set to `backend`
   - **Start Command**: `uvicorn server:app --host 0.0.0.0 --port $PORT`
6. Add the following environment variables in Railway:
   - `MONGO_URL`: Your MongoDB connection string
   - `DB_NAME`: Your database name
   - `CORS_ORIGINS`: Allowed CORS origins (e.g., `https://yourusername.github.io,http://localhost:3000`)
   - Email service variables (as per your `email_service.py` requirements)
7. Railway will automatically deploy on every push to your main branch!

**Method 2: Railway CLI via GitHub Actions (Optional)**

If you want to use GitHub Actions to deploy to Railway:

1. Follow steps 1-6 from Method 1
2. Get your Railway token:
   - Go to Railway Dashboard → Account Settings → Tokens
   - Create a new token
   - Copy the token
3. Get your Railway Project ID:
   - In Railway dashboard, go to your project settings
   - Copy the Project ID
4. Add to GitHub Secrets:
   - Go to your GitHub repository → **Settings** → **Secrets and variables** → **Actions**
   - Add `RAILWAY_TOKEN` with your Railway token
   - Add `RAILWAY_PROJECT_ID` with your project ID (optional, for linking)

### Option B: Using Render

1. Create an account at [Render](https://render.com)
2. Create a new Web Service
3. Connect your GitHub repository
4. Set the root directory to `backend`
5. Build command: `pip install -r requirements.txt`
6. Start command: `uvicorn server:app --host 0.0.0.0 --port $PORT`
7. Add environment variables in Render dashboard
8. Get your Render API key and Service ID
9. Add them to GitHub Secrets as `RENDER_API_KEY` and `RENDER_SERVICE_ID`

## Step 3: Set Up Frontend Environment Variables

1. Get your backend URL (from Railway or Render)
   - Railway: Usually `https://your-service-name.up.railway.app`
   - Render: Usually `https://your-service-name.onrender.com`

2. Add backend URL to GitHub Secrets:
   - Go to your GitHub repository → **Settings** → **Secrets and variables** → **Actions**
   - Click **New repository secret**
   - Name: `REACT_APP_BACKEND_URL`
   - Value: Your backend URL (e.g., `https://your-backend.up.railway.app`)
   - Click **Add secret**

## Step 4: Configure GitHub Pages

1. Go to your repository → **Settings** → **Pages**
2. Under **Build and deployment**:
   - Source: **GitHub Actions**
3. Your site will be available at: `https://yourusername.github.io/repository-name`

## Step 5: Deploy

1. Push your code to the `main` or `master` branch
2. GitHub Actions will automatically:
   - Build and deploy the frontend to GitHub Pages
   - Deploy the backend to Railway (if configured)

## Manual Deployment

You can also trigger deployments manually:
1. Go to **Actions** tab in your repository
2. Select the workflow you want to run
3. Click **Run workflow**

## Troubleshooting

### Frontend Issues

- **Build fails**: Check that `REACT_APP_BACKEND_URL` is set in GitHub Secrets
- **404 errors**: Make sure GitHub Pages is set to use GitHub Actions as the source
- **API calls fail**: Verify the backend URL is correct and CORS is configured

### Backend Issues

- **Deployment fails**: Check Railway/Render logs
- **Environment variables**: Ensure all required variables are set
- **Database connection**: Verify MongoDB connection string is correct
- **CORS errors**: Update `CORS_ORIGINS` to include your frontend URL

## Environment Variables Checklist

### Backend (Railway/Render)
- [ ] `MONGO_URL` - MongoDB connection string
- [ ] `DB_NAME` - Database name
- [ ] `CORS_ORIGINS` - Allowed origins (comma-separated)
- [ ] Email service variables (check `email_service.py` for required variables)

### Frontend (GitHub Secrets)
- [ ] `REACT_APP_BACKEND_URL` - Backend API URL

### Railway (GitHub Secrets)
- [ ] `RAILWAY_TOKEN` - Railway API token

### Render (GitHub Secrets) - If using Render
- [ ] `RENDER_API_KEY` - Render API key
- [ ] `RENDER_SERVICE_ID` - Render service ID

## Custom Domain (Optional)

### Frontend (GitHub Pages)
1. Add a `CNAME` file in the `frontend/public` directory with your domain
2. Configure DNS settings as per GitHub Pages documentation

### Backend (Railway/Render)
1. Configure custom domain in Railway/Render dashboard
2. Update `CORS_ORIGINS` to include your custom domain
3. Update `REACT_APP_BACKEND_URL` in GitHub Secrets

## Monitoring

- **Frontend**: Check GitHub Actions logs in the **Actions** tab
- **Backend**: Check Railway/Render dashboard for logs and metrics

## Support

If you encounter issues:
1. Check the GitHub Actions logs
2. Check Railway/Render deployment logs
3. Verify all environment variables are set correctly
4. Ensure MongoDB is accessible from your hosting provider
