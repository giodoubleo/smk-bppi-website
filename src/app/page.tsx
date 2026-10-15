import { Metadata } from "next";
import { HeroSection } from "@/components/sections/HeroSection";
import { HomeStatsRibbon } from "@/components/sections/HomeStatsRibbon";
import { PrincipalWelcomeSection } from "@/components/sections/PrincipalWelcomeSection";
import { HomeMajorsSection } from "@/components/sections/HomeMajorsSection";
import { HomeFacilitiesSection } from "@/components/sections/HomeFacilitiesSection";
import { AchievementsPartnersSection } from "@/components/sections/AchievementsPartnersSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { PPDBSection } from "@/components/sections/PPDBSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { SCHOOL_INFO } from "@/types";

export const metadata: Metadata = {
  title: SCHOOL_INFO.name,
  description:
    "Sekolah Menengah Kejuruan Pusat Keunggulan di Kabupaten Bandung dengan kurikulum berstandar industri nasional.",
};

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      {/* 1. Hero with interactive 3D particle mesh */}
      <HeroSection />

      {/* 2. Key Statistical Metrics Ribbon */}
      <HomeStatsRibbon />

      {/* 3. Message from the Principal */}
      <PrincipalWelcomeSection />

      {/* 4. Core Majors / Vocational Programs */}
      <HomeMajorsSection />

      {/* 5. Modern Facilities & Learning Ecosystem */}
      <HomeFacilitiesSection />

      {/* 6. Student Achievements & Industry Partnerships */}
      <AchievementsPartnersSection />

      {/* 7. Alumni Testimonials & Career Track */}
      <TestimonialsSection />

      {/* 8. PPDB Admission CTA */}
      <PPDBSection />

      {/* 9. Interactive Frequently Asked Questions */}
      <FAQSection />
    </div>
  );
}
