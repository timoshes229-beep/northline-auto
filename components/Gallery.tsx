"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Plus, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { gallery } from "@/lib/data";
import { DemoTag, SectionHead } from "./ui";

// Асимметричная сетка: размеры плиток на desktop
const spans = [
  "md:col-span-7 md:row-span-2 aspect-[4/3] md:aspect-auto",
  "md:col-span-5 aspect-[4/3]",
  "md:col-span-5 aspect-[4/3]",
  "md:col-span-4 aspect-[4/3] md:aspect-[4/5]",
  "md:col-span-8 aspect-[4/3] md:aspect-auto",
];

export default function Gallery() {
  const [idx, setIdx] = useState<number | null>(null);
  const close = useCallback(() => setIdx(null), []);
  const step = useCallback((d: number) => setIdx((i) => (i === null ? i : (i + d + gallery.length) % gallery.length)), []);

  useEffect(() => {
    if (idx === null) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [idx, close, step]);

  return (
    <section aria-labelledby="works-title" className="bg-ink py-24 md:py-36">
      <div className="wrap">
        <SectionHead id="works-title" eyebrow="Наши работы" title="Доставленные автомобили">
          <DemoTag>Демо-галерея</DemoTag>
          <p className="lead mt-4">Здесь появятся реальные кейсы компании. Сейчас показаны иллюстративные фотографии.</p>
        </SectionHead>

        <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-5" data-reveal-group>
          {gallery.map((g, i) => (
            <motion.button
              key={g.image.src}
              type="button"
              layoutId={`gal-${i}`}
              onClick={() => setIdx(i)}
              data-reveal
              className={`group relative overflow-hidden rounded-[24px] text-left ${spans[i]}`}
              aria-label={`Открыть фото: ${g.model}`}
            >
              <div className="absolute inset-0 overflow-hidden">
                <Image
                  src={g.image.src}
                  alt={g.image.alt}
                  fill
                  sizes="(min-width: 768px) 60vw, 100vw"
                  className="object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.06]"
                />
              </div>
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4 md:inset-x-7 md:bottom-7">
                <div className="translate-y-1 transition-transform duration-500 group-hover:translate-y-0">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-gold">{g.meta}</p>
                  <p className="mt-1 font-display text-[clamp(17px,1.8vw,24px)] uppercase">{g.model}</p>
                </div>
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-paper/30 bg-ink/30 backdrop-blur transition-all duration-500 group-hover:rotate-90 group-hover:border-gold group-hover:bg-gold group-hover:text-ink">
                  <Plus size={18} />
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {idx !== null && (
          <motion.div
            className="fixed inset-0 z-[90] flex items-center justify-center bg-ink/95 p-4 backdrop-blur-xl md:p-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label={gallery[idx].model}
            onClick={close}
          >
            <motion.div
              key={idx}
              className="relative aspect-[3/2] w-full max-w-6xl overflow-hidden rounded-[20px]"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image src={gallery[idx].image.src} alt={gallery[idx].image.alt} fill sizes="100vw" className="object-cover" />
            </motion.div>
            <div className="absolute inset-x-4 bottom-4 flex items-center justify-between md:inset-x-12 md:bottom-8" onClick={(e) => e.stopPropagation()}>
              <p className="font-display text-sm uppercase md:text-base">
                {gallery[idx].model} <span className="text-mute">· {idx + 1}/{gallery.length}</span>
              </p>
              <div className="flex gap-2">
                <button onClick={() => step(-1)} aria-label="Предыдущее фото" className="grid h-12 w-12 place-items-center rounded-full border border-line hover:border-gold">
                  <ChevronLeft size={20} />
                </button>
                <button onClick={() => step(1)} aria-label="Следующее фото" className="grid h-12 w-12 place-items-center rounded-full border border-line hover:border-gold">
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
            <button onClick={close} aria-label="Закрыть просмотр" className="absolute right-4 top-4 grid h-12 w-12 place-items-center rounded-full border border-line hover:border-gold md:right-8 md:top-8">
              <X size={20} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
