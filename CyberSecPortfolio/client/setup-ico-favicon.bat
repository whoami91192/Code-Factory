@echo off
echo ========================================
echo    JK Logo ICO Favicon Setup
echo ========================================
echo.
echo This script will help you set up your ICO favicon.
echo.
echo Please follow these steps:
echo.
echo 1. Place your ICO file in the 'public' folder
echo 2. Rename it to 'favicon.ico'
echo 3. Run this script again to verify
echo.
echo Current favicon files in public directory:
dir public\*.ico 2>nul || echo No ICO files found
echo.
echo HTML has been updated to use favicon.ico as primary favicon.
echo.
echo To test your favicon:
echo 1. Start the dev server: npm run dev
echo 2. Open http://localhost:5173 in your browser
echo 3. Check the browser tab for your JK logo
echo.
pause 