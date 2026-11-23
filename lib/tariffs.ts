/**
 * Параметры калькулятора предварительной стоимости.
 *
 * ВАЖНО: все числа ниже — ДЕМОНСТРАЦИОННЫЕ ЗАГЛУШКИ, а не действующие ставки.
 * Перед публикацией сверьте их с актуальным законодательством Украины
 * и тарифами ваших партнёров (аукционы, логистика, сертификация).
 * Обновить тарифы = изменить значения в этом файле. Логика расчёта — в calculate().
 */

export type EngineType = "petrol" | "diesel" | "hybrid" | "electric";
export type BuyCountry = "USA" | "CANADA";

export const tariffs = {
  version: "demo-2026-11",
  currency: "USD",

  /** Аукционный сбор: процент от цены, но не меньше минимума */
  auctionFee: { percent: 0.08, minUsd: 600 },

  /** Доставка (наземная + морская + порт), USD — заглушки */
  delivery: { USA: 2100, CANADA: 2500 } satisfies Record<BuyCountry, number>,

  /** Таможенные платежи — ПАРАМЕТРЫ-ЗАГЛУШКИ */
  customs: {
    /** Пошлина, доля от таможенной стоимости (по типу двигателя) */
    dutyPercent: { petrol: 0.1, diesel: 0.1, hybrid: 0.1, electric: 0 } satisfies Record<EngineType, number>,
    /** Акциз: базовая ставка, USD за 1000 см³ (для ДВС) */
    exciseBasePer1000cc: { petrol: 50, diesel: 75, hybrid: 50 },
    /** Множитель объёма для крупных двигателей (порог в см³) */
    exciseLargeEngine: { thresholdCc: 3000, multiplier: 2 },
    /** Коэффициент возраста: на каждый год старше 1 года, не более maxYears */
    exciseAge: { maxYears: 15 },
    /** Акциз для электромобилей: USD за кВт·ч батареи (условно — фиксированная сумма) */
    exciseElectricFlatUsd: 100,
    /** НДС, доля от (стоимость + пошлина + акциз) */
    vatPercent: { petrol: 0.2, diesel: 0.2, hybrid: 0.2, electric: 0 } satisfies Record<EngineType, number>,
  },

  /** Сертификация и регистрация, USD */
  certificationUsd: 450,

  /** Прочие расходы: услуги компании, брокер, стоянка, USD */
  otherUsd: 900,
};

export interface CalcInput {
  price: number;
  year: number;
  engineCc: number;
  engine: EngineType;
  country: BuyCountry;
}

export interface CalcResult {
  car: number;
  auction: number;
  delivery: number;
  customs: number;
  certification: number;
  other: number;
  total: number;
  breakdown: { duty: number; excise: number; vat: number };
}

export function calculate(i: CalcInput, now = new Date().getFullYear()): CalcResult {
  const t = tariffs;
  const price = Math.max(0, i.price || 0);
  const auction = price > 0 ? Math.max(t.auctionFee.minUsd, price * t.auctionFee.percent) : 0;
  const delivery = t.delivery[i.country];

  const customsBase = price + auction;
  const duty = customsBase * t.customs.dutyPercent[i.engine];

  let excise = 0;
  if (i.engine === "electric") {
    excise = t.customs.exciseElectricFlatUsd;
  } else {
    const base = t.customs.exciseBasePer1000cc[i.engine];
    const large = i.engineCc > t.customs.exciseLargeEngine.thresholdCc ? t.customs.exciseLargeEngine.multiplier : 1;
    const age = Math.min(Math.max(now - i.year - 1, 1), t.customs.exciseAge.maxYears);
    excise = base * large * (Math.max(i.engineCc, 0) / 1000) * age;
  }

  const vat = (customsBase + duty + excise) * t.customs.vatPercent[i.engine];
  const customs = duty + excise + vat;
  const total = price + auction + delivery + customs + t.certificationUsd + t.otherUsd;

  return {
    car: price,
    auction,
    delivery,
    customs,
    certification: t.certificationUsd,
    other: t.otherUsd,
    total,
    breakdown: { duty, excise, vat },
  };
}

export const usd = (n: number) =>
  new Intl.NumberFormat("ru-RU", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(Math.round(n));
