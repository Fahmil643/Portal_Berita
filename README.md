# Portal Berita Modern (Next.js 14 + Django REST Framework)

Sistem Web Portal Berita Fullstack berperforma tinggi, SEO-friendly, dan responsive.

## 🚀 Fitur Utama

- **Hero Grid & Breaking News Ticker**: Tampilan berita utama bergaya portal berita internasional modern.
- **Auto Fallback Mock Data**: Frontend Next.js tetap aktif dan dapat dicoba secara instan meskipun server Django belum dinyalakan.
- **Kategori Berita**: Filter berita cepat (Nasional, Teknologi, Ekonomi, Olahraga, Hiburan).
- **Halaman Detail Berita**: Mendukung isi HTML/Markdown, waktu baca, penghitung pembaca (*views count*), dan sistem komentar interaktif.
- **Pencarian Real-Time**: Pencarian berita berdasarkan kata kunci di judul dan isi artikel.
- **Dark / Light Mode Toggle**: Peralihan tema gelap dan terang dengan penyimpanan preferensi otomatis.
- **CMS Redaksi (Django Admin)**: Panel administrasi bawaan Django untuk menginput, mempublikasikan, dan mengelola berita secara visual.

---
<img width="1848" height="906" alt="Screenshot 2026-08-05 111012" src="https://github.com/user-attachments/assets/66f67538-cbcc-4b36-b55d-f2ec464cd45e" />

<img width="1297" height="802" alt="Screenshot 2026-08-05 111038" src="https://github.com/user-attachments/assets/ed8841d9-939d-470b-9164-90556df45093" />


## 🛠️ Cara Menjalankan Proyek

### Opsi A: Menggunakan Batch Script (Otomatis)
1. Klik ganda pada `run-backend.bat` untuk menjalankan **Django REST API** (Port `8000`).
2. Klik ganda pada `run-frontend.bat` untuk menjalankan **Next.js Frontend** (Port `3000`).

---

### Opsi B: Menggunakan Terminal Manual

#### 1. Menjalankan Backend (Django)
```bash
cd backend
python -m venv venv
# Windows:
venv\Scripts\activate

pip install -r requirements.txt
python manage.py migrate
python manage.py seed_news
python manage.py runserver 8000
```
> API backend akan berjalan di `http://localhost:8000/api/v1/`
> Panel CMS Redaksi Django Admin di `http://localhost:8000/admin/`

#### 2. Menjalankan Frontend (Next.js)
```bash
cd frontend
npm install
npm run dev
```
> Buka browser di `http://localhost:3000/`

---

## 📁 Struktur Direktori Proyek

```
djangoweb/
├── backend/                  # Django 5 REST Framework
│   ├── core/                 # Settings & URLs Django
│   ├── news/                 # App Berita (Models, Serializers, Views)
│   │   └── management/
│   │       └── commands/
│   │           └── seed_news.py  # Seeder Sampel Berita
│   ├── requirements.txt
│   └── manage.py
├── frontend/                 # Next.js 14 App Router
│   ├── src/
│   │   ├── app/              # Routes (home, article, category, search)
│   │   ├── components/       # UI Components (Navbar, Hero, Grid, Sidebar)
│   │   └── lib/
│   │       └── api.js        # API Fetcher & Fallback Mock Data
│   ├── package.json
│   └── tailwind.config.js
├── run-backend.bat           # Script Auto Run Django
├── run-frontend.bat          # Script Auto Run Next.js
└── README.md
```
