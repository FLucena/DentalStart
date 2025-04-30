import { Inter } from "next/font/google";
import Footer from "./components/Footer";
import Header from "./components/Header";
import "./globals.css";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { GoogleTagManager } from '@next/third-parties/google';
import ClientLayout from "./components/ClientLayout";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>Dental Start - Odontología Integral en Buenos Aires</title>
        <meta name="description" content="Dental Start - Clínica odontológica integral en Buenos Aires. Ofrecemos tratamientos de odontología general, estética, implantes, ortodoncia y más." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Dental Start - Odontología Integral en Buenos Aires" />
        <meta property="og:description" content="Clínica odontológica integral en Buenos Aires. Ofrecemos tratamientos de odontología general, estética, implantes, ortodoncia y más." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dental-start.vercel.app/" />
        <meta property="og:image" content="/logo-hd.png" />
        <link rel="canonical" href="https://dental-start.vercel.app/" />
      </head>
      <body className={inter.className}>
        <ClientLayout>
          <Header />
          {children}
          <Footer />
          <GoogleTagManager gtmId="AW-11396130788" />
        </ClientLayout>
      </body>
    </html>
  );
}