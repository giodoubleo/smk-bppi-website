"use client";

import { Monitor, Wifi, Fingerprint, Banknote, BookOpen, Trophy } from "lucide-react";

const FACILITIES = [
  {
    name: "Laboratorium Komputer",
    description: "Lab standar industri dengan PC spesifikasi tinggi untuk kelas PPLG dan TJKT.",
    icon: Monitor,
    bg: "bg-emerald-500/10",
    color: "text-emerald-500",
  },
  {
    name: "Akses WiFi Cepat",
    description: "Konektivitas internet berkecepatan tinggi di seluruh area sekolah.",
    icon: Wifi,
    bg: "bg-blue-500/10",
    color: "text-blue-500",
  },
  {
    name: "Absensi Fingerprint",
    description: "Sistem presensi digital terintegrasi untuk siswa dan guru.",
    icon: Fingerprint,
    bg: "bg-amber-500/10",
    color: "text-amber-500",
  },
  {
    name: "Bank Mini AKL",
    description: "Fasilitas praktik perbankan dan administrasi keuangan nyata.",
    icon: Banknote,
    bg: "bg-rose-500/10",
    color: "text-rose-500",
  },
  {
    name: "Perpustakaan Digital",
    description: "Koleksi e-book lengkap dan ruang baca yang nyaman.",
    icon: BookOpen,
    bg: "bg-purple-500/10",
    color: "text-purple-500",
  },
  {
    name: "Fasilitas Ekstrakurikuler",
    description: "Lapangan olahraga luas dan studio seni untuk pengembangan bakat.",
    icon: Trophy,
    bg: "bg-orange-500/10",
    color: "text-orange-500",
  },
];

export function FacilitiesSection() {
  return (
    <section className="py-24 bg-white dark:bg-[#020617]">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-up">
          <div className="section-label mx-auto">Fasilitas Kampus</div>
          <h2 className="section-heading mb-6">Lingkungan Belajar Ideal</h2>
          <p className="section-subheading mx-auto">
            Kami menyediakan fasilitas modern standar industri untuk memastikan pengalaman belajar yang optimal dan nyaman bagi seluruh siswa.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FACILITIES.map((facility, index) => {
            const Icon = facility.icon;
            return (
              <div 
                key={index}
                className="card-modern p-6 group hover:-translate-y-1"
              >
                <div className={`w-12 h-12 rounded-2xl ${facility.bg} ${facility.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  {facility.name}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  {facility.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
