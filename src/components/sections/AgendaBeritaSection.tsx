"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Calendar, Clock, MapPin, ArrowRight, Search } from "lucide-react";

const events = [
  {
    title: "Try Out Ujian SBK",
    date: "25 NOV",
    year: "2026",
    time: "08:00 - 15:00 WIB",
    location: "Lab Komputer",
  },
  {
    title: "Seminar Karir & Dunia Kerja",
    date: "28 NOV",
    year: "2026",
    time: "09:00 - 12:00 WIB",
    location: "Aula Sekolah",
  },
];

const berita = [
  {
    title: "Penerimaan Siswa Baru SMK BPPI Tahun Ajaran 2026/2027 Telah Dibuka",
    slug: "penerimaan-siswa-baru-smk-bppi-2026",
    category: "PPDB",
    date: "10 September 2026",
    excerpt:
      "SMK BPPI Baleendah membuka pendaftaran PPDB untuk tahun ajaran 2026/2027.",
  },
  {
    title: "Siswa PPLG Raih Juara 1 Lomba Programming Tingkat Provinsi",
    slug: "prestasi-siswa-pplg-juara-lomba-programming",
    category: "Prestasi",
    date: "3 September 2026",
    excerpt:
      "Muhammad Rizky, siswa kelas XII PPLG, meraih Juara 1 Kompetisi Pemrograman Provinsi.",
  },
  {
    title: "SMK BPPI Perpanjang Kerjasama dengan PT Axioo Digital Indonesia",
    slug: "kerja-sama-industri-axioo",
    category: "Info Sekolah",
    date: "27 Agustus 2026",
    excerpt:
      "Perpanjangan kerjasama strategis untuk program kelas industri ACP.",
  },
];

const categoryColors: Record<string, string> = {
  PPDB: "bg-gold-500",
  Prestasi: "bg-red-500",
  "Info Sekolah": "bg-blue-500",
  Akademik: "bg-green-500",
  Kegiatan: "bg-purple-500",
};

export function AgendaBeritaSection() {
  const [activeCategory, setActiveCategory] = useState("Semua");
  const categories = useMemo(
    () => ["Semua", ...Array.from(new Set(berita.map((b) => b.category)))],
    []
  );
  const filteredBerita = useMemo(
    () =>
      activeCategory === "Semua"
        ? berita
        : berita.filter((b) => b.category === activeCategory),
    [activeCategory]
  );

  return (
    <section className="py-20 bg-gray-50">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-10">
          {/* Left: Agenda / Events */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="section-heading text-2xl">Agenda Terdekat</h2>
              <Link
                href="/akademik"
                className="text-sm text-school-dark font-semibold hover:text-school-light flex items-center gap-1"
              >
                Lihat Semua <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="space-y-4">
              {events.map((event, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-5 shadow-md flex gap-4 items-start card-hover"
                >
                  {/* Date Box */}
                  <div className="w-20 h-20 bg-school-dark rounded-xl flex flex-col items-center justify-center text-white shrink-0">
                    <span className="text-2xl font-bold leading-none">
                      {event.date.split(" ")[0]}
                    </span>
                    <span className="text-xs uppercase">
                      {event.date.split(" ")[1]}
                    </span>
                    <span className="text-[10px] text-white/70">
                      {event.year}
                    </span>
                  </div>

                  {/* Event Info */}
                  <div className="flex-1">
                    <h3 className="font-heading font-bold text-gray-900 mb-2">
                      {event.title}
                    </h3>
                    <div className="flex flex-col gap-1 text-sm text-gray-500">
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        {event.time}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5" />
                        {event.location}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Latest News */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="section-heading text-2xl">Berita Terbaru</h2>
              <Link
                href="/berita"
                className="text-sm text-school-dark font-semibold hover:text-school-light flex items-center gap-1"
              >
                Lihat Semua <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  aria-pressed={activeCategory === cat}
                  className={`px-4 py-1.5 text-xs font-medium rounded-full whitespace-nowrap transition-colors ${
                    activeCategory === cat
                      ? "bg-school-dark text-white"
                      : "bg-white border border-gray-200 hover:bg-school-dark hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="space-y-4">
              {filteredBerita.map((item, index) => (
                <Link
                  key={index}
                  href={`/berita/${item.slug}`}
                  className="block bg-white rounded-xl p-5 shadow-md card-hover"
                >
                  <div className="flex items-start gap-3">
                    <span
                      className={`px-2.5 py-1 text-[10px] font-semibold text-white rounded-md ${
                        categoryColors[item.category] || "bg-gray-500"
                      }`}
                    >
                      {item.category}
                    </span>
                    <span className="text-xs text-gray-400">{item.date}</span>
                  </div>
                  <h3 className="font-heading font-bold text-gray-900 mt-3 mb-2 line-clamp-2 hover:text-school-dark transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {item.excerpt}
                  </p>
                </Link>
              ))}
            </div>

            {/* Search Box */}
            <form action="/berita" method="get" className="mt-4">
              <div className="relative">
                <input
                  type="text"
                  name="search"
                  placeholder="Cari berita..."
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-school-dark focus:border-transparent"
                />
                <button
                  type="submit"
                  aria-label="Cari berita"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-school-dark"
                >
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
