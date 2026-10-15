import { Metadata } from "next";
import { SCHOOL_INFO } from "@/types";
import { BookOpen, Calendar, Award, GraduationCap, FileText } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Akademik",
  description: `Informasi akademik ${SCHOOL_INFO.name}. Kurikulum, jadwal pelajaran, kalender akademik, dan sistem penilaian.`,
  alternates: {
    canonical: "/akademik",
  },
};

const academicInfo = [
  {
    icon: BookOpen,
    title: "Kurikulum Merdeka",
    description:
      "Menggunakan Kurikulum Merdeka dengan penekanan pada kompetensi praktis dan projek nyata.",
  },
  {
    icon: Calendar,
    title: "Kalender Akademik",
    description:
      "Tahun pelajaran dimulai Juli dan berakhir Juni dengan 2 semester.",
  },
  {
    icon: Award,
    title: "Sertifikasi Kompetensi",
    description:
      "Uji kompetensi dan sertifikasi nasional bagi seluruh siswa kelas XII.",
  },
  {
    icon: GraduationCap,
    title: "Prakerin",
    description:
      "Praktek Kerja Lapangan selama 6 bulan di mitra industri.",
  },
];

export default function AkademikPage() {
  return (
    <>
      <div className="bg-gray-50 min-h-screen">
        <div className="gradient-green py-16">
          <div className="container-custom text-center">
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
              Akademik
            </h1>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              Informasi akademik, kurikulum, dan kegiatan belajar mengajar.
            </p>
          </div>
        </div>

        <div className="container-custom py-10">
          <div className="grid sm:grid-cols-2 gap-6 mb-10">
            {academicInfo.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md p-6 card-hover"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-school-dark rounded-lg flex items-center justify-center shrink-0">
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-gray-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Academic Calendar */}
          <div className="bg-white rounded-2xl shadow-md p-8 mb-10">
            <h2 className="section-heading text-2xl mb-6">
              Kalender Akademik 2025/2026
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  event: "Awal Tahun Pelajaran",
                  date: "14 Juli 2025",
                  type: "Penting",
                },
                {
                  event: "PTS Semester Ganjil",
                  date: "22 - 30 September 2025",
                  type: "Ujian",
                },
                {
                  event: "PAS Semester Ganjil",
                  date: "1 - 12 Desember 2025",
                  type: "Ujian",
                },
                {
                  event: "Libur Semester",
                  date: "26 Desember - 3 Januari",
                  type: "Libur",
                },
                {
                  event: "PTS Semester Genap",
                  date: "10 - 20 Maret 2026",
                  type: "Ujian",
                },
                {
                  event: "UN & UKK",
                  date: "3 - 24 April 2026",
                  type: "Ujian",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg"
                >
                  <Calendar className="w-5 h-5 text-school-dark shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900 text-sm">
                      {item.event}
                    </p>
                    <p className="text-xs text-gray-500">{item.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="bg-white rounded-2xl shadow-md p-8">
            <h2 className="section-heading text-2xl mb-6">Dokumen Akademik</h2>
            <div className="space-y-3">
              {[
                "Kurikulum SMK BPPI Tahun 2025/2026",
                "Struktur Kurikulum Merdeka",
                "Panduan Prakerin Siswa",
                "Jadwal Pelajaran Semester Genap",
                "Panduan Penilaian Sikap",
              ].map((doc, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                >
                  <FileText className="w-5 h-5 text-gray-400" />
                  <span className="text-sm text-gray-700">{doc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
