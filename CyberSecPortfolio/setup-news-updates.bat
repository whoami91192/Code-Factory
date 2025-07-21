@echo off
echo ========================================
echo   Cybersecurity News Feed Setup
echo ========================================
echo.

echo This script will help you set up daily news updates for your portfolio.
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo ✅ Node.js is installed
echo.

REM Navigate to API directory
cd api

REM Check if dependencies are installed
if not exist "node_modules" (
    echo Installing dependencies...
    npm install
    if %errorlevel% neq 0 (
        echo ERROR: Failed to install dependencies
        pause
        exit /b 1
    )
    echo ✅ Dependencies installed
) else (
    echo ✅ Dependencies already installed
)

echo.

REM Test the news API
echo Testing news API...
node test-news.js
if %errorlevel% neq 0 (
    echo ERROR: News API test failed
    pause
    exit /b 1
)

echo.
echo ✅ News API test passed
echo.

REM Test the update script
echo Testing news update script...
node update-news-cache.js
if %errorlevel% neq 0 (
    echo ERROR: News update script test failed
    pause
    exit /b 1
)

echo.
echo ✅ News update script test passed
echo.

echo ========================================
echo   Setup Complete!
echo ========================================
echo.
echo Your news feed is now ready! Here's what was set up:
echo.
echo ✅ API endpoint: /api/news
echo ✅ Frontend component: NewsTable.tsx
echo ✅ Update script: update-news-cache.js
echo ✅ Vercel cron job: Daily at 6 AM UTC
echo.
echo The news will automatically update:
echo - Every 6 hours via frontend auto-refresh
echo - Daily at 6 AM UTC via Vercel cron job
echo - When users click the refresh button
echo.
echo To manually update news, run:
echo   cd api && node update-news-cache.js
echo.
echo For more information, see: api/README-NEWS.md
echo.
pause 