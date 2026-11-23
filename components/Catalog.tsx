"use client";

import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { Gauge, MapPin, RotateCcw, SlidersHorizontal } from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { cars, type Body, type Car, type Country } from "@/lib/data";
import { usd } from "@/lib/tariffs";
import { FILTER_EVENT } from "./Directions";
import { ScrollTrigger } from "@/lib/gsap";
import { useLead } from "./LeadProvider";
import { DemoTag, SectionHead } from "./ui";

const brands = Array.from(new Set(cars.map((c) => c.brand))).sort();
const bodies = Array.from(new Set(cars.map((c) => c.body))) as Body[];
const years = Array.from(new Set(cars.map((c) => c.year))).sort();
const PRICE_MAX = Math.ceil(Math.max(...cars.map((c) => c.priceUsd)) / 5000) * 5000;
const PRICE_MIN = Math.floor(Math.min(...cars.map((c) => c.priceUsd)) / 5000) * 5000;

const statusColor: Record<Car["status"], string> = {
  "На аукционе": "bg-gold",
  "В пути": "bg-sky-400",
  "В Украине": "bg-emerald-400",
  Растаможен: "bg-paper",
};

interface Filters {
  brand: string;
  yearFrom: number;
  priceTo: number;
  body: Body | "";
  country: Country | "";
}

const initial: Filters = { brand: "", yearFrom: years[0], priceTo: PRICE_MAX, body: "", country: "" };

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`relative min-h-[44px] rounded-full px-4 text-[13px] font-medium transition-colors ${
        active ? "text-ink" : "text-paper/75 hover:text-paper"
      }`}
    >
      {active && (
        <motion.span
          layoutId="chip-bg"
          className="absolute inset-0 -z-0 rounded-full bg-gold"
          transition={{ type: "spring", stiffness: 380, damping: 32 }}
        />
      )}
      {!active && <span className="absolute inset-0 rounded-full border border-line" aria-hidden />}
      <span className="relative">{children}</span>
    </button>
  );
}

function ChipGroup<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T | "";
  options: T[];
  onChange: (v: T | "") => void;
}) {
  return (
    <fieldset>
      <legend className="mb-3 text-[12px] uppercase tracking-[0.18em] text-mute">{label}</legend>
      <LayoutGroup id={label}>
        <div className="flex flex-wrap gap-2">
          <Chip active={value === ""} onClick={() => onChange("")}>
            Все
          </Chip>
          {options.map((o) => (
            <Chip key={o} active={value === o} onClick={() => onChange(o)}>
              {o}
            </Chip>
          ))}
        </div>
      </LayoutGroup>
    </fieldset>
  );
}

function CarCard({ car }: { car: Car }) {
  const { open } = useLead();
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.25 } }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      className="group flex flex-col overflow-hidden rounded-[24px] border border-line bg-[#060607] transition-colors duration-500 hover:border-gold/40"
    >
      <div className="relative aspect-[16/9] overflow-hidden">
        <Image
          src={car.image.src}
          alt={car.image.alt}
          fill
          sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.05]"
        />
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#060607] to-transparent" />
        <div aria-hidden className="absolute inset-x-[15%] bottom-0 h-px bg-gradient-to-r from-transparent via-gold/70 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
        <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-ink/70 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] backdrop-blur-md">
          <span className={`h-1.5 w-1.5 rounded-full ${statusColor[car.status]}`} aria-hidden />
          {car.status}
        </span>
        <span className="absolute right-4 top-4 rounded-full bg-ink/70 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-gold-2 backdrop-blur-md">
          Пример
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-[12px] uppercase tracking-[0.18em] text-mute">{car.brand}</p>
        <h3 className="mt-1 font-display text-[19px] font-medium uppercase leading-tight">{car.model}</h3>
        <dl className="mt-5 grid grid-cols-3 gap-3 border-t border-line pt-5 text-[13px]">
          <div>
            <dt className="text-mute">Год</dt>
            <dd className="mt-1 font-semibold">{car.year}</dd>
          </div>
          <div>
            <dt className="flex items-center gap-1 text-mute">
              <Gauge size={13} aria-hidden /> Пробег
            </dt>
            <dd className="mt-1 font-semibold">{car.mileageKm.toLocaleString("ru-RU")} км</dd>
          </div>
          <div>
            <dt className="flex items-center gap-1 text-mute">
              <MapPin size={13} aria-hidden /> Страна
            </dt>
            <dd className="mt-1 font-semibold">{car.country}</dd>
          </div>
        </dl>
        <div className="mt-auto flex items-end justify-between gap-4 pt-6">
          <div>
            <p className="text-[12px] text-mute">Ориентировочная стоимость</p>
            <p className="font-display text-[22px] text-paper">{usd(car.priceUsd)}</p>
          </div>
          <button
            type="button"
            onClick={() => open(`Интересует похожий автомобиль: ${car.brand} ${car.model}, ${car.year}`)}
            className="min-h-[44px] rounded-full border border-line px-4 text-[12px] font-bold uppercase tracking-[0.12em] transition-colors hover:border-gold hover:text-gold"
          >
            Хочу похожий
          </button>
        </div>
      </div>
    </motion.article>
  );
}

