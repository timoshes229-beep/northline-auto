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

/**
 * Сквозная сцена «Путь автомобиля» (главный экран). Сгенерированы в Magnific (ИИ),
 * один и тот же автомобиль во всех кадрах. Замените на собственный контент при желании.
 */
export const journeyImages = [1, 2, 3, 4, 5, 6].map((n) => `${base}/images/journey/scene-0${n}.jpg`);

export const images = {
  cta: { src: base + "/images/cta-dark.jpg", alt: "Силуэт спортивного автомобиля в полной темноте", width: 2400, height: 1371, position: "60% 50%", source: u("0xySZZ8OK1o") },
  about: { src: base + "/images/about-amg.jpg", alt: "Чёрный Mercedes-AMG в полутёмном гараже", width: 1800, height: 1200, position: "50% 60%", source: "https://unsplash.com/s/photos/mercedes-amg-gt" },
  dirUsa: { src: base + "/images/dir-usa.jpg", alt: "Графитовый кроссовер на пустынной трассе на юго-западе США в сумерках", width: 1200, height: 1600, source: "Magnific (ИИ)" },
  dirCanada: { src: base + "/images/dir-canada.jpg", alt: "Тот же автомобиль на заснеженной горной дороге в Канаде", width: 1200, height: 1600, source: "Magnific (ИИ)" },

  car911: { src: base + "/images/catalog/911.jpg", alt: "Тёмно-серый Porsche 911 Carrera 4S в чёрной студии", width: 1600, height: 898, source: "Magnific (ИИ)" },
  carGle: { src: base + "/images/catalog/gle.jpg", alt: "Чёрный Mercedes-AMG GLE 63 S в чёрной студии", width: 1600, height: 898, source: "Magnific (ИИ)" },
  carX5: { src: base + "/images/catalog/x5.jpg", alt: "Белый BMW X5 M50d в чёрной студии", width: 1600, height: 898, source: "Magnific (ИИ)" },
  carRs7: { src: base + "/images/catalog/rs7.jpg", alt: "Синий Audi RS7 Sportback в чёрной студии", width: 1600, height: 898, source: "Magnific (ИИ)" },
  carModelY: { src: base + "/images/catalog/modely.jpg", alt: "Белая Tesla Model Y в чёрной студии", width: 1600, height: 898, source: "Magnific (ИИ)" },
  carMustang: { src: base + "/images/catalog/mustang.jpg", alt: "Красный Ford Mustang Convertible в чёрной студии", width: 1600, height: 898, source: "Magnific (ИИ)" },

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
