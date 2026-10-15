"use client";

import { SCHOOL_INFO } from "@/types";
import { ChevronRight, Sparkles } from "lucide-react";
import Link from "next/link";

export function Topbar() {
  return (
    <div className="bg-slate-950 text-slate-300 py-2 border-b border-white/10 text-xs md:text-sm relative z-50">
      <div className="container-custom flex items-center justify-center gap-2 text-center">
        <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse hidden sm:block" />
        <span>
          Penerimaan Peserta Didik Baru (PPDB) Tahun Ajaran 2026/2027 Telah Dibuka.
        </span>
        <Link
          href="/ppdb"
          className="inline-flex items-center gap-0.5 text-primary-400 hover:text-primary-300 font-medium transition-colors"
        >
          Daftar Sekarang <ChevronRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
}
