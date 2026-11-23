import Image from "next/image";
import { images } from "@/lib/images";
import { SplitWords } from "./ui";

const points = [
  { n: "01", t: "Проверенные автомобильные аукционы", d: "Работаем с крупными площадками США и Канады и дилерскими стоками." },
  { n: "02", t: "Прозрачная стоимость", d: "Смета до покупки: цена, сборы, доставка и растаможка отдельными строками." },
  { n: "03", t: "Контроль каждого этапа", d: "Фото, документы и статус автомобиля — в одном чате, без пауз." },
  { n: "04", t: "Сопровождение до получения в Украине", d: "От ставки на аукционе до передачи ключей и помощи с регистрацией." },
];

export default function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="relative bg-ink py-24 md:py-36">
      <div className="wrap grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6 lg:pr-8">
          <p className="eyebrow mb-6" data-reveal>
            О компании
          </p>
          <h2 id="about-title" className="h-section !text-[clamp(26px,3.2vw,46px)]" data-split>
            <SplitWords text="Ваш автомобиль. Наша ответственность." />
          </h2>
          <p className="mt-10 text-[clamp(19px,1.7vw,24px)] leading-[1.5] text-paper/90" data-reveal>
            NORTHLINE AUTO подбирает и привозит автомобили из США и Канады для тех, кто хочет купить конкретную машину
            — с понятной историей, честной ценой и без сюрпризов на таможне.
          </p>
          <p className="lead mt-6" data-reveal>
            Мы берём на себя поиск, проверку, торги, логистику и оформление. Вы принимаете решения на основе фактов и
            видите каждую строку расходов ещё до покупки.
          </p>
        </div>

        <div className="relative lg:col-span-6">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] sm:aspect-[5/4] lg:aspect-[4/5]" data-reveal>
            <div className="absolute inset-[-12%_0]" data-parallax="0.14">
              <Image
                src={images.about.src}
                alt={images.about.alt}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
                style={{ objectPosition: images.about.position }}
              />
            </div>
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
          </div>
        </div>

        <ul className="grid gap-px overflow-hidden rounded-[24px] border border-line bg-line sm:grid-cols-2 lg:col-span-12 lg:grid-cols-4" data-reveal-group>
          {points.map((p) => (
            <li key={p.n} className="group relative bg-ink-2 p-7 transition-colors duration-500 hover:bg-ink-3 md:p-8" data-reveal>
              <span className="font-display text-[12px] text-gold">{p.n}</span>
              <h3 className="mt-8 text-[17px] font-semibold leading-snug">{p.t}</h3>
              <p className="mt-3 text-[14px] leading-relaxed text-mute">{p.d}</p>
              <span aria-hidden className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-gold transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-x-100" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
