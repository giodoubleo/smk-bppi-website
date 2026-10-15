import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { SCHOOL_INFO } from "@/types";
import { Calendar, User, Tag, ArrowLeft, Share2 } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const news = await prisma.news.findUnique({
      where: { slug },
      select: {
        title: true,
        excerpt: true,
        slug: true,
      },
    });

    if (!news) {
      return { title: "Berita Tidak Ditemukan" };
    }

    return {
      title: `${news.title}`,
      description:
        news.excerpt || `${news.title} - ${SCHOOL_INFO.name}`,
      alternates: {
        canonical: `/berita/${news.slug}`,
      },
      openGraph: {
        title: `${news.title} | ${SCHOOL_INFO.name}`,
        description: news.excerpt || "",
        url: `https://smkbppi.sch.id/berita/${news.slug}`,
        type: "article",
      },
    };
  } catch {
    return { title: "Berita Tidak Ditemukan" };
  }
}

export default async function BeritaDetailPage({ params }: PageProps) {
  const { slug } = await params;
  let news;
  try {
    news = await prisma.news.findUnique({
      where: { slug, status: "PUBLISHED" },
      include: {
        category: true,
        author: {
          select: { name: true },
        },
      },
    });
  } catch {
    notFound();
  }

  if (!news) {
    notFound();
  }

  // Increment view count
  try {
    await prisma.news.update({
      where: { id: news.id },
      data: { viewCount: { increment: 1 } },
    });
  } catch {
    // Silently fail
  }

  // Get related news
  let relatedNews: Array<{
    title: string;
    slug: string;
    excerpt: string | null;
    thumbnail: string | null;
    publishedAt: Date | null;
    category: { name: string };
  }> = [];
  try {
    relatedNews = await prisma.news.findMany({
      where: {
        status: "PUBLISHED",
        categoryId: news.categoryId,
        id: { not: news.id },
      },
      take: 3,
      include: {
        category: { select: { name: true } },
      },
      orderBy: { publishedAt: "desc" },
    });
  } catch {
    // Silently fail
  }

  return (
    <>
      {/* Structured Data - NewsArticle */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "NewsArticle",
            headline: news.title,
            description: news.excerpt,
            image: news.thumbnail || "https://smkbppi.sch.id/og-image.jpg",
            datePublished: news.publishedAt?.toISOString(),
            dateModified: news.updatedAt.toISOString(),
            author: {
              "@type": "Person",
              name: news.author.name,
            },
            publisher: {
              "@type": "Organization",
              name: SCHOOL_INFO.name,
              logo: {
                "@type": "ImageObject",
                url: "https://smkbppi.sch.id/logo.png",
              },
            },
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `https://smkbppi.sch.id/berita/${news.slug}`,
            },
          }),
        }}
      />

      <div className="bg-gray-50 min-h-screen">
        {/* Breadcrumb */}
        <div className="bg-white border-b">
          <div className="container-custom py-3">
            <nav className="flex items-center gap-2 text-sm text-gray-500">
              <Link href="/" className="hover:text-school-dark">
                Home
              </Link>
              <span>/</span>
              <Link href="/berita" className="hover:text-school-dark">
                Berita
              </Link>
              <span>/</span>
              <span className="text-gray-900 truncate max-w-[200px]">
                {news.title}
              </span>
            </nav>
          </div>
        </div>

        <div className="container-custom py-10">
          <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <Link
              href="/berita"
              className="inline-flex items-center gap-2 text-school-dark hover:text-school-light mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Kembali ke Berita
            </Link>

            {/* Article Header */}
            <article className="bg-white rounded-2xl shadow-md overflow-hidden">
              {/* Thumbnail */}
              {news.thumbnail && (
                <div className="aspect-video bg-gray-200">
                  <img
                    src={news.thumbnail}
                    alt={news.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="p-6 md:p-10">
                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1.5">
                    <Tag className="w-4 h-4" />
                    <span className="px-2.5 py-1 bg-primary-50 text-school-dark rounded-md text-xs font-medium">
                      {news.category.name}
                    </span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    {news.publishedAt
                      ? new Date(news.publishedAt).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })
                      : ""}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <User className="w-4 h-4" />
                    {news.author.name}
                  </span>
                </div>

                {/* Title */}
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-gray-900 mb-6 leading-tight">
                  {news.title}
                </h1>

                {/* Excerpt */}
                {news.excerpt && (
                  <p className="text-lg text-gray-600 mb-8 pb-6 border-b border-gray-100">
                    {news.excerpt}
                  </p>
                )}

                {/* Content */}
                <div
                  className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-school-dark prose-strong:text-gray-900"
                  dangerouslySetInnerHTML={{ __html: news.content }}
                />

                {/* Share Buttons */}
                <div className="mt-10 pt-6 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <Share2 className="w-4 h-4" />
                      Bagikan
                    </span>
                    <div className="flex gap-2">
                      <a
                        href={`https://www.facebook.com/sharer/sharer.php?u=https://smkbppi.sch.id/berita/${news.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                        aria-label="Share on Facebook"
                      >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                      </a>
                      <a
                        href={`https://twitter.com/intent/tweet?url=https://smkbppi.sch.id/berita/${news.slug}&text=${encodeURIComponent(news.title)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-sky-500 text-white rounded-full flex items-center justify-center hover:bg-sky-600 transition-colors"
                        aria-label="Share on Twitter"
                      >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </article>

            {/* Related News */}
            {relatedNews.length > 0 && (
              <div className="mt-12">
                <h2 className="section-heading text-2xl mb-6">Berita Terkait</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {relatedNews.map((item) => (
                    <Link
                      key={item.slug}
                      href={`/berita/${item.slug}`}
                      className="bg-white rounded-xl shadow-md overflow-hidden card-hover"
                    >
                      {item.thumbnail && (
                        <div className="aspect-video bg-gray-200">
                          <img
                            src={item.thumbnail}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div className="p-5">
                        <span className="text-xs font-medium text-school-dark bg-primary-50 px-2 py-1 rounded">
                          {item.category.name}
                        </span>
                        <h3 className="font-heading font-bold text-gray-900 mt-3 mb-2 line-clamp-2">
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-500 line-clamp-2">
                          {item.excerpt}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
