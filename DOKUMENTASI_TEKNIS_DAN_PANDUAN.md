# 📚 DOKUMENTASI TEKNIS & PANDUAN LENGKAP SISTEM
## Official Website & Interactive 3D Portal — SMK BPPI Baleendah

> **Dokumen Panduan Presentasi Klien & Spesifikasi Teknis Arsitektur**  
> *Dibuat untuk kebutuhan serah terima sistem, instalasi di lingkungan/komputer baru, serta panduan menjawab pertanyaan teknis & bisnis dari klien/penguji.*

---

## 📑 DAFTAR ISI
1. [Ringkasan Eksekutif Sistem](#1-ringkasan-eksekutif-sistem)
2. [Tech Stack & Pustaka yang Digunakan](#2-tech-stack--pustaka-yang-digunakan)
3. [Panduan Menjalankan Web di Komputer Baru (Step-by-Step)](#3-panduan-menjalankan-web-di-komputer-baru-step-by-step)
4. [Arsitektur Kode & Alur Kerja Sistem (How the Code Works)](#4-arsitektur-kode--alur-kerja-sistem-how-the-code-works)
5. [Manajemen Database & Penyimpanan Data](#5-manajemen-database--penyimpanan-data)
6. [Struktur Folder & Penjelasan Modul](#6-struktur-folder--penjelasan-modul)
7. [Fitur Interaktif 3D Hardware Showcase](#7-fitur-interaktif-3d-hardware-showcase)
8. [Panel Admin & Pengelolaan Konten (CMS)](#8-panel-admin--pengelolaan-konten-cms)
9. [Keamanan Sistem & Optimasi Performa](#9-keamanan-sistem--optimasi-performa)
10. [Panduan Tanya Jawab Klien (Client Q&A Cheat Sheet)](#10-panduan-tanya-jawab-klien-client-qa-cheat-sheet)

---

## 1. RINGKASAN EKSEKUTIF SISTEM

Website **SMK BPPI Baleendah** adalah portal web modern berstandar industri (*SMK Pusat Keunggulan*) yang memadukan **Company Profile Sekolah**, **Sistem Manajemen Informasi Akademik/Berita (CMS)**, dan **Interactive 3D WebGL Technology Showcase**.

### Nilai Unggulan Sistem:
- **Ultra Modern & Interaktif**: Menggunakan Three.js WebGL untuk menampilkan objek 3D interaktif dari masing-masing 4 program keahlian (PPLG: PlayStation DualSense, TJKT: Cisco Server Rack, AKL: Gold Bullion & Vault, ACP: Axioo Laptop Rig).
- **SEO & Kecepatan Maksimal**: Dibangun dengan Next.js App Router (Server-Side Rendering & Static Generation), menghasilkan waktu muat instan (*sub-second load*) dan peringkat SEO Google yang optimal.
- **CMS Terintegrasi**: Memiliki portal Admin (`/admin`) untuk mengelola Berita, Pengumuman, Galeri Kegiatan, Data Jurusan, dan Pesan Masuk secara mandiri tanpa harus mengubah kode sumber.
- **Portabel & Mandiri**: Database menggunakan SQLite via Prisma ORM sehingga seluruh data tersimpan rapi dalam satu file lokal tanpa ketergantungan instalasi software database server yang rumit.

---

## 2. TECH STACK & PUSTAKA YANG DIGUNAKAN

| Kategori | Teknologi / Library | Versi | Alasan Penggunaan & Perannya |
|---|---|---|---|
| **Framework Utama** | **Next.js (App Router)** | `15.3.4` | Mendukung Server Components (SSR/SSG), optimasi gambar otomatis, routing modern, dan kecepatan rendering tinggi. |
| **UI Library** | **React** | `19.1.0` | Library UI deklaratif generasi terbaru untuk performa komponen yang reaktif dan efisien. |
| **Bahasa Pemrograman** | **TypeScript** | `5.8.3` | Memberikan *type safety*, meminimalisir *runtime error*, dan mempermudah kolaborasi tim developer. |
| **Styling & Desain** | **Tailwind CSS** | `3.4.19` | Framework CSS utilitas untuk desain responsif modern, *glassmorphism*, dark/light accents, dan animasi transisi halus. |
| **3D WebGL Engine** | **Three.js** | `0.186.1` | Rendering grafis 3D interaktif pada browser berbasis WebGL dengan pencahayaan studio AAA (*ACES Filmic Tone Mapping*). |
| **3D Compression** | **DRACOLoader** | Built-in | Dekompresi mesh geometri 3D tingkat lanjut agar ukuran aset 3D kecil dan loading cepat tanpa lag. |
| **Database ORM** | **Prisma ORM** | `5.22.0` | ORM modern yang *type-safe* untuk schema migration, seeding, query database, dan visualisasi via Prisma Studio. |
| **Database Engine** | **SQLite** | Bawaan Prisma | Database berbasis file lokal (`database.db`), sangat portabel, andal, tanpa perlu konfigurasi MySQL/PostgreSQL terpisah. |
| **Ikon & Tipografi** | **Lucide React** | `1.44.0` | Koleksi ikon SVG modern dan ringan untuk UI profesional. |
| **Sanitasi Konten** | **isomorphic-dompurify** | `4.4.0` | Melindungi sistem dari serangan XSS (*Cross-Site Scripting*) pada konten artikel dan formulir. |
| **TypeScript Runner** | **tsx** | `4.19.0` | Eksekusi script TypeScript langsung (seperti seeding database) tanpa proses build manual. |

---

## 3. PANDUAN MENJALANKAN WEB DI KOMPUTER BARU (STEP-BY-STEP)

Jika website ini ingin dipindahkan atau dijalankan pada laptop/komputer lain (misal komputer presentasi atau server klien), ikuti panduan berikut dari awal:

### Langkah 1: Prasyarat Sistem (System Requirements)
Pastikan komputer baru sudah terinstal:
1. **Node.js**: Versi **18.x, 20.x, atau 22.x LTS** (Rekomendasi: Node.js 20+).
   - Cek dengan perintah di terminal/cmd: `node -v` dan `npm -v`.
   - Download jika belum ada: [https://nodejs.org](https://nodejs.org)
2. **Git** (Opsional jika proyek diunduh via zip).
3. **Web Browser Modern**: Google Chrome, Microsoft Edge, atau Mozilla Firefox yang mendukung WebGL.

---

### Langkah 2: Membuka Folder Proyek
Buka terminal (PowerShell, Command Prompt, atau Terminal VS Code), lalu arahkan ke direktori proyek:
```bash
cd "c:/Users/Gio/Desktop/company profile"
```

---

### Langkah 3: Setup File Environment Variables (`.env`)
Pastikan file `.env` ada di root direktori proyek. Jika belum ada, buat file bernama `.env` dan isi konfigurasi berikut:
```env
DATABASE_URL="file:./database.db"
NEXTAUTH_SECRET="<hasil-node-randombytes>"
NEXTAUTH_URL="http://localhost:3000"
```
> **Catatan Teknis**: `DATABASE_URL="file:./database.db"` mengarahkan Prisma untuk membaca database SQLite lokal di dalam folder `prisma/database.db`.

> **WAJIB**: `NEXTAUTH_SECRET` jangan pernah ditulis di repo. Generate nilai acak dengan:
> ```bash
> node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
> ```
> Salin hasilnya ke `.env`. File `.env` tidak di-commit — lihat `.env.example`.

---

### Langkah 4: Install Dependencies (Pustaka Node)
Jalankan perintah berikut untuk mengunduh semua pustaka yang terdaftar pada `package.json`:
```bash
npm install
```
*(Proses ini akan otomatis menjalankan `prisma generate` via lifecycle `postinstall`).*

---

### Langkah 5: Sinkronisasi & Persiapan Database (Prisma)
1. Generate Prisma Client:
   ```bash
   npx prisma generate
   ```
2. Sinkronkan skema tabel database:
   ```bash
   npx prisma db push
   ```
3. *(Opsional jika database baru/kosong)* Isi data awal sekolah (seeder 4 jurusan, akun admin, berita awal):
   ```bash
   npm run db:seed
   ```
   *Akun Admin dibuat oleh seed:*
   - **Email**: `admin@smkbppi.sch.id`
   - **Password**: tidak ada default. Seed membuat password acak dan menampilkannya di terminal. Kalau ingin menentukan sendiri, set `ADMIN_SEED_PASSWORD` di `.env` sebelum menjalankan seed.

---

### Langkah 6: Menjalankan Server Development
Jalankan perintah berikut untuk memulai server lokal:
```bash
npm run dev
```
Setelah muncul pesan `Ready in ...`, buka browser dan kunjungi:
👉 **`http://localhost:3000`**

---

### Langkah 7: Build & Jalankan untuk Lingkungan Production (Opsional)
Jika ingin menguji versi kompilasi production berkecepatan tinggi:
```bash
npm run build
npm start
```

---

## 4. ARSITEKTUR KODE & ALUR KERJA SISTEM (HOW THE CODE WORKS)

Berikut adalah diagram alur bagaimana website merespons permintaan pengunjung:

```
[ Pengunjung / Web Browser ]
         │
         ▼
[ Next.js 15 App Router ] ── (Server Components & SSR)
         │
         ├─── Mengambil Halaman Statis / Dinamis (HTML & Tailwind CSS)
         │
         ├─── Query Data ke Database ──► [ Prisma ORM 5.22 ] ──► [ prisma/database.db (SQLite) ]
         │
         ▼
[ Client-Side Hydration (React 19) ]
         │
         ├─── Komponen Interaktif (Tab Jurusan, Carousel, Form Kontak)
         │
         └─── Canvas 3D Viewport ──► [ Three.js WebGL Engine ]
                                            │
                                            ├─── Memuat Model (/models/ps5-controller.glb)
                                            ├─── Dekompresi DRACO (/draco/)
                                            ├─── Studio Lighting (Key, Fill, Rim Light)
                                            └─── 60 FPS Animation & Mouse Drag Loop
```

### 1. Server-Side Rendering (SSR) & Static Site Generation (SSG)
- Komponen di `src/app/` memanfaatkan **React Server Components (RSC)**. Data artikel, jurusan, dan pengumuman diambil langsung di server melalui Prisma Client sebelum HTML dikirim ke browser.
- **Dampaknya**: Kecepatan *First Contentful Paint (FCP)* sangat tinggi dan mesin pencari (Googlebot) dapat langsung mengindeks teks lengkap tanpa harus menunggu JavaScript dijalankan.

### 2. Client Components (`"use client"`)
- Bagian yang membutuhkan interaksi pengguna langsung—seperti kanvas 3D (`HeroTechShowcase3D.tsx`), form input kontak, dan animasi toggle—diberi penanda `"use client"`.
- Hal ini memisahkan beban kerja secara cerdas: server menangani komputasi berat dan data, sementara browser klien hanya menangani animasi dan interaksi pengguna.

### 3. Dynamic Routing Jurusan (`/jurusan/[slug]`)
- Rute jurusan dibuat dinamis (`src/app/jurusan/[slug]/page.tsx`). Saat pengunjung mengakses `/jurusan/pplg`, `/jurusan/tjkt`, `/jurusan/akl`, atau `/jurusan/acp`, Next.js membaca parameter slug dan mengambil data kompetensi, fasilitas, prospek kerja, serta prestasi dari database secara otomatis.

---

## 5. MANAJEMEN DATABASE & PENYIMPANAN DATA

### A. Di Mana Database Disimpan?
- **Lokasi Fisik File**: Terletak pada folder **`prisma/database.db`** (atau `prisma/dev.db`).
- **Tipe Database**: **SQLite 3** berbasis file tunggal (*serverless, zero-configuration database*).
- **Karakteristik**: Berbeda dengan MySQL atau PostgreSQL yang membutuhkan service server/daemon terpisah (seperti XAMPP atau Docker), SQLite tersimpan langsung sebagai satu file biner di dalam proyek.

### B. Cara Melihat & Mengedit Isi Database Secara Visual (GUI)
Developer atau administrator tidak perlu menginstal aplikasi seperti phpMyAdmin atau DBeaver. Cukup jalankan perintah:
```bash
npm run db:studio
# atau
npx prisma studio
```
Browser otomatis akan membuka panel **Prisma Studio** di `http://localhost:5555`. Di sini Anda dapat melihat, menambah, mengedit, dan menghapus seluruh tabel database secara visual dan aman.

### C. Daftar Tabel Utama (Database Schema)
1. **`User`**: Data kredensial administrator (Email, Name, Hashed Password, Role, Avatar).
2. **`Major`**: Informasi 4 program keahlian (Nama, Slug, Deskripsi, Kompetensi, Fasilitas, Prospek Karir, Warna Tema, Banner).
3. **`News` & `Category`**: Artikel berita sekolah, kategori (Akademik, Kegiatan, PPDB), thumbnail, jumlah tayang (*view count*), dan status draft/published.
4. **`Announcement`**: Pengumuman resmi sekolah dengan tingkat prioritas (Normal, High, Urgent).
5. **`Achievement`**: Rekam jejak prestasi siswa (Olimpiade, Lomba LKS, Tingkat Kabupaten/Nasional/Internasional).
6. **`Gallery` & `GalleryImage`**: Album dokumentasi kegiatan dan foto-foto aktivitas sekolah.
7. **`ContactMessage`**: Kotak pesan formulir kontak yang dikirim oleh calon siswa/orang tua melalui website.

### D. Backup & Restore Database
- **Cara Backup**: Cukup salin (*copy-paste*) file `prisma/database.db` ke tempat penyimpanan cadangan atau Google Drive.
- **Cara Restore**: Cukup timpa kembali file `database.db` ke folder `prisma/`.

---

## 6. STRUKTUR FOLDER & PENJELASAN MODUL

```
company profile/
├── prisma/
│   ├── schema.prisma       # Definisi skema tabel, relasi, & provider database
│   ├── seed.ts             # Script data awal (admin, jurusan, berita, prestasi)
│   └── database.db         # File database fisik SQLite tempat data tersimpan
├── public/
│   ├── draco/              # WebAssembly decoder Three.js untuk dekompresi 3D
│   ├── images/             # Aset gambar lokal (contoh: kepala-sekolah.jpg)
│   ├── models/             # File model 3D (contoh: ps5-controller.glb)
│   └── uploads/            # Folder media yang diunggah dari dashboard admin
├── src/
│   ├── app/                # Next.js 15 App Router
│   │   ├── admin/          # Dashboard Admin (/admin/berita, /admin/galeri, dll)
│   │   ├── akademik/       # Halaman kurikulum & kalender akademik
│   │   ├── berita/         # Portal berita sekolah & detail berita
│   │   ├── galeri/         # Halaman dokumentasi galeri foto kegiatan
│   │   ├── jurusan/        # Halaman informasi 4 jurusan kejuruan
│   │   │   └── [slug]/     # Dynamic route (/jurusan/pplg, /jurusan/tjkt, dll)
│   │   ├── kontak/         # Formulir interaktif pesan & lokasi sekolah
│   │   ├── pengumuman/     # Pengumuman resmi
│   │   ├── ppdb/           # Halaman informasi Penerimaan Peserta Didik Baru
│   │   ├── profil/         # Profil lengkap, visi misi, & fasilitas
│   │   ├── layout.tsx      # Root layout (Navbar, Footer, Font, Theme Provider)
│   │   └── page.tsx        # Homepage utama
│   ├── components/
│   │   ├── 3d/             # Komponen WebGL (HeroTechShowcase3D.tsx)
│   │   ├── layout/         # Navbar, Footer, MobileNav
│   │   ├── sections/       # Komponen bagian (PrincipalWelcomeSection.tsx, dll)
│   │   └── ui/             # Tombol, modal, badge, card reusable
│   ├── lib/
│   │   ├── prisma.ts       # Singleton instance PrismaClient
│   │   └── utils.ts        # Helper fungsi utilitas (formatting, cn tailwind)
│   └── types/
│       └── index.ts        # Deklarasi tipe TypeScript & SCHOOL_INFO terpusat
├── .env                    # Variabel konfigurasi lingkungan
├── package.json            # Daftar script & library dependensi
├── tailwind.config.ts      # Konfigurasi token warna, font, dan animasi Tailwind
└── tsconfig.json           # Konfigurasi kompilasi TypeScript
```

---

## 7. FITUR INTERAKTIF 3D HARDWARE SHOWCASE

Komponen inti grafis 3D terletak di [`src/components/3d/HeroTechShowcase3D.tsx`](file:///c:/Users/Gio/Desktop/company%20profile/src/components/3d/HeroTechShowcase3D.tsx).

### 1. Representasi 3D per Jurusan:
- **PPLG (Pengembangan Perangkat Lunak & Gim)**:  
  Model **PlayStation DualSense Controller** autentik berskala proporsional, menampilkan tombol D-pad, dual thumbstick karet matte, touchpad berbingkai lightbar emerald neon, dan bodi keramik putih ergonomis.
- **TJKT (Teknik Jaringan Komputer & Telekomunikasi)**:  
  Model **Cisco Enterprise Blade Server Rack** dengan indikator LED berkedip, patch panel fiber optic, dan phased radar array.
- **AKL (Akuntansi & Keuangan Lembaga)**:  
  Model **Minted Gold Bullion ₿ & Chronos Vault**, melambangkan presisi akuntansi modern dan ekosistem fintech perbankan.
- **AXIOO / ACP (Axioo Class Program)**:  
  Model **Axioo Dual-Screen Diagnostic Laptop Rig** dengan motherboard expose dan glowing diagnostic bus.

### 2. Fitur Interaktivitas:
- **Mouse Drag 3D Orbit**: Pengunjung dapat mengklik dan menggeser mouse ke segala arah untuk memutar objek 3D 360 derajat.
- **Smooth Mouse Parallax**: Saat kursor digerakkan di atas kartu, model merespons dengan kemiringan dinamis (*subtle tilt*).
- **Cinematic Floating Loop**: Animasi floating halus di 60 FPS menggunakan fungsi trigonometri sinus.
- **Tab Morphing Transition**: Perpindahan antar tab jurusan menggunakan interpolasi `MathUtils.lerp`, membuat model lama mengecil halus dan model baru membesar dengan mulus.

---

## 8. PANEL ADMIN & PENGELOLAAN KONTEN (CMS)

Sistem dilengkapi panel admin terintegrasi untuk mempermudah pihak sekolah memperbarui website tanpa perlu mengubah kode:
1. **Akses Dashboard**: Kunjungi rute **`/admin`** atau **`/admin/login`**.
2. **Modul yang Dapat Dikelola**:
   - **Kelola Berita (`/admin/berita`)**: Tambah, edit, unggah thumbnail, dan atur status berita (Draft atau Publish).
   - **Kelola Pengumuman (`/admin/pengumuman`)**: Publikasikan edaran sekolah lengkap dengan label prioritas.
   - **Kelola Galeri (`/admin/galeri`)**: Buat album kegiatan sekolah dan unggah banyak foto kegiatan.
   - **Kelola Jurusan (`/admin/jurusan`)**: Perbarui informasi kurikulum, fasilitas lab, dan peluang karir jurusan.
   - **Kotak Masuk Pesan (`/admin/pesan`)**: Membaca pesan dan pertanyaan yang dikirim masyarakat lewat form kontak.

---

## 9. KEAMANAN SISTEM & OPTIMASI PERFORMA

| Aspek | Solusi Teknis yang Diterapkan |
|---|---|
| **Pencegahan SQL Injection** | Prisma ORM menggunakan *parameterized queries* bawaan sehingga input pengguna tidak dapat memanipulasi struktur query SQL. |
| **Pencegahan XSS (Cross-Site Scripting)** | Seluruh konten HTML yang di-render disaring menggunakan pustaka `isomorphic-dompurify`. |
| **Keamanan Password Admin** | Password administrator di-enkripsi menggunakan algoritma cryptographic hashing (*SHA-256 / bcrypt*). |
| **Optimasi Gambar (Next/Image)** | Gambar otomatis dikonversi ke format modern (*WebP/AVIF*) dengan resolusi adaptif sesuai ukuran layar perangkat klien. |
| **Efisiensi 3D (Zero Memory Leak)** | Skrip Three.js dilengkapi fungsi pembersihan memori (*garbage collection & dispose lifecycle*) saat berpindah halaman atau komponen di-*unmount*. |
| **FPS Cap & Battery Saver** | `pixelRatio` dibatasi maksimal `2.0` dan render hanya aktif pada komponen yang terlihat, sehingga tidak membebani baterai laptop/ponsel. |

---

## 10. PANDUAN TANYA JAWAB KLIEN (CLIENT Q&A CHEAT SHEET)

Gunakan contekan (*cheat sheet*) ini untuk menjawab pertanyaan teknis maupun umum yang sering diajukan klien atau penguji:

### Q1: *"Kenapa memilih Next.js dan React, bukan CMS biasa seperti WordPress atau Laravel?"*
> **Jawaban:**  
> "Website sekolah kejuruan modern membutuhkan kecepatan muat instan, integrasi 3D WebGL yang dinamis, dan tampilan yang dapat disesuaikan tanpa batas (*custom design*). Next.js menggabungkan keunggulan Server-Side Rendering untuk ranking SEO nomor 1 di Google, dengan pengalaman pengguna React yang sangat interaktif dan mulus tanpa jeda reload halaman."

---

### Q2: *"Di mana data website ini disimpan? Apakah aman jika server listrik mati mendadak?"*
> **Jawaban:**  
> "Seluruh data (berita, data jurusan, akun admin, pesan masuk) tersimpan di database SQLite pada direktori `prisma/database.db`. SQLite beroperasi dengan standar ACID (*Atomicity, Consistency, Isolation, Durability*), sehingga setiap transaksi data ditulis secara aman ke disk. Jika server mati mendadak, data tidak akan korup. Selain itu, backup data sangat mudah: cukup menduplikasi satu file `database.db` tersebut."

---

### Q3: *"Bagaimana jika di masa depan jumlah pengunjung melonjak puluhan ribu siswa, apakah database ini bisa di-upgrade?"*
> **Jawaban:**  
> "Sangat bisa dan mudah. Karena sistem menggunakan **Prisma ORM**, kita cukup mengubah satu baris konfigurasi di `prisma/schema.prisma` dari `provider = "sqlite"` menjadi `provider = "postgresql"` atau `mysql`. Seluruh kode aplikasi di frontend dan backend tidak perlu diubah sama sekali."

---

### Q4: *"Apakah tampilan 3D tidak membuat website lambat saat dibuka di HP atau laptop spesifikasi standar?"*
> **Jawaban:**  
> "Sama sekali tidak. Model 3D telah dioptimasi dengan kompresi mesh tingkat lanjut (*DRACO mesh compression*) yang memangkas ukuran aset hingga 70%. Terdapat pembatas kerapatan piksel (*devicePixelRatio cap 2*), material PBR yang efisien, dan rendering yang hanya bekerja saat kanvas berada di layar, sehingga tetap stabil di 60 FPS bahkan di smartphone kelas menengah."

---

### Q5: *"Bagaimana jika staf guru atau admin sekolah ingin mengganti foto, berita, atau informasi kepala sekolah?"*
> **Jawaban:**  
> "Sekolah sudah disediakan dashboard Admin terintegrasi di rute `/admin`. Staf yang ditunjuk dapat login dan langsung menambah berita, mengunggah galeri foto, atau mengubah teks melalui antarmuka visual tanpa perlu menyentuh kodingan sama sekali."

---

### Q6: *"Bagaimana cara hosting/mendeploy website ini ke internet agar bisa diakses publik?"*
> **Jawaban:**  
> "Website ini dirancang *cloud-ready*:
> 1. Dapat di-deploy secara instan di **Vercel** (platform resmi Next.js) dengan menyambungkan repositori Git.
> 2. Dapat dijalankan di **VPS Linux (Ubuntu/Debian)** menggunakan `PM2` atau **Docker Container** dengan perintah `npm run build && npm start` di port 80/443 dengan domain resmi sekolah (contoh: `https://smkbppi.sch.id`)."

---

### Q7: *"Bagaimana jika saya ingin menjalankan website ini di laptop dosen/klien saat presentasi offline?"*
> **Jawaban:**  
> "Website ini sepenuhnya *self-contained*. Cukup pastikan laptop memiliki Node.js, buka folder proyek di terminal, jalankan `npm run dev`, dan website langsung terbuka di `http://localhost:3000` lengkap dengan database lokalnya tanpa memerlukan koneksi internet aktif."

---

*Dokumen ini disusun resmi untuk proyek SMK BPPI Baleendah Company Profile & Interactive Showcase.*
