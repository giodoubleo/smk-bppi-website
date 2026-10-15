import { SCHOOL_INFO } from "@/types";

export function PPDBSection() {
  return (
    <section className="w-full py-space-xl lg:py-24 bg-surface-container-highest/60" id="ppdb-section">
      <div className="max-w-7xl mx-auto px-space-md lg:px-margin">
        <div className="bg-primary text-on-primary rounded-xl overflow-hidden shadow-xl p-space-lg lg:p-16 relative">
          <svg className="absolute -right-20 -bottom-20 w-96 h-96 opacity-10 text-secondary-container pointer-events-none" fill="currentColor" viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="80"></circle>
            <path d="M100 20 A80 80 0 0 1 180 100 L100 100 Z" fill="#ffddb8" opacity="0.4"></path>
          </svg>
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center">
            <div className="lg:col-span-7 flex flex-col gap-space-md">
              <div className="inline-flex items-center gap-space-xs px-space-sm py-1 rounded bg-tertiary-fixed-dim text-on-tertiary-fixed font-label-sm text-label-sm w-max">
                <span className="material-symbols-outlined text-[16px]">bolt</span>
                PPDB Gelombang 1 Dibuka S/D 30 Mei 2025
              </div>
              <h2 className="font-headline-lg text-headline-lg lg:font-display lg:text-display leading-tight tracking-tight">
                Raih Masa Depan Cerah Bersama {SCHOOL_INFO.name}
              </h2>
              <p className="font-body-lg text-body-lg text-on-primary-container max-w-xl">
                Daftarkan putra-putri Anda sekarang. Tersedia Jalur Prestasi Akademik, Non-Akademik, Beasiswa Tahfidz Quran, serta Keringanan Biaya Pendidikan bagi keluarga pra-sejahtera.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-md pt-space-sm">
                <div className="bg-primary-container/80 p-space-md rounded flex flex-col gap-1">
                  <span className="font-headline-sm text-headline-sm text-tertiary-fixed-dim font-bold">01</span>
                  <span className="font-title text-title text-on-primary">Daftar Online</span>
                  <span className="font-body-sm text-body-sm text-on-primary-container">Isi formulir dan unggah data berkas rapor.</span>
                </div>
                <div className="bg-primary-container/80 p-space-md rounded flex flex-col gap-1">
                  <span className="font-headline-sm text-headline-sm text-tertiary-fixed-dim font-bold">02</span>
                  <span className="font-title text-title text-on-primary">Tes Minat Bakat</span>
                  <span className="font-body-sm text-body-sm text-on-primary-container">Wawancara penjurusan &amp; uji kompetensi dasar.</span>
                </div>
                <div className="bg-primary-container/80 p-space-md rounded flex flex-col gap-1">
                  <span className="font-headline-sm text-headline-sm text-tertiary-fixed-dim font-bold">03</span>
                  <span className="font-title text-title text-on-primary">Registrasi Ulang</span>
                  <span className="font-body-sm text-body-sm text-on-primary-container">Verifikasi fisik &amp; orientasi peserta didik baru.</span>
                </div>
              </div>
            </div>
            <div className="lg:col-span-5 bg-surface-container-lowest text-on-surface p-space-lg rounded-xl shadow-lg flex flex-col gap-space-md">
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm text-secondary font-bold uppercase">Layanan Informasi Terpadu</span>
                <h3 className="font-headline-sm text-headline-sm text-primary">Konsultasi PPDB Langsung</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">Butuh arahan seputar pemilihan jurusan yang sesuai minat siswa? Tim bimbingan konseling kami siap membantu.</p>
              </div>
              <div className="flex flex-col gap-space-sm">
                <a className="w-full py-3 px-space-md rounded bg-tertiary-fixed-dim hover:bg-tertiary-fixed text-on-tertiary-fixed font-label-md text-label-md flex items-center justify-center gap-space-xs font-bold shadow transition-all" href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer">
                  <span className="material-symbols-outlined text-[20px]">chat</span>
                  Chat Panitia via WhatsApp
                </a>
                <a className="w-full py-3 px-space-md rounded bg-surface-container hover:bg-surface-container-high text-primary font-label-md text-label-md flex items-center justify-center gap-space-xs transition-colors" href="#">
                  <span className="material-symbols-outlined text-[20px]">description</span>
                  Unduh Brosur &amp; Rincian Biaya (PDF)
                </a>
                <a className="w-full py-3 px-space-md rounded bg-primary text-on-primary hover:bg-primary-container font-label-md text-label-md flex items-center justify-center gap-space-xs transition-colors" href="/ppdb">
                  <span className="material-symbols-outlined text-[20px]">login</span>
                  Formulir Pendaftaran Siswa Baru
                </a>
              </div>
              <div className="pt-space-xs text-center border-t border-surface-container-highest">
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  Sekretariat PPDB buka Senin - Sabtu (08.00 - 15.00 WIB) di Kampus {SCHOOL_INFO.name}.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