export default function Catalog() {
  const [f, setF] = useState<Filters>(initial);
  const [panel, setPanel] = useState(false);

  useEffect(() => {
    const on = (e: Event) => setF((p) => ({ ...p, country: (e as CustomEvent<Country>).detail }));
    window.addEventListener(FILTER_EVENT, on);
    return () => window.removeEventListener(FILTER_EVENT, on);
  }, []);

  const list = useMemo(
    () =>
      cars.filter(
        (c) =>
          (!f.brand || c.brand === f.brand) &&
          c.year >= f.yearFrom &&
          c.priceUsd <= f.priceTo &&
          (!f.body || c.body === f.body) &&
          (!f.country || c.country === f.country),
      ),
    [f],
  );

  // Высота сетки меняется при фильтрации — пересчитываем позиции scroll-анимаций ниже
  useEffect(() => {
    const t = setTimeout(() => ScrollTrigger.refresh(), 700);
    return () => clearTimeout(t);
  }, [list.length]);

  const dirty = JSON.stringify(f) !== JSON.stringify(initial);
  const pricePct = ((f.priceTo - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100;

  return (
    <section id="catalog" aria-labelledby="catalog-title" className="relative bg-ink-2 py-24 md:py-36">
      <div className="wrap">
        <SectionHead id="catalog-title" eyebrow="Каталог" title="Автомобили в работе">
          <DemoTag>Примеры, не реальные предложения</DemoTag>
          <p className="lead mt-4">
            Карточки показывают, как выглядит подборка для клиента. Актуальные варианты под ваш бюджет пришлёт менеджер.
          </p>
        </SectionHead>

        <div className="mt-12 rounded-[24px] border border-line bg-ink p-5 md:p-7" data-reveal>
          <div className="flex items-center justify-between gap-4 lg:hidden">
            <button
              type="button"
              onClick={() => setPanel((p) => !p)}
              aria-expanded={panel}
              aria-controls="catalog-filters"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-line px-5 text-[13px] font-semibold"
            >
              <SlidersHorizontal size={16} /> Фильтры
            </button>
            <p className="text-[13px] text-mute" aria-live="polite">
              Найдено: {list.length}
            </p>
          </div>

          <div id="catalog-filters" className={`${panel ? "mt-6 grid" : "hidden"} gap-7 lg:mt-0 lg:grid lg:grid-cols-12 lg:gap-8`}>
            <div className="grid gap-5 sm:grid-cols-3 lg:col-span-12 lg:grid-cols-4">
              <div>
                <label htmlFor="f-brand" className="mb-3 block text-[12px] uppercase tracking-[0.18em] text-mute">
                  Марка
                </label>
                <select id="f-brand" className="field" value={f.brand} onChange={(e) => setF({ ...f, brand: e.target.value })}>
                  <option value="">Все марки</option>
                  {brands.map((b) => (
                    <option key={b}>{b}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="f-year" className="mb-3 block text-[12px] uppercase tracking-[0.18em] text-mute">
                  Год, от
                </label>
                <select id="f-year" className="field" value={f.yearFrom} onChange={(e) => setF({ ...f, yearFrom: Number(e.target.value) })}>
                  {years.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-1 lg:col-span-2">
                <label htmlFor="f-price" className="mb-3 flex justify-between text-[12px] uppercase tracking-[0.18em] text-mute">
                  <span>Цена, до</span>
                  <span className="text-paper">{usd(f.priceTo)}</span>
                </label>
                <div className="flex h-[52px] items-center">
                  <input
                    id="f-price"
                    type="range"
                    className="range"
                    min={PRICE_MIN}
                    max={PRICE_MAX}
                    step={1000}
                    value={f.priceTo}
                    style={{ ["--p" as string]: `${pricePct}%` }}
                    onChange={(e) => setF({ ...f, priceTo: Number(e.target.value) })}
                  />
                </div>
              </div>
            </div>
            <div className="lg:col-span-7">
              <ChipGroup label="Тип кузова" value={f.body} options={bodies} onChange={(v) => setF({ ...f, body: v })} />
            </div>
            <div className="lg:col-span-3">
              <ChipGroup label="Страна" value={f.country} options={["USA", "CANADA"] as Country[]} onChange={(v) => setF({ ...f, country: v })} />
            </div>
            <div className="flex items-end justify-between gap-4 lg:col-span-2 lg:flex-col lg:items-end">
              <p className="hidden text-[13px] text-mute lg:block" aria-live="polite">
                Найдено: <span className="text-paper">{list.length}</span>
              </p>
              <button
                type="button"
                onClick={() => setF(initial)}
                disabled={!dirty}
                className="inline-flex min-h-[44px] items-center gap-2 text-[13px] font-semibold text-gold transition-opacity disabled:opacity-30"
              >
                <RotateCcw size={15} /> Сбросить
              </button>
            </div>
          </div>
        </div>

        <motion.div layout className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {list.map((c) => (
              <CarCard key={c.id} car={c} />
            ))}
          </AnimatePresence>
        </motion.div>
        <AnimatePresence>
          {list.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-8 flex flex-col items-center gap-4 rounded-[24px] border border-dashed border-line px-6 py-16 text-center"
            >
              <p className="font-display text-xl uppercase">Ничего не найдено</p>
              <p className="lead max-w-md">В демо-каталоге нет таких автомобилей. Ослабьте фильтры или оставьте заявку — подберём вариант на аукционе.</p>
              <button type="button" onClick={() => setF(initial)} className="min-h-[44px] text-[13px] font-semibold text-gold">
                Сбросить фильтры
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
