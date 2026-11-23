"use client";

import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { reviews } from "@/lib/data";
import { DemoTag, SectionHead } from "./ui";

export default function Reviews() {
  const [[i, dir], setState] = useState<[number, number]>([0, 0]);
  const go = (d: number) => setState(([p]) => [(p + d + reviews.length) % reviews.length, d]);
  const r = reviews[i];

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -60) go(1);
    else if (info.offset.x > 60) go(-1);
  };

  return (
    <section aria-labelledby="reviews-title" className="overflow-hidden bg-ink py-24 md:py-36">
      <div className="wrap">
        <SectionHead id="reviews-title" eyebrow="Отзывы" title="Что говорят клиенты">
          <DemoTag>Демонстрационные отзывы</DemoTag>
          <p className="lead mt-4">Тексты и имена — примеры для макета. Замените их реальными отзывами с разрешения клиентов.</p>
        </SectionHead>

        <div className="mt-14 grid gap-6 lg:grid-cols-12 lg:gap-10" data-reveal>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[24px] bg-ink-2 lg:col-span-7 lg:aspect-[16/11]">
            <AnimatePresence initial={false} custom={dir}>
              <motion.div
                key={i}
                custom={dir}
                className="absolute inset-0 cursor-grab active:cursor-grabbing"
                variants={{
                  enter: (d: number) => ({ clipPath: d >= 0 ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)", scale: 1.08 }),
                  center: { clipPath: "inset(0 0 0 0%)", scale: 1 },
                  exit: { opacity: 0.4 },
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.15}
                onDragEnd={onDragEnd}
              >
                <Image src={r.image.src} alt={r.image.alt} fill sizes="(min-width: 1024px) 58vw, 100vw" className="pointer-events-none object-cover" draggable={false} />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
              </motion.div>
            </AnimatePresence>
            <p className="absolute bottom-5 left-5 z-10 font-display text-[13px] uppercase tracking-[0.12em] text-paper/90 md:bottom-7 md:left-7">{r.car}</p>
          </div>

          <div className="flex flex-col justify-between lg:col-span-5">
            <div aria-live="polite" className="min-h-[260px]">
              <span aria-hidden className="block font-display text-[80px] leading-[0.6] text-gold">“</span>
              <AnimatePresence mode="wait">
                <motion.figure
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-4"
                >
                  <blockquote className="text-[clamp(19px,1.8vw,26px)] leading-[1.45] text-paper/90">{r.text}</blockquote>
                  <figcaption className="mt-8 flex items-center gap-4">
                    <span className="grid h-12 w-12 place-items-center rounded-full border border-gold/40 font-display text-[14px] text-gold">
                      {r.name.charAt(0)}
                    </span>
                    <span>
                      <span className="block font-semibold">{r.name}</span>
                      <span className="block text-[13px] text-mute">{r.car} · демо-отзыв</span>
                    </span>
                  </figcaption>
                </motion.figure>
              </AnimatePresence>
            </div>

            <div className="mt-10 flex items-center justify-between gap-6">
              <div className="flex flex-1 gap-2" role="tablist" aria-label="Выбор отзыва">
                {reviews.map((rv, k) => (
                  <button
                    key={rv.name}
                    role="tab"
                    aria-selected={k === i}
                    aria-label={`Отзыв ${k + 1}: ${rv.name}`}
                    onClick={() => setState([k, k > i ? 1 : -1])}
                    className="group relative h-11 flex-1"
                  >
                    <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-line" />
                    <motion.span
                      className="absolute left-0 top-1/2 h-px -translate-y-1/2 bg-gold"
                      initial={false}
                      animate={{ width: k === i ? "100%" : k < i ? "100%" : "0%", opacity: k === i ? 1 : k < i ? 0.4 : 1 }}
                      transition={{ duration: 0.6 }}
                    />
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <button onClick={() => go(-1)} aria-label="Предыдущий отзыв" className="grid h-12 w-12 place-items-center rounded-full border border-line transition-colors hover:border-gold hover:text-gold">
                  <ArrowLeft size={18} />
                </button>
                <button onClick={() => go(1)} aria-label="Следующий отзыв" className="grid h-12 w-12 place-items-center rounded-full border border-line transition-colors hover:border-gold hover:text-gold">
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
