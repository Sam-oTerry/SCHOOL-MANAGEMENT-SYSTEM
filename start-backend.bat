@echo off
echo Starting School Management System Backend...
echo.

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo Error: Python is not installed or not in PATH
    echo Please install Python 3.8 or higher from https://python.org
    pause
    exit /b 1
)

REM Navigate to backend directory
cd /d "%~dp0backend"

REM Check if requirements.txt exists
if not exist requirements.txt (
    echo Error: requirements.txt not found
    echo Please ensure you're in the correct directory
    pause
    exit /b 1
)

REM Install requirements if needed
echo Installing Python packages...
pip install -r requirements.txt

REM Check if .env exists
if not exist .env (
    if exist config.env.example (
        echo Creating .env file from example...
        copy config.env.example .env
        echo.
        echo IMPORTANT: Please edit .env file with your actual configuration values
        echo - Firebase project ID and API key
        echo - Power Automate flow URL
        echo - Azure credentials (if using Power Automate)
        echo.
        pause
    ) else (
        echo Warning: No environment configuration found
    )
)

REM Create necessary directories
if not exist logs mkdir logs
if not exist uploads mkdir uploads
if not exist temp mkdir temp

REM Start the Flask application
echo.
echo Starting Flask server...
echo API will be available at: http://localhost:5000
echo Press Ctrl+C to stop the server
echo.

python app.py

pause
