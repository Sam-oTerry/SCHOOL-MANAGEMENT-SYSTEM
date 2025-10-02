# Render Deployment Guide

## 🚀 Deploying School Management System to Render

This guide will help you deploy your School Management System backend API to Render.

## 📋 Prerequisites

1. **Render Account**: Sign up at [render.com](https://render.com)
2. **GitHub Repository**: Your code should be in a GitHub repository
3. **Firebase Project**: Set up Firebase project with Firestore
4. **Environment Variables**: Prepare your configuration values

## 🔧 Deployment Steps

### Step 1: Prepare Your Repository

Ensure your repository has these files in the root directory:
- ✅ `requirements.txt` (moved from backend/)
- ✅ `render.yaml` (deployment configuration)
- ✅ `Procfile` (start command)
- ✅ `runtime.txt` (Python version)
- ✅ `backend/app.py` (main application)

### Step 2: Create Render Service

1. **Go to Render Dashboard**
   - Visit [render.com/dashboard](https://render.com/dashboard)
   - Click "New +" → "Web Service"

2. **Connect Repository**
   - Connect your GitHub account
   - Select your repository: `SCHOOL-MANAGEMENT-SYSTEM`
   - Choose branch: `main`

3. **Configure Service**
   - **Name**: `school-management-api`
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `python backend/app.py`
   - **Plan**: `Free` (or upgrade as needed)

### Step 3: Set Environment Variables

In the Render dashboard, go to your service → Environment tab and add:

```env
# Flask Configuration
FLASK_ENV=production
FLASK_DEBUG=false
SECRET_KEY=your-secret-key-here

# Firebase Configuration
FIREBASE_PROJECT_ID=your-firebase-project-id
FIREBASE_API_KEY=your-firebase-api-key
FIREBASE_CREDENTIALS_PATH=/opt/render/project/src/firebase-credentials.json

# Render automatically sets PORT
PORT=10000
```

### Step 4: Deploy

1. **Manual Deploy**
   - Click "Manual Deploy" → "Deploy latest commit"
   - Wait for build to complete (5-10 minutes)

2. **Auto Deploy**
   - Enable "Auto Deploy" in settings
   - Every push to main branch will trigger deployment

## 🔍 Troubleshooting

### Common Issues:

#### 1. **Build Fails - "No such file or directory: requirements.txt"**
```bash
# Solution: Ensure requirements.txt is in root directory
cp backend/requirements.txt requirements.txt
git add requirements.txt
git commit -m "Move requirements.txt to root"
git push
```

#### 2. **Module Import Errors**
```bash
# Solution: Check Python path and imports
# Ensure all imports in app.py are correct
# Check if all dependencies are in requirements.txt
```

#### 3. **Port Binding Issues**
```python
# Solution: Use Render's PORT environment variable
port = int(os.getenv('PORT', 5000))
app.run(host='0.0.0.0', port=port)
```

#### 4. **Firebase Connection Issues**
```python
# Solution: Check environment variables
# Ensure FIREBASE_PROJECT_ID and FIREBASE_API_KEY are set
# Verify Firebase credentials file path
```

#### 5. **CORS Issues**
```python
# Solution: Enable CORS in Flask app
from flask_cors import CORS
CORS(app)  # Enable CORS for all routes
```

## 📊 Monitoring

### Health Check
Your API includes a health check endpoint:
```
GET https://your-service.onrender.com/api/health
```

### Logs
- View logs in Render dashboard → Service → Logs
- Monitor for errors and performance issues

### Metrics
- Monitor CPU, Memory, and Response times
- Set up alerts for service downtime

## 🔄 Continuous Deployment

### Automatic Deploys
1. **Enable Auto Deploy**:
   - Service → Settings → Auto Deploy
   - Choose branch: `main`

2. **Deploy on Push**:
   - Every commit to main triggers deployment
   - Monitor build status in dashboard

### Manual Deploys
```bash
# Push changes to trigger deployment
git add .
git commit -m "Update API"
git push origin main
```

## 🌐 Frontend Integration

### Update Frontend Configuration
In your frontend code, update the API URL:

```javascript
// Update this in your HTML files
const API_BASE_URL = 'https://your-service-name.onrender.com/api';
```

### CORS Configuration
Ensure your backend allows requests from your frontend domain:

```python
from flask_cors import CORS

# Allow specific origins
CORS(app, origins=[
    "https://your-frontend-domain.com",
    "http://localhost:3000",  # For development
])
```

## 🔒 Security Considerations

### Environment Variables
- Never commit sensitive data to repository
- Use Render's environment variable system
- Rotate secrets regularly

### Firebase Security
- Use Firebase Admin SDK with service account
- Implement proper Firestore security rules
- Validate all API inputs

### API Security
- Implement rate limiting
- Add authentication middleware
- Validate all requests

## 📈 Scaling

### Free Tier Limits
- **750 hours/month** (enough for small projects)
- **Sleep after 15 minutes** of inactivity
- **Cold start** delay (~30 seconds)

### Upgrade Options
- **Starter Plan**: $7/month - Always on
- **Standard Plan**: $25/month - Better performance
- **Pro Plan**: $85/month - High availability

## 🛠️ Development Workflow

### Local Development
```bash
# Install dependencies
pip install -r requirements.txt

# Run locally
python backend/app.py

# Test API
curl http://localhost:5000/api/health
```

### Testing Deployment
```bash
# Test deployed API
curl https://your-service.onrender.com/api/health

# Test report generation
curl -X POST https://your-service.onrender.com/api/generate-word-report \
  -H "Content-Type: application/json" \
  -d '{"studentId": "test", "term": "Term 3", "className": "S.4"}'
```

## 📞 Support

### Render Support
- [Render Documentation](https://render.com/docs)
- [Render Community](https://community.render.com)
- [Render Status](https://status.render.com)

### Project Support
- Check logs in Render dashboard
- Monitor health check endpoint
- Test API endpoints manually

## 🎯 Next Steps

1. **Deploy Backend**: Follow steps above
2. **Test API**: Verify all endpoints work
3. **Update Frontend**: Point to deployed API
4. **Monitor**: Set up logging and alerts
5. **Scale**: Upgrade plan as needed

Your School Management System API should now be live on Render! 🎉
