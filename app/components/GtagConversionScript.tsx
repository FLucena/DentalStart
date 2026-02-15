"use client";

import Script from "next/script";

const GTAG_ADS_ID = "AW-11396130788";

const gtagConversionScript = `
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

export default function GtagConversionScript() {
  return (
    <Script
      id="gtag-ads"
      src={`https://www.googletagmanager.com/gtag/js?id=${GTAG_ADS_ID}`}
      strategy="afterInteractive"
      onLoad={() => {
        if (typeof document === "undefined") return;
        const script = document.createElement("script");
        script.id = "gtag-report-conversion";
        script.textContent = gtagConversionScript;
        document.head.appendChild(script);
      }}
    />
  );
}
