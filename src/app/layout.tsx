import type { Metadata } from "next";
import { Manrope, Outfit } from "next/font/google";
import "./globals.css";
import { AppLayoutWrapper } from "@/components/layout/AppLayoutWrapper";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { SCHOOL_INFO } from "@/types";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: `${SCHOOL_INFO.name} - Sekolah Kejuruan Unggul Bandung`,
    template: `%s | ${SCHOOL_INFO.name}`,
  },
  description: `${SCHOOL_INFO.name} adalah sekolah menengah kejuruan unggulan di Bandung dengan program PPLG, TJKT, AKL, dan ACP. Berkomitmen menghasilkan lulusan berkompeten siap industri.`,
  keywords: [
    "SMK BPPI",
    "SMK Bandung",
    "Sekolah Kejuruan Bandung",
    "PPLG",
    "TJKT",
    "AKL",
    "ACP",
    "PPDB SMK",
    "SMK Unggul Bandung",
    "SMK Teknologi",
  ],
  authors: [{ name: SCHOOL_INFO.name }],
  creator: SCHOOL_INFO.name,
  metadataBase: new URL("https://smkbppi.sch.id"),
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://smkbppi.sch.id",
    siteName: SCHOOL_INFO.name,
    title: `${SCHOOL_INFO.name} - Sekolah Kejuruan Unggul Bandung`,
    description: `${SCHOOL_INFO.name} adalah sekolah menengah kejuruan unggulan di Bandung.`,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: SCHOOL_INFO.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SCHOOL_INFO.name} - Sekolah Kejuruan Unggul Bandung`,
    description: `${SCHOOL_INFO.name} adalah sekolah menengah kejuruan unggulan di Bandung.`,
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className={`${manrope.variable} ${outfit.variable} font-sans antialiased min-h-screen bg-background text-on-surface`}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <AppLayoutWrapper>{children}</AppLayoutWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
