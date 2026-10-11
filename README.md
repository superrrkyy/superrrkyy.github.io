<div align="center">

# AXRYZURE — Portofolio

**Web & Bot Developer dari Indonesia.** Situs ini dibangun dengan React, TypeScript, Vite, dan Tailwind CSS.

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind-3-06B6D4?logo=tailwindcss&logoColor=white)

🌐 **[superrrkyy.github.io](https://superrrkyy.github.io)**

</div>

---

## ✨ Fitur Situs

- 🎬 Tampilan sinematik: hero layar penuh, efek *grain*, dan teks mengetik
- 🃏 Kartu proyek yang menumpuk saat di-*scroll* (CSS `sticky`)
- 📱 Mobile-first, dengan menu layar penuh untuk HP
- ♿ Menghormati pengaturan **kurangi gerakan** (`prefers-reduced-motion`)
- ⚡ Build ringan, tanpa library animasi tambahan

## 🧰 Stack

| Bagian | Teknologi |
|---|---|
| UI | React 18 + TypeScript |
| Build | Vite 6 |
| Styling | Tailwind CSS 3 |
| Deploy | GitHub Actions → GitHub Pages |

## 📁 Struktur

```
.
├── .github/workflows/deploy.yml   # deploy otomatis ke GitHub Pages
├── index.html
├── src/
│   ├── App.tsx                    # seluruh komponen & layout
│   ├── data.ts                    # profil, proyek, skill, panduan (edit di sini)
│   ├── index.css                  # tema, animasi, dan media query
│   └── main.tsx
├── tailwind.config.js
├── vite.config.ts
└── package.json
```

## ✏️ Cara Mengubah Konten

Hampir semua teks dan daftar ada di **`src/data.ts`**:

- `profile` → nama, peran, tagline, kata-kata yang diketik, dan link sosial
- `about` → empat bagian "Tentang"
- `stack` → daftar skill dan warnanya
- `projects` → proyek utama (`title`, `desc`, `image`, `tags`, `repo`, `demo`)
- `otherProjects` → daftar proyek tambahan
- `guides` → panduan (`icon`, `title`, `desc`, `url`)

## 🚀 Menjalankan Lokal

```bash
npm install
npm run dev      # development
npm run build    # build produksi (ke folder dist/)
npm run preview  # cek hasil build
```

## 🛠️ Deploy

Push ke branch `main`. Workflow `deploy.yml` akan membangun situs dan mempublikasikannya ke GitHub Pages.

## 📜 Lisensi

Lihat file [LICENSE](LICENSE) di repo ini.
