@echo off
title Memulai Portal Berita (Fullstack)
echo ===================================================
echo   MEMULAI PORTAL BERITA (BACKEND + FRONTEND)
echo ===================================================
echo.
echo 1. Membuka Django Backend Server (Port 8000)...
start "Django Backend (Port 8000)" cmd /k "cd /d ""%~dp0"" && run-backend.bat"

timeout /t 3 >nul

echo 2. Membuka Next.js Frontend Server (Port 3000)...
start "Next.js Frontend (Port 3000)" cmd /k "cd /d ""%~dp0"" && run-frontend.bat"

echo.
echo ===================================================
echo Application successfully launched!
echo - Frontend: http://localhost:3000
echo - Backend API: http://localhost:8000/api/v1/
echo - Django Admin: http://localhost:8000/admin/
echo ===================================================
echo.
pause
