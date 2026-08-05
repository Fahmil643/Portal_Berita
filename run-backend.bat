@echo off
echo ===================================================
echo   MEMULAI DJANGO BACKEND REST API (PORT 8000)
echo ===================================================
cd /d "%~dp0backend"

if not exist "venv" (
    echo [1/4] Membuat Virtual Environment Python...
    python -m venv venv
)

echo [2/4] Mengaktifkan Virtual Environment & Install Dependencies...
call venv\Scripts\activate
pip install -r requirements.txt

echo [3/4] Menjalankan Database Migration & Seeder Berita...
python manage.py migrate
python manage.py seed_news

echo [4/4] Menjalankan Server Django di http://localhost:8000/ ...
python manage.py runserver 8000
pause
