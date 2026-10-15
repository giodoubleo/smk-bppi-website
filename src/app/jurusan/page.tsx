import { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { SCHOOL_INFO } from "@/types";
import { Code2, Network, Calculator, Cpu, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Program Keahlian",
  description: `Program keahlian unggulan ${SCHOOL_INFO.name}: PPLG, TJKT, AKL, dan ACP. Pilih jurusan yang sesuai dengan minat dan bakat Anda.`,
  alternates: {
    canonical: "/jurusan",
  },
};

const majorIcons: Record<string, React.ElementType> = {
  pplg: Code2,
  tjkt: Network,
  akl: Calculator,
  acp: Cpu,
};

const majorGradients: Record<string, string> = {
  pplg: "from-green-500 to-emerald-600",
  tjkt: "from-blue-500 to-indigo-600",
  akl: "from-yellow-500 to-orange-600",
  acp: "from-red-500 to-rose-600",
};

export default async function JurusanPage() {
  let majors: Array<{
    id: string;
    name: string;
    slug: string;
    description: string;
    competency: string;
    color: string | null;
  }> = [];

  try {
    majors = await prisma.major.findMany({
      orderBy: { name: "asc" },
    });
  } catch {
    // Database not available
  }

  return (
    <>
      <div className="bg-gray-50 min-h-screen">
        {/* Page Header */}
        <div className="gradient-green py-16">
          <div className="container-custom text-center">
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
              Program Keahlian
            </h1>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              Pilih program keahlian yang sesuai dengan minat dan bakat Anda.
              Empat program unggulan siap membawa Anda ke masa depan.
            </p>
          </div>
        </div>

        <div className="container-custom py-10">
          {majors.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">
                Program keahlian belum tersedia.
              </p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-6">
            {majors.map((major) => {
              const Icon = majorIcons[major.slug] || Code2;
              const gradient =
                majorGradients[major.slug] || "from-green-500 to-emerald-600";
              return (
                <Link
                  key={major.id}
                  href={`/jurusan/${major.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden shadow-md card-hover"
                >
                  <div
                    className={`h-48 bg-gradient-to-br ${gradient} flex items-center justify-center relative overflow-hidden`}
                  >
                    <Icon className="w-20 h-20 text-white/90 group-hover:scale-110 transition-transform duration-300" />
                    <div className="absolute top-6 right-6 w-12 h-12 bg-white/20 rounded-full" />
                    <div className="absolute bottom-6 left-6 w-8 h-8 bg-white/10 rounded-full" />
                  </div>
                  <div className="p-6">
                    <h2 className="text-xl font-heading font-bold text-gray-900 mb-3 group-hover:text-school-dark transition-colors">
                      {major.name}
                    </h2>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {major.description}
                    </p>
                    <div className="flex items-center gap-1 text-school-dark font-semibold text-sm group-hover:gap-2 transition-all">
                      Lihat Detail Program
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              );
            })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
