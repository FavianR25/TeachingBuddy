@echo off
SET PATH=C:\Program Files\nodejs;%PATH%
echo ========================================
echo   TeachBuddy AI - Starting Backend
echo ========================================
echo.
cd /d "%~dp0backend"
"C:\Program Files\nodejs\node.exe" server.js
pause
