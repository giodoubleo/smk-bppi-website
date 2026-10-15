"use client";

import Link from "next/link";
import {
  Lightbulb,
  Users,
  Target,
  Heart,
} from "lucide-react";

const programs = [
  {
    icon: Lightbulb,
    title: "Program Inovasi",
    description:
      "Mengembangkan kreativitas dan inovasi siswa melalui proyek teknologi terkini.",
    color: "bg-blue-500",
  },
  {
    icon: Users,
    title: "Program Kolaborasi",
    description:
      "Kerjasama dengan mitra industri untuk pengalaman belajar nyata.",
    color: "bg-green-500",
  },
  {
    icon: Target,
    title: "Program Kompetensi",
    description:
      "Persiapan sertifikasi kompetensi nasional dan internasional.",
    color: "bg-orange-500",
  },
  {
    icon: Heart,
    title: "Program Karakter",
    description:
      "Pembentukan karakter religius, profesional, dan berwawasan lingkungan.",
    color: "bg-purple-500",
  },
];

export function ValuesSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container-custom">
        {/* Banner */}
        <div className="gradient-green rounded-2xl p-8 md:p-12 mb-12 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Tumbuh Bersama & Berkarakter
          </h2>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Membentuk lulusan yang tidak hanya terampil secara teknis, tetapi
            juga memiliki karakter kuat, religius, dan peduli lingkungan.
          </p>
        </div>

        {/* Program Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {programs.map((program, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-md card-hover text-center"
            >
              <div
                className={`w-16 h-16 ${program.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}
              >
                <program.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-heading font-bold text-lg text-gray-900 mb-2">
                {program.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {program.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link href="/profil" className="btn-secondary text-sm">
            Selengkapnya tentang Visi & Misi
          </Link>
        </div>
      </div>
    </section>
  );
}
