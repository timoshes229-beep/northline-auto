"use client";

import { Mail, MapPin, Phone, Send } from "lucide-react";
import Image from "next/image";
import { images } from "@/lib/images";
import { nav, site } from "@/lib/site";
import { Logo } from "./Header";
import { useLead } from "./LeadProvider";
import { Button, DemoTag, InstagramIcon, SplitWords } from "./ui";

export default function FinalCta() {
  const { open } = useLead();
  const c = site.contacts;
  const contacts = [
    { icon: Phone, label: "Телефон", value: c.phoneDisplay, href: c.phoneHref },
    { icon: Send, label: "Telegram", value: c.telegram.label, href: c.telegram.href, ext: true },
    { icon: InstagramIcon, label: "Instagram", value: c.instagram.label, href: c.instagram.href, ext: true },
    { icon: Mail, label: "E-mail", value: c.email, href: `mailto:${c.email}` },
  ];

  return (
    <>
      <section id="contacts" aria-labelledby="cta-title" className="relative isolate overflow-hidden bg-ink">
        <div className="relative flex min-h-[100svh] flex-col justify-center py-28">
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute inset-[-10%_0]" data-parallax="0.18">
              <Image src={images.cta.src} alt={images.cta.alt} fill sizes="100vw" className="object-cover" style={{ objectPosition: images.cta.position }} />
            </div>
          </div>
          <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_70%_50%,transparent_10%,rgba(9,10,12,0.7)_60%,#090A0C_100%)]" />
          <div aria-hidden className="absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-ink to-transparent" />

          <div className="wrap">
            <p className="eyebrow mb-6" data-reveal>
              Начнём
            </p>
            <h2 id="cta-title" className="h-display max-w-[14ch] text-[clamp(36px,6.4vw,100px)]" data-split>
              <SplitWords text="Ваш следующий автомобиль начинается здесь." />
            </h2>
            <p className="lead mt-8 max-w-[44ch] text-paper/70" data-reveal>
              Расскажите, что ищете. Мы вернёмся с понятным планом, вариантами и предварительной сметой.
            </p>
            <div className="mt-10" data-reveal>
              <Button onClick={() => open("Обсудить покупку")}>Обсудить покупку</Button>
            </div>

            <div className="mt-20 grid gap-px overflow-hidden rounded-[24px] border border-line bg-line sm:grid-cols-2 xl:grid-cols-4" data-reveal-group>
              {contacts.map((k) => (
                <a
                  key={k.label}
                  href={k.href}
                  target={k.ext ? "_blank" : undefined}
                  rel={k.ext ? "noreferrer" : undefined}
                  className="group flex items-center gap-4 bg-ink/80 p-6 backdrop-blur-md transition-colors hover:bg-ink-3"
                  data-reveal
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-line text-gold transition-colors group-hover:border-gold">
                    <k.icon size={18} aria-hidden />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[12px] text-mute">{k.label}</span>
                    <span className="block truncate font-semibold">{k.value}</span>
                  </span>
                </a>
              ))}
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-4 text-[13px] text-mute" data-reveal>
              <DemoTag>Контакты демонстрационные</DemoTag>
              <span className="inline-flex items-center gap-2">
                <MapPin size={14} aria-hidden /> {c.city} · {c.hours}
              </span>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-line bg-ink py-12">
        <div className="wrap flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-5 text-[13px] leading-relaxed text-mute">{site.tagline}</p>
          </div>
          <nav aria-label="Навигация в подвале">
            <ul className="grid grid-cols-2 gap-x-10 gap-y-1 sm:grid-cols-3">
              {nav.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="inline-block py-2.5 text-[13px] text-paper/70 transition-colors hover:text-gold">
                    {n.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="#calculator" className="inline-block py-2.5 text-[13px] text-paper/70 transition-colors hover:text-gold">
                  Калькулятор
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <div className="wrap mt-12 flex flex-col gap-3 border-t border-line pt-6 text-[12px] text-mute md:flex-row md:justify-between">
          <p>© {new Date().getFullYear()} {site.name}. Демо-версия сайта: данные, цены, отзывы и контакты — примеры.</p>
          <p>Фото: Unsplash (Unsplash License).</p>
        </div>
      </footer>
    </>
  );
}
