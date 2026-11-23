/**
 * Демонстрационные данные. Это ПРИМЕРЫ, а не реальные предложения, отзывы или кейсы.
 * Фотографии берутся из единого конфига lib/images.ts.
 */
import { images, type SiteImage } from "./images";

export type Country = "USA" | "CANADA";
export type Body = "Купе" | "Кроссовер" | "Седан" | "Лифтбек" | "Кабриолет";
export type Status = "На аукционе" | "В пути" | "В Украине" | "Растаможен";

export interface Car {
  id: string;
  brand: string;
  model: string;
  year: number;
  mileageKm: number;
  country: Country;
  priceUsd: number;
  body: Body;
  status: Status;
  image: SiteImage;
}

export const cars: Car[] = [
  {
    id: "911",
    brand: "Porsche",
    model: "911 Carrera 4S",
    year: 2021,
    mileageKm: 28400,
    country: "USA",
    priceUsd: 104500,
    body: "Купе",
    status: "На аукционе",
    image: images.car911,
  },
  {
    id: "gle",
    brand: "Mercedes-Benz",
    model: "GLE 63 S AMG",
    year: 2022,
    mileageKm: 31900,
    country: "CANADA",
    priceUsd: 89800,
    body: "Кроссовер",
    status: "В пути",
    image: images.carGle,
  },
  {
    id: "x5",
    brand: "BMW",
    model: "X5 M50d",
    year: 2020,
    mileageKm: 46200,
    country: "USA",
    priceUsd: 58900,
    body: "Кроссовер",
    status: "В Украине",
    image: images.carX5,
  },
  {
    id: "rs7",
    brand: "Audi",
    model: "RS7 Sportback",
    year: 2021,
    mileageKm: 22100,
    country: "CANADA",
    priceUsd: 96700,
    body: "Лифтбек",
    status: "Растаможен",
    image: images.carRs7,
  },
  {
    id: "modely",
    brand: "Tesla",
    model: "Model Y Long Range",
    year: 2023,
    mileageKm: 14800,
    country: "USA",
    priceUsd: 36400,
    body: "Кроссовер",
    status: "На аукционе",
    image: images.carModelY,
  },
  {
    id: "mustang",
    brand: "Ford",
    model: "Mustang Convertible",
    year: 2024,
    mileageKm: 9300,
    country: "CANADA",
    priceUsd: 41200,
    body: "Кабриолет",
    status: "В пути",
    image: images.carMustang,
  },
];

export const steps = [
  { n: "01", title: "Заявка", text: "Обсуждаем бюджет, задачи и пожелания. Фиксируем требования к автомобилю в коротком брифе." },
  { n: "02", title: "Подбор автомобиля", text: "Отбираем варианты на аукционах и у дилеров США и Канады, присылаем шорт-лист с комментариями." },
  { n: "03", title: "Проверка истории и состояния", text: "Проверяем VIN по базам, историю ДТП и обслуживания, изучаем фото и отчёты инспекторов." },
  { n: "04", title: "Покупка на аукционе", text: "Торгуемся в рамках согласованного лимита. Вы видите итоговую ставку и все документы." },
  { n: "05", title: "Доставка в Украину", text: "Наземная доставка до порта, морская перевозка в контейнере, отслеживание на каждом участке." },
  { n: "06", title: "Таможенное оформление", text: "Готовим документы, проводим растаможку и сертификацию с прозрачной детализацией платежей." },
  { n: "07", title: "Передача автомобиля клиенту", text: "Передаём автомобиль с полным пакетом документов. Помогаем с регистрацией." },
] as const;

export const gallery = [
  { image: images.galAmg, model: "Mercedes-AMG GT", meta: "USA → Киев" },
  { image: images.galRed, model: "Спорткупе", meta: "CANADA → Львов" },
  { image: images.gal911Road, model: "Porsche 911", meta: "USA → Одесса" },
  { image: images.galBmw, model: "BMW M-серии", meta: "USA → Днепр" },
  { image: images.galGarage, model: "Audi Sportback", meta: "CANADA → Киев" },
] as const;

export const reviews = [
  {
    name: "Андрей К.",
    car: "Mercedes-AMG GT",
    text: "Получил подробный отчёт по каждому варианту и понимал, за что плачу на каждом этапе. Автомобиль пришёл в том состоянии, которое было на фото.",
    image: images.rev1,
  },
  {
    name: "Ольга М.",
    car: "BMW X7",
    text: "Больше всего ценю прозрачность: смета до покупки и итог почти совпали. Менеджер был на связи всё время доставки.",
    image: images.rev2,
  },
  {
    name: "Дмитрий С.",
    car: "Mercedes-Benz GLE",
    text: "Искали конкретную комплектацию около двух месяцев. Команда не торопила и отсеяла несколько машин с неочевидной историей.",
    image: images.rev3,
  },
  {
    name: "Ирина В.",
    car: "Tesla Model 3",
    text: "Удобно, что все документы и фото с порта приходили в один чат. Растаможка заняла меньше времени, чем я ожидала.",
    image: images.rev4,
  },
] as const;
