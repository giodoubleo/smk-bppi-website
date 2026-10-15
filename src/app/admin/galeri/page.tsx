"use client";

import { useEffect, useState, useRef } from "react";
import {
  Images,
  Plus,
  Search,
  Edit2,
  Trash2,
  ExternalLink,
  Image as ImageIcon,
  Loader2,
  X,
  Calendar,
  Upload,
  Link2,
  Info,
  Sparkles,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";

interface GalleryItem {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  coverImage: string | null;
  createdAt: string;
  _count: { images: number };
}

// Preset foto contoh untuk kemudahan testing admin
const PRESET_COVERS = [
  {
    label: "Lab Komputer & Coding PPLG",
    url: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=80",
  },
  {
    label: "Perakitan Hardware Axioo",
    url: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=800&auto=format&fit=crop&q=80",
  },
  {
    label: "Praktik Jaringan & Server TJKT",
    url: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&auto=format&fit=crop&q=80",
  },
  {
    label: "Simulasi Bank Mini AKL",
    url: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&auto=format&fit=crop&q=80",
  },
];

const PRESET_SAMPLE_PHOTOS = [
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&auto=format&fit=crop&q=80",
];

const CATEGORY_TAGS = [
  "Praktik Kejuruan",
  "Kunjungan Industri",
  "Lomba & Prestasi",
  "Ekstrakurikuler",
  "Acara & Upacara",
];

export default function AdminGaleriPage() {
  const [albums, setAlbums] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Form Fields
  const [title, setTitle] = useState("");
  const [categoryTag, setCategoryTag] = useState("");
  const [description, setDescription] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [coverImageError, setCoverImageError] = useState(false);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [inputUrl, setInputUrl] = useState("");

  const coverFileInputRef = useRef<HTMLInputElement>(null);
  const multipleFileInputRef = useRef<HTMLInputElement>(null);

  const fetchGalleries = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/galeri");
      const json = await res.json();
      if (json.ok) setAlbums(json.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGalleries();
  }, []);

  const openCreateModal = () => {
    setEditingId(null);
    setTitle("");
    setCategoryTag("Praktik Kejuruan");
    setDescription("");
    setCoverImage("");
    setCoverImageError(false);
    setImageUrls([]);
    setInputUrl("");
    setIsModalOpen(true);
  };

  const openEditModal = (item: GalleryItem) => {
    setEditingId(item.id);
    setTitle(item.title);
    setCategoryTag("");
    setDescription(item.description || "");
    setCoverImage(item.coverImage || "");
    setCoverImageError(false);
    setImageUrls([]);
    setInputUrl("");
    setIsModalOpen(true);
  };

  // Handle Cover File Upload via FileReader
  const handleCoverFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert("Ukuran file foto maksimal 2MB agar loading website tetap cepat.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setCoverImage(event.target.result as string);
        setCoverImageError(false);
      }
    };
    reader.readAsDataURL(file);
  };

  // Handle Multi-file Upload for Album Photos
  const handleMultipleFilesUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    files.forEach((file) => {
      if (file.size > 2 * 1024 * 1024) {
        alert(`File ${file.name} melebihi batas 2MB.`);
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImageUrls((prev) => [...prev, event.target!.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  // Add URL from input text
  const handleAddUrl = () => {
    if (!inputUrl.trim()) return;
    setImageUrls((prev) => [...prev, inputUrl.trim()]);
    setInputUrl("");
  };

  // Remove photo from album list
  const handleRemovePhoto = (index: number) => {
    setImageUrls((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("Judul album wajib diisi!");
      return;
    }

    try {
      setSubmitting(true);
      const url = "/api/admin/galeri";
      const method = editingId ? "PUT" : "POST";

      const finalDescription = categoryTag
        ? `[${categoryTag}] ${description}`.trim()
        : description.trim();

      const payload = editingId
        ? {
            id: editingId,
            title: title.trim(),
            description: finalDescription || null,
            coverImage: coverImage.trim() || null,
            imageUrls,
          }
        : {
            title: title.trim(),
            description: finalDescription || null,
            coverImage: coverImage.trim() || null,
            imageUrls,
          };

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (json.ok) {
        setIsModalOpen(false);
        fetchGalleries();
      } else {
        alert(json.error || "Gagal menyimpan album galeri");
      }
    } catch (err) {
      alert("Terjadi kesalahan jaringan saat menyimpan album.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string, albumTitle: string) => {
    if (!confirm(`Yakin ingin menghapus album "${albumTitle}" beserta seluruh fotonya?`)) return;

    try {
      const res = await fetch(`/api/admin/galeri?id=${id}`, {
        method: "DELETE",
      });
      const json = await res.json();
      if (json.ok) {
        setAlbums((prev) => prev.filter((item) => item.id !== id));
      } else {
        alert("Gagal menghapus album");
      }
    } catch (err) {
      alert("Terjadi kesalahan jaringan");
    }
  };

  const filtered = albums.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      (item.description &&
        item.description.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <Images className="w-6 h-6 text-emerald-400" />
            Kelola Galeri & Dokumentasi Kegiatan
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Unggah dokumentasi foto kegiatan belajar, praktik teaching factory, dan prestasi siswa SMK BPPI.
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 text-slate-950 text-xs font-bold hover:bg-emerald-400 shadow-md shadow-emerald-500/20 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          Tambah Album Foto
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-slate-900 p-3 rounded-2xl border border-slate-800">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari album kegiatan, acara, atau kata kunci..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
          />
        </div>
      </div>

      {/* Album Grid */}
      {loading ? (
        <div className="p-16 text-center text-slate-400 flex flex-col items-center gap-2">
          <Loader2 className="w-6 h-6 animate-spin text-emerald-400" />
          <span className="text-xs">Memuat galeri foto...</span>
        </div>
      ) : filtered.length === 0 ? (
        <div className="p-16 text-center text-slate-400 bg-slate-900 border border-slate-800 rounded-2xl">
          <p className="text-sm">Tidak ada album galeri yang ditemukan.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-sm flex flex-col hover:border-slate-700 transition-all group"
            >
              {/* Cover Image */}
              <div className="aspect-video relative bg-slate-950 overflow-hidden">
                {item.coverImage ? (
                  <img
                    src={item.coverImage}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-700">
                    <ImageIcon className="w-12 h-12" />
                  </div>
                )}
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-slate-900/90 backdrop-blur-md border border-slate-700/60 text-[11px] font-bold text-white flex items-center gap-1 shadow">
                  <ImageIcon className="w-3 h-3 text-emerald-400" />
                  <span>{item._count.images} Foto</span>
                </div>
              </div>

              {/* Info */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="font-bold text-base text-white line-clamp-1 mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2">
                    {item.description || "Tidak ada deskripsi"}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-800/80 text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(item.createdAt).toLocaleDateString("id-ID", {
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <Link
                      href={`/galeri`}
                      target="_blank"
                      className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors"
                      title="Lihat Galeri Publik"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                    <button
                      onClick={() => openEditModal(item)}
                      className="p-1.5 rounded-lg bg-slate-800 text-blue-400 hover:bg-blue-900/40 transition-colors"
                      title="Sunting Album"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id, item.title)}
                      className="p-1.5 rounded-lg bg-slate-800 text-rose-400 hover:bg-rose-900/40 transition-colors"
                      title="Hapus Album"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MODAL TAMBAH / SUNTING ALBUM DENGAN PETUNJUK & LIVE PREVIEW */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-6 md:p-8 my-8 max-h-[92vh] overflow-y-auto">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
              <div>
                <h2 className="font-bold text-xl text-white flex items-center gap-2">
                  <Images className="w-5 h-5 text-emerald-400" />
                  {editingId ? "Sunting Album Galeri" : "Tambah Album Galeri Baru"}
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Ikuti langkah-langkah di bawah untuk mendokumentasikan kegiatan sekolah.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Petunjuk Penggunaan Cepat */}
            <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 flex items-start gap-3 mb-6">
              <Info className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-bold text-emerald-200">Panduan Mudah Menambah Galeri:</p>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  1. Masukkan <strong>Judul Kegiatan</strong> dan pilih <strong>Kategori Acara</strong>.<br />
                  2. Pilih <strong>Foto Sampul</strong> (bisa unggah file atau tempel link URL) untuk tampilan depan.<br />
                  3. Tambahkan <strong>Foto Dokumentasi</strong> ke dalam album (bisa pilih banyak file sekaligus).
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* 1. Judul Album */}
              <div>
                <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider mb-1.5">
                  1. Judul Album / Nama Acara *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Contoh: Gelar Karya Vokasi & Perakitan Axioo 2026"
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
                />
              </div>

              {/* 2. Kategori Acara (Tag Cepat) */}
              <div>
                <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider mb-1.5">
                  2. Kategori Kegiatan
                </label>
                <div className="flex flex-wrap gap-2">
                  {CATEGORY_TAGS.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => setCategoryTag(tag)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        categoryTag === tag
                          ? "bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20"
                          : "bg-slate-950 border border-slate-800 text-slate-300 hover:border-slate-700"
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Foto Sampul (Cover Image) dengan Live Preview */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider">
                    3. Foto Sampul Album (Cover Image)
                  </label>
                  <span className="text-[11px] text-slate-400">Rasio ideal 16:9</span>
                </div>

                {/* Live Preview Box */}
                <div className="w-full aspect-video rounded-2xl bg-slate-950 border-2 border-dashed border-slate-800 overflow-hidden relative flex flex-col items-center justify-center group">
                  {coverImage && !coverImageError ? (
                    <>
                      <img
                        src={coverImage}
                        alt="Pratinjau Sampul"
                        onError={() => setCoverImageError(true)}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                        <button
                          type="button"
                          onClick={() => coverFileInputRef.current?.click()}
                          className="px-3 py-1.5 rounded-lg bg-slate-800 text-white text-xs font-semibold hover:bg-slate-700 flex items-center gap-1.5"
                        >
                          <Upload className="w-3.5 h-3.5" /> Ganti Foto
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setCoverImage("");
                            setCoverImageError(false);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-rose-500 text-white text-xs font-semibold hover:bg-rose-600 flex items-center gap-1.5"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Hapus
                        </button>
                      </div>
                      <span className="absolute bottom-2 left-2 px-2.5 py-1 rounded-md bg-emerald-500 text-slate-950 font-bold text-[10px] flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Foto Sampul Terpilih
                      </span>
                    </>
                  ) : (
                    <div className="text-center p-6 space-y-2">
                      <ImageIcon className="w-10 h-10 text-slate-600 mx-auto" />
                      {coverImageError ? (
                        <p className="text-xs text-rose-400 font-semibold flex items-center justify-center gap-1">
                          <AlertCircle className="w-4 h-4" /> Link gambar tidak valid atau tidak dapat dibuka.
                        </p>
                      ) : (
                        <p className="text-xs text-slate-400">
                          Pratinjau foto sampul akan otomatis muncul di sini.
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {/* Input Opsi: Unggah File ATAU Tempel URL */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* File Upload Button */}
                  <div>
                    <input
                      type="file"
                      ref={coverFileInputRef}
                      onChange={handleCoverFileUpload}
                      accept="image/*"
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => coverFileInputRef.current?.click()}
                      className="w-full py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center justify-center gap-2 border border-slate-700 transition-colors"
                    >
                      <Upload className="w-4 h-4 text-emerald-400" />
                      Pilih File dari Komputer/HP
                    </button>
                  </div>

                  {/* URL Text Input */}
                  <div className="relative">
                    <Link2 className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="url"
                      value={coverImage.startsWith("data:") ? "" : coverImage}
                      onChange={(e) => {
                        setCoverImage(e.target.value);
                        setCoverImageError(false);
                      }}
                      placeholder="Atau tempel link URL gambar..."
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
                    />
                  </div>
                </div>

                {/* Presets Cepat */}
                <div className="pt-1">
                  <span className="text-[11px] text-slate-400 block mb-1.5 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    Pilihan Contoh Foto Dokumentasi Cepat:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {PRESET_COVERS.map((preset) => (
                      <button
                        key={preset.label}
                        type="button"
                        onClick={() => {
                          setCoverImage(preset.url);
                          setCoverImageError(false);
                        }}
                        className="px-2.5 py-1 rounded-md bg-slate-950 hover:bg-slate-800 border border-slate-800 text-[11px] text-slate-300 hover:text-white transition-colors"
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* 4. Foto Dokumentasi Tambahan dalam Album */}
              <div className="space-y-3 pt-3 border-t border-slate-800">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider">
                      4. Foto-Foto Dokumentasi dalam Album
                    </label>
                    <span className="text-[11px] text-slate-400">
                      Tambahkan foto dokumentasi rangkaian kegiatan. ({imageUrls.length} foto siap disimpan)
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setImageUrls((prev) => [...prev, ...PRESET_SAMPLE_PHOTOS]);
                    }}
                    className="text-[11px] text-emerald-400 hover:underline flex items-center gap-1"
                  >
                    <Sparkles className="w-3.5 h-3.5" /> Gunakan 3 Contoh Foto
                  </button>
                </div>

                {/* Interactive Photo Thumbnail Grid */}
                {imageUrls.length > 0 && (
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5 p-3 rounded-2xl bg-slate-950 border border-slate-800 max-h-48 overflow-y-auto">
                    {imageUrls.map((url, index) => (
                      <div
                        key={index}
                        className="aspect-square rounded-xl bg-slate-900 border border-slate-800 overflow-hidden relative group"
                      >
                        <img
                          src={url}
                          alt={`Foto ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemovePhoto(index)}
                          className="absolute top-1 right-1 w-6 h-6 rounded-full bg-rose-600/90 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow"
                          title="Hapus foto ini"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                        <span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded bg-black/70 text-[9px] font-bold text-white">
                          #{index + 1}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Controls to add more photos */}
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="file"
                    multiple
                    ref={multipleFileInputRef}
                    onChange={handleMultipleFilesUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => multipleFileInputRef.current?.click()}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center justify-center gap-2 border border-slate-700 shrink-0 transition-colors"
                  >
                    <Upload className="w-4 h-4 text-emerald-400" />
                    Pilih Banyak File Foto
                  </button>

                  <div className="flex-1 flex gap-2">
                    <input
                      type="url"
                      value={inputUrl}
                      onChange={(e) => setInputUrl(e.target.value)}
                      placeholder="Atau tempel link URL foto..."
                      className="flex-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
                    />
                    <button
                      type="button"
                      onClick={handleAddUrl}
                      className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-emerald-500 hover:text-slate-950 text-white text-xs font-bold transition-all shrink-0"
                    >
                      + Tambah
                    </button>
                  </div>
                </div>
              </div>

              {/* 5. Deskripsi Singkat */}
              <div className="pt-2 border-t border-slate-800">
                <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider mb-1.5">
                  5. Keterangan Singkat Kegiatan
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Ceritakan secara singkat mengenai acara, tanggal pelaksanaan, serta pihak yang terlibat..."
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 resize-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-500 text-slate-950 text-xs font-bold hover:bg-emerald-400 disabled:opacity-50 transition-all shadow-md shadow-emerald-500/20"
                >
                  {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
                  {editingId ? "Simpan Perubahan Album" : "Publikasikan Album"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
