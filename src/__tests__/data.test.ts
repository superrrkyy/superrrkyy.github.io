/**
 * Test integritas data portofolio.
 *
 * Tujuan: setiap kali kamu menambah/mengubah proyek di src/data.ts,
 * CI akan menangkap tautan rusak, tag kosong, atau slug yang tidak cocok
 * sebelum perubahan naik ke situs live.
 */
import { describe, expect, it } from "vitest";
import { about, guides, otherProjects, profile, projects, stack } from "../data";

const isHttp = (v: string) => /^https:\/\/\S+$/.test(v);

describe("profile", () => {
  it("memiliki identitas wajib", () => {
    expect(profile.name.trim().length).toBeGreaterThan(1);
    expect(profile.username).toBe("superrrkyy");
    expect(profile.role).toContain("Developer");
    expect(profile.location.length).toBeGreaterThan(1);
    expect(profile.tagline.length).toBeGreaterThan(20);
  });

  it("tautan kontak berformat benar", () => {
    expect(profile.github).toBe("https://github.com/superrrkyy");
    expect(profile.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    expect(isHttp(profile.instagram)).toBe(true);
    expect(isHttp(profile.telegram)).toBe(true);
  });

  it("kalimat animasi tidak kosong", () => {
    expect(profile.typing.length).toBeGreaterThanOrEqual(3);
    for (const t of profile.typing) expect(t.trim().length).toBeGreaterThan(3);
  });
});

describe("about & stack", () => {
  it("setiap poin 'about' punya judul & teks", () => {
    expect(about.length).toBeGreaterThanOrEqual(3);
    for (const a of about) {
      expect(a.title.trim()).not.toBe("");
      expect(a.text.trim().length).toBeGreaterThan(10);
    }
  });

  it("setiap teknologi punya warna hex yang valid", () => {
    expect(stack.length).toBeGreaterThanOrEqual(6);
    for (const s of stack) {
      expect(s.name.trim()).not.toBe("");
      expect(s.color).toMatch(/^#[0-9a-fA-F]{6}$/);
    }
  });
});

describe("projects", () => {
  it("memuat proyek utama", () => {
    expect(projects.length).toBeGreaterThanOrEqual(6);
  });

  it("judul proyek unik", () => {
    const titles = projects.map(p => p.title.toLowerCase());
    expect(new Set(titles).size).toBe(titles.length);
  });

  it("setiap proyek punya data lengkap & tautan valid", () => {
    for (const p of projects) {
      expect(p.title.trim(), "judul kosong").not.toBe("");
      expect(p.desc.trim().length, `${p.title}: deskripsi terlalu pendek`).toBeGreaterThan(20);
      expect(isHttp(p.image), `${p.title}: gambar bukan https`).toBe(true);
      expect(p.tags.length, `${p.title}: tag kosong`).toBeGreaterThanOrEqual(2);
      expect(p.repo, `${p.title}: repo salah`).toMatch(
        /^https:\/\/github\.com\/superrrkyy\/[a-z0-9._-]+$/i,
      );
    }
  });

  it("tautan demo cocok dengan nama repo (mencegah salah slug)", () => {
    for (const p of projects) {
      if (!p.demo) continue;
      const slug = p.repo.split("/").pop();
      expect(slug, `${p.title}: repo tidak valid`).toBeTruthy();
      expect(p.demo, `${p.title}: demo ≠ repo`).toBe(`https://superrrkyy.github.io/${slug}/`);
    }
  });

  it("setiap repo web dengan demo tercantum di data.ts (kartu utama atau 'proyek lainnya')", () => {
    const harusAda = [
      "nadaku",
      "cryptoku",
      "cuacaku",
      "animeku",
      "axryzure-store",
      "axybot",
      "flask-api-belajar",
      "axryzure-hystori-cosmic",
      "web-memperingati-maulid-nabi",
    ];
    const repos = [...projects, ...otherProjects].map(p => p.repo.split("/").pop());
    for (const r of harusAda) {
      expect(repos, `proyek '${r}' belum ada di data.ts`).toContain(r);
    }
  });
});

describe("otherProjects & guides", () => {
  it("'proyek lainnya' punya pasangan repo & demo yang cocok", () => {
    expect(otherProjects.length).toBeGreaterThanOrEqual(2);
    for (const p of otherProjects) {
      const slug = p.repo.split("/").pop();
      expect(p.title.trim()).not.toBe("");
      expect(p.repo).toMatch(/^https:\/\/github\.com\/superrrkyy\//);
      expect(p.demo).toBe(`https://superrrkyy.github.io/${slug}/`);
    }
  });

  it("panduan punya ikon, judul, deskripsi, dan tautan valid", () => {
    expect(guides.length).toBeGreaterThanOrEqual(2);
    for (const g of guides) {
      expect(g.icon.trim()).not.toBe("");
      expect(g.title.trim().length).toBeGreaterThan(3);
      expect(g.desc.trim().length).toBeGreaterThan(10);
      expect(g.url).toMatch(/^https:\/\/github\.com\/superrrkyy\//);
    }
  });
});
