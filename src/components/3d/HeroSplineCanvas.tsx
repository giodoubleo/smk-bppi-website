"use client";

import { useState, useRef, useEffect } from "react";
import {
  Code2,
  Network,
  Calculator,
  Laptop,
  Sparkles,
  RotateCw,
  ChevronRight,
  ShieldCheck,
  Cpu,
  Layers,
} from "lucide-react";
import Link from "next/link";

interface MajorConfig {
  code: string;
  name: string;
  icon: any;
  accentHex: string;
  tagline: string;
  badge: string;
  link: string;
}

const MAJORS_CONFIG: Record<string, MajorConfig> = {
  PPLG: {
    code: "PPLG",
    name: "Pengembangan Perangkat Lunak & Gim",
    icon: Code2,
    accentHex: "#10b981", // Emerald
    tagline: "Web Modern, Flutter Mobile & Game Engine",
    badge: "Teaching Factory Software",
    link: "/jurusan/pplg",
  },
  TJKT: {
    code: "TJKT",
    name: "Teknik Jaringan Komputer & Telekomunikasi",
    icon: Network,
    accentHex: "#3b82f6", // Blue
    tagline: "Cisco Enterprise, MikroTik & Cyber Security",
    badge: "Cisco Academy Partner",
    link: "/jurusan/tjkt",
  },
  AKL: {
    code: "AKL",
    name: "Akuntansi & Keuangan Lembaga",
    icon: Calculator,
    accentHex: "#f59e0b", // Amber
    tagline: "Bank Mini, Digital Auditing & Accurate POS",
    badge: "Mitra Bank BJB",
    link: "/jurusan/akl",
  },
  AXIOO: {
    code: "AXIOO",
    name: "Axioo Class Program (ACP)",
    icon: Laptop,
    accentHex: "#f43f5e", // Rose/Neon Pink
    tagline: "Hardware Assembly, Smart Device & Troubleshooting",
    badge: "Kelas Industri Resmi Axioo",
    link: "/jurusan/acp",
  },
};

