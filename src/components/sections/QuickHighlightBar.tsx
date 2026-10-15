"use client";

import {
  BookOpen,
  Award,
  GraduationCap,
  Globe,
  ShieldCheck,
} from "lucide-react";

const highlights = [
  {
    icon: BookOpen,
    title: "Kurikulum Industri",
    subtitle: "Standar kompetensi nasional & DUDI",
  },
  {
    icon: Award,
    title: "Guru Berpengalaman",
    subtitle: "Praktisi industri bersertifikat",
  },
  {
    icon: GraduationCap,
    title: "Sertifikasi Kompetensi",
    subtitle: "Lulus siap kerja bersertifikat",
  },
  {
    icon: Globe,
    title: "Magang Nasional",
    subtitle: "Pengalaman kerja di industri",
  },
  {
    icon: ShieldCheck,
    title: "Lingkungan Aman",
    subtitle: "Fasilitas lengkap & nyaman",
  },
];

export function QuickHighlightBar() {
  return (
    <section className="relative z-30 -mt-1">
      <div className="bg-school-dark">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {highlights.map((item, index) => (
              <div
                key={index}
                className={`flex flex-col items-center text-center py-6 px-4 border-b lg:border-b-0 ${
                  index < highlights.length - 1
                    ? "lg:border-r lg:border-white/10"
                    : ""
                } ${
                  index < 4
                    ? "border-white/10"
                    : "border-transparent"
                }`}
              >
                <div className="w-14 h-14 rounded-full border-2 border-gold-400/50 flex items-center justify-center mb-3">
                  <item.icon className="w-6 h-6 text-gold-400" />
                </div>
                <h3 className="font-heading font-bold text-white text-sm mb-1">
                  {item.title}
                </h3>
                <p className="text-white/60 text-xs leading-relaxed">
                  {item.subtitle}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
