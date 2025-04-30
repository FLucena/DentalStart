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
    <html lang="es">
      <head>
        <title>Dental Start - Odontología Integral en Buenos Aires</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="Spanish" />
        <meta name="author" content="Dental Start" />
        <meta name="theme-color" content="#604D44" />
        <link rel="canonical" href="https://dental-start.vercel.app/" />
        <meta property="og:site_name" content="Dental Start" />
        <meta property="og:locale" content="es_AR" />
        <meta name="twitter:site" content="@dentalstart" />
        <meta name="twitter:creator" content="@dentalstart" />
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