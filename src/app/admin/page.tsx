import Link from "next/link";
import { prisma } from "@/lib/prisma";
import {
  Newspaper,
  Megaphone,
  Images,
  Mail,
  PlusCircle,
  ArrowRight,
  Clock,
  Eye,
  Calendar,
  GraduationCap,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  let newsCount = 0;
  let announcementCount = 0;
  let galleryCount = 0;
  let messageCount = 0;
  let majorCount = 4;
  let recentNews: any[] = [];
  let recentAnnouncements: any[] = [];
  let recentMessages: any[] = [];

  try {
    const [nc, ac, gc, mc, mjc] = await Promise.all([
      prisma.news.count(),
      prisma.announcement.count(),
      prisma.gallery.count(),
      prisma.contactMessage.count({ where: { isRead: false } }),
      prisma.major.count(),
    ]);
    newsCount = nc;
    announcementCount = ac;
    galleryCount = gc;
    messageCount = mc;
    majorCount = mjc || 4;

    const [rn, ra, rm] = await Promise.all([
      prisma.news.findMany({
        take: 4,
        orderBy: { createdAt: "desc" },
        include: { category: true },
      }),
      prisma.announcement.findMany({
        take: 3,
        orderBy: { createdAt: "desc" },
      }),
      prisma.contactMessage.findMany({
        take: 3,
        orderBy: { createdAt: "desc" },
      }),
    ]);
    recentNews = rn;
    recentAnnouncements = ra;
    recentMessages = rm;
  } catch (err) {
    console.error("Dashboard query error:", err);
  }

  const STATS = [
    {
      label: "Total Berita",
      value: newsCount,
      icon: Newspaper,
      color: "from-blue-500 to-indigo-600",
      href: "/admin/berita",
    },
    {
      label: "Pengumuman",
      value: announcementCount,
      icon: Megaphone,
      color: "from-amber-500 to-orange-600",
      href: "/admin/pengumuman",
    },
    {
      label: "Album Galeri",
      value: galleryCount,
      icon: Images,
      color: "from-emerald-500 to-teal-600",
      href: "/admin/galeri",
    },
    {
      label: "Program Keahlian",
      value: majorCount,
      icon: GraduationCap,
      color: "from-purple-500 to-violet-600",
      href: "/admin/jurusan",
    },
    {
      label: "Pesan Baru",
      value: messageCount,
      icon: Mail,
      color: "from-rose-500 to-red-600",
      href: "/admin/pesan",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Top Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-slate-900 to-slate-900/60 p-6 rounded-2xl border border-slate-800 shadow-xl">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Pusat Pengelolaan Konten (CMS)
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Kelola berita, pengumuman resmi, album foto, program keahlian, dan pesan dari pengunjung sekolah.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/berita"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-secondary text-white text-xs font-bold hover:bg-secondary/90 transition-all shadow-md shadow-secondary/20"
          >
            <PlusCircle className="w-4 h-4" />
            Tulis Berita
          </Link>
          <Link
            href="/admin/pengumuman"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 text-slate-200 text-xs font-bold hover:bg-slate-700 transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            Pengumuman
          </Link>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {STATS.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.label}
              href={stat.href}
              className="bg-slate-900/90 border border-slate-800/80 p-5 rounded-2xl hover:border-slate-700 transition-all group shadow-sm flex items-center justify-between"
            >
              <div>
                <span className="text-xs font-medium text-slate-400 block mb-1">
                  {stat.label}
                </span>
                <span className="text-3xl font-extrabold text-white">
                  {stat.value}
                </span>
              </div>
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform`}
              >
                <Icon className="w-6 h-6" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Content Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Recent News */}
        <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
            <h2 className="font-bold text-base text-white flex items-center gap-2">
              <Newspaper className="w-5 h-5 text-secondary-fixed-dim" />
              Berita Sekolah Terbaru
            </h2>
            <Link
              href="/admin/berita"
              className="text-xs text-secondary-fixed-dim hover:text-white flex items-center gap-1 font-semibold"
            >
              Lihat Semua <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {recentNews.map((news) => (
              <div
                key={news.id}
                className="flex items-start justify-between gap-4 p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/60 hover:border-slate-700 transition-all"
              >
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 text-[10px] font-bold rounded-md bg-secondary/20 text-secondary-fixed-dim">
                      {news.category.name}
                    </span>
                    <span
                      className={`px-2 py-0.5 text-[10px] font-bold rounded-md ${
                        news.status === "PUBLISHED"
                          ? "bg-emerald-500/20 text-emerald-400"
                          : "bg-amber-500/20 text-amber-400"
                      }`}
                    >
                      {news.status}
                    </span>
                    <span className="text-[11px] text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {new Date(news.createdAt).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <h3 className="font-bold text-sm text-white truncate">
                    {news.title}
                  </h3>
                </div>
                <div className="flex items-center gap-1 text-slate-400 text-xs shrink-0">
                  <Eye className="w-3.5 h-3.5" />
                  <span>{news.viewCount}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Recent Announcements & Inquiries */}
        <div className="lg:col-span-4 space-y-6">
          {/* Announcements Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
              <h2 className="font-bold text-sm text-white flex items-center gap-2">
                <Megaphone className="w-4 h-4 text-amber-400" />
                Pengumuman
              </h2>
              <Link
                href="/admin/pengumuman"
                className="text-xs text-amber-400 hover:text-white"
              >
                Kelola
              </Link>
            </div>
            <div className="space-y-2.5">
              {recentAnnouncements.map((item) => (
                <div
                  key={item.id}
                  className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/60"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded ${
                        item.priority === "URGENT"
                          ? "bg-rose-500/20 text-rose-400"
                          : "bg-blue-500/20 text-blue-400"
                      }`}
                    >
                      {item.priority}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {new Date(item.createdAt).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                      })}
                    </span>
                  </div>
                  <p className="text-xs font-bold text-slate-200 line-clamp-1">
                    {item.title}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Messages Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
              <h2 className="font-bold text-sm text-white flex items-center gap-2">
                <Mail className="w-4 h-4 text-rose-400" />
                Pesan Kontak Terbaru
              </h2>
              <Link
                href="/admin/pesan"
                className="text-xs text-rose-400 hover:text-white"
              >
                Buka
              </Link>
            </div>
            <div className="space-y-2.5">
              {recentMessages.length === 0 ? (
                <p className="text-xs text-slate-400 py-2">Belum ada pesan masuk.</p>
              ) : (
                recentMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/60 space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white truncate max-w-[150px]">
                        {msg.name}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {new Date(msg.createdAt).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                        })}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 font-medium line-clamp-1">
                      {msg.subject}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
