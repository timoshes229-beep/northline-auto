"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Phone, Send } from "lucide-react";
import { useEffect, useState } from "react";
import { nav, site } from "@/lib/site";
import { useLead } from "./LeadProvider";
import { Button, InstagramIcon } from "./ui";

export function Logo() {
  return (
    <a href="#top" className="group flex items-center gap-3" aria-label="NORTHLINE AUTO — на главную">
      <svg width="30" height="30" viewBox="0 0 64 64" aria-hidden className="shrink-0">
        <rect x="1" y="1" width="62" height="62" rx="14" fill="none" stroke="rgb(245 245 245 / .18)" />
        <path
          d="M20 44V20l24 24V20"
          fill="none"
          stroke="#C7A56B"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-[stroke-dashoffset] duration-700"
        />
      </svg>
      <span className="font-display text-[13px] font-medium tracking-[0.22em] text-paper">
        NORTHLINE<span className="text-mute"> AUTO</span>
      </span>
    </a>
  );
}

export default function Header() {
  const { open } = useLead();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menu, setMenu] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 40);
    setHidden(y > 600 && y > prev && !menu);
  });

  useEffect(() => {
    document.body.style.overflow = menu ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenu(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menu]);

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50"
        animate={{ y: hidden ? "-110%" : "0%" }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className={`transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${
            scrolled || menu ? "border-b border-line bg-ink/75 backdrop-blur-xl" : "border-b border-transparent"
          }`}
        >
          <div className={`wrap flex items-center justify-between transition-all duration-500 ${scrolled ? "h-16" : "h-20"}`}>
            <Logo />
            <nav aria-label="Основная навигация" className="hidden lg:block">
              <ul className="flex items-center gap-9">
                {nav.map((n) => (
                  <li key={n.href}>
                    <a
                      href={n.href}
                      className="group relative py-2 text-[13px] font-medium text-paper/75 transition-colors hover:text-paper"
                    >
                      {n.label}
                      <span className="absolute -bottom-0.5 left-0 h-px w-full origin-right scale-x-0 bg-gold transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:origin-left group-hover:scale-x-100" />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="flex items-center gap-3">
              <Button onClick={() => open()} className="hidden !min-h-[44px] !px-5 sm:inline-flex" icon={false}>
                Оставить заявку
              </Button>
              <button
                className="relative grid h-11 w-11 place-items-center rounded-full border border-line lg:hidden"
                aria-label={menu ? "Закрыть меню" : "Открыть меню"}
                aria-expanded={menu}
                aria-controls="mobile-menu"
                onClick={() => setMenu((m) => !m)}
              >
                <span
                  className={`absolute h-px w-5 bg-paper transition-transform duration-500 ${menu ? "rotate-45" : "-translate-y-[4px]"}`}
                />
                <span
                  className={`absolute h-px w-5 bg-paper transition-transform duration-500 ${menu ? "-rotate-45" : "translate-y-[4px]"}`}
                />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {menu && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 flex flex-col bg-ink pt-24 lg:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            <nav aria-label="Мобильная навигация" className="wrap flex-1 overflow-y-auto">
              <ul className="flex flex-col">
                {nav.map((n, i) => (
                  <motion.li
                    key={n.href}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 + i * 0.06, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="border-b border-line"
                  >
                    <a
                      href={n.href}
                      onClick={() => setMenu(false)}
                      className="flex items-baseline justify-between py-5 font-display text-[clamp(26px,8vw,44px)] font-medium uppercase"
                    >
                      {n.label}
                      <span className="text-[12px] text-mute">0{i + 1}</span>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>
            <motion.div
              className="wrap flex flex-col gap-5 pb-10 pt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <Button
                onClick={() => {
                  setMenu(false);
                  open();
                }}
                className="w-full"
              >
                Оставить заявку
              </Button>
              <div className="flex gap-3">
                <a href={site.contacts.phoneHref} aria-label="Позвонить" className="grid h-12 w-12 place-items-center rounded-full border border-line">
                  <Phone size={18} />
                </a>
                <a href={site.contacts.telegram.href} aria-label="Telegram" target="_blank" rel="noreferrer" className="grid h-12 w-12 place-items-center rounded-full border border-line">
                  <Send size={18} />
                </a>
                <a href={site.contacts.instagram.href} aria-label="Instagram" target="_blank" rel="noreferrer" className="grid h-12 w-12 place-items-center rounded-full border border-line">
                  <InstagramIcon size={18} />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
