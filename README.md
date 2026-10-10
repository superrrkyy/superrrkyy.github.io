<p align="center">
  <img src="https://raw.githubusercontent.com/superrrkyy/superrrkyy/HEAD/assets/header.svg" width="100%" alt="AXRYZURE" />
</p>

<p align="center">
  <a href="https://superrrkyy.github.io/">
    <img src="https://img.shields.io/badge/✦_KUNJUNGI_PORTOFOLIO-A78BFA?style=for-the-badge&labelColor=07060d" alt="Portofolio" />
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=white&labelColor=07060d" />
  <img src="https://img.shields.io/badge/TypeScript-strict-3178C6?style=flat-square&logo=typescript&logoColor=white&labelColor=07060d" />
  <img src="https://img.shields.io/badge/Tailwind-3.4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white&labelColor=07060d" />
  <img src="https://img.shields.io/badge/Vite-6-646CFF?style=flat-square&logo=vite&logoColor=white&labelColor=07060d" />
  <img src="https://img.shields.io/github/actions/workflow/status/superrrkyy/superrrkyy.github.io/deploy.yml?style=flat-square&label=deploy&labelColor=07060d" />
</p>

---

> Website portofolio pribadi **AXRYZURE**: Web & Bot Developer dari Indonesia 🇮🇩. Menampilkan proyek, tech stack, panduan, dan kontak dalam satu halaman yang hidup.

### ✨ Fitur

- ⌨️ **Efek mengetik** di bagian hero, bergantian antara beberapa peran
- 🌌 **Latar partikel jaringan** di hero, dibuat dengan canvas ringan yang berhenti saat tidak terlihat
- 🔤 **Nama muncul huruf per huruf** dengan teks bergradasi
- 🔢 **Statistik yang naik** saat terlihat di layar
- 🎞️ **Ticker teknologi** yang berjalan terus dan berhenti saat disorot
- 🔦 **Sorot cahaya** yang mengikuti kursor atau jari di setiap kartu
- 🃏 **Kartu proyek miring 3D** saat disorot dengan kursor (khusus desktop)
- 📈 **Bar progres scroll** di bagian atas halaman
- 🌀 **Garis berputar** mengelilingi kartu kontak
- 🎬 **Animasi muncul saat scroll** untuk setiap bagian
- ♿ **Menghormati `prefers-reduced-motion`**: semua animasi dimatikan dan konten tetap tampil
- 📱 **Responsif** dengan menu mobile dan tanpa scroll ke samping
- 🚀 **Auto deploy** ke GitHub Pages setiap push ke `main`

### 🧭 Bagian Halaman

| Bagian | Isi |
|:--|:--|
| 🏠 **Hero** | Nama, peran yang bergantian, tombol aksi, dan statistik |
| 🎞️ **Ticker** | Deretan teknologi yang dipakai |
| 👤 **Tentang** | Empat keunggulan dan contoh kode |
| 🛠️ **Skill** | Tech stack dalam bentuk pil berwarna |
| 🚀 **Proyek** | Kartu proyek dengan banner, tag, dan tombol Demo & Kode |
| 📚 **Panduan** | Tautan ke panduan belajar gratis |
| 📬 **Kontak** | Email, GitHub, Instagram, dan Telegram |

### ✏️ Mengubah Isi

Semua teks, proyek, skill, dan kontak ada di satu file: **[`src/data.ts`](src/data.ts)**. Edit file itu saja, commit, dan website otomatis terupdate dalam 1–2 menit.

Efek animasi bisa diatur di **[`src/index.css`](src/index.css)**, sedangkan struktur halaman dan komponen ada di **[`src/App.tsx`](src/App.tsx)**.

### 💻 Menjalankan Lokal

```bash
git clone https://github.com/superrrkyy/superrrkyy.github.io.git
cd superrrkyy.github.io
npm install
npm run dev
```

Build untuk produksi:

```bash
npm run build
```

<details>
<summary><b>📁 Struktur</b></summary>
<br>

```
├── .github/workflows/deploy.yml   # Auto deploy ke GitHub Pages
├── src/
│   ├── App.tsx                    # Semua section & komponen animasi
│   ├── data.ts                    # ✏️ Isi website (edit di sini)
│   ├── index.css                  # Animasi, efek sorot, & gaya global
│   └── main.tsx
├── index.html
├── package.json
├── tailwind.config.js · postcss.config.js
├── tsconfig.json · vite.config.ts
└── .gitignore
```

</details>

---

<p align="center">Dibuat dengan 💜 oleh <a href="https://github.com/superrrkyy"><b>AXRYZURE</b></a></p>
