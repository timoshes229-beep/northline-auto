"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { images } from "@/lib/images";
import type { Country } from "@/lib/data";
import { SectionHead } from "./ui";

const items: { country: Country; title: string; sub: string; text: string; image: typeof images.dirUsa }[] = [
  {
    country: "USA",
    title: "USA",
    sub: "Автомобили из США",
    text: "Самый широкий выбор: аукционы страховых компаний, дилерские стоки, редкие комплектации.",
    image: images.dirUsa,
  },
  {
    country: "CANADA",
    title: "CANADA",
    sub: "Автомобили из Канады",
    text: "Машины для холодного климата, часто с зимним пакетом и аккуратной историей обслуживания.",
    image: images.dirCanada,
  },
];

export const FILTER_EVENT = "northline:country";

export default function Directions() {
  const choose = (c: Country) => {
    window.dispatchEvent(new CustomEvent(FILTER_EVENT, { detail: c }));
    document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section aria-labelledby="dir-title" className="bg-ink pb-24 md:pb-36">
      <div className="wrap">
        <SectionHead id="dir-title" eyebrow="Направления" title="Две страны. Один стандарт.">
          <p className="lead">Выберите направление — каталог откроется с нужным фильтром.</p>
        </SectionHead>

        <div className="mt-14 grid gap-4 md:grid-cols-2 md:gap-5" data-reveal-group>
          {items.map((it) => (
            <motion.button
              key={it.country}
              type="button"
              onClick={() => choose(it.country)}
              data-reveal
              className="group relative isolate flex h-[clamp(420px,62vh,640px)] flex-col justify-end overflow-hidden rounded-[28px] p-7 text-left md:p-10"
              whileHover="hover"
              initial="rest"
              animate="rest"
              aria-label={`${it.sub} — показать в каталоге`}
            >
              <motion.div
                className="absolute inset-0 -z-10"
                variants={{ rest: { scale: 1.02 }, hover: { scale: 1.09 } }}
                transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <Image src={it.image.src} alt={it.image.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
              </motion.div>
              <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/40 to-ink/10 transition-opacity duration-700 group-hover:opacity-80" />

              <span className="absolute right-6 top-6 grid h-14 w-14 place-items-center rounded-full border border-paper/25 bg-ink/30 backdrop-blur-md transition-all duration-500 group-hover:rotate-45 group-hover:border-gold group-hover:bg-gold group-hover:text-ink md:right-10 md:top-10">
                <ArrowUpRight size={22} />
              </span>

              <p className="eyebrow mb-4">{it.sub}</p>
              <div className="overflow-hidden">
                <motion.h3
                  className="font-display text-[clamp(48px,6.4vw,112px)] font-medium leading-[0.9] tracking-[-0.03em]"
                  variants={{ rest: { y: 0, letterSpacing: "-0.03em" }, hover: { y: -6, letterSpacing: "0em" } }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                >
                  {it.title}
                </motion.h3>
              </div>
              <div className="mt-5 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
                <p className="max-w-[38ch] text-[15px] leading-relaxed text-paper/75">{it.text}</p>
                <span className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.16em] text-gold">
                  Смотреть автомобили
                  <span className="h-px w-8 bg-gold transition-all duration-500 group-hover:w-14" />
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
