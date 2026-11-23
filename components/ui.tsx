"use client";

import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { forwardRef, type ReactNode, type MouseEvent, Fragment } from "react";

type Variant = "gold" | "ghost" | "light";

const styles: Record<Variant, string> = {
  gold: "bg-gold text-ink hover:bg-gold-2",
  ghost: "border border-paper/20 text-paper hover:border-paper/60 hover:bg-paper/5",
  light: "bg-paper text-ink hover:bg-white",
};

interface BtnProps {
  children: ReactNode;
  variant?: Variant;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
  icon?: boolean;
  disabled?: boolean;
  "aria-label"?: string;
}

/** Кнопка с мягким «магнитным» откликом на курсор (Framer Motion). */
export const Button = forwardRef<HTMLElement, BtnProps>(function Button(
  { children, variant = "gold", href, onClick, type = "button", className = "", icon = true, disabled, ...rest },
  _ref,
) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 18 });
  const sy = useSpring(y, { stiffness: 260, damping: 18 });

  const move = (e: MouseEvent<HTMLElement>) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * 0.18);
    y.set((e.clientY - r.top - r.height / 2) * 0.28);
  };
  const leave = () => {
    x.set(0);
    y.set(0);
  };

  const cls = `group relative inline-flex min-h-[52px] items-center justify-center gap-3 rounded-full px-7 text-[12px] font-bold uppercase tracking-[0.16em] transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-60 ${styles[variant]} ${className}`;

  const inner = (
    <Fragment>
      <span>{children}</span>
      {icon && (
        <span className="relative grid h-5 w-5 place-items-center overflow-hidden">
          <ArrowUpRight
            size={18}
            strokeWidth={1.8}
            className="transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:-translate-y-5 group-hover:translate-x-5"
          />
          <ArrowUpRight
            size={18}
            strokeWidth={1.8}
            className="absolute -translate-x-5 translate-y-5 transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-0 group-hover:translate-y-0"
          />
        </span>
      )}
    </Fragment>
  );

  const motionProps = {
    style: { x: sx, y: sy },
    onMouseMove: move,
    onMouseLeave: leave,
    whileTap: { scale: 0.96 },
    className: cls,
  };

  if (href) {
    return (
      <motion.a href={href} {...motionProps} aria-label={rest["aria-label"]}>
        {inner}
      </motion.a>
    );
  }
  return (
    <motion.button type={type} onClick={onClick} disabled={disabled} {...motionProps} aria-label={rest["aria-label"]}>
      {inner}
    </motion.button>
  );
});

/** Разбивает текст на слова для пословного reveal (анимирует GSAP). */
export function SplitWords({ text, className = "" }: { text: string; className?: string }) {
  const words = text.split(" ");
  return (
    <span className={className} aria-label={text} role="text">
      {words.map((w, i) => (
        <Fragment key={i}>
          <span className="word" aria-hidden="true">
            <span className="word-inner">{w}</span>
          </span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </span>
  );
}

export function DemoTag({ children = "Демо-данные" }: { children?: ReactNode }) {
  return (
    <span className="demo-tag">
      <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden />
      {children}
    </span>
  );
}

export function SectionHead({
  eyebrow,
  title,
  children,
  id,
  className = "",
}: {
  eyebrow: string;
  title: string;
  children?: ReactNode;
  id?: string;
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-6 md:flex-row md:items-end md:justify-between ${className}`}>
      <div className="max-w-3xl">
        <p className="eyebrow mb-5" data-reveal>
          {eyebrow}
        </p>
        <h2 id={id} className="h-section" data-split>
          <SplitWords text={title} />
        </h2>
      </div>
      {children && (
        <div className="max-w-md" data-reveal>
          {children}
        </div>
      )}
    </div>
  );
}

/** Иконка Instagram (в lucide-react больше нет брендовых иконок). */
export function InstagramIcon({ size = 18, className = "", ...rest }: { size?: number; className?: string; "aria-hidden"?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden {...rest}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </svg>
  );
}
