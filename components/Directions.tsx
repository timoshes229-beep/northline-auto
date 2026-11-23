"use client";

import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { images } from "@/lib/images";
import type { Country } from "@/lib/data";
import { SectionHead } from "./ui";

const items: { country: Country; title: string; sub: string; text: string; facts: string[]; image: typeof images.dirUsa }[] = [
  {
    country: "USA",
    title: "USA",
    sub: "Автомобили из США",
    text: "Самый широкий выбор: аукционы страховых компаний, дилерские стоки, редкие комплектации.",
    facts: ["Аукционы и дилеры", "Любые бюджеты", "Редкие комплектации"],
    image: images.dirUsa,
  },
  {
    country: "CANADA",
    title: "CANADA",
    sub: "Автомобили из Канады",
    text: "Машины для холодного климата, часто с зимним пакетом и аккуратной историей обслуживания.",
    facts: ["Зимние пакеты", "Аккуратная история", "Подогревы и полный привод"],
    image: images.dirCanada,
  },
];

export const FILTER_EVENT = "northline:country";

/**
 * Два направления — высокие панели. На desktop наведённая панель раскрывается
 * шире (flex-grow), проявляет описание и факты; вторая сужается и уходит в тень.
 */
export default function Directions() {
  const [hover, setHover] = useState<number | null>(null);

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

        <div className="mt-14 flex flex-col gap-4 md:h-[min(82vh,760px)] md:flex-row md:gap-5" data-reveal onMouseLeave={() => setHover(null)}>
          {items.map((it, i) => {
            const isOn = hover === i;
            const isOff = hover !== null && hover !== i;
            return (
              <button
                key={it.country}
                type="button"
                onClick={() => choose(it.country)}
                onMouseEnter={() => setHover(i)}
                onFocus={() => setHover(i)}
                aria-label={`${it.sub} — показать в каталоге`}
                className="group relative isolate flex h-[72svh] min-h-[460px] flex-col justify-end overflow-hidden rounded-[28px] p-7 text-left transition-[flex-grow] duration-[900ms] ease-[cubic-bezier(.22,1,.36,1)] md:h-auto md:min-h-0 md:p-10"
                style={{ flexGrow: isOn ? 1.65 : isOff ? 0.75 : 1, flexBasis: 0 }}
              >
                <Image
                  src={it.image.src}
                  alt={it.image.alt}
                  fill
                  sizes="(min-width: 768px) 60vw, 100vw"
                  className={`-z-10 object-cover object-[65%_60%] transition-[transform,filter] duration-[1400ms] ease-[cubic-bezier(.22,1,.36,1)] ${
                    isOn ? "scale-[1.04]" : "scale-[1.12]"
                  } ${isOff ? "brightness-[0.45] saturate-[0.7]" : ""}`}
                />
                <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/30 to-ink/0" />

                <span className="absolute left-7 top-7 font-display text-[12px] tracking-[0.2em] text-gold md:left-10 md:top-10">0{i + 1}</span>
                <span className="absolute right-6 top-6 grid h-14 w-14 place-items-center rounded-full border border-paper/25 bg-ink/30 backdrop-blur-md transition-all duration-500 group-hover:rotate-45 group-hover:border-gold group-hover:bg-gold group-hover:text-ink md:right-10 md:top-10">
                  <ArrowUpRight size={22} />
                </span>

                <p className="eyebrow mb-4">{it.sub}</p>
                <h3 className="font-display text-[clamp(52px,7.5vw,128px)] font-medium leading-[0.85] tracking-[-0.03em]">{it.title}</h3>

                <div
                  className={`grid transition-[grid-template-rows,opacity] duration-700 ease-[cubic-bezier(.22,1,.36,1)] max-md:grid-rows-[1fr] max-md:opacity-100 ${
                    isOn ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="mt-5 max-w-[42ch] text-[15px] leading-relaxed text-paper/80">{it.text}</p>
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {it.facts.map((f) => (
                        <li key={f} className="rounded-full border border-paper/20 bg-ink/40 px-3 py-1.5 text-[12px] text-paper/85 backdrop-blur">
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <span className="mt-6 inline-flex items-center gap-3 text-[12px] font-bold uppercase tracking-[0.16em] text-gold">
                  Смотреть автомобили
                  <span className="h-px w-8 bg-gold transition-all duration-500 group-hover:w-16" />
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
