import { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { SCHOOL_INFO } from "@/types";
import { Calendar, Image as ImageIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "Galeri Kegiatan",
  description: `Galeri foto kegiatan ${SCHOOL_INFO.name}. Dokumentasi pembelajaran, ekstrakurikuler, dan acara sekolah.`,
  alternates: {
    canonical: "/galeri",
  },
};

export default async function GaleriPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const currentPage = Math.max(1, parseInt(params.page || "1", 10));
  const PAGE_SIZE = 9;

  let albums: Array<{
    id: string;
    title: string;
    slug: string;
    description: string | null;
    coverImage: string | null;
    _count: { images: number };
    createdAt: Date;
  }> = [];
  let totalCount = 0;

  try {
    [albums, totalCount] = await Promise.all([
      prisma.gallery.findMany({
        include: {
          _count: { select: { images: true } },
        },
        orderBy: { createdAt: "desc" },
        take: PAGE_SIZE,
        skip: (currentPage - 1) * PAGE_SIZE,
      }),
      prisma.gallery.count(),
    ]);
  } catch {
    // Database not available
  }

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  return (
    <>
      <div className="bg-gray-50 min-h-screen">
        <div className="gradient-green py-16">
          <div className="container-custom text-center">
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
              Galeri Kegiatan
            </h1>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              Dokumentasi kegiatan pembelajaran, ekstrakurikuler, dan acara
              sekolah.
            </p>
          </div>
        </div>

        <div className="container-custom py-10">
          {albums.length === 0 ? (
            <div className="text-center py-20">
              <ImageIcon className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 text-lg">Belum ada galeri tersedia.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {albums.map((album) => (
                <div
                  key={album.id}
                  className="bg-white rounded-xl shadow-md overflow-hidden card-hover"
                >
                  {album.coverImage ? (
                    <div className="aspect-video bg-gray-200">
                      <img
                        src={album.coverImage}
                        alt={album.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="aspect-video bg-gradient-to-br from-school-dark to-primary-600 flex items-center justify-center">
                      <ImageIcon className="w-12 h-12 text-white/50" />
                    </div>
                  )}
                  <div className="p-5">
                    <h2 className="font-heading font-bold text-gray-900 mb-2">
                      {album.title}
                    </h2>
                    {album.description && (
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {album.description}
                      </p>
                    )}
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <ImageIcon className="w-3.5 h-3.5" />
                        {album._count.images} Foto
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(album.createdAt).toLocaleDateString("id-ID", {
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-12">
              {currentPage > 1 && (
                <Link
                  href={`/galeri?page=${currentPage - 1}`}
                  className="px-4 py-2 rounded-xl bg-white border border-gray-200 text-xs font-bold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
                >
                  « Sebelumnya
                </Link>
              )}

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <Link
                  key={p}
                  href={`/galeri?page=${p}`}
                  className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold transition-all shadow-sm ${
                    p === currentPage
                      ? "bg-secondary text-white font-bold"
                      : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {p}
                </Link>
              ))}

              {currentPage < totalPages && (
                <Link
                  href={`/galeri?page=${currentPage + 1}`}
                  className="px-4 py-2 rounded-xl bg-white border border-gray-200 text-xs font-bold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
                >
                  Selanjutnya »
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
