import { useEffect, useState, type ReactNode } from "react";
import { about, guides, profile, projects, stack } from "./data";

/* ---------- hooks ---------- */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("show");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function useTyping(words: string[]) {
  const [text, setText] = useState("");
  const [i, setI] = useState(0);
  const [del, setDel] = useState(false);
  useEffect(() => {
    const word = words[i % words.length];
    const done = !del && text === word;
    const empty = del && text === "";
    const t = setTimeout(
      () => {
        if (done) return setDel(true);
        if (empty) {
          setDel(false);
          return setI((n) => n + 1);
        }
        setText(del ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1));
      },
      done ? 1600 : empty ? 300 : del ? 35 : 70
    );
    return () => clearTimeout(t);
  }, [text, del, i, words]);
  return text;
}

/* ---------- icons ---------- */
const Icon = {
  github: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.9 1.2 1.9 1.2 1.1 1.9 2.9 1.3 3.6 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.6 18.3 5 18.3 5c.7 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .5Z"/></svg>
  ),
  mail: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>
  ),
  ig: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>
  ),
  tg: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M21.9 4.3 18.7 19.4c-.2 1-.9 1.3-1.7.8l-4.8-3.5-2.3 2.2c-.3.3-.5.5-1 .5l.3-4.9 8.9-8c.4-.3-.1-.5-.6-.2L6.5 13.2l-4.7-1.5c-1-.3-1-1 .2-1.5L20.5 3c.9-.3 1.6.2 1.4 1.3Z"/></svg>
  ),
  arrow: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17 17 7M8 7h9v9"/></svg>
  ),
  menu: (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
  ),
  close: (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 6l12 12M18 6 6 18"/></svg>
  ),
};

/* ---------- small components ---------- */
function Section({ id, label, title, children }: { id: string; label: string; title: ReactNode; children: ReactNode }) {
  return (
    <section id={id} className="relative mx-auto max-w-6xl scroll-mt-24 px-5 py-20 sm:py-28">
      <div className="reveal mb-12">
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-violet-400">{label}</p>
        <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">{title}</h2>
      </div>
      {children}
    </section>
  );
}

