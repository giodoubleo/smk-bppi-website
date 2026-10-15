"use client";

import { useEffect, useState } from "react";
import {
  GraduationCap,
  Edit2,
  ExternalLink,
  Loader2,
  CheckCircle2,
  X,
  BookOpen,
  Briefcase,
  Building,
} from "lucide-react";
import Link from "next/link";

interface MajorItem {
  id: string;
  name: string;
  slug: string;
  description: string;
  competency: string;
  facilities: string;
  prospects: string;
  color: string | null;
  _count?: { achievements: number };
}

export default function AdminJurusanPage() {
  const [majors, setMajors] = useState<MajorItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Edit Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    competency: "",
    facilities: "",
    prospects: "",
    color: "#22c55e",
  });

  const fetchMajors = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/jurusan");
      const json = await res.json();
      if (json.ok) setMajors(json.data);
    } catch (err) {
      console.error("Error fetching majors:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMajors();
  }, []);

  const openEditModal = (item: MajorItem) => {
    setEditingId(item.id);
    setFormData({
      name: item.name,
      slug: item.slug,
      description: item.description,
      competency: item.competency,
      facilities: item.facilities,
      prospects: item.prospects,
      color: item.color || "#22c55e",
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.description) {
      alert("Nama dan deskripsi jurusan wajib diisi");
      return;
    }

    try {
      setSubmitting(true);
      const res = await fetch("/api/admin/jurusan", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingId,
          ...formData,
        }),
      });

      const json = await res.json();
      if (json.ok) {
        setIsModalOpen(false);
        fetchMajors();
      } else {
        alert(json.error || "Gagal mengupdate jurusan");
      }
    } catch (err) {
      alert("Terjadi kesalahan jaringan");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-secondary-fixed-dim" />
            Kelola Program Keahlian (4 Jurusan)
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Kelola deskripsi, kompetensi pembelajaran, fasilitas lab, dan prospek karir 4 jurusan SMK BPPI.
          </p>
        </div>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          4 Jurusan Resmi Aktif
        </div>
      </div>

      {/* Grid of 4 Majors */}
      {loading ? (
        <div className="p-16 text-center text-slate-400 flex flex-col items-center gap-2 bg-slate-900 border border-slate-800 rounded-2xl">
          <Loader2 className="w-6 h-6 animate-spin text-secondary" />
          <span className="text-xs">Memuat data jurusan...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {majors.map((major) => (
            <div
              key={major.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between hover:border-slate-700 transition-all shadow-sm"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span
                    className="px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider text-white"
                    style={{ backgroundColor: major.color || "#3b82f6" }}
                  >
                    {major.slug.toUpperCase()}
                  </span>
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/jurusan/${major.slug}`}
                      target="_blank"
                      className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors"
                      title="Lihat Halaman Publik"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => openEditModal(major)}
                      className="p-1.5 rounded-lg bg-slate-800 text-blue-400 hover:bg-blue-900/40 transition-colors"
                      title="Edit Data Jurusan"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div>
                  <h2 className="text-lg font-bold text-white tracking-tight">
                    {major.name}
                  </h2>
                  <p className="text-xs text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                    {major.description}
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-800/80 text-xs">
                  <div className="flex items-start gap-2 text-slate-300">
                    <BookOpen className="w-4 h-4 text-secondary-fixed-dim shrink-0 mt-0.5" />
                    <span className="line-clamp-2">
                      <strong className="text-white">Kompetensi:</strong> {major.competency}
                    </span>
                  </div>
                  <div className="flex items-start gap-2 text-slate-300">
                    <Building className="w-4 h-4 text-secondary-fixed-dim shrink-0 mt-0.5" />
                    <span className="line-clamp-1">
                      <strong className="text-white">Fasilitas:</strong> {major.facilities}
                    </span>
                  </div>
                  <div className="flex items-start gap-2 text-slate-300">
                    <Briefcase className="w-4 h-4 text-secondary-fixed-dim shrink-0 mt-0.5" />
                    <span className="line-clamp-1">
                      <strong className="text-white">Prospek:</strong> {major.prospects}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-xs text-slate-400">
                  {major._count?.achievements || 0} Prestasi Terkait
                </span>
                <button
                  onClick={() => openEditModal(major)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white transition-colors"
                >
                  <Edit2 className="w-3.5 h-3.5 text-blue-400" />
                  Sunting Informasi
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full p-6 space-y-5 my-8 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Edit2 className="w-5 h-5 text-secondary-fixed-dim" />
                Edit Program Keahlian: {formData.name}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Nama Resmi Jurusan *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-secondary"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Deskripsi Program Keahlian *
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.description}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-secondary resize-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Materi &amp; Standar Kompetensi (Pisahkan dengan koma)
                </label>
                <textarea
                  rows={3}
                  value={formData.competency}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      competency: e.target.value,
                    }))
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-secondary resize-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Fasilitas &amp; Teaching Factory
                </label>
                <input
                  type="text"
                  value={formData.facilities}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      facilities: e.target.value,
                    }))
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-secondary"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Prospek Karir &amp; Pekerjaan Lulusan
                </label>
                <input
                  type="text"
                  value={formData.prospects}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      prospects: e.target.value,
                    }))
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-secondary"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Warna Tema Badge (Hex Code)
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={formData.color}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, color: e.target.value }))
                    }
                    className="w-10 h-10 rounded-lg cursor-pointer bg-slate-950 border border-slate-800"
                  />
                  <input
                    type="text"
                    value={formData.color}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, color: e.target.value }))
                    }
                    className="w-32 px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono uppercase"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white font-semibold transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-secondary text-white font-bold hover:bg-secondary/90 disabled:opacity-50 transition-all shadow-md shadow-secondary/20"
                >
                  {submitting && (
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                  )}
                  Simpan Perubahan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
