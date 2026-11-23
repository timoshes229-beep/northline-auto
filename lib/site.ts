/**
 * Контакты и ссылки компании.
 * ВНИМАНИЕ: все значения ниже — ДЕМОНСТРАЦИОННЫЕ. Замените их реальными перед публикацией.
 */
export const site = {
  name: "NORTHLINE AUTO",
  tagline: "Import Cars from USA & Canada to Ukraine",
  url: "https://northline.example",
  contacts: {
    phoneDisplay: "+380 (00) 000-00-00",
    phoneHref: "tel:+380000000000",
    email: "hello@northline.example",
    telegram: { label: "@northline_demo", href: "https://t.me/northline_demo" },
    instagram: { label: "@northline.demo", href: "https://instagram.com/northline.demo" },
    city: "Киев, Печерский район",
    hours: "Пн–Пт, 10:00–19:00",
  },
  isDemo: true,
} as const;

export const nav = [
  { label: "Главная", href: "#top" },
  { label: "Автомобили", href: "#catalog" },
  { label: "О компании", href: "#about" },
  { label: "Этапы работы", href: "#process" },
  { label: "Контакты", href: "#contacts" },
] as const;
