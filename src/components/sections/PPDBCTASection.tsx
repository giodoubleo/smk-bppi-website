"use client";

import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";

export function PPDBCTASection() {
  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-0 bg-gray-50 rounded-2xl overflow-hidden shadow-sm border border-gray-100">
          {/* Left: Image */}
          <div className="relative min-h-[300px] lg:min-h-[400px]">
            <img
              src="https://images.unsplash.com/photo-1562774053-701939374585?w=900&q=80"
              alt="Gedung SMK BPPI Baleendah"
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Gold overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-gold-600/90 to-gold-500/70" />
            {/* Content overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white">
                <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm border border-white/30">
                  <span className="text-white font-bold text-4xl">BPPI</span>
                </div>
                <p className="font-heading font-bold text-2xl">
                  SMK BPPI Baleendah
                </p>
                <p className="text-white/80 text-sm mt-1">
                  NPSN: 20259576
                </p>
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <span className="section-label">Penerimaan Siswa Baru</span>
            <h2 className="text-2xl md:text-3xl font-display italic text-gray-900 mb-4 leading-tight">
              Mulailah Perjalanan Menuju{" "}
              <span className="text-gold-600">Masa Depan Cemerlang</span>
            </h2>
            <p className="text-gray-600 mb-3 leading-relaxed">
              Bergabunglah dengan komunitas SMK BPPI Baleendah di mana siswa
              akan dibimbing, didukung, dan diberdayakan untuk meraih impian
              mereka.
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
              <Calendar className="w-4 h-4" />
              <span>Pendaftaran: Januari - Maret 2026</span>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/ppdb"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-gold-500 text-white font-semibold rounded-lg hover:bg-gold-600 transition-all duration-300 text-sm shadow-md"
              >
                DAFTAR SEKARANG
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/profil"
                className="inline-flex items-center gap-2 px-7 py-3.5 border-2 border-gray-200 text-gray-700 font-semibold rounded-lg hover:border-school-dark hover:text-school-dark transition-all duration-300 text-sm"
              >
                JELAJAHI KAMPUS
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