export function HeroSplineCanvas() {
  const [activeMajor, setActiveMajor] = useState<string>("PPLG");
  const [isSplineLoaded, setIsSplineLoaded] = useState(false);
  const [hasSplineError, setHasSplineError] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const splineAppRef = useRef<any>(null);

  const major = MAJORS_CONFIG[activeMajor] || MAJORS_CONFIG.PPLG;
  const MajorIcon = major.icon;

  // Load Spline 3D Runtime dynamically on client
  useEffect(() => {
    let isMounted = true;

    async function loadSpline() {
      if (!canvasRef.current) return;
      try {
        const { Application } = await import("@splinetool/runtime");
        if (!isMounted || !canvasRef.current) return;

        const app = new Application(canvasRef.current);
        splineAppRef.current = app;

        // Interactive 3D scene (Spline)
        await app.load("https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode");

        if (isMounted) {
          setIsSplineLoaded(true);
        }
      } catch (err) {
        console.warn("Spline runtime load fallback:", err);
        if (isMounted) {
          setHasSplineError(true);
          setIsSplineLoaded(true);
        }
      }
    }

    loadSpline();

    return () => {
      isMounted = false;
      try {
        splineAppRef.current?.dispose?.();
      } catch {
        // Safe disposal
      }
    };
  }, []);

  // Parallax tilt on mouse movement
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-[460px] lg:h-[500px] rounded-3xl overflow-hidden bg-slate-950 border border-slate-800/80 shadow-2xl flex flex-col justify-between group select-none"
    >
      {/* Dynamic Ambient Background Lights */}
      <div
        className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full blur-[130px] pointer-events-none transition-all duration-700 opacity-40"
        style={{ backgroundColor: major.accentHex }}
      />
      <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-blue-600/20 rounded-full blur-[110px] pointer-events-none" />

      {/* 3D Scene Layer */}
      <div className="absolute inset-0 z-0">
        {!hasSplineError ? (
          <div className="w-full h-full relative">
            <canvas
              ref={canvasRef}
              className={`w-full h-full block cursor-grab active:cursor-grabbing transition-opacity duration-700 ${
                isSplineLoaded ? "opacity-100" : "opacity-0"
              }`}
            />

            {/* Shimmer loading spinner */}
            {!isSplineLoaded && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/80 backdrop-blur-sm z-10">
                <div className="relative">
                  <div
                    className="w-14 h-14 rounded-2xl border-2 border-dashed animate-spin"
                    style={{ borderColor: major.accentHex }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white animate-pulse" />
                  </div>
                </div>
                <span className="text-xs font-bold text-slate-300 tracking-wider uppercase mt-4 animate-pulse">
                  Memuat Spline 3D WebGL...
                </span>
                <span className="text-[10px] text-slate-500 mt-1">
                  Model 3D Interaktif SMK BBPI
                </span>
              </div>
            )}
          </div>
        ) : (
          /* High-Tech Hologram 3D Sphere Fallback */
          <div className="w-full h-full flex items-center justify-center relative">
            <div
              className="w-56 h-56 rounded-full relative transition-transform duration-300 ease-out"
              style={{
                transform: `rotateY(${mousePos.x * 25}deg) rotateX(${-mousePos.y * 25}deg)`,
                transformStyle: "preserve-3d",
              }}
            >
              {/* Outer Orbit Rings */}
              <div
                className="absolute inset-0 rounded-full border-2 border-dashed animate-[spin_12s_linear_infinite]"
                style={{ borderColor: `${major.accentHex}88` }}
              />
              <div
                className="absolute inset-4 rounded-full border border-dotted animate-[spin_8s_linear_infinite_reverse]"
                style={{ borderColor: "#38bdf866" }}
              />

              {/* Glowing Core Orb */}
              <div
                className="absolute inset-8 rounded-full bg-gradient-to-tr backdrop-blur-md flex items-center justify-center shadow-2xl transition-all duration-500"
                style={{
                  background: `radial-gradient(circle, ${major.accentHex}55 0%, #020617 80%)`,
                  boxShadow: `0 0 50px ${major.accentHex}44`,
                }}
              >
                <MajorIcon
                  className="w-16 h-16 transition-all duration-300 drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]"
                  style={{ color: "#ffffff" }}
                />
              </div>

              {/* Floating Orbit Satellites */}
              <div
                className="absolute -top-3 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-full bg-slate-900/90 border border-slate-700 text-[10px] font-bold text-white shadow-lg flex items-center gap-1"
                style={{ transform: "translateZ(30px)" }}
              >
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>{major.badge}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Top Floating Badge & Interactive Hint */}
      <div className="relative z-10 p-5 flex items-center justify-between pointer-events-none">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-800 text-xs text-white shadow-lg pointer-events-auto">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-bold text-[11px] tracking-wide">Spline 3D Engine</span>
        </div>

        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/70 backdrop-blur-md border border-slate-800 text-[10px] text-slate-300 pointer-events-auto">
          <RotateCw className="w-3 h-3 text-blue-400 animate-spin" style={{ animationDuration: "8s" }} />
          <span>Putar &amp; Geser Objek 3D</span>
        </div>
      </div>

      {/* Bottom Interactive Vocational Selector & Details */}
      <div className="relative z-10 p-5 space-y-3 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent pt-12">
        {/* 4 Official Majors Switcher Buttons */}
        <div className="grid grid-cols-4 gap-2">
          {Object.keys(MAJORS_CONFIG).map((key) => {
            const item = MAJORS_CONFIG[key];
            const Icon = item.icon;
            const isActive = activeMajor === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setActiveMajor(key)}
                className={`py-2 px-2 rounded-xl flex flex-col sm:flex-row items-center justify-center gap-1.5 text-xs font-bold transition-all ${
                  isActive
                    ? "bg-slate-800 text-white border-2 shadow-lg scale-[1.03]"
                    : "bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800/80 border border-slate-800"
                }`}
                style={{
                  borderColor: isActive ? item.accentHex : undefined,
                  boxShadow: isActive ? `0 0 20px ${item.accentHex}40` : undefined,
                }}
              >
                <Icon
                  className="w-4 h-4 shrink-0 transition-transform group-hover:scale-110"
                  style={{ color: isActive ? item.accentHex : undefined }}
                />
                <span className="tracking-wider text-[11px] sm:text-xs">{item.code}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Major Mini Specs Banner */}
        <div className="p-3 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-slate-800 flex items-center justify-between gap-3 shadow-xl">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-bold text-white text-xs truncate">
                {major.name}
              </span>
              <span className="hidden sm:inline-block text-[9px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-semibold border border-slate-700">
                {major.badge}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 truncate mt-0.5">
              {major.tagline}
            </p>
          </div>

          <Link
            href={major.link}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold text-white transition-all shrink-0 hover:opacity-90 shadow"
            style={{ backgroundColor: major.accentHex }}
          >
            <span>Eksplor</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
