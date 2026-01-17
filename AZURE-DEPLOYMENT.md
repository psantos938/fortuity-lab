# Fortuity Lab - Azure Static Web Apps Deployment Guide

## 🚀 Quick Deploy to Azure

### Option 1: Deploy via Azure Portal (Easiest)

1. **Push to GitHub**
   ```bash
   # Create GitHub repo (if not exists)
   gh repo create fortuity-lab --public --source=. --remote=origin --push
   
   # Or manually:
   # Create repo at github.com/new
   # Then:
   git remote add origin https://github.com/YOUR_USERNAME/fortuity-lab.git
   git branch -M main
   git push -u origin main
   ```

2. **Create Static Web App in Azure Portal**
   - Go to [Azure Portal](https://portal.azure.com)
   - Click **Create a resource** → **Static Web App**
   - Fill in:
     - **Subscription**: Microsoft Azure (5000)
     - **Resource Group**: fortuity-lab-rg
     - **Name**: fortuity-lab
     - **Region**: East US 2
     - **Source**: GitHub
     - **Organization**: Your GitHub username
     - **Repository**: fortuity-lab
     - **Branch**: main
     - **Build Presets**: React
     - **App location**: `/client`
     - **Output location**: `build`
   - Click **Review + create** → **Create**

3. **Azure will automatically**:
   - Create GitHub Action workflow
   - Deploy your app
   - Provide a public URL (e.g., `https://fortuity-lab-xxx.azurestaticapps.net`)

### Option 2: Deploy via Azure CLI

```bash
# Login to Azure
az login

# Create Static Web App
az staticwebapp create \
  --name fortuity-lab \
  --resource-group fortuity-lab-rg \
  --source https://github.com/YOUR_USERNAME/fortuity-lab \
  --location "East US 2" \
  --branch main \
  --app-location "/client" \
  --output-location "build" \
  --login-with-github
```

## 🔧 Connect Frontend to Backend API

After deployment, update the API URL:

1. **In Azure Portal**:
   - Go to your Static Web App
   - Click **Configuration**
   - Add Application Setting:
     - **Name**: `REACT_APP_API_URL`
     - **Value**: `http://localhost:3001` (for now)

2. **For Production API**:
   - Deploy backend to Azure App Service or Azure Functions
   - Update `REACT_APP_API_URL` to production API URL

## 📋 Pre-Deployment Checklist

- [x] Git repository initialized
- [x] React app created with proper structure
- [x] Theme configuration centralized
- [x] API endpoints defined
- [ ] GitHub repository created
- [ ] GitHub connected to Azure
- [ ] Static Web App deployed
- [ ] API URL configured
- [ ] Custom domain configured (optional)

## 🌐 After Deployment

Your app will be available at:
- **Azure URL**: `https://fortuity-lab-xxx.azurestaticapps.net`
- **Custom Domain** (optional): `fortuity.reproductiveamerica.com`

## 🔄 Automatic Updates

Every time you push to GitHub main branch:
1. GitHub Actions automatically builds the React app
2. Deploys to Azure Static Web Apps
3. App updates within 2-3 minutes

## 📝 Next Steps

1. Deploy backend API to Azure (App Service or Functions)
2. Configure CORS to allow your Static Web App domain
3. Update `REACT_APP_API_URL` in Static Web App settings
4. Add custom domain in Azure Portal
5. Configure SSL certificate

## 💰 Cost Estimate

- **Static Web App**: Free tier (100 GB bandwidth/month)
- **Cosmos DB**: ~$25/month (current setup)
- **Total**: ~$25/month

## 🔗 Resources

- [Static Web Apps Documentation](https://docs.microsoft.com/azure/static-web-apps/)
- [GitHub Actions Workflow](/.github/workflows/azure-static-web-apps.yml)
- [API Configuration](/client/src/api.js)
