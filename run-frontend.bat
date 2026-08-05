@echo off
echo ===================================================
echo   MEMULAI NEXT.JS FRONTEND PORTAL BERITA (PORT 3000)
echo ===================================================
cd /d "%~dp0frontend"

if not exist "node_modules" (
    echo [1/2] Menginstall npm packages...
    npm install
)

echo [2/2] Menjalankan Next.js Dev Server di http://localhost:3000/ ...
npm run dev
pause
