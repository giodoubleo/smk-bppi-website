"use client";

import { useEffect, useState } from "react";
import {
  Mail,
  Search,
  Trash2,
  CheckCircle,
  Clock,
  Phone,
  User,
  Loader2,
  MailOpen,
} from "lucide-react";

interface MessageItem {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export default function AdminPesanPage() {
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/pesan");
      const json = await res.json();
      if (json.ok) setMessages(json.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const toggleReadStatus = async (id: string, current: boolean) => {
    try {
      const res = await fetch("/api/admin/pesan", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, isRead: !current }),
      });
      const json = await res.json();
      if (json.ok) {
        setMessages((prev) =>
          prev.map((m) => (m.id === id ? { ...m, isRead: !current } : m))
        );
      }
    } catch (err) {
      alert("Gagal mengupdate status pesan");
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Hapus pesan dari "${name}"?`)) return;

    try {
      const res = await fetch(`/api/admin/pesan?id=${id}`, {
        method: "DELETE",
      });
      const json = await res.json();
      if (json.ok) {
        setMessages((prev) => prev.filter((m) => m.id !== id));
      } else {
        alert("Gagal menghapus pesan");
      }
    } catch (err) {
      alert("Terjadi kesalahan jaringan");
    }
  };

  const filtered = messages.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.email.toLowerCase().includes(search.toLowerCase()) ||
      item.subject.toLowerCase().includes(search.toLowerCase()) ||
      item.message.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <Mail className="w-6 h-6 text-rose-400" />
            Kotak Masuk Pesan Pengunjung
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Pesan pertanyaan seputar PPDB, kemitraan industri, dan informasi akademik.
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-slate-900 p-3 rounded-2xl border border-slate-800">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari pengirim, subjek, atau isi pesan..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-400"
          />
        </div>
      </div>

      {/* Messages List */}
      <div className="space-y-4">
        {loading ? (
          <div className="p-16 text-center text-slate-400 flex flex-col items-center gap-2 bg-slate-900 border border-slate-800 rounded-2xl">
            <Loader2 className="w-6 h-6 animate-spin text-rose-400" />
            <span className="text-xs">Memuat pesan masuk...</span>
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-16 text-center text-slate-400 bg-slate-900 border border-slate-800 rounded-2xl">
            <p className="text-sm">Tidak ada pesan yang ditemukan.</p>
          </div>
        ) : (
          filtered.map((msg) => (
            <div
              key={msg.id}
              className={`p-5 rounded-2xl border transition-all ${
                msg.isRead
                  ? "bg-slate-900/60 border-slate-800/60 opacity-80"
                  : "bg-slate-900 border-rose-500/30 shadow-md"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800/80 mb-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs ${
                      msg.isRead
                        ? "bg-slate-800 text-slate-400"
                        : "bg-rose-500/20 text-rose-400"
                    }`}
                  >
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-white flex items-center gap-2">
                      {msg.name}
                      {!msg.isRead && (
                        <span className="px-2 py-0.5 rounded-full bg-rose-500 text-white text-[10px] font-bold">
                          Baru
                        </span>
                      )}
                    </h3>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-400 mt-0.5">
                      <span>{msg.email}</span>
                      {msg.phone && (
                        <span className="flex items-center gap-1">
                          <Phone className="w-3 h-3 text-slate-500" />
                          {msg.phone}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {new Date(msg.createdAt).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                  <button
                    onClick={() => toggleReadStatus(msg.id, msg.isRead)}
                    className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
                    title={msg.isRead ? "Tandai Belum Dibaca" : "Tandai Sudah Dibaca"}
                  >
                    {msg.isRead ? (
                      <Mail className="w-4 h-4" />
                    ) : (
                      <MailOpen className="w-4 h-4 text-emerald-400" />
                    )}
                  </button>
                  <button
                    onClick={() => handleDelete(msg.id, msg.name)}
                    className="p-1.5 rounded-lg bg-slate-800 text-rose-400 hover:bg-rose-900/40"
                    title="Hapus Pesan"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div>
                <p className="text-xs font-bold text-secondary-fixed-dim mb-1">
                  Subjek: {msg.subject}
                </p>
                <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-wrap bg-slate-950/50 p-3.5 rounded-xl border border-slate-800/40">
                  {msg.message}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
