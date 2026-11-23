"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Plus, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { gallery } from "@/lib/data";
import { DemoTag, SectionHead } from "./ui";

// Ширины плиток горизонтальной ленты: разный ритм, высота у всех одна
const widths = ["w-[78vw] md:w-[46vw]", "w-[70vw] md:w-[30vw]", "w-[78vw] md:w-[40vw]", "w-[66vw] md:w-[28vw]", "w-[78vw] md:w-[44vw]"];

export default function Gallery() {
  const [idx, setIdx] = useState<number | null>(null);
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  // Desktop + анимация разрешена: секция закрепляется, вертикальная прокрутка двигает ленту вбок
  useEffect(() => {
    const el = root.current;
    const tr = track.current;
    if (!el || !tr) return;
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      const dist = () => Math.max(0, tr.scrollWidth - tr.clientWidth);
      const tween = gsap.to(tr.querySelector("[data-rail]"), {
        x: () => -dist(),
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: () => `+=${dist()}`,
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });
      // Лёгкий параллакс фото внутри плиток во время движения ленты
      gsap.utils.toArray<HTMLElement>("[data-rail-img]", tr).forEach((img) => {
        gsap.fromTo(img, { xPercent: -6 }, { xPercent: 6, ease: "none", scrollTrigger: { trigger: img.parentElement, containerAnimation: tween, start: "left right", end: "right left", scrub: true } });
      });
      tr.style.overflow = "hidden";
      return () => {
        tr.style.overflow = "";
      };
    });
    return () => mm.revert();
  }, []);
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
    <section ref={root} aria-labelledby="works-title" className="flex min-h-[100svh] flex-col justify-center overflow-hidden bg-ink py-24 md:py-16">
      <div className="wrap">
        <SectionHead id="works-title" eyebrow="Наши работы" title="Доставленные автомобили">
          <DemoTag>Демо-галерея</DemoTag>
          <p className="lead mt-4">Здесь появятся реальные кейсы компании. Сейчас показаны иллюстративные фотографии.</p>
        </SectionHead>
      </div>

      <div ref={track} className="mt-12 snap-x snap-mandatory scroll-pl-[clamp(16px,4vw,48px)] overflow-x-auto overscroll-x-contain pb-4 [scrollbar-width:none] md:mt-14">
        <div data-rail className="flex w-max gap-4 px-[clamp(16px,4vw,48px)] md:gap-6 md:pr-[8vw]">
          {gallery.map((g, i) => (
            <button
              key={g.image.src}
              type="button"
              onClick={() => setIdx(i)}
              className={`group relative h-[56svh] max-h-[620px] min-h-[320px] shrink-0 snap-start overflow-hidden rounded-[24px] text-left ${widths[i]}`}
              aria-label={`Открыть фото: ${g.model}`}
            >
              <div data-rail-img className="absolute inset-y-0 -left-[8%] -right-[8%]">
                <Image
                  src={g.image.src}
                  alt={g.image.alt}
                  fill
                  sizes="(min-width: 768px) 50vw, 80vw"
                  className="object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.05]"
                />
              </div>
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
              <span className="absolute left-5 top-5 font-display text-[12px] text-gold md:left-7 md:top-7">0{i + 1}</span>
              <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4 md:inset-x-7 md:bottom-7">
                <div className="translate-y-1 transition-transform duration-500 group-hover:translate-y-0">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-gold">{g.meta}</p>
                  <p className="mt-1 font-display text-[clamp(17px,1.8vw,24px)] uppercase">{g.model}</p>
                </div>
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-paper/30 bg-ink/30 backdrop-blur transition-all duration-500 group-hover:rotate-90 group-hover:border-gold group-hover:bg-gold group-hover:text-ink">
                  <Plus size={18} />
                </span>
              </div>
            </button>
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
