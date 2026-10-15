"use client";

import Link from "next/link";
import { Code2, Cpu, LineChart, Laptop, ArrowRight } from "lucide-react";

const MAJORS = [
  {
    id: "pplg",
    title: "Pengembangan Perangkat Lunak & Gim",
    acronym: "PPLG",
    description: "Mempelajari pemrograman web, mobile, database, dan pengembangan game interaktif.",
    icon: Code2,
    color: "from-blue-500/20 to-blue-600/5",
    iconColor: "text-blue-500",
    className: "md:col-span-2 md:row-span-2",
  },
  {
    id: "tjkt",
    title: "Teknik Jaringan Komputer & Telekomunikasi",
    acronym: "TJKT",
    description: "Fokus pada infrastruktur jaringan, keamanan siber, dan administrasi server.",
    icon: Cpu,
    color: "from-emerald-500/20 to-emerald-600/5",
    iconColor: "text-emerald-500",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    id: "akl",
    title: "Akuntansi & Keuangan Lembaga",
    acronym: "AKL",
    description: "Keahlian di bidang administrasi keuangan, perpajakan, dan perbankan digital.",
    icon: LineChart,
    color: "from-amber-500/20 to-amber-600/5",
    iconColor: "text-amber-500",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    id: "acp",
    title: "Axioo Class Program",
    acronym: "ACP",
    description: "Kelas khusus industri bekerja sama langsung dengan Axioo Indonesia.",
    icon: Laptop,
    color: "from-purple-500/20 to-purple-600/5",
    iconColor: "text-purple-500",
    className: "md:col-span-2 md:row-span-1",
  },
];

export function BentoGridSection() {
  return (
    <section className="py-20 relative overflow-hidden bg-white dark:bg-[#020617]">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-up">
          <div className="section-label mx-auto">Program Keahlian</div>
          <h2 className="section-heading mb-6">Pilih Jalur Kesuksesanmu</h2>
          <p className="section-subheading mx-auto">
            Kami menyediakan program keahlian yang disesuaikan dengan kebutuhan industri masa kini. Didukung dengan fasilitas modern dan kurikulum tersertifikasi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px] md:auto-rows-[280px]">
          {MAJORS.map((major) => {
            const Icon = major.icon;
            return (
              <Link 
                href={`/jurusan/${major.id}`}
                key={major.id}
                className={`bento-card group flex flex-col justify-between ${major.className}`}
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${major.color} opacity-50 group-hover:opacity-100 transition-opacity duration-500`} />
                
                <div className="relative z-10 flex justify-between items-start">
                  <div className={`w-14 h-14 rounded-2xl bg-white dark:bg-slate-900 shadow-sm flex items-center justify-center ${major.iconColor} group-hover:scale-110 transition-transform duration-500`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <div className="w-10 h-10 rounded-full border border-gray-200 dark:border-slate-700 flex items-center justify-center bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-all duration-300">
                    <ArrowRight className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                  </div>
                </div>

                <div className="relative z-10 mt-auto">
                  <div className="text-sm font-bold tracking-wider text-slate-400 mb-2">{major.acronym}</div>
                  <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
                    {major.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base line-clamp-2">
                    {major.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
