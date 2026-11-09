```markdown
# TeachingBuddy AI 🎓

**TeachingBuddy AI** adalah aplikasi web berbasis AI (Google Gemini) yang membantu guru dan pengajar STEM/Coding menyusun RPP, kuis, penjelasan materi, serta laporan perkembangan siswa secara cepat.

---

## 🚀 Fitur Utama

- 📋 **AI Lesson Planner:** Buat Rencana Pelaksanaan Pembelajaran (RPP) terstruktur lengkap dengan alokasi waktu.
- 💡 **AI Concept Explainer:** Penjelasan konsep rumit dengan analogi sederhana dan contoh kode pemrograman.
- 🎯 **AI Activity Generator:** Ide aktivitas kelas, *ice breaking*, dan tantangan kelompok STEM/Coding.
- 📝 **AI Quiz & Worksheet:** Buat kuis otomatis (Pilihan Ganda, Isian, Benar/Salah) lengkap dengan kunci jawaban.
- ✍️ **AI Teacher Notes:** Rapikan catatan mentah guru & buat laporan perkembangan siswa (Sertifikat/Milestone).

---

## 🛠️ Tech Stack

- **Frontend:** React.js, Vite, Axios
- **Backend:** Node.js, Express.js
- **AI:** Google Gemini API (`gemini-1.5-flash`)
- **Storage:** LocalStorage

---

## ⚡ Cara Menjalankan Project

### 1. Clone & Backend Setup
```bash
git clone [https://github.com/FavianR25/TeachingBuddy.git](https://github.com/FavianR25/TeachingBuddy.git)
cd TeachingBuddy/backend
npm install

```

Buat file `.env` di dalam folder `backend/`:

```env
GEMINI_API_KEY=your_gemini_api_key_here
PORT=5000

```

Jalankan server backend:

```bash
npm run dev

```

### 2. Frontend Setup

Buka terminal baru:

```bash
cd TeachingBuddy/frontend
npm install
npm run dev

```

Akses aplikasi di browser: **`http://localhost:3000`**

---

## 👨‍💻 Author

**Favian Rifqi Ramadhan**

IBM Capstone Project — 2026

```

```
