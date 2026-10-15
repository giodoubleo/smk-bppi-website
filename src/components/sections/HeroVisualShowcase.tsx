"use client";

import { useState } from "react";
import { HeroTechShowcase3D } from "@/components/3d/HeroTechShowcase3D";

export function HeroVisualShowcase() {
  const [viewMode, setViewMode] = useState<"3d" | "photo">("3d");

  // Reusable switcher controls
  const viewSwitcher = (
    <div className="flex items-center bg-slate-900/90 backdrop-blur-md p-1 rounded-xl shadow-lg border border-slate-800">
      <button
        onClick={() => setViewMode("3d")}
        className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
          viewMode === "3d"
            ? "bg-secondary text-white shadow-sm"
            : "text-slate-400 hover:text-white"
        }`}
      >
        <span className="material-symbols-outlined text-[16px]">view_in_ar</span>
        <span className="hidden xs:inline">3D Tech</span>
      </button>
      <button
        onClick={() => setViewMode("photo")}
        className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
          viewMode === "photo"
            ? "bg-secondary text-white shadow-sm"
            : "text-slate-400 hover:text-white"
        }`}
      >
        <span className="material-symbols-outlined text-[16px]">photo_camera</span>
        <span className="hidden xs:inline">Foto Lab</span>
      </button>
    </div>
  );

  return (
    <div className="lg:col-span-6 relative">
      <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-slate-950 border border-slate-800/80 min-h-[470px] lg:h-[510px]">
        {/* View 1: 3D Tech Station Interactive Canvas (Unified header with view switcher) */}
        {viewMode === "3d" ? (
          <HeroTechShowcase3D headerRight={viewSwitcher} />
        ) : (
          /* View 2: High-res Campus Photo */
          <div className="relative w-full h-[470px] lg:h-[510px] animate-fadeIn">
            {/* View Switcher for Photo Mode */}
            <div className="absolute top-4 right-4 z-20">
              {viewSwitcher}
            </div>

            <img
              alt="Laboratorium komputer modern SMK BPPI Baleendah"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCg_nT19Kn4DYOzs0YQcGEtDuylUK7nanVp97tkFscpSWPs5Iv23zGI1s6_0mk1zB8b5g2UFS9I_qd_vMhQ4lIf3fch-hQYnTqAo8KiceTcq_nV1HZqv5mJ-btQr2nEhT4lco_OryBSua6Y-_ztPJxvXwAMujG0rjFoCEcaXtJyoXLvKg83jOaT96rXOePRGn_dTldUtyRMVPSb6dUXLVw2hex11rAEfPZIIcaPFWVSPzvivwrhahoR"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/30 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-space-lg text-on-primary flex items-center justify-between">
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary-fixed">
                  Teaching Factory BPPI
                </span>
                <span className="font-title text-title">
                  Laboratorium Rekayasa &amp; Cloud Computing
                </span>
              </div>
              <span className="material-symbols-outlined text-[32px] text-tertiary-fixed-dim">
                terminal
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Certification Strip below 3D container (Zero overlap, clean layout) */}
      <div className="mt-3.5 flex items-center justify-between gap-3 px-4 py-3 rounded-2xl bg-surface-container-lowest/90 border border-surface-container-high/60 shadow-sm backdrop-blur-sm">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[22px]">
              workspace_premium
            </span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-bold text-primary truncate">
              Sertifikasi BNSP &amp; Standar Industri
            </span>
            <span className="text-[11px] text-on-surface-variant truncate">
              Lisensi Resmi MikroTik, Cisco Academy, Axioo ACP &amp; LSP-P1
            </span>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container text-[11px] font-semibold text-primary shrink-0 border border-outline-variant/30">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>Terverifikasi</span>
        </div>
      </div>
    </div>
  );
}
