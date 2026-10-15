import { HeroVisualShowcase } from "@/components/sections/HeroVisualShowcase";
import { Hero3DBackground } from "@/components/3d/Hero3DBackground";

export function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden py-space-xl lg:py-20 min-h-[640px]">
      {/* Full Interactive Three.js 3D Background */}
      <Hero3DBackground />

      <div className="max-w-7xl mx-auto px-space-md lg:px-margin relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center">
          {/* Left Hero Copy */}
          <div className="lg:col-span-6 flex flex-col items-start gap-space-md">
            <div className="flex flex-wrap items-center gap-space-xs">
              <span className="inline-flex items-center gap-1.5 px-space-sm py-1 rounded bg-tertiary-fixed-dim/30 text-on-tertiary-container font-label-sm text-label-sm border border-tertiary-fixed/40 backdrop-blur-sm">
                <span className="material-symbols-outlined text-[15px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                Akreditasi A BAN-SM
              </span>
              <span className="inline-flex items-center gap-1.5 px-space-sm py-1 rounded bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm border border-secondary/20 backdrop-blur-sm">
                <span className="material-symbols-outlined text-[15px]">school</span>
                SMK Pusat Keunggulan (PK)
              </span>
              <span className="inline-flex items-center gap-1.5 px-space-sm py-1 rounded bg-surface-container-highest/90 text-on-surface-variant font-label-sm text-label-sm border border-outline-variant/30 backdrop-blur-sm">
                <span className="material-symbols-outlined text-[15px]">handshake</span>
                Mitra 75+ Industri
              </span>
            </div>
            
            <h1 className="font-headline-lg text-headline-lg lg:font-display lg:text-display text-primary leading-tight tracking-tight">
              Membentuk Generasi <span className="text-secondary underline decoration-secondary-container decoration-4 underline-offset-4">Terampil</span>, Unggul, dan Siap Kerja.
            </h1>
            
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl">
              Sekolah Menengah Kejuruan Pusat Keunggulan di Kabupaten Bandung dengan kurikulum berstandar industri nasional, fasilitas lab mutakhir, dan tingkat keterserapan kerja mencapai 94%+.
            </p>
            
            <div className="flex flex-wrap items-center gap-space-md pt-space-xs w-full sm:w-auto">
              <a className="w-full sm:w-auto inline-flex items-center justify-center gap-space-xs px-6 py-3.5 rounded bg-tertiary-fixed-dim hover:bg-tertiary-fixed text-on-tertiary-fixed font-label-md text-label-md shadow-md hover:shadow-lg transition-all" href="#ppdb-section">
                <span className="material-symbols-outlined text-[18px]">how_to_reg</span>
                Daftar PPDB 2025/2026
              </a>
              <a className="w-full sm:w-auto inline-flex items-center justify-center gap-space-xs px-6 py-3.5 rounded bg-surface-container-lowest text-secondary hover:bg-surface-container-high font-label-md text-label-md shadow-sm transition-all border border-surface-container-high/60 backdrop-blur-sm" href="#jurusan-section">
                <span className="material-symbols-outlined text-[18px]">explore</span>
                Jelajahi Profil &amp; Jurusan
              </a>
            </div>
            
            <div className="grid grid-cols-3 gap-space-md pt-space-md w-full bg-surface-container-lowest/85 backdrop-blur-md p-space-md rounded-2xl shadow-sm border border-surface-container-high/60">
              <div className="flex flex-col">
                <span className="font-headline-md text-headline-md text-primary font-bold">94%</span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">Keterserapan Kerja</span>
              </div>
              <div className="flex flex-col border-l border-surface-container-highest pl-space-md">
                <span className="font-headline-md text-headline-md text-secondary font-bold">1,800+</span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">Siswa Aktif</span>
              </div>
              <div className="flex flex-col border-l border-surface-container-highest pl-space-md">
                <span className="font-headline-md text-headline-md text-primary font-bold">4 Jurusan</span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">Pusat Keunggulan</span>
              </div>
            </div>
          </div>
          
          {/* Right Hero Visual Showcase (Interactive 3D / Photo) */}
          <HeroVisualShowcase />
        </div>
      </div>
    </section>
  );
}