const NAV = [
  ["Tentang", "#tentang"],
  ["Skill", "#skill"],
  ["Proyek", "#proyek"],
  ["Panduan", "#panduan"],
  ["Kontak", "#kontak"],
];

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 20);
    f();
    window.addEventListener("scroll", f);
    return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all ${scrolled || open ? "border-b border-white/10 bg-ink/80 backdrop-blur-xl" : ""}`}>
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <a href="#top" className="flex items-center gap-2 font-extrabold tracking-[0.2em] text-white">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-violet-500 to-cyan-400 text-sm text-ink">A</span>
          AXRYZURE
        </a>
        <div className="hidden items-center gap-8 md:flex">
          {NAV.map(([l, h]) => (
            <a key={h} href={h} className="text-sm text-slate-400 transition hover:text-white">{l}</a>
          ))}
          <a href={profile.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-full border border-white/15 px-4 py-1.5 text-sm text-white transition hover:border-violet-400 hover:bg-violet-500/10">
            {Icon.github} GitHub
          </a>
        </div>
        <button onClick={() => setOpen(!open)} className="text-white md:hidden" aria-label="Menu">
          {open ? Icon.close : Icon.menu}
        </button>
      </nav>
      {open && (
        <div className="border-t border-white/10 px-5 pb-6 pt-2 md:hidden">
          {NAV.map(([l, h]) => (
            <a key={h} href={h} onClick={() => setOpen(false)} className="block py-3 text-lg text-slate-300">{l}</a>
          ))}
        </div>
      )}
    </header>
  );
}

/* ---------- sections ---------- */
function Hero() {
  const typed = useTyping(profile.typing);
  return (
    <section id="top" className="relative flex min-h-[100svh] items-center overflow-hidden">
      <div className="grid-bg absolute inset-0" />
      <div className="blob left-[-10%] top-[10%] h-[420px] w-[420px] bg-violet-600" />
      <div className="blob bottom-[-10%] right-[-10%] h-[380px] w-[380px] bg-cyan-500" style={{ animationDelay: "-6s" }} />
      <div className="relative mx-auto w-full max-w-6xl px-5 pt-20">
        <div className="reveal mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 font-mono text-xs text-slate-300">
          <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" /><span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" /></span>
          Terbuka untuk kolaborasi
        </div>
        <h1 className="reveal text-5xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-7xl">
          Halo, saya <br />
          <span className="grad-text">{profile.name}</span>
        </h1>
        <p className="reveal mt-6 h-8 font-mono text-lg text-violet-300 sm:text-2xl">
          {typed}<span className="caret" />
        </p>
        <p className="reveal mt-6 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg">{profile.tagline}</p>
        <div className="reveal mt-10 flex flex-wrap gap-4">
          <a href="#proyek" className="rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 px-7 py-3 font-semibold text-white shadow-lg shadow-violet-500/30 transition hover:scale-105">
            Lihat Proyek
          </a>
          <a href="#kontak" className="rounded-full border border-white/15 px-7 py-3 font-semibold text-white transition hover:border-violet-400 hover:bg-white/5">
            Hubungi Saya
          </a>
        </div>
        <div className="reveal mt-14 grid max-w-lg grid-cols-3 gap-6">
          {[
            [String(projects.length), "Proyek unggulan"],
            [String(projects.filter((p) => p.demo).length), "Website live"],
            [String(guides.length), "Panduan"],
          ].map(([n, l]) => (
            <div key={l}>
              <div className="text-3xl font-extrabold text-white">{n}</div>
              <div className="mt-1 font-mono text-[11px] uppercase tracking-widest text-slate-500">{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <Section id="tentang" label="01 — Tentang" title={<>Apa yang saya <span className="grad-text">kerjakan</span></>}>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {about.map((a, i) => (
          <div key={a.title} className="reveal glass group rounded-2xl p-6 transition hover:-translate-y-1 hover:border-violet-400/50" style={{ transitionDelay: `${i * 80}ms` }}>
            <div className="mb-4 grid h-12 w-12 place-items-center rounded-xl bg-violet-500/10 text-2xl transition group-hover:scale-110">{a.icon}</div>
            <h3 className="mb-2 font-bold text-white">{a.title}</h3>
            <p className="text-sm leading-relaxed text-slate-400">{a.text}</p>
          </div>
        ))}
      </div>
      <div className="reveal glass mt-8 overflow-hidden rounded-2xl">
        <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-red-400/80" /><span className="h-3 w-3 rounded-full bg-yellow-400/80" /><span className="h-3 w-3 rounded-full bg-green-400/80" />
          <span className="ml-3 font-mono text-xs text-slate-500">axryzure.ts</span>
        </div>
        <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-7 sm:text-sm">
<span className="text-pink-400">const</span> <span className="text-white">axryzure</span> = {"{"}{"\n"}
{"  "}<span className="text-cyan-300">role</span>: <span className="text-amber-200">"{profile.role}"</span>,{"\n"}
{"  "}<span className="text-cyan-300">location</span>: <span className="text-amber-200">"{profile.location}"</span>,{"\n"}
{"  "}<span className="text-cyan-300">frontend</span>: [<span className="text-amber-200">"React"</span>, <span className="text-amber-200">"TypeScript"</span>, <span className="text-amber-200">"Tailwind"</span>],{"\n"}
{"  "}<span className="text-cyan-300">backend</span>: [<span className="text-amber-200">"Node.js"</span>, <span className="text-amber-200">"Python"</span>, <span className="text-amber-200">"Flask"</span>],{"\n"}
{"  "}<span className="text-cyan-300">motto</span>: <span className="text-amber-200">"Terus belajar, terus membangun ✨"</span>,{"\n"}
{"}"};
        </pre>
      </div>
    </Section>
  );
}

function Skills() {
  return (
    <Section id="skill" label="02 — Tech Stack" title={<>Teknologi yang saya <span className="grad-text">pakai</span></>}>
      <div className="flex flex-wrap gap-3">
        {stack.map((s, i) => (
          <span key={s.name} className="reveal glass flex items-center gap-2.5 rounded-full px-5 py-2.5 text-sm font-medium text-slate-200 transition hover:-translate-y-0.5 hover:border-white/30" style={{ transitionDelay: `${i * 40}ms` }}>
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: s.color, boxShadow: `0 0 12px ${s.color}` }} />
            {s.name}
          </span>
        ))}
      </div>
    </Section>
  );
}

function Projects() {
  return (
    <Section id="proyek" label="03 — Proyek" title={<>Karya <span className="grad-text">pilihan</span></>}>
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((p, i) => (
          <article key={p.title} className={`reveal glass group flex flex-col overflow-hidden rounded-3xl transition hover:-translate-y-1 hover:border-violet-400/50 hover:shadow-2xl hover:shadow-violet-500/10 ${p.featured && i === 0 ? "md:col-span-2" : ""}`}>
            <div className="relative overflow-hidden bg-panel">
              <img src={p.image} alt={p.title} loading="lazy" className="aspect-[15/4] w-full object-cover transition duration-700 group-hover:scale-105" />
              {p.demo && (
                <span className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1 font-mono text-[11px] text-emerald-300 backdrop-blur">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> LIVE
                </span>
              )}
            </div>
            <div className="flex flex-1 flex-col p-6">
              <h3 className="text-xl font-bold text-white">{p.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">{p.desc}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span key={t} className="rounded-md bg-violet-500/10 px-2.5 py-1 font-mono text-[11px] text-violet-300">{t}</span>
                ))}
              </div>
              <div className="mt-6 flex gap-3">
                {p.demo && (
                  <a href={p.demo} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink transition hover:bg-violet-200">
                    Demo {Icon.arrow}
                  </a>
                )}
                <a href={p.repo} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-white transition hover:border-violet-400">
                  {Icon.github} Kode
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}

function Guides() {
  return (
    <Section id="panduan" label="04 — Edukasi" title={<>Panduan <span className="grad-text">gratis</span></>}>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {guides.map((g, i) => (
          <a key={g.title} href={g.url} target="_blank" rel="noreferrer" className="reveal glass group flex items-start gap-4 rounded-2xl p-5 transition hover:-translate-y-1 hover:border-violet-400/50" style={{ transitionDelay: `${i * 60}ms` }}>
            <span className="text-2xl">{g.icon}</span>
            <div className="flex-1">
              <h3 className="font-semibold text-white">{g.title}</h3>
              <p className="mt-1 text-sm text-slate-400">{g.desc}</p>
            </div>
            <span className="text-slate-500 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-violet-300">{Icon.arrow}</span>
          </a>
        ))}
      </div>
    </Section>
  );
}

function Contact() {
  const links = [
    { label: "Email", href: `mailto:${profile.email}`, icon: Icon.mail, sub: profile.email },
    { label: "GitHub", href: profile.github, icon: Icon.github, sub: `@${profile.username}` },
    { label: "Instagram", href: profile.instagram, icon: Icon.ig, sub: "Instagram" },
    { label: "Telegram", href: profile.telegram, icon: Icon.tg, sub: "Telegram" },
  ];
  return (
    <Section id="kontak" label="05 — Kontak" title={<>Mari <span className="grad-text">terhubung</span></>}>
      <div className="reveal glass relative overflow-hidden rounded-3xl p-8 sm:p-12">
        <div className="blob right-[-20%] top-[-40%] h-[300px] w-[300px] bg-violet-600" />
        <p className="relative max-w-xl text-lg text-slate-300">
          Punya ide proyek, ingin berkolaborasi, atau sekadar menyapa? Pesanmu selalu saya tunggu. 👋
        </p>
        <div className="relative mt-8 grid gap-4 sm:grid-cols-2">
          {links.map((l) => (
            <a key={l.label} href={l.href} target="_blank" rel="noreferrer" className="flex items-center gap-4 rounded-2xl border border-white/10 bg-black/30 p-4 transition hover:border-violet-400 hover:bg-violet-500/10">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-violet-500/15 text-violet-300">{l.icon}</span>
              <div className="min-w-0">
                <div className="font-semibold text-white">{l.label}</div>
                <div className="truncate text-sm text-slate-400">{l.sub}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </Section>
  );
}

export default function App() {
  useReveal();
  return (
    <div className="relative overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Guides />
        <Contact />
      </main>
      <footer className="border-t border-white/10 py-10 text-center">
        <p className="font-mono text-xs text-slate-500">
          © {new Date().getFullYear()} {profile.name} • Dibuat dengan React, TypeScript & Tailwind 💜
        </p>
      </footer>
    </div>
  );
}
