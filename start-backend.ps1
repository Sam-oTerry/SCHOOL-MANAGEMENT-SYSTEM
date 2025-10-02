# School Management System Backend Startup Script
# PowerShell version

Write-Host "🚀 Starting School Management System Backend..." -ForegroundColor Green
Write-Host ""

# Check if Python is installed
try {
    $pythonVersion = python --version 2>&1
    Write-Host "✓ Python detected: $pythonVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Error: Python is not installed or not in PATH" -ForegroundColor Red
    Write-Host "Please install Python 3.8 or higher from https://python.org" -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}

# Navigate to backend directory
$backendPath = Join-Path $PSScriptRoot "backend"
if (Test-Path $backendPath) {
    Set-Location $backendPath
    Write-Host "✓ Navigated to backend directory" -ForegroundColor Green
} else {
    Write-Host "❌ Error: Backend directory not found" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

# Check if requirements.txt exists
if (Test-Path "requirements.txt") {
    Write-Host "✓ Requirements file found" -ForegroundColor Green
} else {
    Write-Host "❌ Error: requirements.txt not found" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

# Install requirements
Write-Host "📦 Installing Python packages..." -ForegroundColor Yellow
try {
    pip install -r requirements.txt
    Write-Host "✓ Packages installed successfully" -ForegroundColor Green
} catch {
    Write-Host "❌ Error installing packages" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

# Check if .env exists
if (-not (Test-Path ".env")) {
    if (Test-Path "config.env.example") {
        Write-Host "📝 Creating .env file from example..." -ForegroundColor Yellow
        Copy-Item "config.env.example" ".env"
        Write-Host ""
        Write-Host "⚠️  IMPORTANT: Please edit .env file with your actual configuration values" -ForegroundColor Yellow
        Write-Host "   - Firebase project ID and API key" -ForegroundColor White
        Write-Host "   - Power Automate flow URL" -ForegroundColor White
        Write-Host "   - Azure credentials (if using Power Automate)" -ForegroundColor White
        Write-Host ""
        Read-Host "Press Enter to continue"
    } else {
        Write-Host "⚠️  Warning: No environment configuration found" -ForegroundColor Yellow
    }
} else {
    Write-Host "✓ Environment configuration found" -ForegroundColor Green
}

# Create necessary directories
$directories = @("logs", "uploads", "temp")
foreach ($dir in $directories) {
    if (-not (Test-Path $dir)) {
        New-Item -ItemType Directory -Name $dir | Out-Null
        Write-Host "✓ Created directory: $dir" -ForegroundColor Green
    }
}

# Start the Flask application
Write-Host ""
Write-Host "🌐 Starting Flask server..." -ForegroundColor Green
Write-Host "API will be available at: http://localhost:5000" -ForegroundColor Cyan
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
Write-Host ""

try {
    python app.py
} catch {
    Write-Host "❌ Error starting Flask server" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
}

Read-Host "Press Enter to exit"
