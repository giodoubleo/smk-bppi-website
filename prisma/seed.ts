import { PrismaClient } from "@prisma/client";
import bcrypt, { randomBytes } from "crypto";

const prisma = new PrismaClient();

async function hashPassword(password: string): Promise<string> {
  // Simple hash for development - in production use bcrypt
  return bcrypt.createHash("sha256").update(password).digest("hex");
}

async function main() {
  console.log("Seeding database...");

  // 1. Create Super Admin
  const rawPassword = process.env.ADMIN_SEED_PASSWORD ?? randomBytes(9).toString("base64url");
  const adminPassword = await hashPassword(rawPassword);
  console.log(`Admin created with password: ${rawPassword}`);
  console.log("Simpan password ini — tidak ada default yang bisa ditebak.");
  const admin = await prisma.user.upsert({
    where: { email: "admin@smkbppi.sch.id" },
    update: {},
    create: {
      name: "Administrator SMK BPPI",
      email: "admin@smkbppi.sch.id",
      password: adminPassword,
      role: "SUPER_ADMIN",
    },
  });
  console.log("Admin created:", admin.email);

  // 2. Create Categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: "akademik" },
      update: {},
      create: {
        name: "Akademik",
        slug: "akademik",
        description: "Berita seputar kegiatan akademik sekolah",
        color: "#22c55e",
      },
    }),
    prisma.category.upsert({
      where: { slug: "kegiatan" },
      update: {},
      create: {
        name: "Kegiatan",
        slug: "kegiatan",
        description: "Kegiatan sekolah dan ekstrakurikuler",
        color: "#3b82f6",
      },
    }),
    prisma.category.upsert({
      where: { slug: "ppdb" },
      update: {},
      create: {
        name: "PPDB",
        slug: "ppdb",
        description: "Informasi Penerimaan Peserta Didik Baru",
        color: "#f59e0b",
      },
    }),
    prisma.category.upsert({
      where: { slug: "prestasi" },
      update: {},
      create: {
        name: "Prestasi",
        slug: "prestasi",
        description: "Prestasi siswa dan sekolah",
        color: "#ef4444",
      },
    }),
    prisma.category.upsert({
      where: { slug: "info-sekolah" },
      update: {},
      create: {
        name: "Info Sekolah",
        slug: "info-sekolah",
        description: "Informasi umum sekolah",
        color: "#8b5cf6",
      },
    }),
  ]);
  console.log("Categories created:", categories.length);

  // 3. Create Majors (Jurusan)
  const majors = await Promise.all([
    prisma.major.upsert({
      where: { slug: "pplg" },
      update: {},
      create: {
        name: "Pengembangan Perangkat Lunak dan Gim (PPLG)",
        slug: "pplg",
        description:
          "Program keahlian yang mempelajari pengembangan perangkat lunak, website, mobile app, dan game. Siswa dibekali keterampilan pemrograman modern dan siap terjun ke industri teknologi.",
        competency:
          "Pemrograman Web (HTML, CSS, JavaScript, PHP, Python), Mobile App Development (Flutter, React Native), Game Development (Unity, Unreal Engine), Database Management, UI/UX Design, Software Testing",
        facilities:
          "Lab Pemrograman, Lab Game Development, Studio Desain UI/UX, Server Room, Akses Internet High-Speed",
        prospects:
          "Web Developer, Mobile App Developer, Game Developer, Software Engineer, UI/UX Designer, Database Administrator, IT Consultant",
        color: "#22c55e",
      },
    }),
    prisma.major.upsert({
      where: { slug: "tjkt" },
      update: {},
      create: {
        name: "Teknik Jaringan Komputer dan Telekomunikasi (TJKT)",
        slug: "tjkt",
        description:
          "Program keahlian yang fokus pada jaringan komputer, telekomunikasi, keamanan siber, dan infrastruktur IT. Siswa mempelajari konfigurasi jaringan, administrasi server, dan cybersecurity.",
        competency:
          "Konfigurasi Jaringan (Cisco, MikroTik), Administrasi Server, Cloud Computing, Cybersecurity, Fiber Optik, IoT (Internet of Things), Telekomunikasi",
        facilities:
          "Lab Jaringan Komputer (Cisco Networking Academy), Lab Server, Lab Fiber Optik, Lab IoT, Rack Server",
        prospects:
          "Network Engineer, System Administrator, Cloud Engineer, Cybersecurity Analyst, Telecommunication Engineer, IT Support, Network Architect",
        color: "#3b82f6",
      },
    }),
    prisma.major.upsert({
      where: { slug: "akl" },
      update: {},
      create: {
        name: "Akuntansi dan Keuangan Lembaga (AKL)",
        slug: "akl",
        description:
          "Program keahlian yang mempelajari akuntansi, pengelolaan keuangan, perpajakan, dan administrasi keuangan lembaga. Siswa dibekali kompetensi dalam penggunaan software akuntansi modern.",
        competency:
          "Pembukuan Akuntansi, Software Akuntansi (MYOB, Accurate, Zahir), Perpajakan, Analisis Keuangan, Auditing, Pengelolaan Keuangan Digital, Bank Mini",
        facilities:
          "Lab Akuntansi Digital, Bank Mini AKL (Praktik Perbankan), Perpustakaan, Lab Komputer, Ruang Praktik",
        prospects:
          "Staff Akuntansi, Auditor, Tax Consultant, Financial Analyst, Bank Officer, Bookkeeper, Finance Manager",
        color: "#f59e0b",
      },
    }),
    prisma.major.upsert({
      where: { slug: "acp" },
      update: {},
      create: {
        name: "Axioo Class Program - Kelas Industri (ACP)",
        slug: "acp",
        description:
          "Program kelas industri kolaborasi dengan Axioo yang memberikan pengalaman kerja langsung di industri IT. Siswa belajar langsung dari praktisi industri dan mendapat sertifikasi nasional.",
        competency:
          "Full Stack Web Development, Mobile Development, Software Quality Assurance, IT Project Management, Software Documentation, Team Collaboration",
        facilities:
          "Lab Industri (Standar Axioo), Perangkat Lunak Lisensi Industri, Mentor dari Axioo, Co-Working Space",
        prospects:
          "Full Stack Developer, Software Engineer, IT Project Manager, Quality Assurance Engineer, Technical Lead, IT Entrepreneur",
        color: "#ef4444",
      },
    }),
  ]);
  console.log("Majors created:", majors.length);

  // 4. Create News
  const news = await Promise.all([
    prisma.news.upsert({
      where: { slug: "penerimaan-siswa-baru-smk-bppi-2026" },
      update: {},
      create: {
        title: "Penerimaan Siswa Baru SMK BPPI Tahun Ajaran 2026/2027 Telah Dibuka",
        slug: "penerimaan-siswa-baru-smk-bppi-2026",
        excerpt:
          "SMK BPPI Baleendah membuka pendaftaran Penerimaan Peserta Didik Baru (PPDB) untuk tahun ajaran 2026/2027. Segera daftar dan raih masa depan cemerlang!",
        content: `
          <h2>Selamat Datang di SMK BPPI Baleendah</h2>
          <p>SMK BPPI Baleendah dengan bangga mengumumkan bahwa Penerimaan Peserta Didik Baru (PPDB) untuk tahun ajaran 2026/2027 telah resmi dibuka. Kami mengundang seluruh siswa-siswi berprestasi untuk bergabung bersama kami.</p>
          
          <h3>Program Keahlian yang Tersedia:</h3>
          <ul>
            <li><strong>PPLG</strong> - Pengembangan Perangkat Lunak dan Gim</li>
            <li><strong>TJKT</strong> - Teknik Jaringan Komputer dan Telekomunikasi</li>
            <li><strong>AKL</strong> - Akuntansi dan Keuangan Lembaga</li>
            <li><strong>ACP</strong> - Axioo Class Program (Kelas Industri)</li>
          </ul>
          
          <h3>Persyaratan Pendaftaran:</h3>
          <ul>
            <li>Foto copy Ijazah/SKL yang dilegalisir</li>
            <li>Foto copy SKHUN</li>
            <li>Foto copy KK</li>
            <li>Pas photo 3x4 (3 lembar)</li>
            <li>Surat kesehatan dari dokter</li>
          </ul>
          
          <p>Daftar sekarang melalui website PPDB kami atau kunjungi langsung ke sekolah.</p>
        `,
        status: "PUBLISHED",
        isFeatured: true,
        publishedAt: new Date(),
        categoryId: categories.find((c) => c.slug === "ppdb")!.id,
        authorId: admin.id,
      },
    }),
    prisma.news.upsert({
      where: { slug: "prestasi-siswa-pplg-juara-lomba-programming" },
      update: {},
      create: {
        title: "Siswa PPLG Raih Juara 1 Lomba Programming Tingkat Provinsi",
        slug: "prestasi-siswa-pplg-juara-lomba-programming",
        excerpt:
          "Muhammad Rizky, siswa kelas XII PPLG, berhasil meraih Juara 1 dalam Kompetisi Pemrograman Tingkat Provinsi Jawa Barat.",
        content: `
          <h2>Prestasi Membanggakan dari Siswa PPLG</h2>
          <p>Muhammad Rizky, siswa kelas XII Program Keahlian Pengembangan Perangkat Lunak dan Gim (PPLG), berhasil meraih Juara 1 dalam Kompetisi Pemrograman Tingkat Provinsi Jawa Barat yang diselenggarakan di Bandung.</p>
          
          <p>Kompetisi ini diikuti oleh lebih dari 50 peserta dari berbagai SMK se-Jawa Barat. Rizky menunjukkan kemampuan luar biasa dalam pemrograman algoritma dan data structures.</p>
          
          <h3>Persiapan dan Latihan</h3>
          <p>Rizky telah mempersiapkan diri selama 3 bulan dengan bimbingan intensif dari para guru PPLG. Latihan rutin setiap hari setelah jam sekolah memberikan hasil yang luar biasa.</p>
          
          <h3>Harapan Kedepan</h3>
          <p>Prestasi ini menjadi motivasi bagi seluruh siswa PPLG untuk terus berprestasi di bidang teknologi informasi.</p>
        `,
        status: "PUBLISHED",
        isFeatured: true,
        publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        categoryId: categories.find((c) => c.slug === "prestasi")!.id,
        authorId: admin.id,
      },
    }),
    prisma.news.upsert({
      where: { slug: "kerja-sama-industri-axioo" },
      update: {},
      create: {
        title: "SMK BPPI Perpanjang Kerjasama dengan PT Axioo Digital Indonesia",
        slug: "kerja-sama-industri-axioo",
        excerpt:
          "SMK BPPI Baleendah memperpanjang kerjasama strategis dengan PT Axioo Digital Indonesia untuk program kelas industri ACP.",
        content: `
          <h2>Perpanjangan Kerjasama Strategis</h2>
          <p>SMK BPPI Baleendah dengan bangga mengumumkan perpanjangan kerjasama strategis dengan PT Axioo Digital Indonesia untuk program Axioo Class Program (ACP) selama 3 tahun ke depan.</p>
          
          <h3>Lingkup Kerjasama</h3>
          <ul>
            <li>Pengembangan kurikulum berbasis industri</li>
            <li>Penyediaan mentor dari Axioo</li>
            <li>Sertifikasi nasional bagi siswa</li>
            <li>Program magang di industri</li>
            <li>Penyediaan perangkat lunak lisensi</li>
          </ul>
          
          <p>Kerjasama ini memastikan siswa ACP mendapatkan pendidikan berkualitas tinggi yang sesuai dengan kebutuhan industri teknologi.</p>
        `,
        status: "PUBLISHED",
        isFeatured: false,
        publishedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
        categoryId: categories.find((c) => c.slug === "info-sekolah")!.id,
        authorId: admin.id,
      },
    }),
    prisma.news.upsert({
      where: { slug: "kegiatan-prakerin-siswa-tjkt" },
      update: {},
      create: {
        title: "Kegiatan Prakerin Siswa TJKT di PT Telkom Indonesia",
        slug: "kegiatan-prakerin-siswa-tjkt",
        excerpt:
          "Siswa TJKT melaksanakan Praktek Kerja Lapangan (Prakerin) di PT Telkom Indonesia selama 6 bulan.",
        content: `
          <h2>Prakerin di PT Telkom Indonesia</h2>
          <p>Sebanyak 25 siswa Teknik Jaringan Komputer dan Telekomunikasi (TJKT) melaksanakan Praktek Kerja Lapangan (Prakerin) di PT Telkom Indonesia selama 6 bulan.</p>
          
          <h3>Divisi yang Ditempati</h3>
          <ul>
            <li>Divisi Network Operation Center (NOC)</li>
            <li>Divisi IT Infrastructure</li>
            <li>Divisi Customer Service</li>
            <li>Divisi Fiber Optic Installation</li>
          </ul>
          
          <p>Siswa mendapatkan pengalaman langsung bekerja di industri telekomunikasi terbesar di Indonesia.</p>
        `,
        status: "PUBLISHED",
        isFeatured: false,
        publishedAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000),
        categoryId: categories.find((c) => c.slug === "kegiatan")!.id,
        authorId: admin.id,
      },
    }),
  ]);
  console.log("News created:", news.length);

  // 5. Create Events
  const events = await Promise.all([
    prisma.event.upsert({
      where: { slug: "try-out-sbk" },
      update: {},
      create: {
        title: "Try Out Ujian SBK (Standar Berlaku Kompetensi)",
        slug: "try-out-sbk",
        date: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000),
        time: "08:00 - 15:00 WIB",
        location: "Lab Komputer SMK BPPI",
        description:
          "Try Out Ujian Standar Kompetensi untuk seluruh siswa kelas XII sebagai persiapan ujian akhir.",
        type: "AKADEMIK",
        status: "UPCOMING",
      },
    }),
    prisma.event.upsert({
      where: { slug: "seminar-karir" },
      update: {},
      create: {
        title: "Seminar Karir & Dunia Kerja untuk Siswa XII",
        slug: "seminar-karir",
        date: new Date(Date.now() + 28 * 24 * 60 * 60 * 1000),
        time: "09:00 - 12:00 WIB",
        location: "Aula SMK BPPI",
        description:
          "Seminar karir mengundang praktisi industri untuk berbagi pengalaman dan peluang kerja bagi lulusan SMK.",
        type: "AKADEMIK",
        status: "UPCOMING",
      },
    }),
    prisma.event.upsert({
      where: { slug: "lomba-programming-2026" },
      update: {},
      create: {
        title: "Lomba Programming SMK BPPI Internal Competition 2026",
        slug: "lomba-programming-2026",
        date: new Date(Date.now() + 35 * 24 * 60 * 60 * 1000),
        time: "08:00 - 17:00 WIB",
        location: "Lab Pemrograman SMK BPPI",
        description:
          "Kompetisi pemrograman internal untuk mengasah kemampuan coding siswa dari seluruh program keahlian.",
        type: "AKADEMIK",
        status: "UPCOMING",
      },
    }),
    prisma.event.upsert({
      where: { slug: "dies-natalis-2026" },
      update: {},
      create: {
        title: "Dies Natalis SMK BPPI ke-15",
        slug: "dies-natalis-2026",
        date: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
        time: "07:00 - 16:00 WIB",
        location: "Halaman SMK BPPI",
        description:
          "Perayaan Dies Natalis SMK BPPI ke-15 dengan berbagai acara: lomba, pameran karya siswa, dan pentas seni.",
        type: "SENI",
        status: "UPCOMING",
      },
    }),
  ]);
  console.log("Events created:", events.length);

  // 6. Create Gallery Albums
  const galleries = await Promise.all([
    prisma.gallery.upsert({
      where: { slug: "kegiatan-belajar-mengajar" },
      update: {},
      create: {
        title: "Kegiatan Belajar Mengajar",
        slug: "kegiatan-belajar-mengajar",
        description:
          "Dokumentasi kegiatan pembelajaran di kelas dan laboratorium SMK BPPI Baleendah.",
      },
    }),
    prisma.gallery.upsert({
      where: { slug: "prakerin-2025" },
      update: {},
      create: {
        title: "Prakerin 2025",
        slug: "prakerin-2025",
        description:
          "Dokumentasi kegiatan Praktek Kerja Lapangan siswa di berbagai mitra industri.",
      },
    }),
    prisma.gallery.upsert({
      where: { slug: "lomba-kompetensi-siswa" },
      update: {},
      create: {
        title: "Lomba Kompetensi Siswa (LKS)",
        slug: "lomba-kompetensi-siswa",
        description:
          "Dokumentasi partisipasi siswa dalam Lomba Kompetensi Siswa tingkat kabupaten dan provinsi.",
      },
    }),
  ]);
  console.log("Galleries created:", galleries.length);

  // 7. Create Achievements
  const achievements = await Promise.all([
    prisma.achievement.upsert({
      where: { id: "ach-1" },
      update: {},
      create: {
        title: "Juara 1 Lomba Programming Tingkat Provinsi",
        studentName: "Muhammad Rizky",
        category: "Lomba Programming",
        level: "Provinsi",
        rank: "Juara 1",
        year: 2026,
        majorId: majors.find((m) => m.slug === "pplg")!.id,
      },
    }),
    prisma.achievement.upsert({
      where: { id: "ach-2" },
      update: {},
      create: {
        title: "Juara 2 Kompetisi Jaringan Cisco Packet Tracer",
        studentName: "Ahmad Fauzi",
        category: "Kompetisi Jaringan",
        level: "Kabupaten",
        rank: "Juara 2",
        year: 2026,
        majorId: majors.find((m) => m.slug === "tjkt")!.id,
      },
    }),
    prisma.achievement.upsert({
      where: { id: "ach-3" },
      update: {},
      create: {
        title: "Juara 1 Olimpiade Akuntansi SMK Se-Kabupaten Bandung",
        studentName: "Siti Nurhaliza",
        category: "Olimpiade Akuntansi",
        level: "Kabupaten",
        rank: "Juara 1",
        year: 2026,
        majorId: majors.find((m) => m.slug === "akl")!.id,
      },
    }),
    prisma.achievement.upsert({
      where: { id: "ach-4" },
      update: {},
      create: {
        title: "Best Project Axioo Class Program 2025",
        studentName: "Tim ACP Kelas XII",
        category: "Proyek Industri",
        level: "Nasional",
        rank: "Best Project",
        year: 2025,
        majorId: majors.find((m) => m.slug === "acp")!.id,
      },
    }),
  ]);
  console.log("Achievements created:", achievements.length);

  // 8. Create Announcements
  const announcements = await Promise.all([
    prisma.announcement.upsert({
      where: { slug: "jadwal-mid-semester-genap-2026" },
      update: {},
      create: {
        title: "Jadwal Ujian Tengah Semester Genap 2025/2026",
        slug: "jadwal-mid-semester-genap-2026",
        content: `
          <h2>Jadwal UTS Genap 2025/2026</h2>
          <p>Diberitahukan kepada seluruh siswa SMK BPPI bahwa Ujian Tengah Semester (UTS) Genap Tahun Pelajaran 2025/2026 akan dilaksanakan pada:</p>
          <ul>
            <li><strong>Tanggal:</strong> 10 - 21 Maret 2026</li>
            <li><strong>Waktu:</strong> 07:30 - 10:00 WIB</li>
            <li><strong>Tempat:</strong> Ruang kelas masing-masing</li>
          </ul>
          <p>Siswa diharapkan mempersiapkan diri dengan baik dan membawa alat tulis yang diperlukan.</p>
        `,
        status: "PUBLISHED",
        priority: "HIGH",
        authorId: admin.id,
        publishedAt: new Date(),
      },
    }),
    prisma.announcement.upsert({
      where: { slug: "pengumuman-kelulusan-2025" },
      update: {},
      create: {
        title: "Pengumuman Kelulusan Kelas XII Tahun Pelajaran 2024/2025",
        slug: "pengumuman-kelulusan-2025",
        content: `
          <h2>Selamat untuk Lulusan SMK BPPI 2025</h2>
          <p>Dengan bangga kami umumkan bahwa seluruh siswa kelas XII SMK BPPI Baleendah telah dinyatakan LULUS dari Ujian Nasional dan Uji Kompetensi Keahlian tahun pelajaran 2024/2025.</p>
          <p>Tingkat kelulusan: <strong>100%</strong></p>
          <p>Terima kasih kepada seluruh guru, staf, dan orang tua atas dukungannya.</p>
        `,
        status: "PUBLISHED",
        priority: "NORMAL",
        authorId: admin.id,
        publishedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      },
    }),
  ]);
  console.log("Announcements created:", announcements.length);

  // 9. Create Pages
  const pages = await Promise.all([
    prisma.page.upsert({
      where: { slug: "profil-sekolah" },
      update: {},
      create: {
        title: "Profil SMK BPPI Baleendah",
        slug: "profil-sekolah",
        content: `
          <h1>Profil SMK BPPI Baleendah</h1>
          <p>SMK BPPI Baleendah adalah sekolah menengah kejuruan unggulan yang berlokasi di Jl. Adipati Agung No. 23, Kel. Baleendah, Kec. Baleendah, Kab. Bandung, Jawa Barat.</p>
          
          <h2>Sejarah Singkat</h2>
          <p>SMK BPPI Baleendah didirikan oleh Yayasan Badan Pendidikan Paripurna Indonesia (BPPI) dengan visi menciptakan lulusan yang berkompeten dengan kebutuhan industri serta berkarakter, religius, profesional, dan berwawasan lingkungan.</p>
          
          <h2>Visi</h2>
          <p>Menciptakan lulusan yang berkompeten dengan kebutuhan industri serta berkarakter, religius, profesional, dan berwawasan lingkungan.</p>
          
          <h2>Misi</h2>
          <ul>
            <li>Menyelenggarakan pendidikan berkualitas sesuai kebutuhan industri</li>
            <li>Mengembangkan potensi siswa secara optimal</li>
            <li>Menanamkan karakter religius dan profesional</li>
            <li>Menjalin kerjasama dengan dunia usaha dan industri</li>
          </ul>
        `,
        metaTitle: "Profil Sekolah | SMK BPPI - Sekolah Kejuruan Unggul Bandung",
        metaDesc:
          "Kenali lebih dekat SMK BPPI Baleendah, sekolah kejuruan unggulan di Bandung dengan program PPLG, TJKT, AKL, dan ACP.",
        isPublished: true,
      },
    }),
    prisma.page.upsert({
      where: { slug: "tentang-kami" },
      update: {},
      create: {
        title: "Tentang Kami",
        slug: "tentang-kami",
        content: `
          <h1>Tentang SMK BPPI Baleendah</h1>
          <p>SMK BPPI Baleendah merupakan bagian dari Yayasan Badan Pendidikan Paripurna Indonesia (BPPI) yang berkomitmen untuk memberikan pendidikan vokasi terbaik bagi generasi muda.</p>
          
          <h2>Identitas Sekolah</h2>
          <table>
            <tr><td>Nama Sekolah</td><td>SMK BPPI Baleendah</td></tr>
            <tr><td>NPSN</td><td>20259576</td></tr>
            <tr><td>Yayasan</td><td>Yayasan Badan Pendidikan Paripurna Indonesia</td></tr>
            <tr><td>Alamat</td><td>Jl. Adipati Agung No. 23, Kel. Baleendah, Kec. Baleendah, Kab. Bandung</td></tr>
            <tr><td>Telepon</td><td>(022) 5943340</td></tr>
            <tr><td>Email</td><td>smk@bppi.sch.id</td></tr>
          </table>
        `,
        metaTitle: "Tentang Kami | SMK BPPI - Sekolah Kejuruan Unggul Bandung",
        metaDesc:
          "Kenali lebih dekat profil, visi, misi, dan sejarah SMK BPPI Baleendah.",
        isPublished: true,
      },
    }),
  ]);
  console.log("Pages created:", pages.length);

  console.log("Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
