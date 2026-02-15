"use client";

import Script from "next/script";

const gtagConversionScript = `
  window.gtag_report_conversion = function(url) {
    var callback = function () {
      if (typeof(url) != 'undefined') {
        window.location = url;
      }
    };
    if (typeof gtag === 'function') {
      gtag('event', 'conversion', {
        'send_to': 'AW-11396130788/3OYNCNq9kvkbEOTPjLoq',
        'event_callback': callback
      });
    }
    return false;
  };
`;

export default function GtagConversionScript() {
  return (
    <Script
      id="gtag-report-conversion"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: gtagConversionScript }}
    />
  );
}
