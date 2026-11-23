/**
 * Единый конфиг изображений сайта.
 *
 * Чтобы заменить фото: положите файл в /public/images и поменяйте `src` (и `alt`) здесь.
 * Все текущие снимки — бесплатные фото с Unsplash (Unsplash License: коммерческое
 * использование разрешено, атрибуция не обязательна, но указана в `source`).
 * Это временные изображения: замените их собственными фото компании и доставленных авто.
 *
 * `position` — CSS object-position, чтобы управлять кадрированием без правки компонентов.
 */

export interface SiteImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  position?: string;
  source: string;
}

const u = (id: string) => `https://unsplash.com/photos/${id}`;

/** Префикс пути: на GitHub Pages сайт живёт в подпапке /northline-auto */
const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const images = {
  hero: { src: base + "/images/hero-911.jpg", alt: "Серебристый Porsche 911 в тёмной студии", width: 2400, height: 1600, position: "70% 50%", source: u("4HejFecAiuw") },
  cta: { src: base + "/images/cta-dark.jpg", alt: "Силуэт спортивного автомобиля в полной темноте", width: 2400, height: 1371, position: "60% 50%", source: u("0xySZZ8OK1o") },
  about: { src: base + "/images/about-amg.jpg", alt: "Чёрный Mercedes-AMG в полутёмном гараже", width: 1800, height: 1200, position: "50% 60%", source: "https://unsplash.com/s/photos/mercedes-amg-gt" },
  dirUsa: { src: base + "/images/dir-usa.jpg", alt: "Ночная трасса со световыми следами у Нью-Йорка", width: 2000, height: 1333, source: "https://unsplash.com/s/photos/new-york-city-night" },
  dirCanada: { src: base + "/images/dir-canada.jpg", alt: "Ночной Торонто, отражение в воде", width: 2000, height: 1335, source: "https://unsplash.com/s/photos/toronto-night" },
  process: { src: base + "/images/process-port.jpg", alt: "Контейнеровоз в порту, вид сверху", width: 1800, height: 1350, source: "https://unsplash.com/s/photos/container-ship-port" },

  car911: { src: base + "/images/car-911.jpg", alt: "Тёмно-серый Porsche 911 с антикрылом", width: 1400, height: 700, source: "https://unsplash.com/s/photos/porsche-911" },
  carGle: { src: base + "/images/car-gle.jpg", alt: "Белый кроссовер Mercedes-Benz на тёмном фоне", width: 1400, height: 933, source: "https://unsplash.com/s/photos/mercedes-gle" },
  carX5: { src: base + "/images/car-x5.jpg", alt: "Чёрный BMW X5 с включёнными фарами в сумерках", width: 1400, height: 934, source: "https://unsplash.com/s/photos/bmw-x5" },
  carRs7: { src: base + "/images/car-rs7.jpg", alt: "Серый Audi RS7 на причале", width: 1400, height: 930, source: "https://unsplash.com/s/photos/audi-rs7" },
  carModelY: { src: base + "/images/car-modely.jpg", alt: "Чёрная Tesla в гараже", width: 1400, height: 855, source: "https://unsplash.com/s/photos/tesla-model-y" },
  carMustang: { src: base + "/images/car-mustang.jpg", alt: "Чёрный Ford Mustang Shelby на закате", width: 1400, height: 935, source: "https://unsplash.com/s/photos/ford-mustang" },

  galAmg: { src: base + "/images/gal-amg.jpg", alt: "Матовый чёрный Mercedes-AMG GT у гавани", width: 1800, height: 1013, source: "https://unsplash.com/s/photos/mercedes-amg-gt" },
  galRed: { src: base + "/images/gal-red.jpg", alt: "Красный спорткар с включёнными фарами в темноте", width: 1400, height: 933, source: "https://unsplash.com/s/photos/porsche-dark" },
  gal911Road: { src: base + "/images/gal-911road.jpg", alt: "Тёмный Porsche на горном серпантине", width: 1800, height: 1200, source: "https://unsplash.com/s/photos/porsche-911" },
  galBmw: { src: base + "/images/gal-bmw.jpg", alt: "Серый BMW в полутёмном гараже", width: 1400, height: 787, source: "https://unsplash.com/s/photos/bmw-x5" },
  galGarage: { src: base + "/images/gal-garage.jpg", alt: "Чёрный автомобиль с фарами в тёмном гараже", width: 1400, height: 933, source: "https://unsplash.com/s/photos/audi-rs7" },

  advInterior: { src: base + "/images/adv-interior.jpg", alt: "Интерьер премиального автомобиля", width: 1400, height: 933, source: "https://unsplash.com/s/photos/luxury-car-interior" },
  advGrille: { src: base + "/images/adv-grille.jpg", alt: "Решётка радиатора BMW ночью крупным планом", width: 1400, height: 934, source: "https://unsplash.com/s/photos/luxury-car-night" },
  advTail: { src: base + "/images/adv-tail.jpg", alt: "Задний фонарь автомобиля крупным планом", width: 1400, height: 930, source: "https://unsplash.com/s/photos/porsche-dark" },

  rev1: { src: base + "/images/rev-1.jpg", alt: "Серый Mercedes-AMG у озера", width: 1200, height: 750, source: "https://unsplash.com/s/photos/mercedes-amg-gt" },
  rev2: { src: base + "/images/rev-2.jpg", alt: "Чёрные BMW в шоуруме", width: 1200, height: 675, source: "https://unsplash.com/s/photos/bmw-x5" },
  rev3: { src: base + "/images/rev-3.jpg", alt: "Чёрный Mercedes на загородной дороге", width: 1200, height: 750, source: "https://unsplash.com/s/photos/mercedes-gle" },
  rev4: { src: base + "/images/rev-4.jpg", alt: "Тёмный автомобиль на городском перекрёстке", width: 1200, height: 798, source: "https://unsplash.com/s/photos/tesla-model-y" },
} satisfies Record<string, SiteImage>;

export type ImageKey = keyof typeof images;
