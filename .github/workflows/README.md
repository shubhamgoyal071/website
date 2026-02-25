# GitHub Actions Workflows

This directory contains GitHub Actions workflows for automated deployment.

## Workflows

### 1. `deploy-frontend.yml`
- **Purpose**: Builds and deploys the React frontend to GitHub Pages
- **Triggers**: 
  - Push to `main` or `master` branch (when frontend files change)
  - Manual workflow dispatch
- **Requirements**:
  - GitHub Pages must be enabled in repository settings
  - `REACT_APP_BACKEND_URL` secret must be set in GitHub repository secrets

### 2. `deploy-backend.yml`
- **Purpose**: Deploys the FastAPI backend to Railway or Render
- **Triggers**: 
  - Push to `main` or `master` branch (when backend files change)
  - Manual workflow dispatch
- **Requirements**:
  - Railway: `RAILWAY_TOKEN` and optionally `RAILWAY_PROJECT_ID` secrets
  - Render: `RENDER_API_KEY` and `RENDER_SERVICE_ID` secrets

## Quick Setup

1. **Enable GitHub Pages**:
   - Go to repository Settings → Pages
   - Source: Select "GitHub Actions"

2. **Set up secrets** (Settings → Secrets and variables → Actions):
   - `REACT_APP_BACKEND_URL`: Your backend URL (e.g., `https://your-backend.up.railway.app`)
   - `RAILWAY_TOKEN`: (Optional) If using Railway CLI deployment
   - `RAILWAY_PROJECT_ID`: (Optional) If using Railway CLI deployment

3. **Push to main branch** - workflows will run automatically!

For detailed instructions, see [DEPLOYMENT.md](../DEPLOYMENT.md)
