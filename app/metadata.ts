import type { Metadata, Viewport } from "next";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
};

export const metadata: Metadata = {
  title: "Dental Start",
  description: "Tu sonrisa es el mejor accesorio.",
  keywords: "dentista, odontología, sonrisa, cuidado dental, Dental Start",
  icons: {
    icon: ['/icon.ico?v=4'],
    apple: ['/icon.ico?v=4'],
    shortcut: ['/icon.ico'],
  },
}; 