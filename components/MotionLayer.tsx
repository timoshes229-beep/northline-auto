"use client";

import { useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/**
 * Глобальный слой scroll-анимаций (GSAP + ScrollTrigger):
 *  [data-reveal]           — появление снизу при входе в экран (data-reveal-delay для задержки)
 *  [data-reveal-group]     — дочерние [data-reveal] появляются каскадом
 *  [data-parallax="0.15"]  — параллакс изображения внутри рамки
 *  [data-scale-in]         — изображение «приближается» к 1 при прокрутке
 *  [data-split] .word-inner — построчный text reveal
 * При prefers-reduced-motion ничего не анимируется и всё сразу видно.
 */
export default function MotionLayer() {
  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const groups = gsap.utils.toArray<HTMLElement>("[data-reveal-group]");
      const grouped = new Set<HTMLElement>();
      groups.forEach((g) => {
        const items = g.querySelectorAll<HTMLElement>("[data-reveal]");
        items.forEach((i) => grouped.add(i));
        gsap.to(items, {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: "expo.out",
          stagger: 0.09,
          scrollTrigger: { trigger: g, start: "top 82%", once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        if (grouped.has(el) || el.closest("[data-hero]")) return;
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 1.1,
          delay: Number(el.dataset.revealDelay || 0),
          ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-split]").forEach((el) => {
        if (el.closest("[data-hero]")) return;
        gsap.to(el.querySelectorAll(".word-inner"), {
          y: 0,
          duration: 1.1,
          ease: "expo.out",
          stagger: 0.05,
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        const amount = Number(el.dataset.parallax || 0.12) * 100;
        gsap.fromTo(
          el,
          { yPercent: -amount / 2 },
          {
            yPercent: amount / 2,
            ease: "none",
            scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-scale-in]").forEach((el) => {
        gsap.fromTo(
          el,
          { scale: 1.18 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "center center", scrub: true },
          },
        );
      });
    });

    // Пересчитать позиции, когда догрузятся шрифты и картинки
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh);

    return () => {
      window.removeEventListener("load", refresh);
      mm.revert();
    };
  }, []);

  return null;
}
