"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { images } from "@/lib/images";
import { gsap } from "@/lib/gsap";
import { useLead } from "./LeadProvider";
import { Button, SplitWords } from "./ui";

const facts = [
  { k: "2", v: "страны покупки" },
  { k: "7", v: "этапов под контролем" },
  { k: "1", v: "менеджер на всю сделку" },
];

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const { open } = useLead();

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.fromTo("[data-hero-veil]", { opacity: 1 }, { opacity: 0, duration: 1.6, ease: "power2.inOut" })
        .fromTo(
          "[data-hero-car]",
          { scale: 1.22, xPercent: 6, filter: "brightness(0.2)" },
          { scale: 1.06, xPercent: 0, filter: "brightness(1)", duration: 2.6 },
          0,
        )
        .fromTo("[data-hero-light]", { opacity: 0, xPercent: -30 }, { opacity: 1, xPercent: 0, duration: 2.4 }, 0.4)
        .to("[data-hero-title] .word-inner", { y: 0, duration: 1.3, stagger: 0.07 }, 0.7)
        .to("[data-hero-fade]", { opacity: 1, duration: 1.2, stagger: 0.12 }, 1.3);

      // Параллакс и плавное затемнение при прокрутке
      gsap.to("[data-hero-car]", {
        yPercent: 12,
        scale: 1.12,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to("[data-hero-content]", {
        yPercent: -18,
        opacity: 0,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top top", end: "70% top", scrub: true },
      });
      gsap.to("[data-hero-dim]", {
        opacity: 1,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
      });

      // Лёгкая глубина от курсора (только для точных указателей)
      if (window.matchMedia("(pointer: fine)").matches) {
        const qx = gsap.quickTo("[data-hero-depth]", "x", { duration: 1.2, ease: "power3.out" });
        const qy = gsap.quickTo("[data-hero-depth]", "y", { duration: 1.2, ease: "power3.out" });
        const onMove = (e: MouseEvent) => {
          qx((e.clientX / window.innerWidth - 0.5) * -18);
          qy((e.clientY / window.innerHeight - 0.5) * -10);
        };
        window.addEventListener("mousemove", onMove);
        return () => window.removeEventListener("mousemove", onMove);
      }
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={root}
      id="top"
      data-hero
      aria-labelledby="hero-title"
      className="relative isolate flex h-[100svh] min-h-[620px] flex-col overflow-hidden bg-ink"
    >
      {/* Автомобиль */}
      <div className="absolute inset-0 -z-10" data-hero-depth>
        <div className="absolute inset-0" data-hero-car>
          <Image
            src={images.hero.src}
            alt={images.hero.alt}
            fill
            priority
            sizes="100vw"
            quality={85}
            className="object-cover object-[64%_50%] md:object-[70%_50%]"
          />
        </div>
      </div>
      {/* Свет и градиенты */}
      <div
        data-hero-light
        aria-hidden
        className="pointer-events-none absolute -z-10 right-[-10%] top-[10%] h-[70vh] w-[70vw] rounded-full bg-[radial-gradient(closest-side,rgba(199,165,107,0.16),transparent)] blur-2xl"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,#090A0C_0%,rgba(9,10,12,0.86)_30%,rgba(9,10,12,0.15)_62%,rgba(9,10,12,0.35)_100%)] max-md:bg-[linear-gradient(180deg,rgba(9,10,12,0.55)_0%,rgba(9,10,12,0.15)_35%,rgba(9,10,12,0.85)_62%,#090A0C_100%)]"
      />
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-1/3 bg-gradient-to-t from-ink to-transparent" />
      <div aria-hidden data-hero-dim className="absolute inset-0 -z-10 bg-ink opacity-0" />
      <div aria-hidden data-hero-veil className="absolute inset-0 z-20 bg-ink opacity-0 pointer-events-none" />

      <div data-hero-content className="wrap relative flex flex-1 flex-col justify-end pb-24 pt-28 md:justify-center md:pb-16">
        <p className="eyebrow mb-6" data-hero-fade>
          USA &amp; Canada → Ukraine
        </p>
        <h1
          id="hero-title"
          data-hero-title
          className="h-display max-w-[13ch] text-[clamp(34px,5.8vw,96px)] md:max-w-[12ch]"
        >
          <SplitWords text="Автомобили, которые стоят вашего внимания" />
        </h1>
        <p className="lead mt-7 max-w-[46ch] text-paper/70" data-hero-fade>
          Подбираем, проверяем и доставляем автомобили из США и Канады в Украину. Полный контроль на каждом этапе.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row" data-hero-fade>
          <Button onClick={() => open("Подбор автомобиля")}>Подобрать автомобиль</Button>
          <Button href="#process" variant="ghost" icon={false}>
            Как мы работаем
          </Button>
        </div>
      </div>

      <div className="wrap relative hidden pb-10 md:flex md:items-end md:justify-between" data-hero-fade>
        <dl className="flex gap-12">
          {facts.map((f) => (
            <div key={f.v} className="border-l border-line pl-4">
              <dt className="sr-only">{f.v}</dt>
              <dd className="font-display text-2xl text-paper">{f.k}</dd>
              <dd className="mt-1 text-[12px] text-mute">{f.v}</dd>
            </div>
          ))}
        </dl>
        <a href="#about" className="group flex items-center gap-4 text-[11px] uppercase tracking-[0.25em] text-mute hover:text-paper">
          Листайте
          <span className="relative h-11 w-6 rounded-full border border-paper/25">
            <span className="scroll-dot absolute left-1/2 top-2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-gold" />
          </span>
        </a>
      </div>
      <a
        href="#about"
        aria-label="Прокрутить вниз"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 md:hidden"
        data-hero-fade
      >
        <span className="relative block h-10 w-6 rounded-full border border-paper/25">
          <span className="scroll-dot absolute left-1/2 top-2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-gold" />
        </span>
      </a>
    </section>
  );
}
