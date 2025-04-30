import type { Metadata, Viewport } from "next";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
};

export const metadata: Metadata = {
  title: "Dental Start - Odontología Integral en Buenos Aires",
  description: "Clínica odontológica integral en Buenos Aires. Ofrecemos tratamientos de odontología general, estética, implantes, ortodoncia y más.",
  keywords: "dentista, odontología, sonrisa, cuidado dental, Dental Start",
  openGraph: {
    title: "Dental Start - Odontología Integral en Buenos Aires",
    description: "Clínica odontológica integral en Buenos Aires. Ofrecemos tratamientos de odontología general, estética, implantes, ortodoncia y más.",
    url: "https://dental-start.vercel.app/",
    type: "website",
    images: [
      {
        url: "https://dental-start.vercel.app/logo-hd.png",
        width: 1200,
        height: 630,
        alt: "Dental Start Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dental Start - Odontología Integral en Buenos Aires",
    description: "Clínica odontológica integral en Buenos Aires. Ofrecemos tratamientos de odontología general, estética, implantes, ortodoncia y más.",
    images: ["https://dental-start.vercel.app/logo-hd.png"],
  },
  icons: {
    icon: ['/icon.ico?v=4'],
    apple: ['/icon.ico?v=4'],
    shortcut: ['/icon.ico'],
  },
}; 