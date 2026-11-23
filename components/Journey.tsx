"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { journeyImages } from "@/lib/images";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useLead } from "./LeadProvider";
import { Button } from "./ui";

/**
 * Главный экран — сквозная сцена «путь автомобиля»: один и тот же автомобиль
 * проходит маршрут от США/Канады до дома клиента. Секция закрепляется, прокрутка
 * переключает сцены (шторка + наезд камеры) и текст.
 * Без JS или при prefers-reduced-motion (нет класса html.js-motion) сцены идут
 * обычными экранами друг за другом — см. правила .journey в globals.css.
 */

interface Scene {
  tag: string;
  title: string;
  text: string;
  alt: string;
  point: string;
  /** где на кадре машина — для кадрирования на телефоне */
  pos: string;
}

const scenes: Scene[] = [
  {
    tag: "USA & Canada → Ukraine",
    title: "Автомобили, которые стоят вашего внимания",
    text: "Подбираем, проверяем и доставляем автомобили из США и Канады в Украину. Полный контроль на каждом этапе.",
    alt: "Графитовый кроссовер-купе ночью на мокрой улице американского города",
    point: "Подбор",
    pos: "62% 55%",
  },
  {
    tag: "02 — Порт отправки",
    title: "Выкупаем и везём в порт",
    text: "Оплачиваем лот, забираем автомобиль с площадки и грузим в контейнер. Фото погрузки и документы приходят вам в чат.",
    alt: "Тот же автомобиль заезжает по рампе в контейнер в морском порту",
    point: "Порт",
    pos: "70% 55%",
  },
  {
    tag: "03 — Атлантика",
    title: "Отправляем морем",
    text: "Контейнеровоз идёт в Европу. Вы видите судно на карте и заранее знаете дату прибытия.",
    alt: "Контейнеровоз в открытом океане на закате",
    point: "Океан",
    pos: "62% 55%",
  },
  {
    tag: "04 — Таможня",
    title: "Растаможиваем без сюрпризов",
    text: "Готовим документы, проходим таможню и сертификацию. Каждый платёж — отдельной строкой в смете.",
    alt: "Автомобиль в современном таможенном терминале ночью",
    point: "Таможня",
    pos: "70% 55%",
  },
  {
    tag: "05 — Дорога домой",
    title: "Везём по Украине",
    text: "Автовоз доставляет машину в ваш город — без пробега и лишних рук, с отслеживанием.",
    alt: "Автомобиль на автовозе едет по ночному мосту через реку",
    point: "Дорога",
    pos: "62% 55%",
  },
  {
    tag: "06 — Финиш",
    title: "Ключи у вас",
    text: "Передаём автомобиль с полным пакетом документов и помогаем с регистрацией. Дальше — только дорога.",
    alt: "Автомобиль у современного дома в сумерках",
    point: "Ключи",
    pos: "70% 55%",
  },
];

