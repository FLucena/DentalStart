"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const photos = [
  {
    src: "/consultorio-1.jpeg",
    alt: "Sala de tratamiento con sillón dental moderno, luz natural y vista a la ciudad.",
    sizes: "(max-width: 768px) 100vw, 50vw",
    gridClass:
      "md:col-span-2 md:row-span-2 md:row-start-1 md:col-start-1 h-[320px] sm:h-[360px] md:h-full md:min-h-0",
  },
  {
    src: "/consultorio-2.jpeg",
    alt: "Área de gabinete con mesada, grifería y mobiliario blanco junto al equipamiento clínico.",
    sizes: "(max-width: 768px) 100vw, 50vw",
    gridClass:
      "md:col-span-2 md:row-start-1 md:col-start-3 h-[240px] sm:h-[280px] md:h-full md:min-h-0",
  },
  {
    src: "/consultorio-3.jpeg",
    alt: "Consultorio luminoso con sillón crema, plantas y ventanales de piso a techo.",
    sizes: "(max-width: 768px) 100vw, 50vw",
    gridClass:
      "md:col-span-1 md:row-start-2 md:col-start-3 h-[300px] sm:h-[320px] md:h-full md:min-h-0",
  },
  {
    src: "/consultorio-4.jpeg",
    alt: "Perspectiva del sillón dental y unidad frente a la vista urbana y el cielo despejado.",
    sizes: "(max-width: 768px) 100vw, 50vw",
    gridClass:
      "md:col-span-1 md:row-start-2 md:col-start-4 h-[300px] sm:h-[320px] md:h-full md:min-h-0",
  },
] as const;

export default function ConsultorioGallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (reduceMotion) {
      setInView(true);
      return;
    }
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setInView(true);
      },
      { rootMargin: "0px 0px -5% 0px", threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [reduceMotion]);

  return (
    <section
      ref={sectionRef}
      className="py-12 sm:py-16 md:py-20 bg-white/50 backdrop-blur-sm"
      aria-labelledby="consultorio-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          id="consultorio-heading"
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-[#2D3748] mb-3 sm:mb-4 md:mb-6 animate-fade-in motion-reduce:animate-none motion-reduce:opacity-100"
        >
          Nuestro consultorio
        </h2>
        <p className="text-center text-[#4A5568] max-w-2xl mx-auto mb-8 sm:mb-10 md:mb-12 text-base sm:text-lg">
          Espacios pensados para tu comodidad, con tecnología actual y mucha luz natural.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 sm:gap-5 md:gap-6 md:min-h-[520px] md:auto-rows-[minmax(0,1fr)]">
          {photos.map((photo, index) => {
            const delayMs = reduceMotion ? 0 : index * 80;
            const revealed = reduceMotion || inView;
            return (
              <figure
                key={photo.src}
                className={[
                  "group relative overflow-hidden rounded-2xl border border-[#CFC6BE]/50 bg-[#E8E2DC]/40 shadow-lg",
                  "transition-[opacity,transform,box-shadow] duration-700 ease-out motion-reduce:transition-none",
                  "hover:shadow-xl hover:-translate-y-1 motion-reduce:hover:translate-y-0",
                  photo.gridClass,
                  revealed
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6 motion-reduce:opacity-100 motion-reduce:translate-y-0",
                ].join(" ")}
                style={{ transitionDelay: `${delayMs}ms` }}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes={photo.sizes}
                  className="object-cover transition-transform duration-500 ease-out motion-reduce:transition-none md:group-hover:scale-[1.02]"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-[#604D44]/10 via-transparent to-transparent pointer-events-none z-[1]"
                  aria-hidden
                />
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
