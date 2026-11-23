"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import LeadForm from "./LeadForm";

interface LeadCtx {
  open: (topic?: string) => void;
}

const Ctx = createContext<LeadCtx>({ open: () => {} });
export const useLead = () => useContext(Ctx);

export default function LeadProvider({ children }: { children: ReactNode }) {
  const [topic, setTopic] = useState<string | null>(null);
  const isOpen = topic !== null;
  const lastFocus = useRef<HTMLElement | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  const open = useCallback((t?: string) => {
    lastFocus.current = document.activeElement as HTMLElement;
    setTopic(t ?? "");
  }, []);
  const close = useCallback(() => setTopic(null), []);

  useEffect(() => {
    if (!isOpen) {
      lastFocus.current?.focus?.();
      return;
    }
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "Tab" && dialogRef.current) {
        const f = dialogRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), input, select, textarea, a[href]',
        );
        if (!f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, close]);

  return (
    <Ctx.Provider value={{ open }}>
      {children}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <button
              aria-label="Закрыть окно"
              className="absolute inset-0 bg-ink/80 backdrop-blur-md"
              onClick={close}
              tabIndex={-1}
            />
            <motion.div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="lead-title"
              className="relative max-h-[92svh] w-full max-w-xl overflow-y-auto rounded-t-3xl border border-line bg-ink-2 p-6 shadow-2xl sm:rounded-3xl sm:p-10"
              initial={{ y: 60, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 40, opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <button
                onClick={close}
                aria-label="Закрыть"
                className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full border border-line text-mute transition hover:rotate-90 hover:border-paper/40 hover:text-paper"
              >
                <X size={18} />
              </button>
              <p className="eyebrow mb-4">Заявка</p>
              <h2 id="lead-title" className="h-display mb-3 pr-10 text-2xl sm:text-3xl">
                Обсудим ваш автомобиль
              </h2>
              <p className="lead mb-8 text-[15px]">
                Оставьте контакты — менеджер свяжется с вами, уточнит бюджет и пожелания.
              </p>
              <LeadForm defaultTopic={topic ?? ""} autoFocus onDone={close} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Ctx.Provider>
  );
}
