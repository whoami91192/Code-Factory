@echo off
echo Starting Cyber Security Portfolio Development Environment...
echo.

echo Starting Server...
start "Server" cmd /k "cd server && npm run dev"

echo Waiting 3 seconds for server to start...
timeout /t 3 /nobreak > nul

echo Starting Client...
start "Client" cmd /k "cd client && npm run dev"

echo.
echo Development servers are starting...
echo Server will be available at: http://localhost:5000
echo Client will be available at: http://localhost:5173
echo.
echo Press any key to close this window...
pause > nul 