export default function Journey() {
  const root = useRef<HTMLElement>(null);
  const stRef = useRef<ScrollTrigger | null>(null);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const { open } = useLead();
  const n = scenes.length;

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const layers = gsap.utils.toArray<HTMLElement>("[data-scene]", el);
      const imgs = gsap.utils.toArray<HTMLElement>("[data-scene-img]", el);
      const texts = gsap.utils.toArray<HTMLElement>("[data-scene-text]", el);

      gsap.set(layers.slice(1), { clipPath: "inset(0% 0% 0% 100%)" });
      gsap.set(texts.slice(1), { autoAlpha: 0, y: 50 });

      // Кинематографичный вход первой сцены
      gsap
        .timeline({ defaults: { ease: "expo.out" } })
        .fromTo("[data-veil]", { autoAlpha: 1 }, { autoAlpha: 0, duration: 1.6, ease: "power2.inOut" })
        .fromTo(imgs[0], { scale: 1.28, filter: "brightness(0.2)" }, { scale: 1.1, filter: "brightness(1)", duration: 2.8 }, 0)
        .fromTo(texts[0].querySelectorAll("[data-line]"), { y: 60, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1.3, stagger: 0.1 }, 0.6)
        .fromTo("[data-route]", { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 1 }, 1.3);

      // Сцены по прокрутке. Каждый отрезок = 1 единица таймлайна:
      // первая половина — сцена держится и камера медленно наезжает,
      // вторая — уход в тень и шторка следующей сцены.
      const tl = gsap.timeline({ defaults: { ease: "none" } });
      for (let i = 1; i < n; i++) {
        const at = i - 1;
        tl.to(imgs[i - 1], { scale: 1.16, duration: 0.5 }, at)
          .to(imgs[i - 1], { scale: 1.26, xPercent: -4, filter: "brightness(0.3)", duration: 0.5 }, at + 0.5)
          .to(texts[i - 1], { autoAlpha: 0, y: -50, duration: 0.2 }, at + 0.45)
          .fromTo(
            layers[i],
            { clipPath: "inset(0% 0% 0% 100%)" },
            { clipPath: "inset(0% 0% 0% 0%)", duration: 0.45, ease: "power2.inOut" },
            at + 0.5,
          )
          .fromTo(imgs[i], { scale: 1.32, xPercent: 7 }, { scale: 1.1, xPercent: 0, duration: 0.5 }, at + 0.5)
          .to(texts[i], { autoAlpha: 1, y: 0, duration: 0.2, ease: "power2.out" }, at + 0.82);
      }
      tl.to(imgs[n - 1], { scale: 1.16, duration: 0.5 }, n - 1);

      const st = ScrollTrigger.create({
        trigger: el,
        start: "top top",
        end: () => `+=${window.innerHeight * (n - 1) * 1.1}`,
        pin: true,
        scrub: 0.8,
        animation: tl,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          setProgress(self.progress);
          // смена активной сцены — в середине перехода (t = i - 0.25)
          const t = self.progress * tl.duration();
          setActive(Math.min(n - 1, Math.max(0, Math.floor(t + 0.25))));
        },
      });
      stRef.current = st;

      return () => {
        st.kill();
        stRef.current = null;
      };
    });

    return () => mm.revert();
  }, [n]);

  // Ссылки вида #scene-N (например, из меню) ведут к нужной сцене внутри закреплённой секции
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest?.('a[href^="#scene-"]');
      if (!a) return;
      e.preventDefault();
      goToRef.current(Number(a.getAttribute("href")!.replace("#scene-", "")));
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const goTo = (i: number) => {
    const st = stRef.current;
    if (!st) {
      document.getElementById(`scene-${i}`)?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    const total = st.end - st.start;
    const tlDur = n - 1 + 0.5; // длительность таймлайна; сцена i полностью на экране при t = i
    window.scrollTo({ top: st.start + (total * i) / tlDur + 1, behavior: "smooth" });
  };

  const goToRef = useRef(goTo);
  goToRef.current = goTo;

  return (
    <section ref={root} id="top" aria-labelledby="journey-title" className="journey relative bg-ink">
      {scenes.map((s, i) => {
        const Heading = i === 0 ? "h1" : "h2";
        return (
          <div
            key={i}
            id={`scene-${i}`}
            data-scene
            className="journey-scene relative isolate flex h-[100svh] min-h-[600px] items-end overflow-hidden md:items-center"
            style={{ zIndex: i + 1 }}
          >
            <div data-scene-img className="absolute inset-0 -z-10 will-change-transform max-md:bottom-[34%]">
              <Image
                src={journeyImages[i]}
                alt={s.alt}
                fill
                priority={i === 0}
                sizes="100vw"
                quality={80}
                className="object-cover md:!object-center"
                style={{ objectPosition: s.pos }}
              />
            </div>
            <div
              aria-hidden
              className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(9,10,12,0.92)_0%,rgba(9,10,12,0.66)_34%,rgba(9,10,12,0.04)_66%)] max-md:bg-[linear-gradient(180deg,rgba(9,10,12,0.45)_0%,rgba(9,10,12,0)_22%,rgba(9,10,12,0)_42%,#090A0C_68%,#090A0C_100%)]"
            />
            <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-ink to-transparent" />

            <div data-scene-text className="wrap pb-32 pt-28 md:pb-20">
              <div className="max-w-[640px]">
                <p data-line className="eyebrow mb-6">
                  {s.tag}
                </p>
                <Heading
                  id={i === 0 ? "journey-title" : undefined}
                  data-line
                  className={`h-display max-w-[13ch] ${i === 0 ? "text-[clamp(28px,5.6vw,92px)]" : "text-[clamp(24px,6.6vw,80px)] md:text-[clamp(34px,5vw,80px)]"}`}
                >
                  {s.title}
                </Heading>
                <p data-line className="lead mt-6 max-w-[44ch] text-paper/75">
                  {s.text}
                </p>
                {i === 0 && (
                  <div data-line className="mt-9 flex flex-col gap-3 sm:flex-row">
                    <Button onClick={() => open("Подбор автомобиля")}>Подобрать автомобиль</Button>
                    <Button href="#about" variant="ghost" icon={false}>
                      О компании
                    </Button>
                  </div>
                )}
                {i === n - 1 && (
                  <div data-line className="mt-9">
                    <Button onClick={() => open("Обсудить покупку")}>Обсудить покупку</Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}

      {/* Маршрут-индикатор: виден только в режиме с анимацией */}
      <div data-route className="journey-route absolute inset-x-0 bottom-0 z-30 pb-7 md:pb-9">
        <div className="wrap">
          <div className="flex items-center gap-5 text-[10px] font-semibold uppercase tracking-[0.22em] text-mute md:text-[11px]">
            <span className="hidden sm:inline">USA / CA</span>
            <div className="relative flex-1">
              <div className="h-px w-full bg-paper/15" />
              <div className="absolute left-0 top-0 h-px bg-gold" style={{ width: `${progress * 100}%` }} />
              <ol className="absolute inset-x-0 -top-[22px] flex justify-between">
                {scenes.map((s, i) => (
                  <li key={i}>
                    <button
                      type="button"
                      onClick={() => goTo(i)}
                      aria-label={`Этап ${i + 1}: ${s.point}`}
                      aria-current={i === active ? "step" : undefined}
                      className="group relative grid h-11 w-11 place-items-center"
                    >
                      <span
                        className={`block h-3 w-3 rounded-full border transition-all duration-500 ${
                          i <= active ? "border-gold bg-gold" : "border-paper/35 bg-ink"
                        } ${i === active ? "scale-150 shadow-[0_0_18px_rgba(199,165,107,0.75)]" : ""}`}
                      />
                      <span
                        className={`absolute top-10 hidden whitespace-nowrap transition-colors md:block ${
                          i === active ? "text-paper" : "text-mute group-hover:text-paper"
                        }`}
                      >
                        {s.point}
                      </span>
                    </button>
                  </li>
                ))}
              </ol>
            </div>
            <span className="hidden sm:inline">UA</span>
          </div>
        </div>
      </div>

      <div aria-hidden data-veil className="pointer-events-none absolute inset-0 z-40 bg-ink opacity-0" />
    </section>
  );
}
