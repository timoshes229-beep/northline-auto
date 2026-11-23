import Image from "next/image";
import { images } from "@/lib/images";
import { SectionHead } from "./ui";

/**
 * Преимущества: типографика + фото + минималистичная графика вместо шаблонных иконок.
 */
function LineGraphic({ kind }: { kind: "ledger" | "shield" }) {
  if (kind === "ledger")
    return (
      <svg viewBox="0 0 240 120" className="h-auto w-full max-w-[260px]" aria-hidden>
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i}>
            <line x1="0" x2="240" y1={12 + i * 24} y2={12 + i * 24} stroke="rgb(245 245 245 / .1)" />
            <rect x="0" y={6 + i * 24} width={[150, 64, 92, 120, 40][i]} height="4" rx="2" fill={i === 3 ? "#C7A56B" : "rgb(245 245 245 / .35)"} />
            <rect x={200} y={6 + i * 24} width="40" height="4" rx="2" fill="rgb(245 245 245 / .2)" />
          </g>
        ))}
      </svg>
    );
  return (
    <svg viewBox="0 0 200 200" className="h-40 w-40" aria-hidden>
      {[90, 70, 50, 30].map((r, i) => (
        <circle key={r} cx="100" cy="100" r={r} fill="none" stroke={i === 0 ? "#C7A56B" : "rgb(245 245 245 / .12)"} strokeDasharray={i === 0 ? "4 6" : undefined} />
      ))}
      <path d="M78 101l15 15 30-32" fill="none" stroke="#C7A56B" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Advantages() {
  return (
    <section aria-labelledby="adv-title" className="bg-ink-2 py-24 md:py-36">
      <div className="wrap">
        <SectionHead id="adv-title" eyebrow="Преимущества" title="Почему с нами спокойно" />

        <div className="mt-14 grid gap-4 md:grid-cols-12 md:gap-5" data-reveal-group>
          {/* Прозрачность — типографика + графика */}
          <article className="group relative flex min-h-[360px] flex-col justify-between overflow-hidden rounded-[24px] border border-line bg-ink p-7 md:col-span-7 md:p-10" data-reveal>
            <div className="flex items-start justify-between gap-6">
              <span className="font-display text-[12px] text-gold">01</span>
              <LineGraphic kind="ledger" />
            </div>
            <div>
              <h3 className="font-display text-[clamp(34px,5vw,72px)] font-medium uppercase leading-none tracking-[-0.02em]">Прозрачность</h3>
              <p className="mt-5 max-w-[48ch] text-[15px] leading-relaxed text-mute">
                Смета с отдельной строкой для каждого платежа ещё до ставки. Никаких «доплат по факту» — только то, что
                согласовали.
              </p>
            </div>
          </article>

          {/* Надёжность — фото */}
          <article className="group relative isolate flex min-h-[360px] flex-col justify-end overflow-hidden rounded-[24px] p-7 md:col-span-5 md:p-10" data-reveal>
            <Image src={images.advGrille.src} alt={images.advGrille.alt} fill sizes="(min-width: 768px) 42vw, 100vw" className="-z-10 object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105" />
            <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/50 to-ink/10" />
            <span className="font-display text-[12px] text-gold">02</span>
            <h3 className="mt-3 font-display text-[clamp(28px,3.2vw,44px)] font-medium uppercase leading-none">Надёжность</h3>
            <p className="mt-4 max-w-[40ch] text-[15px] leading-relaxed text-paper/75">
              Проверяем VIN, историю повреждений и пробега до покупки. Сомнительные лоты отсеиваем без сожаления.
            </p>
          </article>

          {/* Контроль — фото */}
          <article className="group relative isolate flex min-h-[360px] flex-col justify-end overflow-hidden rounded-[24px] p-7 md:col-span-5 md:p-10" data-reveal>
            <Image src={images.advTail.src} alt={images.advTail.alt} fill sizes="(min-width: 768px) 42vw, 100vw" className="-z-10 object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105" />
            <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/50 to-ink/10" />
            <span className="font-display text-[12px] text-gold">03</span>
            <h3 className="mt-3 font-display text-[clamp(28px,3.2vw,44px)] font-medium uppercase leading-none">Контроль</h3>
            <p className="mt-4 max-w-[40ch] text-[15px] leading-relaxed text-paper/75">
              Фото с площадки, трекинг контейнера, документы порта — всё приходит в общий чат по мере движения.
            </p>
          </article>

          {/* Индивидуальный подход — графика + интерьер */}
          <article className="group relative grid min-h-[360px] overflow-hidden rounded-[24px] border border-line bg-ink md:col-span-7 md:grid-cols-2" data-reveal>
            <div className="flex flex-col justify-between p-7 md:p-10">
              <span className="font-display text-[12px] text-gold">04</span>
              <div className="mt-8">
                <h3 className="font-display text-[clamp(26px,2.8vw,40px)] font-medium uppercase leading-[1.05]">Индивидуальный подход</h3>
                <p className="mt-4 text-[15px] leading-relaxed text-mute">
                  Ищем под задачу, а не под склад: комплектация, цвет, история владения — так, как важно вам.
                </p>
              </div>
            </div>
            <div className="relative min-h-[220px]">
              <Image src={images.advInterior.src} alt={images.advInterior.alt} fill sizes="(min-width: 768px) 30vw, 100vw" className="object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105" />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-ink via-ink/20 to-transparent max-md:bg-gradient-to-b" />
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
