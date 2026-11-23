"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { steps } from "@/lib/data";
import { images } from "@/lib/images";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { SplitWords } from "./ui";

export default function Process() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const items = gsap.utils.toArray<HTMLElement>("[data-step]", el);
    const triggers = items.map((item, i) =>
      ScrollTrigger.create({
        trigger: item,
        start: "top 55%",
        end: "bottom 55%",
        onToggle: (s) => s.isActive && setActive(i),
      }),
    );

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        "[data-progress]",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: { trigger: "[data-steps]", start: "top 55%", end: "bottom 55%", scrub: true },
        },
      );
    });

    return () => {
      triggers.forEach((t) => t.kill());
      mm.revert();
    };
  }, []);

  return (
    <section ref={root} id="process" aria-labelledby="process-title" className="relative bg-ink-2 py-24 md:py-36">
      <div className="wrap grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <p className="eyebrow mb-6" data-reveal>
              Этапы работы
            </p>
            <h2 id="process-title" className="h-section" data-split>
              <SplitWords text="Семь шагов до ваших ключей" />
            </h2>
            <p className="lead mt-6 max-w-md" data-reveal>
              Каждый этап закреплён за ответственным специалистом. Вы всегда знаете, где автомобиль и что происходит
              дальше.
            </p>
            <div className="relative mt-10 hidden aspect-[4/3] overflow-hidden rounded-[24px] lg:block" data-reveal>
              <Image src={images.process.src} alt={images.process.alt} fill sizes="40vw" className="object-cover" data-scale-in />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink-2 via-ink-2/20 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                <span className="font-display text-[72px] leading-none text-paper" aria-live="polite">
                  {steps[active].n}
                </span>
                <span className="max-w-[20ch] text-right text-[13px] text-paper/80">{steps[active].title}</span>
              </div>
            </div>
          </div>
        </div>

        <ol className="relative lg:col-span-7" data-steps>
          <span aria-hidden className="absolute bottom-0 left-[15px] top-0 w-px bg-line md:left-[19px]" />
          <span aria-hidden data-progress className="absolute bottom-0 left-[15px] top-0 w-px origin-top bg-gold md:left-[19px]" />
          {steps.map((s, i) => {
            const on = i === active;
            const done = i < active;
            return (
              <li key={s.n} data-step className="relative grid grid-cols-[32px_1fr] gap-5 pb-14 last:pb-0 md:grid-cols-[40px_1fr] md:gap-8 md:pb-20">
                <span
                  aria-hidden
                  className={`relative z-10 mt-1 grid h-8 w-8 place-items-center rounded-full border text-[11px] font-semibold transition-all duration-500 md:h-10 md:w-10 ${
                    on
                      ? "scale-110 border-gold bg-gold text-ink shadow-[0_0_30px_rgba(199,165,107,0.45)]"
                      : done
                        ? "border-gold/60 bg-ink-2 text-gold"
                        : "border-line bg-ink-2 text-mute"
                  }`}
                >
                  {s.n}
                </span>
                <div className={`transition-all duration-700 ${on ? "opacity-100" : "opacity-45"}`}>
                  <h3 className={`font-display text-[clamp(20px,2.4vw,32px)] font-medium uppercase leading-tight transition-colors duration-500 ${on ? "text-paper" : "text-paper/80"}`}>
                    {s.title}
                  </h3>
                  <p className="mt-3 max-w-[52ch] text-[15px] leading-relaxed text-mute">{s.text}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
