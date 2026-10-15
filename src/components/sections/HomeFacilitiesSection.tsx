export function HomeFacilitiesSection() {
  return (
    <section className="w-full py-space-xl lg:py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-space-md lg:px-margin">
        <div className="flex flex-col gap-space-xs text-center max-w-3xl mx-auto mb-space-xl">
          <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-bold">Fasilitas Modern &amp; Lingkungan Belajar</span>
          <h2 className="font-headline-lg text-headline-lg text-primary tracking-tight">Sarana Standar Dunia Kerja Untuk Hasil Nyata</h2>
          <p className="font-body-md text-body-md text-on-surface-variant">Kondisi lab dan workshop dirancang menyerupai atmosfer korporasi agar lulusan tidak canggung di hari pertama memasuki dunia profesional.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-space-md">
          {/* Bento item 1 */}
          <div className="md:col-span-8 bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col justify-between relative overflow-hidden group">
            <div className="relative z-10 flex flex-col gap-space-xs max-w-md">
              <span className="px-space-sm py-0.5 rounded bg-secondary/10 text-secondary font-label-sm text-label-sm w-max">Laboratorium Pusat</span>
              <h3 className="font-headline-sm text-headline-sm text-primary">Lab Komputer High-Spec &amp; Server Cisco</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Dilengkapi 4 ruang laboratorium komputer spesifikasi Core i7/Ryzen 7, dual monitor setup untuk coding PPLG, serta rack server &amp; fiber optic TJKT.</p>
            </div>
            <div className="mt-space-md relative z-10 flex items-center gap-space-md font-label-sm text-label-sm text-primary">
              <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px] text-secondary">wifi</span> Akses 1 Gbps Fiber</span>
              <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px] text-secondary">ac_unit</span> Full AC Sanitized</span>
            </div>
            <div className="mt-4 rounded-lg overflow-hidden h-52 w-full">
              <img 
                alt="Row of clean modern desktop computers and coding monitors inside school high-tech lab" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDrCgNRd3h_jM5CLuCjeI9RL6uODuxCpGaOPr790xghY9oLdCRBSFGG5ec9-nZKHMZFhU_AMmbGs4-_cAz1-SpwB9tq9-jOo-HR9JD61FWOTuWqc-zxgiBcyDbHvTsIN-vKflCokqFrgeqJgTBQKRG6DyONQvy-R9rUFo3xrryPJanAcfaaruYQKzvbt6X6UhmxXOhJBdtNcDh6OjpBOflkBZVE55FYh44U_P81mcjER_n4fZqFHQje"
              />
            </div>
          </div>
          
          {/* Bento item 2 */}
          <div className="md:col-span-4 bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col justify-between group">
            <div className="flex flex-col gap-space-xs">
              <span className="px-space-sm py-0.5 rounded bg-tertiary-fixed-dim/30 text-on-tertiary-container font-label-sm text-label-sm w-max">Teaching Factory AKL</span>
              <h3 className="font-headline-sm text-headline-sm text-primary">Bank Mini &amp; Lab Akuntansi Digital</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Simulasi operasional perbankan riil, transaksi teller, kasir, penghitungan pajak, dan pembukuan software akuntansi Accurate/MYOB.</p>
            </div>
            <div className="mt-4 rounded-lg overflow-hidden h-44 w-full">
              <img 
                alt="Bank mini dan lab akuntansi digital" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&auto=format&fit=crop&q=80"
              />
            </div>
          </div>
          
          {/* Bento item 3 */}
          <div className="md:col-span-4 bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col justify-between group">
            <div className="flex flex-col gap-space-xs">
              <span className="px-space-sm py-0.5 rounded bg-secondary/10 text-secondary font-label-sm text-label-sm w-max">Kelas Industri ACP</span>
              <h3 className="font-headline-sm text-headline-sm text-primary">Axioo Smart Lab &amp; Hardware Assembly</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Lab perakitan perangkat laptop dan gadget standar industri Axioo, meja antistatik ESD, diagnostic kit, dan sertifikasi teknisi.</p>
            </div>
            <div className="mt-4 rounded-lg overflow-hidden h-44 w-full">
              <img 
                alt="Axioo smart lab and computer hardware assembly" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                src="https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=800&auto=format&fit=crop&q=80"
              />
            </div>
          </div>
          
          {/* Bento item 4 */}
          <div className="md:col-span-4 bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col justify-between group">
            <div className="flex flex-col gap-space-xs">
              <span className="px-space-sm py-0.5 rounded bg-secondary/10 text-secondary font-label-sm text-label-sm w-max">Literasi Digital</span>
              <h3 className="font-headline-sm text-headline-sm text-primary">E-Library &amp; Hub Co-Working</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Koleksi 10.000+ e-book dan jurnal vokasi, area diskusi kelompok terbuka, charging station laptop, dan suasana kondusif.</p>
            </div>
            <div className="mt-4 rounded-lg overflow-hidden h-44 w-full">
              <img 
                alt="Comfortable modern school digital library and co-working open space" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBhrsL-tNznbiHdXn9sLrlBag-UzdDzyB46zQiIbE3CzAlO4GGaHaQWDTivjRJ-tIr7JGqmPIDxN-EOlBP5TcEQK_tVCV11JzMtfLzmMXTlDdDk6MWaa3cG3OYYYFVd7niwU6sUxAiC4JOZ8yvGaGu0aCTBdc8b-_y_PvRy1e_waFRqzgDx0B6qjrRUgeDCDur1IbMqhgQgzX0kPflWKduY1s5hkvEld2cwWVWrvm03b3U6ilzG7FX8"
              />
            </div>
          </div>
          
          {/* Bento item 5 */}
          <div className="md:col-span-4 bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col justify-between group">
            <div className="flex flex-col gap-space-xs">
              <span className="px-space-sm py-0.5 rounded bg-secondary/10 text-secondary font-label-sm text-label-sm w-max">Sarana Pendukung</span>
              <h3 className="font-headline-sm text-headline-sm text-primary">Gelanggang Olahraga &amp; Masjid</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Lapangan futsal/basket sintetis berstandar kompetisi dan Masjid Nurul Ilmi yang megah untuk pembinaan akhlak siswa.</p>
            </div>
            <div className="mt-4 rounded-lg overflow-hidden h-44 w-full">
              <img 
                alt="Spacious clean school sports courtyard and modern Islamic mosque" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB8BZG5swZX-jcAUy8Fl5Xc_wxlbK0FJSIgbjb1mvkZRZJYpOrgGZ0vg_yW5Pd2-Di3ZdMNkmxlOdbLDlyev1FB009649X3x7nbN3GQDdDS9dRERQKE4cTV8JcK-Ummz-WDLhgUB3EPYiV_weMXAVJH5D_iBQZ1TcbRMVMFEsiGq554MGEplD6cMQ8oB58vlxvFMZFIJuDXjgw9BSnHUVIyAIZM6w6o9YKqqqsXH1SICDkGymbNZLlO"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
