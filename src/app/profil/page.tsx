import { Metadata } from "next";
import Link from "next/link";
import { SCHOOL_INFO } from "@/types";
import {
  Award,
  Briefcase,
  Globe,
  Target,
  Users,
  Lightbulb,
  Heart,
  Building2,
  BookOpen,
  Wifi,
  Fingerprint,
  Landmark,
  Library,
  LayoutGrid,
  Mosque,
  Wrench,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Profil Sekolah",
  description: `Kenali lebih dekat ${SCHOOL_INFO.name}, visi, misi, sejarah, dan fasilitas sekolah kejuruan unggulan di Bandung.`,
  alternates: {
    canonical: "/profil",
  },
};

const visionPoints = [
  {
    icon: Target,
    title: "Kompeten",
    description: "Lulusan yang sesuai kebutuhan industri",
  },
  {
    icon: Heart,
    title: "Berkarakter",
    description: "Memiliki moral dan etika yang kuat",
  },
  {
    icon: Globe,
    title: "Religius",
    description: "Berpegang teguh pada nilai keagamaan",
  },
  {
    icon: Lightbulb,
    title: "Profesional",
    description: "Bekerja dengan standar industri",
  },
];

const facilities = [
  { icon: Building2, name: "Lab Komputer" },
  { icon: Wrench, name: "Studio Praktik" },
  { icon: Wifi, name: "WiFi Area" },
  { icon: Fingerprint, name: "Absensi Fingerprint" },
  { icon: Landmark, name: "Bank Mini AKL" },
  { icon: Library, name: "Perpustakaan" },
  { icon: LayoutGrid, name: "Lapangan" },
  { icon: Mosque, name: "Masjid" },
];

export default function ProfilPage() {
  return (
    <>
      <div className="bg-gray-50 min-h-screen">
        {/* Hero */}
        <div className="gradient-green py-16">
          <div className="container-custom text-center">
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
              Profil Sekolah
            </h1>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              Mengenal lebih dekat {SCHOOL_INFO.name}
            </p>
          </div>
        </div>

        <div className="container-custom py-12">
          {/* About */}
          <section id="tentang-kami" className="bg-white rounded-2xl shadow-md p-8 mb-10 scroll-mt-24">
            <h2 className="section-heading text-2xl mb-6">Tentang Kami</h2>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {SCHOOL_INFO.name} adalah sekolah menengah kejuruan unggulan
                  yang berlokasi di {SCHOOL_INFO.address}. Didirikan oleh{" "}
                  {SCHOOL_INFO.foundation}, kami berkomitmen untuk memberikan
                  pendidikan vokasi terbaik bagi generasi muda.
                </p>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Dengan empat program keahlian unggulan yaitu PPLG, TJKT,
                  AKL, dan ACP (Axioo Class Program), kami siap mencetak lulusan
                  yang berkompeten dan siap menghadapi tantangan dunia industri.
                </p>
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="p-4 bg-primary-50 rounded-xl text-center">
                    <div className="text-2xl font-bold text-school-dark">
                      NPSN
                    </div>
                    <div className="text-sm text-gray-600">
                      {SCHOOL_INFO.npsn}
                    </div>
                  </div>
                  <div className="p-4 bg-gold-50 rounded-xl text-center">
                    <div className="text-2xl font-bold text-gold-700">
                      Akreditasi
                    </div>
                    <div className="text-sm text-gray-600">A</div>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl aspect-square flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 bg-school-dark rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-3xl">BPPI</span>
                  </div>
                  <p className="text-school-dark font-semibold">
                    SMK BPPI Baleendah
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Vision */}
          <section id="visi-misi" className="bg-white rounded-2xl shadow-md p-8 mb-10 scroll-mt-24">
            <h2 className="section-heading text-2xl mb-6">Visi & Misi</h2>
            <div className="bg-primary-50 rounded-xl p-6 mb-8">
              <h3 className="font-heading font-bold text-lg text-school-dark mb-2">
                Visi
              </h3>
              <p className="text-gray-700 italic">
                &ldquo;{SCHOOL_INFO.vision}&rdquo;
              </p>
            </div>
            <h3 className="font-heading font-bold text-lg text-gray-900 mb-4">
              Misi
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {visionPoints.map((point, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl"
                >
                  <div className="w-10 h-10 bg-school-dark rounded-lg flex items-center justify-center shrink-0">
                    <point.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {point.title}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {point.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Facilities */}
          <section id="fasilitas" className="bg-white rounded-2xl shadow-md p-8 scroll-mt-24">
            <h2 className="section-heading text-2xl mb-6">Fasilitas</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {facilities.map((facility, index) => (
                <div
                  key={index}
                  className="p-4 bg-gray-50 rounded-xl text-center card-hover"
                >
                  <facility.icon className="w-8 h-8 text-school-dark mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-700">
                    {facility.name}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
