import { useEffect, useRef, useState, type CSSProperties, type MouseEvent, type ReactNode } from "react";
import { about, guides, otherProjects, profile, projects, stack } from "./data";

/* ---------- util ---------- */
const prefersReduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const canHover = () => window.matchMedia("(hover: hover) and (pointer: fine)").matches;

/* ---------- hooks ---------- */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal, .rule");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("show");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.15 }
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

function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const p = h > 0 ? window.scrollY / h : 0;
      if (ref.current) ref.current.style.transform = `scaleX(${p})`;
    };
    const queue = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", queue);
    return () => {
      window.removeEventListener("scroll", queue);
      window.removeEventListener("resize", queue);
      cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <div
      ref={ref}
      aria-hidden
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-violet-500 via-fuchsia-400 to-cyan-400"
      style={{ transform: "scaleX(0)" }}
    />
  );
}

function Counter({ to, label }: { to: number; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [n, setN] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        if (prefersReduced()) return setN(to);
        const start = performance.now();
        const tick = (t: number) => {
          const k = Math.min(1, (t - start) / 1400);
          setN(Math.round(to * (1 - Math.pow(1 - k, 3))));
          if (k < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [to]);
  return (
    <div ref={ref}>
      <div className="text-4xl font-extrabold tabular-nums text-white sm:text-5xl">{n}</div>
      <div className="mt-2 font-mono text-[11px] uppercase tracking-widest text-slate-500">{label}</div>
    </div>
  );
}

/* ---------- ikon ---------- */
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

/* ---------- komponen kecil ---------- */
const NAV = [
  ["Tentang", "#tentang"],
  ["Skill", "#skill"],
  ["Proyek", "#proyek"],
  ["Panduan", "#panduan"],
  ["Kontak", "#kontak"],
];

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 40);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "border-b border-white/10 bg-ink/70 backdrop-blur-xl" : ""}`}>
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          <a href="#top" className="flex items-center gap-2 text-sm font-extrabold tracking-[0.25em] text-white">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-violet-500 to-cyan-400 text-xs text-ink">A</span>
            AXRYZURE
          </a>
          <div className="hidden items-center gap-9 md:flex">
            {NAV.map(([l, h]) => (
              <a key={h} href={h} className="text-xs uppercase tracking-[0.2em] text-slate-400 transition hover:text-white">{l}</a>
            ))}
          </div>
          <button onClick={() => setOpen(!open)} className="text-white md:hidden" aria-label="Menu">
            {open ? Icon.close : Icon.menu}
          </button>
        </nav>
      </header>
      {/* menu layar penuh untuk HP */}
      <div className={`fixed inset-0 z-40 flex flex-col justify-center gap-6 bg-ink/95 px-8 backdrop-blur-2xl transition duration-500 md:hidden ${open ? "visible opacity-100" : "invisible opacity-0"}`}>
        {NAV.map(([l, h], i) => (
          <a
            key={h}
            href={h}
            onClick={() => setOpen(false)}
            className="text-4xl font-extrabold text-white transition"
            style={{ transitionDelay: `${i * 60}ms`, transform: open ? "none" : "translateY(20px)" }}
          >
            {l}
          </a>
        ))}
      </div>
    </>
  );
}

function Hero() {
  const typed = useTyping(profile.typing);
  const orbs = useRef<HTMLDivElement>(null);

  const onMove = (e: MouseEvent<HTMLElement>) => {
    if (!canHover() || prefersReduced() || !orbs.current) return;
    const x = e.clientX / window.innerWidth - 0.5;
    const y = e.clientY / window.innerHeight - 0.5;
    orbs.current.style.setProperty("--px", `${x * 60}px`);
    orbs.current.style.setProperty("--py", `${y * 60}px`);
  };

  return (
    <section id="top" onPointerMove={onMove} className="relative flex min-h-[100svh] items-end overflow-hidden pb-16 pt-28 sm:items-center sm:pb-0">
      <div ref={orbs} className="pointer-events-none absolute inset-0">
        <div className="orb left-[-15%] top-[5%] h-[480px] w-[480px] bg-violet-600" />
        <div className="orb bottom-[-10%] right-[-15%] h-[420px] w-[420px] bg-cyan-500" style={{ animationDelay: "-7s" }} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ink/20 to-ink" />

      <div className="relative mx-auto w-full max-w-6xl px-5">
        <div className="reveal mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 font-mono text-xs text-slate-300">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          Terbuka untuk kolaborasi
        </div>
        <p className="reveal font-mono text-sm uppercase tracking-[0.3em] text-violet-300">Halo, saya</p>
        <h1 className="reveal mt-3 text-[15vw] font-black leading-[0.9] tracking-tight sm:text-[10rem]">
          <span className="grad-text">{profile.name}</span>
        </h1>
        <p className="reveal mt-6 h-8 font-mono text-lg text-violet-300 sm:text-2xl">
          {typed}<span className="caret" />
        </p>
        <p className="reveal mt-6 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg">{profile.tagline}</p>
        <div className="reveal mt-10 flex flex-wrap gap-4">
          <a href="#proyek" className="rounded-full bg-white px-7 py-3 font-semibold text-ink transition hover:scale-105 hover:bg-violet-200">
            Lihat Proyek
          </a>
          <a href="#kontak" className="rounded-full border border-white/20 px-7 py-3 font-semibold text-white transition hover:border-violet-400 hover:bg-white/5">
            Hubungi Saya
          </a>
        </div>
        <div className="reveal mt-16 grid max-w-lg grid-cols-3 gap-6 border-t border-white/10 pt-8">
          <Counter to={projects.length} label="Proyek" />
          <Counter to={projects.filter((p) => p.demo).length} label="Website live" />
          <Counter to={guides.length} label="Panduan" />
        </div>
      </div>
    </section>
  );
}

function Ticker() {
  return (
    <div className="ticker relative overflow-hidden border-y border-white/5 py-6">
      <div className="ticker-track flex w-max">
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0 gap-12 pr-12" aria-hidden={k === 1}>
            {stack.map((s) => (
              <span key={`${k}-${s.name}`} className="flex items-center gap-4 whitespace-nowrap font-mono text-sm uppercase tracking-[0.25em] text-slate-500">
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: s.color, boxShadow: `0 0 10px ${s.color}` }} />
                {s.name}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function Section({ id, num, label, title, children }: { id: string; num: string; label: string; title: ReactNode; children: ReactNode }) {
  return (
    <section id={id} className="relative mx-auto max-w-6xl scroll-mt-20 px-5 py-24 sm:py-36">
      <div className="reveal mb-14 flex items-end justify-between gap-6">
        <div>
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-violet-400">{num} — {label}</p>
          <h2 className="text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-6xl">{title}</h2>
        </div>
      </div>
      <div className="rule mb-14 h-px w-full bg-gradient-to-r from-violet-400/60 via-white/10 to-transparent" />
      {children}
    </section>
  );
}

function About() {
  return (
    <Section id="tentang" num="01" label="Tentang" title={<>Apa yang saya <span className="grad-text">kerjakan</span></>}>
      <div className="grid gap-x-16 gap-y-2 md:grid-cols-2">
        {about.map((a, i) => (
          <div key={a.title} className="reveal group border-t border-white/10 py-8" style={{ transitionDelay: `${i * 90}ms` }}>
            <div className="flex items-baseline gap-5">
              <span className="font-mono text-sm text-violet-400">0{i + 1}</span>
              <h3 className="text-2xl font-bold text-white transition group-hover:text-violet-300">{a.title}</h3>
            </div>
            <p className="mt-3 pl-10 text-sm leading-relaxed text-slate-400">{a.text}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Skills() {
  return (
    <Section id="skill" num="02" label="Tech Stack" title={<>Teknologi yang saya <span className="grad-text">pakai</span></>}>
      <div className="flex flex-wrap gap-3">
        {stack.map((s, i) => (
          <span
            key={s.name}
            className="reveal flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-5 py-2.5 text-sm font-medium text-slate-200 transition hover:-translate-y-0.5 hover:border-white/30"
            style={{ transitionDelay: `${i * 35}ms` }}
          >
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
    <Section id="proyek" num="03" label="Proyek" title={<>Karya <span className="grad-text">pilihan</span></>}>
      <div className="flex flex-col gap-8 pb-10">
        {projects.map((p, i) => (
          <article
            key={p.title}
            className="reveal stack-card overflow-hidden rounded-3xl border border-white/10 bg-[#0d0b16] shadow-2xl shadow-black/60"
            style={{ ["--i" as string]: i } as CSSProperties}
          >
            <div className="relative overflow-hidden">
              <img src={p.image} alt={p.title} loading="lazy" className="aspect-[15/6] w-full object-cover sm:aspect-[15/4]" />
              <span className="absolute left-4 top-4 rounded-full bg-black/60 px-3 py-1 font-mono text-[11px] text-slate-300 backdrop-blur">
                {String(i + 1).padStart(2, "0")}
              </span>
              {p.demo && (
                <span className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1 font-mono text-[11px] text-emerald-300 backdrop-blur">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> LIVE
                </span>
              )}
            </div>
            <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-end sm:justify-between sm:p-10">
              <div className="max-w-xl">
                <h3 className="text-2xl font-black text-white sm:text-3xl">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-400 sm:text-base">{p.desc}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span key={t} className="rounded-md bg-violet-500/10 px-2.5 py-1 font-mono text-[11px] text-violet-300">{t}</span>
                  ))}
                </div>
              </div>
              <div className="flex shrink-0 gap-3">
                {p.demo && (
                  <a href={p.demo} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-ink transition hover:bg-violet-200">
                    Demo {Icon.arrow}
                  </a>
                )}
                <a href={p.repo} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-violet-400">
                  {Icon.github} Kode
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
      <div className="reveal mt-6 border-t border-white/10 pt-8">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-slate-500">Proyek lainnya</p>
        <div className="flex flex-wrap gap-3">
          {otherProjects.map((p) => (
            <a key={p.title} href={p.demo} target="_blank" rel="noreferrer" className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-300 transition hover:border-violet-400 hover:text-white">
              {p.title} ↗
            </a>
          ))}
        </div>
      </div>
    </Section>
  );
}

function Guides() {
  return (
    <Section id="panduan" num="04" label="Edukasi" title={<>Panduan <span className="grad-text">gratis</span></>}>
      <div className="grid gap-4 md:grid-cols-2">
        {guides.map((g, i) => (
          <a
            key={g.title}
            href={g.url}
            target="_blank"
            rel="noreferrer"
            className="reveal group flex items-start gap-5 rounded-3xl border border-white/10 bg-white/[0.02] p-7 transition hover:border-violet-400/50 hover:bg-violet-500/5"
            style={{ transitionDelay: `${i * 100}ms` }}
          >
            <span className="text-3xl">{g.icon}</span>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-white">{g.title}</h3>
              <p className="mt-2 text-sm text-slate-400">{g.desc}</p>
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
    { label: "GitHub", href: profile.github, icon: Icon.github, sub: `@${profile.username}` },
    { label: "Instagram", href: profile.instagram, icon: Icon.ig, sub: "@superryinz" },
    { label: "Telegram", href: profile.telegram, icon: Icon.tg, sub: "@hasanmuslihat" },
  ];
  return (
    <Section id="kontak" num="05" label="Kontak" title={<>Mari <span className="grad-text">terhubung</span></>}>
      <a href={`mailto:${profile.email}`} className="reveal group block">
        <p className="text-sm text-slate-500">Email</p>
        <p className="mt-2 break-all text-2xl font-black text-white transition group-hover:text-violet-300 sm:text-5xl">{profile.email}</p>
      </a>
      <div className="reveal mt-14 grid gap-4 sm:grid-cols-3">
        {links.map((l) => (
          <a
            key={l.label}
            href={l.href}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition hover:border-violet-400 hover:bg-violet-500/10"
          >
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-violet-500/15 text-violet-300">{l.icon}</span>
            <div className="min-w-0">
              <div className="font-semibold text-white">{l.label}</div>
              <div className="truncate text-sm text-slate-400">{l.sub}</div>
            </div>
          </a>
        ))}
      </div>
    </Section>
  );
}

export default function App() {
  useReveal();
  return (
    <div className="grain relative">
      <ScrollProgress />
      <Header />
      <main>
        <Hero />
        <Ticker />
        <About />
        <Skills />
        <Projects />
        <Guides />
        <Contact />
      </main>
      <footer className="border-t border-white/10 py-12 text-center">
        <p className="font-mono text-xs text-slate-500">
          © {new Date().getFullYear()} {profile.name} • Dibuat dengan React, TypeScript & Tailwind 💜
        </p>
      </footer>
    </div>
  );
}
