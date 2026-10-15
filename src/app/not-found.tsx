import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center px-4">
        <h1 className="text-6xl md:text-8xl font-heading font-bold text-school-dark/20 mb-4">
          404
        </h1>
        <h2 className="text-2xl md:text-3xl font-heading font-bold text-gray-900 mb-4">
          Halaman Tidak Ditemukan
        </h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Maaf, halaman yang Anda cari tidak tersedia atau telah dipindahkan.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link href="/" className="btn-primary">
            Kembali ke Beranda
          </Link>
          <Link href="/kontak" className="btn-secondary">
            Hubungi Kami
          </Link>
        </div>
      </div>
    </div>
  );
}
