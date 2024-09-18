import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Footer from "./components/Footer";
import Header from "./components/Header";
import "./globals.css";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { GoogleTagManager } from '@next/third-parties/google'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dental Start",
  description: "Tu sonrisa es el mejor accesorio.",
  icons: {
    icon: ['/icon.ico?v=4'],
    apple: ['/icon.ico?v=4'],
    shortcut: ['/icon.ico.png'],
  },
  manifest: '/site.webmanifest',
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
      </body>
      <GoogleTagManager gtmId="AW-11396130788" />
    </html>
  );
}