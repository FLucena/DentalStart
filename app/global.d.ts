interface Window {
    instgrm?: {
      Embeds: {
        process: () => void;
      };
    };
    gtag_report_conversion?: (url?: string) => boolean;
  }