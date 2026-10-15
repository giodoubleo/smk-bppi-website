"use client";

import { useState } from "react";
import { FileText, MousePointerClick, CheckCircle, School, ArrowRight } from "lucide-react";
import Link from "next/link";

const STEPS = [
  {
    id: 1,
    title: "Eksplor Jurusan",
    description: "Kenali minat dan bakatmu, lalu pilih program keahlian yang sesuai dengan cita-citamu.",
    icon: School,
  },
  {
    id: 2,
    title: "Siapkan Berkas",
    description: "Siapkan dokumen persyaratan seperti Kartu Keluarga, Akta Kelahiran, dan Ijazah/SKL.",
    icon: FileText,
  },
  {
    id: 3,
    title: "Daftar Online",
    description: "Isi formulir pendaftaran PPDB melalui portal resmi secara online dan dapatkan nomor registrasi.",
    icon: MousePointerClick,
  },
  {
    id: 4,
    title: "Verifikasi & Tes",
    description: "Lakukan verifikasi berkas ke sekolah dan ikuti tes penempatan atau wawancara.",
    icon: CheckCircle,
  },
];

export function PPDBFlowSection() {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <section className="py-24 relative overflow-hidden bg-slate-50 dark:bg-slate-900/50">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <div className="animate-fade-up">
            <div className="section-label">Alur Pendaftaran</div>
            <h2 className="section-heading mb-6">Langkah Mudah Bergabung Bersama Kami</h2>
            <p className="section-subheading mb-10">
              Proses Penerimaan Peserta Didik Baru (PPDB) dirancang secara terpadu dan mudah. Ikuti tahapan berikut untuk menjadi bagian dari SMK BPPI Baleendah.
            </p>

            <div className="space-y-4">
              {STEPS.map((step) => {
                const Icon = step.icon;
                const isActive = activeStep === step.id;
                
                return (
                  <div 
                    key={step.id}
                    onClick={() => setActiveStep(step.id)}
                    className={`cursor-pointer p-6 rounded-2xl border transition-all duration-300 flex gap-4 ${
                      isActive 
                        ? "bg-white dark:bg-slate-800 border-primary shadow-lg shadow-primary/10" 
                        : "bg-transparent border-transparent hover:bg-white/50 dark:hover:bg-slate-800/50"
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                      isActive ? "bg-primary text-white shadow-[0_0_15px_rgba(16,185,129,0.3)]" : "bg-slate-200 dark:bg-slate-700 text-slate-500"
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className={`text-lg font-bold mb-1 transition-colors ${isActive ? "text-primary" : "text-slate-700 dark:text-slate-300"}`}>
                        {step.id}. {step.title}
                      </h4>
                      <p className={`text-sm transition-colors ${isActive ? "text-slate-600 dark:text-slate-400" : "text-slate-500 dark:text-slate-500 line-clamp-1"}`}>
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative lg:h-[600px] flex items-center justify-center animate-fade-in lg:mt-0 mt-10">
            {/* Interactive Visual Area */}
            <div className="w-full max-w-md aspect-square relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-amber-500/20 rounded-full blur-[80px]" />
              
              <div className="relative z-10 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-2xl h-full flex flex-col items-center justify-center text-center">
                
                {STEPS.map((step) => {
                  const Icon = step.icon;
                  return (
                    <div 
                      key={`visual-${step.id}`}
                      className={`absolute inset-8 flex flex-col items-center justify-center transition-all duration-500 ${
                        activeStep === step.id 
                          ? "opacity-100 scale-100 translate-y-0" 
                          : "opacity-0 scale-95 translate-y-4 pointer-events-none"
                      }`}
                    >
                      <div className="w-24 h-24 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                        <Icon className="w-12 h-12" />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{step.title}</h3>
                      <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-xs">{step.description}</p>
                      
                      {step.id === 3 && (
                        <Link href="/ppdb" className="btn-primary w-full">
                          Mulai Pendaftaran <ArrowRight className="w-4 h-4 ml-1" />
                        </Link>
                      )}
                      {step.id === 1 && (
                        <Link href="/jurusan" className="btn-secondary w-full">
                          Lihat Jurusan <ArrowRight className="w-4 h-4 ml-1" />
                        </Link>
                      )}
                    </div>
                  );
                })}

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
