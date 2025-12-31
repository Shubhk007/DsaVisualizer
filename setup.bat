@echo off
echo ========================================
echo DSA Visualizer - Setup Script
echo ========================================
echo.

echo [1/3] Installing dependencies...
call npm install

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ERROR: Failed to install dependencies!
    echo Please check your internet connection and try again.
    pause
    exit /b 1
)

echo.
echo [2/3] Verifying installation...
call npm list react vite typescript tailwindcss

echo.
echo [3/3] Setup complete!
echo.
echo ========================================
echo Next steps:
echo ========================================
echo 1. Run: npm run dev
echo 2. Open: http://localhost:5173
echo 3. Have fun learning DSA!
echo ========================================
echo.

pause
