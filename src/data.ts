// ============================================================
// ✏️  EDIT FILE INI UNTUK MENGUBAH ISI WEBSITE
// ============================================================

const RAW = "https://raw.githubusercontent.com/superrrkyy";

export const profile = {
  name: "AXRYZURE",
  username: "superrrkyy",
  role: "Web & Bot Developer",
  location: "Indonesia 🇮🇩",
  tagline:
    "Saya membangun website modern, bot WhatsApp & Telegram, REST API, dan menulis panduan coding berbahasa Indonesia.",
  typing: [
    "Web & Bot Developer",
    "React + TypeScript",
    "Pembuat axybot 🤖",
    "Terus belajar, terus membangun ✨",
  ],
  github: "https://github.com/superrrkyy",
  email: "iranassalam@gmail.com",
  instagram: "https://instagram.com/superryinz",
  telegram: "https://t.me/hasanmuslihat",
};

export const about = [
  { title: "Web Modern", text: "Website responsif dengan React, TypeScript, Tailwind & Vite." },
  { title: "Bot Developer", text: "Framework bot WhatsApp modular dan bot Telegram." },
  { title: "REST API", text: "Backend dengan Flask & Node.js, autentikasi API key, dan SQLite." },
  { title: "Edukasi", text: "Panduan coding, Termux, dan keamanan digital untuk pemula." },
];

export const stack = [
  { name: "HTML", color: "#E34F26" },
  { name: "CSS", color: "#1572B6" },
  { name: "JavaScript", color: "#F7DF1E" },
  { name: "TypeScript", color: "#3178C6" },
  { name: "React", color: "#61DAFB" },
  { name: "Tailwind", color: "#06B6D4" },
  { name: "Vite", color: "#646CFF" },
  { name: "Node.js", color: "#339933" },
  { name: "Python", color: "#3776AB" },
  { name: "Flask", color: "#ffffff" },
  { name: "SQLite", color: "#4FA3D1" },
  { name: "Linux / Termux", color: "#FCC624" },
  { name: "Git", color: "#F05032" },
];

export type Project = {
  title: string;
  desc: string;
  image: string;
  tags: string[];
  repo: string;
  demo?: string;
};

export const projects: Project[] = [
  {
    title: "NadaKu",
    desc: "Pemutar musik: lagu penuh gratis dari Audius dan katalog iTunes. Cari, antrean, acak, dan favorit.",
    image: `${RAW}/nadaku/HEAD/assets/banner.svg`,
    tags: ["React", "TypeScript", "Audius", "iTunes"],
    repo: "https://github.com/superrrkyy/nadaku",
    demo: "https://superrrkyy.github.io/nadaku/",
  },
  {
    title: "CryptoKu",
    desc: "Pantau harga kripto real-time dalam Rupiah: pasar, detail koin, watchlist, dan kalkulator konversi.",
    image: `${RAW}/cryptoku/HEAD/assets/banner.svg`,
    tags: ["React", "TypeScript", "CoinGecko"],
    repo: "https://github.com/superrrkyy/cryptoku",
    demo: "https://superrrkyy.github.io/cryptoku/",
  },
  {
    title: "AXRYZURE Store",
    desc: "Toko digital premium: keranjang, wishlist, pencarian ⌘K, checkout 4 langkah, dan license key otomatis.",
    image: `${RAW}/axryzure-store/HEAD/assets/banner.svg`,
    tags: ["React", "TypeScript", "Tailwind", "Framer Motion"],
    repo: "https://github.com/superrrkyy/axryzure-store",
    demo: "https://superrrkyy.github.io/axryzure-store/",
  },
  {
    title: "AnimeKu",
    desc: "Katalog anime: trending, pencarian, jadwal tayang 7 hari, daftar episode, trailer, dan pelacak progres nonton.",
    image: `${RAW}/animeku/HEAD/assets/banner.svg`,
    tags: ["React", "TypeScript", "Tailwind", "AniList"],
    repo: "https://github.com/superrrkyy/animeku",
    demo: "https://superrrkyy.github.io/animeku/",
  },
  {
    title: "CuacaKu",
    desc: "Aplikasi cuaca real-time: prakiraan 24 jam dan 7 hari, cari kota, lokasi GPS, dan favorit.",
    image: `${RAW}/cuacaku/HEAD/assets/banner.svg`,
    tags: ["React", "TypeScript", "Tailwind", "Open-Meteo"],
    repo: "https://github.com/superrrkyy/cuacaku",
    demo: "https://superrrkyy.github.io/cuacaku/",
  },
  {
    title: "axybot Core V5",
    desc: "Framework bot WhatsApp modular: command otomatis termuat, permission owner/admin/premium, dan SQLite.",
    image: `${RAW}/axybot/HEAD/assets/banner.svg`,
    tags: ["Node.js", "Baileys", "SQLite"],
    repo: "https://github.com/superrrkyy/axybot",
  },
  {
    title: "Flask API",
    desc: "REST API dengan autentikasi API key, CRUD lengkap, dan penyimpanan SQLite.",
    image: `${RAW}/flask-api-belajar/HEAD/assets/banner.svg`,
    tags: ["Python", "Flask", "SQLite"],
    repo: "https://github.com/superrrkyy/flask-api-belajar",
  },
];

// Proyek yang tidak ditampilkan sebagai kartu utama, tapi tetap ada di GitHub
export const otherProjects = [
  { title: "The Hystori Cosmic", repo: "https://github.com/superrrkyy/axryzure-hystori-cosmic", demo: "https://superrrkyy.github.io/axryzure-hystori-cosmic/" },
  { title: "Maulid Nabi SAW", repo: "https://github.com/superrrkyy/web-memperingati-maulid-nabi", demo: "https://superrrkyy.github.io/web-memperingati-maulid-nabi/" },
];

export const guides = [
  { icon: "📱", title: "Termux Linux Distro Guide", desc: "Instal Ubuntu, Debian, Arch, dan Kali di Android", url: "https://github.com/superrrkyy/termux-linux-distro-guide" },
  { icon: "💡", title: "Belajar Coding Dasar", desc: "Dasar coding dan jenis-jenis error", url: "https://github.com/superrrkyy/belajar-coding-dasar" },
];
