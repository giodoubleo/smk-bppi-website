export function TestimonialsSection() {
  const testimonials = [
    {
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDb14iPDU_5tE5wffiGO-ekS2Qn7qKwiQyysvL_h_6V3RZOwxkH_Cw07y6ZqKMjFWTyZIRvwc2pB3gQYUt_Jj02tqMFoTrD1a5SEOuPpdfiTjH29hxN-gELCszq5R6YasQnhu-ZZ0Eb8gR67gh316sGS-JG0CMpI0ItpejPzkGp4K7cXLoxBC2jIlnlqlk9LCAHw6X7r0VKVnPHGCrV9NAJyVMaKokvAB5x6orW9DrKPXBLTrdemFTq",
      name: "Rizky Ramadhan",
      batch: "Alumni PPLG (Angkatan 2022)",
      quote: "Belajar RPL di SMK BPPI bukan sekadar diajari sintaks koding, tapi diajari arsitektur berpikir problem-solving. Begitu lulus, portofolio projek akhir saya langsung diterima kerja sebagai Frontend Developer di startup fintech Jakarta.",
      role: "Frontend Engineer",
      company: "PT Fintek Karya",
    },
    {
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCizeXG0LzuifoKWHVHy_81e3a4Ycg6lLSalObmDC-KTryj0QIneEwY-INNXlZemXUNKiwQTUO3JoM_BeLAUYKtgu1hxOupC7GjxNzrfXQELJ-sSrkvF1duj4vz1OYAcs07j9SOKZvsMJ05YsjOoCdyTneYCOgBajf5TRLVTqMG-aZ3bFA7ZGQu1LVoRjHUNNImgRAqPYNjIdSib1UAeWNrfMQPP2CMuvuyJDSIH7zCMUulSD90f9R2",
      name: "Annisa Nurul Fatihah",
      batch: "Alumni AKL (Angkatan 2021)",
      quote: "Praktik di Bank Mini dan sertifikasi software akuntansi Accurate di SMK BPPI membuat saya langsung percaya diri saat seleksi kerja. Kini saya dipercaya mengelola pembukuan dan keuangan di perbankan mitra.",
      role: "Accounting & Finance Staff",
      company: "Bank BJB Cabang Bandung",
    },
    {
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAps00MIVeVAeBTXjeU5msI6qe0qbwVobW8JT1ekcYIAa5ru8sT_RmaUwhMM_kMo8S80hI1ce8IBMTbebNTCs5hFsJs7mc8XtQRu5sEh6EDusKyvcWDoPb6MkoPI01WH52Tl9Eb-tE6XyExjZBaM2hhvopTRFxvNNqAGkcX7gujNIRB13UjD5KoQUlQ6CQU96gm7l8NbsBgyeyaV80g7I9VXoD4udzrzq2G36FTRImEVy6yCd0evYxW",
      name: "Fajar Maulana Sidiq",
      batch: "Alumni Axioo Class Program (Angkatan 2023)",
      quote: "Kurikulum industri Axioo di SMK BPPI mengajarkan standar perakitan dan troubleshooting gadget riil industri. Sertifikasi resmi Axioo menjadi tiket emas saat rekrutmen BKK langsung diterima kerja.",
      role: "Hardware Support Specialist",
      company: "PT Tera Data Indonusa (Axioo)",
    },
  ];

  return (
    <section className="w-full py-space-xl lg:py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-space-md lg:px-margin">
        <div className="flex flex-col gap-space-xs text-center max-w-2xl mx-auto mb-space-xl">
          <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-bold">Jejak Langkah Alumni</span>
          <h2 className="font-headline-lg text-headline-lg text-primary tracking-tight">Kisah Sukses Menembus Industri Ternama</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
          {testimonials.map((t, idx) => (
            <div key={idx} className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col justify-between">
              <div className="flex flex-col gap-space-md">
                <div className="flex items-center gap-space-sm">
                  <img 
                    alt={`Foto profil ${t.name}`}
                    className="w-12 h-12 rounded-full object-cover" 
                    src={t.avatar}
                  />
                  <div className="flex flex-col">
                    <span className="font-title text-title text-primary">{t.name}</span>
                    <span className="font-label-sm text-label-sm text-secondary">{t.batch}</span>
                  </div>
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant italic">
                  "{t.quote}"
                </p>
              </div>
              <div className="pt-space-md mt-space-md border-t border-surface-container flex items-center justify-between font-label-sm text-label-sm text-on-surface-variant">
                <span>{t.role}</span>
                <span className="font-bold text-primary">{t.company}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
