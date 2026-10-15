"use client";

import Link from "next/link";
import { ArrowRight, Users, Award, GraduationCap } from "lucide-react";

export function WelcomeSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          {/* Left: Text Content */}
          <div className="lg:col-span-5">
            <span className="section-label">Tentang Sekolah</span>
            <h2 className="text-3xl md:text-4xl font-display italic text-gray-900 leading-tight mb-2">
              Pendidikan Unggul,
            </h2>
            <h2 className="text-3xl md:text-4xl font-display italic text-gold-600 leading-tight mb-6">
              Karakter untuk Masa Depan
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Di SMK BPPI Baleendah, kami percaya dalam membentuk generasi muda
              yang memiliki kompetensi tinggi, karakter kuat, dan siap menghadapi
              tantangan dunia industri.
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              Dengan kurikulum berbasis kompetensi industri dan dukungan mitra
              DUDI, kami mencetak lulusan yang tidak hanya terampil secara teknis,
              tetapi juga profesional dan berwawasan lingkungan.
            </p>
            <Link
              href="/profil"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-school-dark text-white font-semibold rounded-lg hover:bg-primary-800 transition-all duration-300 text-sm"
            >
              SELENGKAPNYA
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Center: Image */}
          <div className="lg:col-span-4 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80"
                alt="Kegiatan Pembelajaran SMK BPPI"
                className="w-full aspect-[4/5] object-cover"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-school-dark/40 to-transparent" />
              {/* Badge */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-school-dark rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-xs">BPPI</span>
                  </div>
                  <div>
                    <p className="font-heading font-bold text-gray-900 text-sm">
                      Kegiatan Pembelajaran
                    </p>
                    <p className="text-xs text-gray-500">SMK BPPI Baleendah</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Stats Boxes */}
          <div className="lg:col-span-3 space-y-4">
            <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center shrink-0">
                <Users className="w-6 h-6 text-school-dark" />
              </div>
              <div>
                <div className="text-2xl font-heading font-bold text-gray-900">
                  72:1
                </div>
                <div className="text-xs text-gray-500">
                  Rasio Siswa per Kelas
                </div>
              </div>
            </div>
            <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 bg-gold-50 rounded-full flex items-center justify-center shrink-0">
                <Award className="w-6 h-6 text-gold-600" />
              </div>
              <div>
                <div className="text-2xl font-heading font-bold text-gray-900">
                  4+
                </div>
                <div className="text-xs text-gray-500">
                  Program Keahlian
                </div>
              </div>
            </div>
            <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center shrink-0">
                <GraduationCap className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-heading font-bold text-gray-900">
                  50+
                </div>
                <div className="text-xs text-gray-500">
                  Mitra Industri
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
