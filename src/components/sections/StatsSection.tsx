"use client";

import { useEffect, useState, useRef } from "react";
import { Building, Users, GraduationCap, Award, Briefcase } from "lucide-react";

const stats = [
  { icon: Building, value: 50, suffix: "+", label: "Mitra Industri" },
  { icon: Users, value: 1200, suffix: "+", label: "Siswa Aktif" },
  { icon: GraduationCap, value: 95, suffix: "%", label: "Guru Tersertifikasi" },
  { icon: Briefcase, value: 85, suffix: "%", label: "Serapan Kerja Lulusan" },
  { icon: Award, value: 100, suffix: "+", label: "Penghargaan" },
];

export function StatsSection() {
  const [counts, setCounts] = useState(stats.map(() => 0));
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    
    const intervals = stats.map((stat, index) => {
      const increment = Math.max(1, Math.ceil(stat.value / 40));
      return setInterval(() => {
        setCounts((prev) => {
          const newCounts = [...prev];
          if (newCounts[index] < stat.value) {
            newCounts[index] = Math.min(newCounts[index] + increment, stat.value);
          }
          return newCounts;
        });
      }, 40);
    });

    return () => intervals.forEach(clearInterval);
  }, [isVisible]);

  return (
    <section ref={sectionRef} className="py-20 relative bg-slate-900 dark:bg-slate-950 overflow-hidden">
      {/* Background Effect */}
      <div className="absolute inset-0 bg-grid-white opacity-5" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/20 rounded-full blur-[100px]" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-amber-500/10 rounded-full blur-[100px]" />

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-6 rounded-2xl text-center hover:bg-slate-800 transition-colors group"
              >
                <div className="w-12 h-12 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6 text-primary-400" />
                </div>
                <div className="text-3xl md:text-4xl font-heading font-bold text-white mb-2">
                  {counts[index]}{stat.suffix}
                </div>
                <div className="text-slate-400 text-sm font-medium">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
