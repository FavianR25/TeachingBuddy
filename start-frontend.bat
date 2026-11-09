@echo off
SET PATH=C:\Program Files\nodejs;%PATH%
echo ========================================
echo   TeachBuddy AI - Starting Frontend
echo ========================================
echo.
cd /d "%~dp0frontend"
"C:\Program Files\nodejs\node.exe" node_modules\vite\bin\vite.js
pause
