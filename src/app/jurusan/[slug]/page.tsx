import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { SCHOOL_INFO } from "@/types";
import {
  ArrowLeft,
  BookOpen,
  Wrench,
  Building2,
  Briefcase,
  Award,
  CheckCircle,
} from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

function splitList(value: string): string[] {
  return value
    .split(/,(?![^()]*\))/)
    .map((s) => s.trim())
    .filter(Boolean);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const major = await prisma.major.findUnique({
      where: { slug },
      select: { name: true, description: true },
    });

    if (!major) {
      return { title: "Jurusan Tidak Ditemukan" };
    }

    return {
      title: `${major.name}`,
      description: major.description,
      alternates: {
        canonical: `/jurusan/${slug}`,
      },
    };
  } catch {
    return { title: "Jurusan Tidak Ditemukan" };
  }
}

export default async function JurusanDetailPage({ params }: PageProps) {
  const { slug } = await params;
  let major;
  try {
    major = await prisma.major.findUnique({
      where: { slug },
      include: {
        achievements: {
          orderBy: { year: "desc" },
          take: 5,
        },
      },
    });
  } catch {
    notFound();
  }

  if (!major) {
    notFound();
  }

const competencyList = splitList(major.competency);
const facilityList = splitList(major.facilities);
const prospectList = splitList(major.prospects);

  return (
    <>
      <div className="bg-gray-50 min-h-screen">
        {/* Hero Banner */}
        <div
          className="py-20 text-white"
          style={{
            background: `linear-gradient(135deg, ${major.color || "#166534"} 0%, ${major.color || "#22c55e"}88 100%)`,
          }}
        >
          <div className="container-custom">
            <Link
              href="/jurusan"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Semua Program Keahlian
            </Link>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4">
              {major.name}
            </h1>
            <p className="text-lg text-white/90 max-w-3xl">
              {major.description}
            </p>
          </div>
        </div>

        <div className="container-custom py-10">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Competency */}
              <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                  </div>
                  <h2 className="text-xl font-heading font-bold text-gray-900">
                    Kompetensi Keahlian
                  </h2>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  {competencyList.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg"
                    >
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                      <span className="text-sm text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Facilities */}
              <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Wrench className="w-5 h-5 text-purple-600" />
                  </div>
                  <h2 className="text-xl font-heading font-bold text-gray-900">
                    Fasilitas
                  </h2>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  {facilityList.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg"
                    >
                      <Building2 className="w-4 h-4 text-purple-500 mt-0.5 shrink-0" />
                      <span className="text-sm text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Career Prospects */}
              <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gold-100 rounded-lg flex items-center justify-center">
                    <Briefcase className="w-5 h-5 text-gold-600" />
                  </div>
                  <h2 className="text-xl font-heading font-bold text-gray-900">
                    Prospek Karir
                  </h2>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  {prospectList.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2 p-3 bg-gold-50 rounded-lg"
                    >
                      <Briefcase className="w-4 h-4 text-gold-600 mt-0.5 shrink-0" />
                      <span className="text-sm text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Info */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="font-heading font-bold text-gray-900 mb-4">
                  Informasi Singkat
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-500">Program Keahlian</span>
                    <span className="font-medium">{major.name}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-500">Akreditasi</span>
                    <span className="font-medium">A</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-500">Kuota Siswa</span>
                    <span className="font-medium">72 Siswa</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-gray-500">Durasi Belajar</span>
                    <span className="font-medium">3 Tahun</span>
                  </div>
                </div>
              </div>

              {/* Achievements */}
              {major.achievements.length > 0 && (
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h3 className="font-heading font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Award className="w-5 h-5 text-gold-500" />
                    Prestasi Terbaru
                  </h3>
                  <div className="space-y-3">
                    {major.achievements.map((ach) => (
                      <div
                        key={ach.id}
                        className="p-3 bg-gray-50 rounded-lg text-sm"
                      >
                        <p className="font-medium text-gray-900">{ach.title}</p>
                        <p className="text-gray-500 text-xs mt-1">
                          {ach.studentName} - {ach.rank} {ach.level}{" "}
                          {ach.year}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA */}
              <div className="bg-school-dark rounded-xl p-6 text-white text-center">
                <h3 className="font-heading font-bold text-lg mb-2">
                  Tertarik dengan {major.name}?
                </h3>
                <p className="text-white/80 text-sm mb-4">
                  Daftar sekarang dan raih masa depan cemerlang!
                </p>
                <Link href="/ppdb" className="btn-gold w-full">
                  DAFTAR SEKARANG
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
