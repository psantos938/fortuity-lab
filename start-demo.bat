@echo off
REM Fortuity Lab Demo Startup Script for Windows
REM This script helps you start the demo quickly

echo.
echo 🧪 Fortuity Lab - Demo Startup Script
echo ======================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Error: Node.js is not installed.
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo ✅ Node.js version: %NODE_VERSION%
echo.

REM Check if dependencies are installed
if not exist "node_modules" (
    echo 📦 Installing backend dependencies...
    call npm install
    echo.
)

REM Start backend server
echo 🚀 Starting backend server on port 3001...
start "Fortuity Lab Backend" cmd /k "npm start"

REM Wait a moment for server to start
echo ⏳ Waiting for server to be ready...
timeout /t 8 /nobreak >nul

REM Check if server is responding
curl -s http://localhost:3001/health >nul 2>&1
if %errorlevel% neq 0 (
    echo ⚠️  Warning: Backend server may not have started properly.
    echo Please check the backend window for errors.
    echo.
    pause
)
echo.

REM Ask user which demo to run
echo Which demo would you like to run?
echo.
echo 1) Simple HTML Demo (instant, no build required)
echo 2) React Application (professional UI)
echo 3) Both (HTML demo + React app)
echo 4) Just keep backend running
echo.
set /p choice="Enter your choice (1-4): "

if "%choice%"=="1" (
    echo.
    echo 🌐 Opening HTML demo...
    start index.html
    echo.
    echo ✅ Demo is ready!
    echo    - HTML Demo: Opened in browser
    echo    - Backend API: http://localhost:3001
    echo.
    goto :end
)

if "%choice%"=="2" (
    echo.
    echo 🎨 Starting React application...
    cd client
    if not exist "node_modules" (
        echo 📦 Installing React dependencies (this may take a minute)...
        call npm install
    )
    echo 🚀 Starting React dev server...
    call npm start
    goto :end
)

if "%choice%"=="3" (
    echo.
    echo 🌐 Opening HTML demo...
    start index.html
    echo.
    echo 🎨 Starting React application...
    cd client
    if not exist "node_modules" (
        echo 📦 Installing React dependencies (this may take a minute)...
        call npm install
    )
    echo 🚀 Starting React dev server...
    call npm start
    goto :end
)

if "%choice%"=="4" (
    echo.
    echo ✅ Backend server is running!
    echo.
    echo 📝 Next steps:
    echo    - Open index.html for simple demo
    echo    - Run 'cd client && npm start' for React app
    echo    - Test API at http://localhost:3001
    echo.
    goto :end
)

echo.
echo Invalid choice. Please run the script again.
pause
exit /b 1

:end
echo.
echo 🎉 Enjoy exploring Fortuity Lab!
echo.
echo Demo Credentials:
echo   - admin / admin123 (Administrator)
echo   - embryo1 / embryo123 (Embryologist)
echo   - andro1 / andro123 (Andrologist)
echo.
echo 📚 Documentation:
echo   - Quick Start: QUICK-START.md
echo   - Analysis: DEMO-ANALYSIS.md
echo   - API Docs: README.md
echo.
pause
