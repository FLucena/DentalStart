import { Inter } from "next/font/google";
import Footer from "./components/Footer";
import Header from "./components/Header";
import "./globals.css";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { GoogleTagManager } from '@next/third-parties/google';
import GtagConversionScript from "./components/GtagConversionScript";
import ClientLayout from "./components/ClientLayout";
import { metadata, viewport } from "./metadata";

const inter = Inter({ subsets: ["latin"] });

const GTAG_ADS_ID = 'AW-11396130788';

export { metadata, viewport };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <GoogleTagManager gtmId={GTAG_ADS_ID} />
      </head>
      <body className={inter.className}>
        <GtagConversionScript />
        <ClientLayout>
          <Header />
          {children}
          <Footer />
        </ClientLayout>
      </body>
    </html>
  );
}