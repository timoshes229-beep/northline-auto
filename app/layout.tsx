import type { Metadata, Viewport } from "next";
import { Manrope, Unbounded } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";

const manrope = Manrope({ subsets: ["latin", "cyrillic"], variable: "--font-manrope", display: "swap" });
const unbounded = Unbounded({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
  variable: "--font-unbounded",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: "NORTHLINE AUTO — автомобили из США и Канады в Украину",
  description:
    "Подбираем, проверяем и доставляем автомобили из США и Канады в Украину. Проверка истории, покупка на аукционе, доставка и растаможка под ключ.",
  keywords: ["авто из США", "авто из Канады", "пригон авто", "автомобили из США в Украину", "аукцион Copart", "IAAI"],
  openGraph: {
    title: "NORTHLINE AUTO — Import Cars from USA & Canada to Ukraine",
    description: "Подбор, проверка, покупка и доставка автомобилей из США и Канады в Украину.",
    type: "website",
    locale: "ru_UA",
    images: [{ url: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/images/hero-911.jpg`, width: 2400, height: 1600 }],
  },
  icons: { icon: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/icon.svg` },
};

export const viewport: Viewport = {
  themeColor: "#090A0C",
  width: "device-width",
  initialScale: 1,
};

// Ставит класс до гидратации, чтобы GSAP-элементы не мигали. При reduced-motion — не ставит.
const motionScript = `try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('js-motion')}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${manrope.variable} ${unbounded.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionScript }} />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-gold focus:px-5 focus:py-3 focus:text-ink"
        >
          Перейти к содержимому
        </a>
        {children}
      </body>
    </html>
  );
}
