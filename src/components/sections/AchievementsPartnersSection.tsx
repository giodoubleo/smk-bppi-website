export function AchievementsPartnersSection() {
  const achievements = [
    {
      badge: "1st",
      badgeClass: "bg-tertiary-fixed-dim/40 text-on-tertiary-container",
      year: "Tahun 2024",
      title: "Juara 1 Lomba Kompetensi Siswa (LKS) Jabar",
      description: "Bidang Web Technologies. Merancang platform microservices dengan cloud deployment instan di hadapan juri korporasi multinasional.",
      footerIcon: "emoji_events",
      footerText: "Perwakilan Menuju LKS Nasional",
    },
    {
      badge: "Gold",
      badgeClass: "bg-secondary-fixed text-on-secondary-fixed",
      year: "Tahun 2024",
      title: "Gold Medal Cisco & Mikrotik Olympiad",
      description: "Bidang IT Network System Administration se-Jawa Barat. Konfigurasi routing multi-hop dan mitigasi vulnerability server.",
      footerIcon: "military_tech",
      footerText: "Penghargaan Tim Cyber BPPI",
    },
    {
      badge: "1st",
      badgeClass: "bg-surface-container-highest text-primary",
      year: "Tahun 2024",
      title: "Juara 1 Olimpiade Akuntansi & Perbankan",
      description: "Bidang Financial Accounting & Digital Taxation tingkat Jawa Barat. Penyusunan laporan keuangan audit dan simulasi Bank Mini berbasis software.",
      footerIcon: "calculate",
      footerText: "Ikatan Akuntan Indonesia (IAI)",
    },
  ];

  const partners = [
    { icon: "laptop_mac", name: "Axioo Class", desc: "Smart Device & Hardware" },
    { icon: "cell_tower", name: "Telkom Group", desc: "Jaringan & Cloud" },
    { icon: "account_balance", name: "Bank BJB", desc: "Perbankan Mitra AKL" },
    { icon: "code_blocks", name: "Dicoding", desc: "Talenta Developer PPLG" },
    { icon: "memory", name: "PT LEN", desc: "Infrastruktur IT" },
    { icon: "calculate", name: "Accurate / MYOB", desc: "Akuntansi Industri" },
  ];

  return (
    <section className="w-full py-space-xl lg:py-20 bg-surface-container-low">
      <div className="max-w-7xl mx-auto px-space-md lg:px-margin">
        <div className="flex flex-col gap-space-xs mb-space-lg">
          <div className="flex items-center gap-space-xs">
            <span className="w-8 h-1 bg-secondary rounded-full"></span>
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-bold">Galeri Prestasi Terkini</span>
          </div>
          <h2 className="font-headline-lg text-headline-lg text-primary tracking-tight">Kemenangan Nyata di Tingkat Regional &amp; Nasional</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg mb-space-xl">
          {achievements.map((item, idx) => (
            <div key={idx} className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col gap-space-sm">
              <div className="flex items-center justify-between">
                <span className={`w-10 h-10 rounded-full flex items-center justify-center font-bold font-title text-title ${item.badgeClass}`}>
                  {item.badge}
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">{item.year}</span>
              </div>
              <h3 className="font-title text-title text-primary">{item.title}</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">{item.description}</p>
              <div className="font-label-sm text-label-sm text-secondary font-semibold mt-auto flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">{item.footerIcon}</span> {item.footerText}
              </div>
            </div>
          ))}
        </div>
        
        <div className="bg-surface-container-lowest p-space-lg lg:p-space-xl rounded-xl shadow-sm">
          <div className="text-center max-w-xl mx-auto mb-space-lg">
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant">Dunia Usaha &amp; Dunia Industri (DU/DI)</span>
            <h3 className="font-title text-title text-primary">Kemitraan Kelas Industri, Magang &amp; Rekrutmen Langsung</h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-space-md items-center text-center">
            {partners.map((p, idx) => (
              <div key={idx} className="p-space-md rounded bg-surface-container flex flex-col items-center justify-center gap-1 hover:bg-secondary-fixed transition-colors">
                <span className="material-symbols-outlined text-secondary text-[32px]">{p.icon}</span>
                <span className="font-label-md text-label-md font-bold text-primary">{p.name}</span>
                <span className="font-label-sm text-[10px] text-on-surface-variant">{p.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
