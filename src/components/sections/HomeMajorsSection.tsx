import Link from "next/link";

interface MajorItem {
  code: string;
  name: string;
  icon: string;
  description: string;
  tags: string[];
  partners: string;
  prospect: string;
  href: string;
}

const majors: MajorItem[] = [
  {
    code: "PPLG",
    name: "Pengembangan Perangkat Lunak & Gim",
    icon: "code",
    description: "Spesialisasi rekayasa software modern, web responsive, arsitektur cloud, dan pengembangan aplikasi mobile Android/iOS.",
    tags: ["Flutter / React", "Web Fullstack", "UI/UX Figma"],
    partners: "Telkom Indonesia, Dicoding, Agate",
    prospect: "Full-Stack Engineer, Software Dev",
    href: "/jurusan/pplg",
  },
  {
    code: "TJKT",
    name: "Teknik Jaringan Komputer & Telekomunikasi",
    icon: "router",
    description: "Infrastruktur jaringan enterprise, cyber security fundamentals, routing switching, fiber optic, dan administrasi server Linux.",
    tags: ["MikroTik MTCNA", "Cisco CCNA", "Fiber Optic"],
    partners: "PT Len Industri, Icon+, Biznet",
    prospect: "Network & Cloud Admin, Cyber Sec",
    href: "/jurusan/tjkt",
  },
  {
    code: "AKL",
    name: "Akuntansi & Keuangan Lembaga",
    icon: "calculate",
    description: "Penguasaan akuntansi digital, perpajakan, audit, dan operasional perbankan dengan sertifikasi software akuntansi industri terkemuka.",
    tags: ["MYOB / Accurate", "Bank Mini", "Pajak & Auditing"],
    partners: "Bank BJB, Bank Syariah, KAP Mitra",
    prospect: "Financial Analyst, Auditor, Banker",
    href: "/jurusan/akl",
  },
  {
    code: "AXIOO (ACP)",
    name: "Axioo Class Program",
    icon: "laptop_mac",
    description: "Kelas industri unggulan kolaborasi PT Tera Data Indonusa (Axioo). Fokus perakitan laptop/gadget, troubleshooting, dan sertifikasi teknisi industri.",
    tags: ["Hardware Assembly", "IoT & Smart Device", "Axioo Certified"],
    partners: "PT Tera Data Indonusa (Axioo), Intel Edu",
    prospect: "Hardware Specialist, IT Support Lead",
    href: "/jurusan/acp",
  },
];

export function HomeMajorsSection() {
  return (
    <section className="w-full py-space-xl lg:py-20 bg-surface-container-low" id="jurusan-section">
      <div className="max-w-7xl mx-auto px-space-md lg:px-margin">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-xl">
          <div className="flex flex-col gap-space-xs max-w-2xl">
            <div className="flex items-center gap-space-xs">
              <span className="w-8 h-1 bg-secondary rounded-full"></span>
              <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-bold">Fokus Kompetensi Keahlian</span>
            </div>
            <h2 className="font-headline-lg text-headline-lg text-primary tracking-tight">4 Program Keahlian Berstandar Industri Masa Depan</h2>
            <p className="font-body-md text-body-md text-on-surface-variant">Setiap jurusan didukung fasilitas teaching factory, sertifikasi kompetensi nasional BNSP, serta kurikulum yang diselaraskan langsung bersama korporasi mitra.</p>
          </div>
          <div className="flex items-center gap-space-xs">
            <Link className="inline-flex items-center gap-space-xs px-space-md py-space-sm rounded bg-surface-container-lowest text-secondary font-label-md text-label-md shadow-sm hover:bg-surface-container-high transition-colors" href="/jurusan">
              Lihat Semua Jurusan
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </Link>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-lg">
          {majors.map((major) => (
            <Link
              key={major.code}
              href={major.href}
              className="group bg-surface-container-lowest rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden"
            >
              <div className="p-space-lg flex flex-col gap-space-md">
                <div className="flex items-center justify-between">
                  <span className="px-space-sm py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm uppercase">{major.code}</span>
                  <div className="w-10 h-10 rounded bg-secondary/10 text-secondary flex items-center justify-center">
                    <span className="material-symbols-outlined text-[22px]">{major.icon}</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-title text-title text-primary group-hover:text-secondary transition-colors">{major.name}</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">{major.description}</p>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {major.tags.map((tag) => (
                    <span key={tag} className="font-label-sm text-label-sm bg-surface-container px-2 py-0.5 rounded text-on-surface">{tag}</span>
                  ))}
                </div>
                <div className="pt-space-xs border-t border-surface-container-high">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant block mb-1">Mitra Industri Utama:</span>
                  <span className="font-body-sm text-body-sm font-semibold text-primary">{major.partners}</span>
                </div>
              </div>
              <div className="bg-surface-container p-space-md flex items-center justify-between">
                <span className="font-label-sm text-label-sm text-secondary font-bold">Prospek: {major.prospect}</span>
                <span className="material-symbols-outlined text-secondary text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
