"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SCHOOL_INFO } from "@/types";

export function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;
  return (
    <footer className="w-full bg-primary text-on-primary mt-space-xl">
      <div className="max-w-7xl mx-auto px-space-md lg:px-margin pt-space-xl pb-space-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-space-xl">
          <div className="lg:col-span-2 flex flex-col gap-space-md">
            <div className="flex items-center gap-space-sm">
              <div className="bg-surface-container-lowest p-space-xs rounded">
                <img 
                  alt={`Logo ${SCHOOL_INFO.name}`}
                  className="h-8 w-auto object-contain" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDMq_hRm271Kyu40W39idbp0LK6jRLC1SJxFD4mGPx1ZjCIDb5_Gcd4V66TNUCNDRlNiUlhJefKsTZHAH2OoaWJRu99YAvBvlisQWMiqbyKZovuSR8PP6eeVra9zI2g0zAyBFFjYIn7JtJrnw8V6pNTqv4eYznBjU3d07-8GeYdeNhifeDNciiGa-gKCKSYGcnGMZw2Nop72dSxFUbcFZ2c1gDgvhxVXDmRWdE993H-2nbHsCfJFcxY"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-title text-title text-on-primary tracking-tight">{SCHOOL_INFO.name}</span>
                <span className="font-label-sm text-label-sm text-on-primary-container">Pusat Keunggulan Vokasi Indonesia</span>
              </div>
            </div>
            <p className="font-body-sm text-body-sm text-on-primary-container leading-relaxed">
              Lembaga pendidikan kejuruan berstandar industri dengan sertifikasi keahlian nasional, kurikulum link-and-match, dan kemitraan strategis dunia usaha/dunia industri.
            </p>
            <div className="flex flex-col gap-space-xs font-body-sm text-body-sm text-on-primary-container">
              <div className="flex items-start gap-space-xs">
                <span className="material-symbols-outlined text-[18px] text-secondary-fixed shrink-0 mt-0.5">location_on</span>
                <span>{SCHOOL_INFO.address}</span>
              </div>
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-[18px] text-secondary-fixed shrink-0">call</span>
                <span>{SCHOOL_INFO.phone} • {SCHOOL_INFO.email}</span>
              </div>
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-[18px] text-secondary-fixed shrink-0">verified</span>
                <span>Akreditasi 'A' BAN-SM • SK Kemendikbudristek SMK-PK</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-space-md">
            <span className="font-title text-title text-on-primary">Program Keahlian</span>
            <ul className="flex flex-col gap-space-xs font-body-sm text-body-sm text-on-primary-container">
              <li><Link href="/jurusan/pplg" className="hover:text-secondary-fixed transition-colors">Pengembangan Perangkat Lunak (PPLG)</Link></li>
              <li><Link href="/jurusan/tjkt" className="hover:text-secondary-fixed transition-colors">Teknik Jaringan Komputer (TJKT)</Link></li>
              <li><Link href="/jurusan/akl" className="hover:text-secondary-fixed transition-colors">Akuntansi &amp; Keuangan Lembaga (AKL)</Link></li>
              <li><Link href="/jurusan/acp" className="hover:text-secondary-fixed transition-colors">Axioo Class Program (ACP)</Link></li>
            </ul>
          </div>
          <div className="flex flex-col gap-space-md">
            <span className="font-title text-title text-on-primary">Akses Cepat</span>
            <ul className="flex flex-col gap-space-xs font-body-sm text-body-sm text-on-primary-container">
              <li><Link href="/ppdb" className="hover:text-secondary-fixed transition-colors">Informasi PPDB Online</Link></li>
              <li><Link href="/akademik" className="hover:text-secondary-fixed transition-colors">Kalender &amp; Kurikulum Akademik</Link></li>
              <li><Link href="/pengumuman" className="hover:text-secondary-fixed transition-colors">Pengumuman Resmi</Link></li>
              <li><Link href="/profil#fasilitas" className="hover:text-secondary-fixed transition-colors">Laboratorium &amp; Workshop</Link></li>
              <li><Link href="/galeri" className="hover:text-secondary-fixed transition-colors">Galeri Prestasi Siswa</Link></li>
            </ul>
          </div>
          <div className="flex flex-col gap-space-md">
            <span className="font-title text-title text-on-primary">Koneksi Digital</span>
            <p className="font-body-sm text-body-sm text-on-primary-container">
              Ikuti media resmi untuk update kegiatan teknis, lomba kompetensi siswa, dan rekrutmen kerja.
            </p>
            <div className="flex items-center gap-space-sm">
              <a href="#" aria-label="Instagram" className="w-9 h-9 rounded bg-primary-container flex items-center justify-center text-on-primary hover:bg-secondary transition-colors">
                <span className="material-symbols-outlined text-[20px]">photo_camera</span>
              </a>
              <a href="#" aria-label="YouTube" className="w-9 h-9 rounded bg-primary-container flex items-center justify-center text-on-primary hover:bg-secondary transition-colors">
                <span className="material-symbols-outlined text-[20px]">smart_display</span>
              </a>
              <a href="#" aria-label="Facebook" className="w-9 h-9 rounded bg-primary-container flex items-center justify-center text-on-primary hover:bg-secondary transition-colors">
                <span className="material-symbols-outlined text-[20px]">public</span>
              </a>
              <a href="#" aria-label="TikTok" className="w-9 h-9 rounded bg-primary-container flex items-center justify-center text-on-primary hover:bg-secondary transition-colors">
                <span className="material-symbols-outlined text-[20px]">videocam</span>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-space-xl pt-space-lg flex flex-col sm:flex-row items-center justify-between gap-space-md font-label-sm text-label-sm text-on-primary-container">
          <p>© {new Date().getFullYear()} {SCHOOL_INFO.name}. Seluruh hak cipta dilindungi undang-undang.</p>
          <div className="flex items-center gap-space-lg">
            <span>NPSN: {SCHOOL_INFO.npsn}</span>
            <span>Kab. Bandung, Jawa Barat</span>
            <Link href="/admin" className="text-on-primary-container hover:text-white transition-colors underline">
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
