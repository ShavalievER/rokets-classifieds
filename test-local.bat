@echo off
REM Quick local test script for Windows

echo ==========================================
echo Local Server Test
echo ==========================================

REM Check Node.js version
node --version
npm --version

REM Install dependencies if needed
if not exist "node_modules" (
  echo Installing dependencies...
  call npm install
)

REM Build if .next doesn't exist
if not exist ".next" (
  echo Building project...
  call npm run build
)

REM Set environment
set NODE_ENV=production
set PORT=3001
set NEXT_PUBLIC_BASE_PATH=

REM Start server
echo Starting server on http://localhost:3001
echo Press Ctrl+C to stop
echo ==========================================
node server.js

