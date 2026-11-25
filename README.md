# Portofolio Fahreza Aboy Firansyah

Arsitektur portofolio dipisah menjadi **Frontend** (`frontend/`) dan **Backend** (`backend/`), dengan desain dark editorial terinspirasi dari [techyscouts.com](https://www.techyscouts.com/) serta mode dua bahasa (**Indonesia / English**).

## Struktur Folder

- `frontend/` — React + Vite + Tailwind CSS + Framer Motion
- `backend/` — Node.js + Express + SQLite (`node:sqlite`) REST API

## Cara Menjalankan (Lokal)

1. **Jalankan Backend API** (port `5000`):
   ```bash
   cd backend
   npm install
   npm run dev
   ```
   Database SQLite (`backend/data/portfolio.db`) otomatis dibuat & di-seed saat server pertama kali jalan. Untuk reset data ke default, jalankan `npm run seed`.

2. **Jalankan Frontend** (port `5173`):
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   Buka `http://localhost:5173` di browser. Vite otomatis mem-proxy request `/api/*` ke `http://localhost:5000`.

## Endpoint Backend API

- `GET /api/health` — Cek status server
- `GET /api/portfolio?lang=id|en` — Data lengkap portofolio sesuai bahasa
- `GET /api/profile?lang=id|en` — Profil & statistik
- `GET /api/experiences?lang=id|en` — Riwayat pengalaman
- `GET /api/projects?lang=id|en&category=all|web|sekolah` — Daftar proyek
- `GET /api/skills?lang=id|en` — Daftar keahlian
- `GET /api/certificates?lang=id|en` — Daftar sertifikat
- `POST /api/contact` — Simpan pesan kontak ke database SQLite
