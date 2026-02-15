import { Inter } from "next/font/google";
import Footer from "./components/Footer";
import Header from "./components/Header";
import "./globals.css";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { GoogleTagManager } from '@next/third-parties/google';
import Script from 'next/script';
import ClientLayout from "./components/ClientLayout";
import { metadata, viewport } from "./metadata";

const inter = Inter({ subsets: ["latin"] });

const GTAG_ADS_ID = 'AW-11396130788';

function getGtagConversionScript() {
  return `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${GTAG_ADS_ID}');
    window.gtag_report_conversion = function(url) {
      var callback = function () {
        if (typeof(url) != 'undefined') {
          window.location = url;
        }
      };
      gtag('event', 'conversion', {
        'send_to': 'AW-11396130788/3OYNCNq9kvkbEOTPjLoq',
        'event_callback': callback
      });
      return false;
    };
  `;
}

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
        <Script
          id="gtag-ads"
          src={`https://www.googletagmanager.com/gtag/js?id=${GTAG_ADS_ID}`}
          strategy="afterInteractive"
          onLoad={() => {
            if (typeof document === 'undefined') return;
            const script = document.createElement('script');
            script.id = 'gtag-report-conversion';
            script.textContent = getGtagConversionScript();
            document.head.appendChild(script);
          }}
        />
      </head>
      <body className={inter.className}>
        <ClientLayout>
          <Header />
          {children}
          <Footer />
        </ClientLayout>
      </body>
    </html>
  );
}