@echo off
echo 🚀 Preparing School Management System for Render deployment...

REM Check if we're in the right directory
if not exist "backend\app.py" (
    echo ❌ Error: backend\app.py not found. Please run this script from the project root.
    pause
    exit /b 1
)

REM Check if requirements.txt exists in root
if not exist "requirements.txt" (
    echo 📦 Copying requirements.txt to root directory...
    copy "backend\requirements.txt" "requirements.txt"
)

REM Check if render.yaml exists
if not exist "render.yaml" (
    echo 📄 Creating render.yaml...
    REM render.yaml should already be created
)

REM Check if Procfile exists
if not exist "Procfile" (
    echo 📄 Creating Procfile...
    REM Procfile should already be created
)

REM Check if runtime.txt exists
if not exist "runtime.txt" (
    echo 📄 Creating runtime.txt...
    REM runtime.txt should already be created
)

echo ✅ Deployment files ready!
echo.
echo 📋 Next steps:
echo 1. Commit and push your changes:
echo    git add .
echo    git commit -m "Prepare for Render deployment"
echo    git push origin main
echo.
echo 2. Go to Render dashboard:
echo    https://render.com/dashboard
echo.
echo 3. Create new Web Service:
echo    - Connect GitHub repository
echo    - Select this repository
echo    - Use these settings:
echo      * Build Command: pip install -r requirements.txt
echo      * Start Command: python backend/app.py
echo      * Environment: Python 3
echo.
echo 4. Set environment variables in Render:
echo    - FLASK_ENV=production
echo    - FLASK_DEBUG=false
echo    - FIREBASE_PROJECT_ID=your-project-id
echo    - FIREBASE_API_KEY=your-api-key
echo    - SECRET_KEY=your-secret-key
echo.
echo 5. Deploy and test!
echo.
echo 🔗 Your API will be available at: https://your-service-name.onrender.com
echo 🔍 Health check: https://your-service-name.onrender.com/api/health

pause
