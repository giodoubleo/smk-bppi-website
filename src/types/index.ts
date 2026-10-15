export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface SchoolInfo {
  name: string;
  npsn: string;
  foundation: string;
  address: string;
  phone: string;
  email: string;
  vision: string;
  motto: string;
  principal: string;
}

export const SCHOOL_INFO: SchoolInfo = {
  name: "SMK BPPI Baleendah",
  npsn: "20228532",
  foundation: "Yayasan Badan Pendidikan Paripurna Indonesia (BPPI)",
  address:
    "Jl. Adipati Agung No. 23, Kel. Baleendah, Kec. Baleendah, Kab. Bandung, Jawa Barat 40375",
  phone: "(022) 5940324",
  email: "info@smkbppi.sch.id",
  vision:
    "Menciptakan lulusan yang berkompeten dengan kebutuhan industri serta berkarakter, religius, profesional, dan berwawasan lingkungan.",
  motto: "Tumbuh Bersama & Berkarakter",
  principal: "Dede Sumarna, S.Pd., M.M.",
};

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Profil",
    href: "/profil",
    children: [
      { label: "Tentang Kami", href: "/profil#tentang-kami" },
      { label: "Visi & Misi", href: "/profil#visi-misi" },
      { label: "Fasilitas", href: "/profil#fasilitas" },
    ],
  },
  {
    label: "Jurusan",
    href: "/jurusan",
    children: [
      { label: "PPLG", href: "/jurusan/pplg" },
      { label: "TJKT", href: "/jurusan/tjkt" },
      { label: "AKL", href: "/jurusan/akl" },
      { label: "ACP", href: "/jurusan/acp" },
    ],
  },
  { label: "Akademik", href: "/akademik" },
  { label: "Pengumuman", href: "/pengumuman" },
  { label: "Berita", href: "/berita" },
  { label: "Galeri", href: "/galeri" },
  { label: "PPDB", href: "/ppdb" },
  { label: "Kontak", href: "/kontak" },
];

export const FACILITIES = [
  {
    name: "Lab Komputer",
    icon: "computer",
    description: "Laboratorium komputer lengkap dengan perangkat terbaru",
  },
  {
    name: "Studio Praktik",
    icon: "wrench",
    description: "Studio praktik untuk pembelajaran hands-on",
  },
  {
    name: "WiFi Area",
    icon: "wifi",
    description: "Akses internet gratis di seluruh area sekolah",
  },
  {
    name: "Absensi Fingerprint",
    icon: "fingerprint",
    description: "Sistem absensi digital berbasis sidik jari",
  },
  {
    name: "Bank Mini AKL",
    icon: "bank",
    description: "Bank mini untuk praktik perbankan siswa AKL",
  },
  {
    name: "Perpustakaan",
    icon: "book",
    description: "Perpustakaan dengan koleksi buku lengkap",
  },
  {
    name: "Lapangan",
    icon: "field",
    description: "Lapangan upacara dan olahraga",
  },
  {
    name: "Masjid",
    icon: "mosque",
    description: "Tempat ibadah untuk kegiatan keagamaan",
  },
];

export const HIGHLIGHTS = [
  {
    title: "Kurikulum Industri",
    description:
      "Kurikulum berbasis kebutuhan industri dengan standar kompetensi nasional",
    icon: "curriculum",
  },
  {
    title: "Fasilitas Modern",
    description:
      "Lab modern, studio praktik, dan perangkat teknologi terkini",
    icon: "facilities",
  },
  {
    title: "Beasiswa",
    description:
      "Program beasiswa dari pemerintah dan mitra industri",
    icon: "scholarship",
  },
  {
    title: "Magang Internasional",
    description:
      "Program magang di perusahaan nasional dan internasional",
    icon: "internship",
  },
  {
    title: "Modern Lab",
    description:
      "Laboratorium berstandar industri dengan peralatan terbaru",
    icon: "lab",
  },
];
