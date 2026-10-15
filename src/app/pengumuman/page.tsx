import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { SCHOOL_INFO } from "@/types";
import { AlertTriangle, CheckCircle, Info, AlertCircle } from "lucide-react";
import DOMPurify from "isomorphic-dompurify";

export const metadata: Metadata = {
  title: "Pengumuman",
  description: `Pengumuman resmi ${SCHOOL_INFO.name}. Informasi penting terkait akademik, kegiatan, dan operasional sekolah.`,
  alternates: {
    canonical: "/pengumuman",
  },
};

const priorityConfig: Record<string, { icon: React.ElementType; color: string; bg: string }> = {
  URGENT: { icon: AlertTriangle, color: "text-red-600", bg: "bg-red-50" },
  HIGH: { icon: AlertCircle, color: "text-orange-600", bg: "bg-orange-50" },
  NORMAL: { icon: Info, color: "text-blue-600", bg: "bg-blue-50" },
  LOW: { icon: CheckCircle, color: "text-green-600", bg: "bg-green-50" },
};

export default async function PengumumanPage() {
  let announcements: Array<{
    id: string;
    title: string;
    slug: string;
    content: string;
    priority: string;
    publishedAt: Date | null;
  }> = [];

  try {
    announcements = await prisma.announcement.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { publishedAt: "desc" },
    });
  } catch {
    // Database not available
  }

  return (
    <>
      <div className="bg-gray-50 min-h-screen">
        <div className="gradient-green py-16">
          <div className="container-custom text-center">
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
              Pengumuman
            </h1>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              Informasi penting terkait akademik, kegiatan, dan operasional
              sekolah.
            </p>
          </div>
        </div>

        <div className="container-custom py-10">
          {announcements.length === 0 ? (
            <div className="text-center py-20">
              <Info className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 text-lg">
                Belum ada pengumuman terbaru.
              </p>
            </div>
          ) : (
            <div className="space-y-4 max-w-4xl mx-auto">
              {announcements.map((item) => {
                const config =
                  priorityConfig[item.priority] || priorityConfig.NORMAL;
                const Icon = config.icon;
                return (
                  <div
                    key={item.id}
                    className="bg-white rounded-xl shadow-md overflow-hidden"
                  >
                    <div className={`h-1 ${config.bg}`} />
                    <div className="p-6">
                      <div className="flex items-start gap-4">
                        <div
                          className={`w-10 h-10 ${config.bg} rounded-lg flex items-center justify-center shrink-0`}
                        >
                          <Icon className={`w-5 h-5 ${config.color}`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span
                              className={`px-2.5 py-1 text-[10px] font-semibold uppercase rounded ${config.bg} ${config.color}`}
                            >
                              {item.priority}
                            </span>
                            {item.publishedAt && (
                              <span className="text-xs text-gray-500">
                                {new Date(
                                  item.publishedAt
                                ).toLocaleDateString("id-ID", {
                                  day: "numeric",
                                  month: "long",
                                  year: "numeric",
                                })}
                              </span>
                            )}
                          </div>
                          <h2 className="font-heading font-bold text-gray-900 mb-2">
                            {item.title}
                          </h2>
                          <div
                            className="prose prose-sm max-w-none text-gray-600"
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(item.content),
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
