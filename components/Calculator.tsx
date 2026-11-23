"use client";

import { animate, motion, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import { Info } from "lucide-react";
import { useEffect, useId, useMemo, useState } from "react";
import { calculate, tariffs, usd, type BuyCountry, type EngineType } from "@/lib/tariffs";
import { useLead } from "./LeadProvider";
import { Button, SectionHead } from "./ui";

const engines: { v: EngineType; l: string }[] = [
  { v: "petrol", l: "Бензин" },
  { v: "diesel", l: "Дизель" },
  { v: "hybrid", l: "Гибрид" },
  { v: "electric", l: "Электро" },
];

const thisYear = new Date().getFullYear();
const yearOptions = Array.from({ length: 16 }, (_, i) => thisYear - i);

function AnimatedNumber({ value }: { value: number }) {
  const reduce = useReducedMotion();
  const mv = useMotionValue(value);
  const text = useTransform(mv, (v) => usd(v));
  useEffect(() => {
    if (reduce) {
      mv.set(value);
      return;
    }
    const c = animate(mv, value, { duration: 0.8, ease: [0.22, 1, 0.36, 1] });
    return c.stop;
  }, [value, mv, reduce]);
  return <motion.span>{text}</motion.span>;
}

export default function Calculator() {
  const uid = useId();
  const { open } = useLead();
  const [model, setModel] = useState("BMW X5 xDrive40i");
  const [year, setYear] = useState(thisYear - 3);
  const [priceRaw, setPriceRaw] = useState("38000");
  const [cc, setCc] = useState("2998");
  const [engine, setEngine] = useState<EngineType>("petrol");
  const [country, setCountry] = useState<BuyCountry>("USA");

  const price = Number(priceRaw.replace(/\D/g, "")) || 0;
  const engineCc = Number(cc.replace(/\D/g, "")) || 0;
  const priceErr = price < 500 ? "Укажите стоимость от $500" : price > 1_000_000 ? "Не более $1 000 000" : "";
  const ccErr = engine !== "electric" && (engineCc < 600 || engineCc > 8000) ? "Объём от 600 до 8000 см³" : "";

  const r = useMemo(
    () => calculate({ price: priceErr ? 0 : price, year, engineCc, engine, country }),
    [price, priceErr, year, engineCc, engine, country],
  );

  const rows = [
    { k: "Стоимость автомобиля", v: r.car },
    { k: "Аукционный сбор", v: r.auction },
    { k: "Доставка в Украину", v: r.delivery },
    { k: "Таможенные платежи", v: r.customs, hint: `пошлина ${usd(r.breakdown.duty)} · акциз ${usd(r.breakdown.excise)} · НДС ${usd(r.breakdown.vat)}` },
    { k: "Сертификация", v: r.certification },
    { k: "Другие расходы", v: r.other },
  ];
  const max = Math.max(...rows.map((x) => x.v), 1);

  return (
    <section id="calculator" aria-labelledby="calc-title" className="bg-ink py-24 md:py-36">
      <div className="wrap">
        <SectionHead id="calc-title" eyebrow="Калькулятор" title="Сколько будет стоить в Украине">
          <p className="lead">
            Меняйте параметры — структура расходов пересчитывается сразу. Это предварительная оценка, точную смету
            готовит менеджер.
          </p>
        </SectionHead>

        <div className="mt-14 grid gap-5 lg:grid-cols-12">
          <form className="grid content-start gap-5 rounded-[24px] border border-line bg-ink-2 p-6 md:p-8 lg:col-span-6" onSubmit={(e) => e.preventDefault()} data-reveal>
            <div>
              <label htmlFor={`${uid}-m`} className="mb-2 block text-[13px] text-mute">
                Марка и модель
              </label>
              <input id={`${uid}-m`} className="field" value={model} onChange={(e) => setModel(e.target.value)} placeholder="Например, Audi Q7" />
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor={`${uid}-y`} className="mb-2 block text-[13px] text-mute">
                  Год выпуска
                </label>
                <select id={`${uid}-y`} className="field" value={year} onChange={(e) => setYear(Number(e.target.value))}>
                  {yearOptions.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor={`${uid}-p`} className="mb-2 block text-[13px] text-mute">
                  Стоимость на аукционе, $
                </label>
                <input
                  id={`${uid}-p`}
                  className="field"
                  inputMode="numeric"
                  value={priceRaw ? Number(priceRaw.replace(/\D/g, "")).toLocaleString("ru-RU") : ""}
                  onChange={(e) => setPriceRaw(e.target.value.replace(/\D/g, "").slice(0, 7))}
                  aria-invalid={priceErr ? true : undefined}
                  aria-describedby={priceErr ? `${uid}-pe` : undefined}
                />
                {priceErr && (
                  <p id={`${uid}-pe`} className="mt-2 text-[13px] text-[#e08a7c]">
                    {priceErr}
                  </p>
                )}
              </div>
            </div>
            <fieldset>
              <legend className="mb-2 text-[13px] text-mute">Тип двигателя</legend>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {engines.map((e) => (
                  <button
                    key={e.v}
                    type="button"
                    aria-pressed={engine === e.v}
                    onClick={() => setEngine(e.v)}
                    className={`min-h-[48px] rounded-xl border text-[14px] font-medium transition-colors ${
                      engine === e.v ? "border-gold bg-gold/10 text-paper" : "border-line text-paper/70 hover:border-paper/30"
                    }`}
                  >
                    {e.l}
                  </button>
                ))}
              </div>
            </fieldset>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor={`${uid}-cc`} className="mb-2 block text-[13px] text-mute">
                  Объём двигателя, см³
                </label>
                <input
                  id={`${uid}-cc`}
                  className="field disabled:opacity-40"
                  inputMode="numeric"
                  disabled={engine === "electric"}
                  value={engine === "electric" ? "—" : cc}
                  onChange={(e) => setCc(e.target.value.replace(/\D/g, "").slice(0, 4))}
                  aria-invalid={ccErr ? true : undefined}
                  aria-describedby={ccErr ? `${uid}-cce` : undefined}
                />
                {ccErr && (
                  <p id={`${uid}-cce`} className="mt-2 text-[13px] text-[#e08a7c]">
                    {ccErr}
                  </p>
                )}
              </div>
              <fieldset>
                <legend className="mb-2 text-[13px] text-mute">Страна покупки</legend>
                <div className="grid grid-cols-2 gap-2">
                  {(["USA", "CANADA"] as BuyCountry[]).map((c) => (
                    <button
                      key={c}
                      type="button"
                      aria-pressed={country === c}
                      onClick={() => setCountry(c)}
                      className={`min-h-[52px] rounded-xl border text-[14px] font-semibold tracking-wide transition-colors ${
                        country === c ? "border-gold bg-gold/10" : "border-line text-paper/70 hover:border-paper/30"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </fieldset>
            </div>
          </form>

          <div className="relative flex flex-col overflow-hidden rounded-[24px] border border-line bg-[linear-gradient(160deg,#16181c,#0d0e11)] p-6 md:p-8 lg:col-span-6" data-reveal>
            <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />
            <p className="text-[13px] text-mute">{model || "Автомобиль"} · {year} · {country}</p>
            <p className="mt-3 text-[13px] uppercase tracking-[0.18em] text-mute">Итого, предварительно</p>
            <p className="mt-1 font-display text-[clamp(36px,5vw,60px)] leading-none text-gold" aria-live="polite">
              <AnimatedNumber value={r.total} />
            </p>

            <ul className="mt-8 grid gap-4">
              {rows.map((row) => (
                <li key={row.k}>
                  <div className="flex items-baseline justify-between gap-4 text-[14px]">
                    <span className="text-paper/80">{row.k}</span>
                    <span className="font-semibold tabular-nums">
                      <AnimatedNumber value={row.v} />
                    </span>
                  </div>
                  <div className="mt-2 h-[3px] overflow-hidden rounded-full bg-paper/5">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-gold/60 to-gold"
                      initial={false}
                      animate={{ width: `${(row.v / max) * 100}%` }}
                      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </div>
                  {row.hint && r.customs > 0 && <p className="mt-1.5 text-[12px] text-mute">{row.hint}</p>}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex gap-3 rounded-2xl border border-gold/20 bg-gold/5 p-4 text-[12.5px] leading-relaxed text-paper/70">
              <Info size={16} className="mt-0.5 shrink-0 text-gold" aria-hidden />
              <p>
                Расчёт предварительный и построен на демонстрационных параметрах (версия тарифов «{tariffs.version}»), а
                не на действующих ставках. Таможенные платежи, сборы и логистика зависят от законодательства и
                конкретного автомобиля — точную сумму подтвердит менеджер.
              </p>
            </div>
            <div className="mt-6">
              <Button onClick={() => open(`Расчёт: ${model}, ${year}, ${country}, ставка $${price}, ${engine}, ${engineCc} см³. Предварительно ${usd(r.total)}`)} className="w-full sm:w-auto">
                Получить точный расчёт
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
