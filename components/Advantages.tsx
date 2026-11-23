"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { images, type SiteImage } from "@/lib/images";
import { SectionHead } from "./ui";

const items: { title: string; text: string; image: SiteImage }[] = [
  {
    title: "Прозрачность",
    text: "Смета с отдельной строкой для каждого платежа ещё до ставки. Никаких «доплат по факту» — только то, что согласовали.",
    image: images.advInterior,
  },
  {
    title: "Надёжность",
    text: "Проверяем VIN, историю повреждений и пробега до покупки. Сомнительные лоты отсеиваем без сожаления.",
    image: images.advGrille,
  },
  {
    title: "Контроль",
    text: "Фото с площадки, трекинг контейнера, документы порта — всё приходит в общий чат по мере движения.",
    image: images.advTail,
  },
  {
    title: "Индивидуальный подход",
    text: "Ищем под задачу, а не под склад: комплектация, цвет, история владения — так, как важно вам.",
    image: images.car911,
  },
];

/**
 * Преимущества — интерактивный типографический список: строка под курсором
 * подсвечивается и раскрывает описание, справа сменяется фотография.
 */
export default function Advantages() {
  const [active, setActive] = useState(0);

  return (
    <section aria-labelledby="adv-title" className="bg-ink-2 py-24 md:py-36">
      <div className="wrap">
        <SectionHead id="adv-title" eyebrow="Преимущества" title="Почему с нами спокойно" />

        <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-12">
          <ol className="lg:col-span-7" data-reveal-group>
            {items.map((it, i) => {
              const on = i === active;
              return (
                <li key={it.title} data-reveal className="border-t border-line last:border-b">
                  <button
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    aria-expanded={on}
                    className="group grid w-full grid-cols-[auto_1fr] items-baseline gap-x-5 py-7 text-left md:gap-x-8 md:py-9"
                  >
                    <span className={`font-display text-[12px] transition-colors duration-500 ${on ? "text-gold" : "text-mute"}`}>0{i + 1}</span>
                    <span
                      className={`font-display text-[clamp(24px,3.5vw,50px)] font-medium uppercase leading-[0.95] tracking-[-0.02em] transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)] ${
                        on ? "translate-x-2 text-paper" : "text-paper/30 group-hover:text-paper/60"
                      }`}
                    >
                      {it.title}
                    </span>
                    <span className="col-start-2 block">
                      <span
                        className={`grid transition-[grid-template-rows,opacity] duration-700 ease-[cubic-bezier(.22,1,.36,1)] ${
                          on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                        }`}
                      >
                        <span className="overflow-hidden">
                          <span className="mt-4 block max-w-[52ch] text-[15px] leading-relaxed text-mute">{it.text}</span>
                          <span className="relative mt-5 block aspect-[16/9] overflow-hidden rounded-2xl lg:hidden">
                            <Image src={it.image.src} alt={it.image.alt} fill sizes="90vw" className="object-cover" />
                          </span>
                        </span>
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>

          <div className="relative hidden lg:col-span-5 lg:block" data-reveal>
            <div className="sticky top-28 aspect-[4/5] overflow-hidden rounded-[28px] bg-ink">
              <AnimatePresence initial={false} mode="popLayout">
                <motion.div
                  key={active}
                  className="absolute inset-0"
                  initial={{ clipPath: "inset(100% 0% 0% 0%)", scale: 1.15 }}
                  animate={{ clipPath: "inset(0% 0% 0% 0%)", scale: 1 }}
                  exit={{ opacity: 0.6 }}
                  transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
                >
                  <Image src={items[active].image.src} alt={items[active].image.alt} fill sizes="40vw" className="object-cover" />
                </motion.div>
              </AnimatePresence>
              <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
              <p className="absolute bottom-6 left-6 font-display text-[64px] leading-none text-paper/90">0{active + 1}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
