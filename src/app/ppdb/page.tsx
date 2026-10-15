import { Metadata } from "next";
import Link from "next/link";
import { SCHOOL_INFO } from "@/types";
import {
  FileText,
  CheckCircle,
  Calendar,
  Clock,
  MapPin,
  Phone,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "PPDB Online - Penerimaan Siswa Baru 2026/2027",
  description: `Pendaftaran PPDB ${SCHOOL_INFO.name} Tahun Ajaran 2026/2027. Daftar sekarang dan raih masa depan cemerlang di sekolah kejuruan unggulan Bandung.`,
  alternates: {
    canonical: "/ppdb",
  },
};

const steps = [
  {
    number: "01",
    title: "Daftar Online",
    description:
      "Kunjungi portal PPDB kami dan isi formulir pendaftaran secara online.",
  },
  {
    number: "02",
    title: "Verifikasi Berkas",
    description:
      "Unggah berkas yang diperlukan dan tunggu proses verifikasi.",
  },
  {
    number: "03",
    title: "Tes Seleksi",
    description:
      "Ikuti tes seleksi sesuai jadwal yang telah ditentukan.",
  },
  {
    number: "04",
    title: "Daftar Ulang",
    description:
      "Lakukan daftar ulang dan lengkapi administrasi.",
  },
];

const requirements = [
  "Foto copy Ijazah/SKL yang dilegalisir",
  "Foto copy SKHUN",
  "Foto copy Kartu Keluarga (KK)",
  "Pas photo 3x4 (3 lembar)",
  "Surat kesehatan dari dokter",
  "Surat pernyataan tidak buta warna",
  "Bukti pembayaran biaya pendaftaran",
];

export default function PPDBPage() {
  return (
    <>
      <div className="bg-gray-50 min-h-screen">
        {/* Hero */}
        <div className="gradient-gold py-16">
          <div className="container-custom text-center">
            <p className="text-white/90 font-medium mb-2 uppercase tracking-wider text-sm">
              SMK BPPI Baleendah
            </p>
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
              Penerimaan Peserta Didik Baru
            </h1>
            <p className="text-white/90 text-lg max-w-2xl mx-auto mb-6">
              Tahun Ajaran 2026/2027 Telah Dibuka. Daftarkan diri Anda sekarang
              dan jadilah bagian dari SMK BPPI Baleendah.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/kontak"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gold-700 font-bold rounded-lg hover:bg-gray-100 transition-all shadow-lg"
              >
                DAFTAR SEKARANG
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="#persyaratan"
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-all"
              >
                <FileText className="w-5 h-5" />
                Lihat Persyaratan
              </Link>
            </div>
          </div>
        </div>

        <div className="container-custom py-12">
          {/* Registration Steps */}
          <section className="mb-12">
            <h2 className="section-heading text-2xl text-center mb-8">
              Langkah Pendaftaran
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-md text-center card-hover relative"
                >
                  <div className="text-5xl font-heading font-bold text-school-dark/10 mb-2">
                    {step.number}
                  </div>
                  <h3 className="font-heading font-bold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-600">{step.description}</p>
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-6 text-gray-300">
                      <ArrowRight className="w-6 h-6" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Requirements */}
            <section id="persyaratan" className="bg-white rounded-2xl shadow-md p-8">
              <h2 className="section-heading text-2xl mb-6">
                Persyaratan Pendaftaran
              </h2>
              <div className="space-y-3">
                {requirements.map((req, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
                  >
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                    <span className="text-gray-700">{req}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <Link
                  href="/kontak"
                  className="inline-flex items-center gap-2 text-school-dark font-semibold hover:text-school-light transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  Hubungi Kami untuk Formulir
                </Link>
              </div>
            </section>

            {/* Info */}
            <section className="bg-white rounded-2xl shadow-md p-8">
              <h2 className="section-heading text-2xl mb-6">
                Informasi PPDB
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-4 bg-primary-50 rounded-xl">
                  <Calendar className="w-5 h-5 text-school-dark mt-0.5 shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Pendaftaran Dibuka
                    </h4>
                    <p className="text-sm text-gray-600">
                      1 Januari - 31 Maret 2026
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-gold-50 rounded-xl">
                  <Clock className="w-5 h-5 text-gold-600 mt-0.5 shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Jam Operasional
                    </h4>
                    <p className="text-sm text-gray-600">
                      Senin - Sabtu: 08.00 - 15.00 WIB
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl">
                  <MapPin className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Lokasi</h4>
                    <p className="text-sm text-gray-600">
                      {SCHOOL_INFO.address}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-xl">
                  <Phone className="w-5 h-5 text-purple-600 mt-0.5 shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Hubungi Kami
                    </h4>
                    <p className="text-sm text-gray-600">
                      {SCHOOL_INFO.phone} | {SCHOOL_INFO.email}
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
