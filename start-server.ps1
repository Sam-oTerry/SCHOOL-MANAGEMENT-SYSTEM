# PowerShell script to start the development server
# This bypasses execution policy issues

Write-Host "🚀 Starting School Management System Server..." -ForegroundColor Green

# Try to start the server
try {
    Write-Host "📦 Starting npm server on port 3000..." -ForegroundColor Yellow
    npx http-server -p 3000
} catch {
    Write-Host "❌ Failed to start with npx, trying alternative..." -ForegroundColor Red
    
    # Alternative: Use node directly
    try {
        Write-Host "🔄 Trying with node directly..." -ForegroundColor Yellow
        node node_modules/http-server/bin/http-server -p 3000
    } catch {
        Write-Host "❌ All methods failed. Please check your Node.js installation." -ForegroundColor Red
        Write-Host "💡 Try running: npm install" -ForegroundColor Cyan
    }
}
