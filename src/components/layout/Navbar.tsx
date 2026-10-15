"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SCHOOL_INFO } from "@/types";

const NAV_LINKS = [
  { label: "Beranda", href: "/" },
  { label: "Profil", href: "/profil" },
  { label: "Program Keahlian", href: "/jurusan" },
  { label: "Akademik", href: "/akademik" },
  { label: "Berita", href: "/berita" },
  { label: "Pengumuman", href: "/pengumuman" },
  { label: "Galeri", href: "/galeri" },
  { label: "PPDB", href: "/ppdb" },
  { label: "Kontak", href: "/kontak" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  if (pathname?.startsWith("/admin")) return null;

  const isActive = (href: string) => {
    if (!pathname) return false;
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(15,41,66,0.06)]">
      {/* Top Bar */}
      <div className="bg-primary text-on-primary py-space-xs">
        <div className="max-w-7xl mx-auto px-space-md lg:px-margin flex flex-wrap items-center justify-between gap-y-1 font-label-sm text-label-sm">
          <div className="flex items-center gap-space-lg">
            <span className="flex items-center gap-space-xs">
              <span className="material-symbols-outlined text-[14px]">call</span>
              {SCHOOL_INFO.phone}
            </span>
            <span className="hidden sm:flex items-center gap-space-xs">
              <span className="material-symbols-outlined text-[14px]">mail</span>
              {SCHOOL_INFO.email}
            </span>
          </div>
          <div className="flex items-center gap-space-md">
            <span className="bg-tertiary-fixed-dim text-on-tertiary-fixed px-space-sm py-0.5 rounded uppercase tracking-wider font-label-sm text-label-sm">
              PPDB 2025/2026 Dibuka
            </span>
            <span className="hidden md:inline text-primary-fixed">
              Gelombang 1 Bebas Biaya Pendaftaran
            </span>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div className="h-20 max-w-7xl mx-auto px-space-md lg:px-margin flex items-center justify-between gap-space-md">
        <Link href="/" className="flex items-center gap-space-md min-w-0">
          <img
            alt="Logo SMK BPPI"
            className="h-8 w-auto object-contain"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDMq_hRm271Kyu40W39idbp0LK6jRLC1SJxFD4mGPx1ZjCIDb5_Gcd4V66TNUCNDRlNiUlhJefKsTZHAH2OoaWJRu99YAvBvlisQWMiqbyKZovuSR8PP6eeVra9zI2g0zAyBFFjYIn7JtJrnw8V6pNTqv4eYznBjU3d07-8GeYdeNhifeDNciiGa-gKCKSYGcnGMZw2Nop72dSxFUbcFZ2c1gDgvhxVXDmRWdE993H-2nbHsCfJFcxY"
          />
          <div className="flex flex-col justify-center min-w-0">
            <span className="font-title text-title text-primary tracking-tight truncate">SMK BPPI Baleendah</span>
            <span className="font-label-sm text-label-sm text-on-surface-variant truncate uppercase">Terakreditasi A • SMK Pusat Keunggulan</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden xl:flex items-center gap-space-lg">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={
                isActive(link.href)
                  ? "transition-colors text-secondary font-bold bg-surface-container-high rounded px-space-sm py-space-xs"
                  : "font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors"
              }
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-space-sm">
          <Link href="/ppdb" className="hidden sm:inline-flex items-center px-space-md py-space-xs rounded font-label-md text-label-md bg-tertiary-fixed-dim text-on-tertiary-fixed hover:bg-tertiary-fixed font-bold tracking-tight shadow-[0_1px_3px_0_rgba(15,41,66,0.08)] transition-all">
            Daftar PPDB
          </Link>

          {/* Hamburger Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="xl:hidden w-10 h-10 rounded flex items-center justify-center text-on-surface hover:bg-surface-container-high transition-colors"
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined text-[24px]">
              {mobileOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 top-0 bg-on-surface/40 z-40 xl:hidden"
            onClick={() => setMobileOpen(false)}
          />
          {/* Drawer */}
          <div className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-surface shadow-2xl z-50 xl:hidden flex flex-col animate-slide-in">
            <div className="flex items-center justify-between p-space-lg border-b border-surface-container-high">
              <span className="font-title text-title text-primary">Menu</span>
              <button
                onClick={() => setMobileOpen(false)}
                className="w-10 h-10 rounded flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-colors"
                aria-label="Close menu"
              >
                <span className="material-symbols-outlined text-[24px]">close</span>
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto p-space-md">
              <div className="flex flex-col gap-space-xs">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-space-sm px-space-md py-3 rounded transition-colors ${
                      isActive(link.href)
                        ? "bg-surface-container-high text-secondary font-bold"
                        : "text-on-surface hover:bg-surface-container-low"
                    }`}
                  >
                    <span className="font-label-md text-label-md">{link.label}</span>
                  </Link>
                ))}
              </div>
            </nav>
            <div className="p-space-md border-t border-surface-container-high">
              <Link
                href="/ppdb"
                onClick={() => setMobileOpen(false)}
                className="w-full inline-flex items-center justify-center gap-space-xs px-space-md py-3 rounded bg-tertiary-fixed-dim text-on-tertiary-fixed font-label-md text-label-md font-bold shadow transition-all"
              >
                <span className="material-symbols-outlined text-[18px]">how_to_reg</span>
                Daftar PPDB 2025/2026
              </Link>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
