import type { Metadata, Viewport } from "next";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
};

export const metadata: Metadata = {
  title: "Dental Start - Clínica Odontológica en Buenos Aires | Tratamientos Dentales Integrales",
  description: "Dental Start es tu clínica odontológica de confianza en Buenos Aires. Ofrecemos tratamientos integrales de odontología general, estética dental, implantes, ortodoncia, blanqueamiento y más. Profesionales certificados y tecnología de última generación para cuidar tu sonrisa.",
  keywords: "dentista, odontología, sonrisa, cuidado dental, Dental Start",
  authors: [{ name: "Francisco Lucena", url: "https://dental-start.vercel.app/" }],
  publisher: "Francisco Lucena",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: "Dental Start - Clínica Odontológica en Buenos Aires | Tratamientos Dentales Integrales",
    description: "Dental Start es tu clínica odontológica de confianza en Buenos Aires. Ofrecemos tratamientos integrales de odontología general, estética dental, implantes, ortodoncia, blanqueamiento y más. Profesionales certificados y tecnología de última generación para cuidar tu sonrisa.",
    url: "https://dental-start.vercel.app/",
    type: "website",
    images: [
      {
        url: "https://dental-start.vercel.app/logo.png",
        width: 1200,
        height: 630,
        alt: "Dental Start Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dental Start - Clínica Odontológica en Buenos Aires | Tratamientos Dentales Integrales",
    description: "Dental Start es tu clínica odontológica de confianza en Buenos Aires. Ofrecemos tratamientos integrales de odontología general, estética dental, implantes, ortodoncia, blanqueamiento y más. Profesionales certificados y tecnología de última generación para cuidar tu sonrisa.",
    images: ["https://dental-start.vercel.app/logo.png"],
  },
  icons: {
    icon: ['/icon.ico?v=4'],
    apple: ['/icon.ico?v=4'],
    shortcut: ['/icon.ico'],
  },
}; 