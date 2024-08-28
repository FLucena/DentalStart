"use client";
import { useEffect, useState } from 'react';
import ReactLoading from 'react-loading';

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined') return; // Ensure we're on the client-side

    const handleInstagramLoad = () => {
      // Check if window.instgrm and window.instgrm.Embeds exist before accessing process()
      const instgrm = window.instgrm as {
        Embeds?: {
          process?: () => void;
        };
      };

      if (instgrm?.Embeds?.process) {
        setTimeout(() => {
          instgrm.Embeds.process();
          setLoading(false);
        }, 1000);
      } else {
        setLoading(false);
      }
    };

    const loadScript = (src: string, onLoad?: () => void) => {
      return new Promise<void>((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        script.onload = () => {
          if (onLoad) onLoad();
          resolve();
        };
        script.onerror = (error) => {
          console.error(`Script load error: ${src}`, error);
          resolve(); // Resolve even if there's an error
        };
        document.body.appendChild(script);
      });
    };

    const loadScripts = async () => {
      try {
        await loadScript("https://kit.fontawesome.com/2f29d12046.js");
        await loadScript("https://polyfill.io/v3/polyfill.min.js?features=default");
        await loadScript("https://www.instagram.com/embed.js", handleInstagramLoad);
      } catch (error) {
        console.error("Script loading error:", error);
        setLoading(false);
      }
    };

    loadScripts();

    return () => {
      document.body.querySelectorAll('script').forEach(script => {
        if (script.src.startsWith("https://kit.fontawesome.com/") ||
            script.src.startsWith("https://polyfill.io/") ||
            script.src.startsWith("https://www.instagram.com/embed.js")) {
          document.body.removeChild(script);
        }
      });
    };
  }, []);

  return (
    <section className="my-24 flex flex-col items-center justify-center space-y-4">
      {loading ? (
        <ReactLoading type="spin" color="#000" height={50} width={50} className="text-center" />
      ) : (
        <blockquote
          className="instagram-media bg-white border-0 rounded-md shadow-md mx-1 max-w-md min-w-[326px] p-0 w-[calc(100%-2px)]"
          data-instgrm-permalink="https://www.instagram.com/p/CVWTbFNMA5V/?utm_source=ig_embed&amp;utm_campaign=loading"
          data-instgrm-version="14"
        >
          <div className="p-4">
            <a
              href="https://www.instagram.com/p/CVWTbFNMA5V/?utm_source=ig_embed&amp;utm_campaign=loading"
              className="bg-white text-center no-underline w-full"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="pt-[19%]"></div>
              <div className="block h-12 mx-auto mb-3 w-12">
                <svg width="50px" height="50px" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
                  <g stroke="none" fill="none" fillRule="evenodd">
                    <g fill="#000000">
                      <path d="M565.378,62.101 C565.244,65.022 ..."></path>
                    </g>
                  </g>
                </svg>
              </div>
              <div className="pt-2 text-blue-500 font-sans text-base font-semibold leading-6">
                View this post on Instagram
              </div>
            </a>
          </div>
        </blockquote>
      )}
      <p className="my-4 text-center">
        Encontranos en Instagram! <i className="fa fa-instagram"></i>
      </p>
    </section>
  );
};

export default Home;