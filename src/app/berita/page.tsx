import { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { SCHOOL_INFO } from "@/types";
import { Calendar, User, Tag, Search, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Berita & Informasi Terbaru",
  description: `Berita dan informasi terbaru dari ${SCHOOL_INFO.name}. Ikuti perkembangan terkini seputar kegiatan sekolah, prestasi siswa, dan informasi penting lainnya.`,
  alternates: {
    canonical: "/berita",
  },
};

export default async function BeritaPage({
  searchParams,
}: {
  searchParams: Promise<{ kategori?: string; search?: string; page?: string }>;
}) {
  const params = await searchParams;
  const categoryFilter = params.kategori;
  const searchQuery = params.search;
  const currentPage = Math.max(1, parseInt(params.page || "1", 10));
  const PAGE_SIZE = 6;

  let categories: Array<{ id: string; name: string; slug: string }> = [];
  let news: Array<{
    id: string;
    title: string;
    slug: string;
    thumbnail: string | null;
    excerpt: string | null;
    publishedAt: Date | null;
    isFeatured: boolean;
    category: { name: string; slug: string };
    author: { name: string };
  }> = [];
  let totalCount = 0;

  try {
    categories = await prisma.category.findMany({
      orderBy: { name: "asc" },
    });

    const where: Record<string, unknown> = { status: "PUBLISHED" };

    if (categoryFilter && categoryFilter !== "semua") {
      where.category = { slug: categoryFilter };
    }

    if (searchQuery) {
      where.OR = [
        { title: { contains: searchQuery } },
        { excerpt: { contains: searchQuery } },
      ];
    }

    [news, totalCount] = await Promise.all([
      prisma.news.findMany({
        where,
        include: {
          category: { select: { name: true, slug: true } },
          author: { select: { name: true } },
        },
        orderBy: { createdAt: "desc" },
        take: PAGE_SIZE,
        skip: (currentPage - 1) * PAGE_SIZE,
      }),
      prisma.news.count({ where }),
    ]);
  } catch {
    // Database not available
  }

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  return (
    <>
      <div className="bg-gray-50 min-h-screen">
        {/* Page Header */}
        <div className="gradient-green py-16">
          <div className="container-custom text-center">
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
              Berita & Informasi
            </h1>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              Ikuti perkembangan terkini seputar kegiatan sekolah, prestasi
              siswa, dan informasi penting lainnya.
            </p>
          </div>
        </div>

        <div className="container-custom py-10">
          {/* Search & Filter */}
          <div className="bg-white rounded-xl shadow-md p-4 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <form action="/berita" method="get" className="relative flex-1">
                {categoryFilter && (
                  <input type="hidden" name="kategori" value={categoryFilter} />
                )}
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="search"
                  placeholder="Cari berita..."
                  defaultValue={searchQuery}
                  className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-school-dark"
                />
                <button
                  type="submit"
                  aria-label="Cari berita"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-school-dark transition-colors"
                >
                  <Search className="w-5 h-5" />
                </button>
              </form>

              {/* Category Filter */}
              <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
                <Link
                  href="/berita"
                  className={`px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap transition-colors ${
                    !categoryFilter || categoryFilter === "semua"
                      ? "bg-school-dark text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Semua
                </Link>
                {categories.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/berita?kategori=${cat.slug}`}
                    className={`px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap transition-colors ${
                      categoryFilter === cat.slug
                        ? "bg-school-dark text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* News Grid */}
          {news.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">
                Belum ada berita yang tersedia.
              </p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {news.map((item) => (
                <Link
                  key={item.id}
                  href={`/berita/${item.slug}`}
                  className="bg-white rounded-xl shadow-md overflow-hidden card-hover"
                >
                  {item.thumbnail ? (
                    <div className="aspect-video bg-gray-200">
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="aspect-video bg-gradient-to-br from-school-dark to-primary-600 flex items-center justify-center">
                      <span className="text-white/80 font-bold text-xl">
                        BPPI
                      </span>
                    </div>
                  )}

                  <div className="p-5">
                    <div className="flex items-center gap-3 mb-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1 px-2.5 py-1 bg-primary-50 text-school-dark rounded-full font-medium">
                        <Tag className="w-3 h-3" />
                        {item.category.name}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {item.publishedAt
                          ? new Date(item.publishedAt).toLocaleDateString(
                              "id-ID",
                              {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              }
                            )
                          : "-"}
                      </span>
                    </div>

                    <h2 className="font-heading font-bold text-gray-900 mb-2 line-clamp-2 hover:text-school-dark transition-colors">
                      {item.title}
                    </h2>

                    <p className="text-sm text-gray-600 line-clamp-3 mb-3">
                      {item.excerpt}
                    </p>

                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-1 text-gray-500">
                        <User className="w-3.5 h-3.5" />
                        {item.author.name}
                      </span>
                      <span className="flex items-center gap-1 text-school-dark font-medium group-hover:gap-2 transition-all">
                        Baca Selengkapnya
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-12">
              {currentPage > 1 && (
                <Link
                  href={`/berita?page=${currentPage - 1}${
                    categoryFilter ? `&kategori=${categoryFilter}` : ""
                  }${searchQuery ? `&search=${searchQuery}` : ""}`}
                  className="px-4 py-2 rounded-xl bg-white border border-gray-200 text-xs font-bold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
                >
                  « Sebelumnya
                </Link>
              )}

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <Link
                  key={p}
                  href={`/berita?page=${p}${
                    categoryFilter ? `&kategori=${categoryFilter}` : ""
                  }${searchQuery ? `&search=${searchQuery}` : ""}`}
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
                  href={`/berita?page=${currentPage + 1}${
                    categoryFilter ? `&kategori=${categoryFilter}` : ""
                  }${searchQuery ? `&search=${searchQuery}` : ""}`}
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
