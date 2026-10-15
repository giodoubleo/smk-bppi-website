"use client";

import { useState } from "react";

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: "Apakah SMK BPPI menerima siswa dari luar Kabupaten Bandung?",
      a: "Ya, SMK BPPI menerima peserta didik dari berbagai daerah di seluruh Indonesia baik jenjang SMP maupun MTs sederajat melalui sistem pendaftaran online tanpa batasan zonasi daerah.",
    },
    {
      q: "Bagaimana mekanisme penyaluran kerja Bursa Kerja Khusus (BKK)?",
      a: "BKK SMK BPPI menyelenggarakan campus recruitment langsung di sekolah sejak semester 6. Mitra industri melakukan walk-in interview dan tes psikotes, sehingga mayoritas siswa sudah memegang penawaran kerja sebelum hari wisuda.",
    },
    {
      q: "Apakah lulusan SMK BPPI bisa melanjutkan kuliah ke Perguruan Tinggi Negeri?",
      a: "Sangat bisa. Lulusan memiliki akses penuh untuk seleksi SNBP, SNBT, maupun jalur Mandiri. SMK BPPI menyediakan program bimbingan intensif persiapan UTBK serta kerja sama vokasi perguruan tinggi negeri terkemuka.",
    },
  ];

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full py-space-xl bg-surface">
      <div className="max-w-4xl mx-auto px-space-md lg:px-margin">
        <div className="text-center mb-space-lg">
          <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-bold">Informasi Penting</span>
          <h2 className="font-headline-lg text-headline-lg text-primary tracking-tight">Pertanyaan yang Sering Diajukan (FAQ)</h2>
        </div>
        <div className="flex flex-col gap-space-sm">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm transition-all">
              <button 
                onClick={() => toggle(index)}
                className="w-full flex items-center justify-between text-left font-title text-title text-primary"
              >
                <span>{faq.q}</span>
                <span 
                  className="material-symbols-outlined transition-transform duration-300"
                  style={{ transform: openIndex === index ? 'rotate(180deg)' : 'rotate(0deg)' }}
                >
                  expand_more
                </span>
              </button>
              <div 
                className={`pt-space-sm font-body-md text-body-md text-on-surface-variant leading-relaxed ${openIndex === index ? 'block' : 'hidden'}`}
              >
                {faq.a}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
