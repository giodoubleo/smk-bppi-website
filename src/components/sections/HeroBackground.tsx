"use client";

import { useEffect, useRef } from "react";

export function HeroBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const spotlight = spotlightRef.current;
    if (!container || !spotlight) return;

    let targetX = container.clientWidth / 2;
    let targetY = container.clientHeight / 2;
    let currentX = targetX;
    let currentY = targetY;
    let animationId: number;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      targetX = e.clientX - rect.left;
      targetY = e.clientY - rect.top;
    };

    const updateSpotlight = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      if (spotlight) {
        spotlight.style.transform = `translate3d(${currentX - 250}px, ${currentY - 250}px, 0)`;
      }
      animationId = requestAnimationFrame(updateSpotlight);
    };

    window.addEventListener("mousemove", handleMouseMove);
    animationId = requestAnimationFrame(updateSpotlight);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0"
    >
      {/* 1. Base Gradient Layer */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#f2f4ff] via-[#e9edff] to-[#f7f9ff]" />

      {/* 2. Interactive Cursor Spotlight */}
      <div
        ref={spotlightRef}
        className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-secondary-container/20 to-primary-fixed/20 blur-[100px] pointer-events-none transition-opacity duration-300"
        style={{ willChange: "transform" }}
      />

      {/* 3. Ambient Aurora Glowing Orbs */}
      {/* Top Left Cyan/Blue Glow */}
      <div className="absolute -top-20 -left-20 w-[480px] h-[480px] rounded-full bg-secondary/15 blur-[120px] animate-pulse" />

      {/* Right Core Tech Glow (Behind 3D Card) */}
      <div
        className="absolute top-1/4 right-0 w-[560px] h-[560px] rounded-full bg-secondary-container/20 blur-[140px] animate-pulse"
        style={{ animationDelay: "1.5s", animationDuration: "5s" }}
      />

      {/* Bottom Center Amber Gold Glow */}
      <div
        className="absolute -bottom-24 left-1/3 w-[420px] h-[420px] rounded-full bg-tertiary-fixed-dim/20 blur-[110px] animate-pulse"
        style={{ animationDelay: "3s", animationDuration: "6s" }}
      />

      {/* 4. High-Tech Cyber Dot Grid Pattern with Radial Mask */}
      <div
        className="absolute inset-0 opacity-[0.45]"
        style={{
          backgroundImage: `radial-gradient(circle, #49607c 1.2px, transparent 1.2px)`,
          backgroundSize: "28px 28px",
          maskImage:
            "radial-gradient(ellipse 80% 75% at 50% 50%, black 30%, transparent 85%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 75% at 50% 50%, black 30%, transparent 85%)",
        }}
      />

      {/* 5. Geometric Tech Blueprint Crosshairs & Grid Lines */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.06] stroke-primary pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="hero-grid"
            width="120"
            height="120"
            patternUnits="userSpaceOnUse"
          >
            <path d="M 120 0 L 0 0 0 120" fill="none" strokeWidth="1" />
            <circle cx="0" cy="0" r="2" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-grid)" />
      </svg>

      {/* 6. Subtle Tech Monospace Watermarks */}
      <div className="hidden xl:flex absolute top-28 left-8 items-center gap-2 font-mono text-[10px] tracking-widest text-primary/25 uppercase">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-secondary/40 animate-ping" />
        <span>SYS.EST // 2026 BPPI.VOCATIONAL.EXCELLENCE</span>
      </div>

      <div className="hidden xl:flex absolute bottom-8 right-12 font-mono text-[10px] tracking-widest text-primary/20 uppercase">
        <span>LINK_AND_MATCH_INDUSTRIAL_GRID // VER.15</span>
      </div>
    </div>
  );
}
