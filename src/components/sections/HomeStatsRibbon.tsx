export function HomeStatsRibbon() {
  const stats = [
    {
      icon: "groups",
      value: "1,850+",
      label: "Peserta Didik Aktif",
    },
    {
      icon: "domain",
      value: "75+",
      label: "Mitra DU/DI Resmi",
    },
    {
      icon: "military_tech",
      value: "120+",
      label: "Penghargaan LKS & Ilmiah",
    },
    {
      icon: "work",
      value: "94.8%",
      label: "Penyaluran Kerja BKK",
    },
  ];

  return (
    <section className="w-full bg-primary text-on-primary py-space-lg">
      <div className="max-w-7xl mx-auto px-space-md lg:px-margin">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-space-lg">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex items-center gap-space-md">
              <div className="w-12 h-12 rounded bg-primary-container text-secondary-fixed flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[24px]">{stat.icon}</span>
              </div>
              <div className="flex flex-col">
                <span className="font-headline-md text-headline-md font-bold">{stat.value}</span>
                <span className="font-label-sm text-label-sm text-on-primary-container">{stat.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
