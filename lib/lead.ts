export interface LeadPayload {
  name: string;
  phone: string;
  budget: string;
  message: string;
  consent: boolean;
}

export type LeadErrors = Partial<Record<keyof LeadPayload, string>>;

/** Общая валидация для клиента и сервера. */
export function validateLead(d: Partial<LeadPayload>): LeadErrors {
  const e: LeadErrors = {};
  const name = (d.name ?? "").trim();
  const digits = (d.phone ?? "").replace(/\D/g, "");

  if (name.length < 2) e.name = "Укажите имя — минимум 2 символа";
  else if (name.length > 60) e.name = "Слишком длинное имя";

  if (!digits) e.phone = "Укажите телефон для связи";
  else if (digits.length < 10 || digits.length > 13) e.phone = "Телефон должен содержать 10–13 цифр";

  if (!d.budget) e.budget = "Выберите примерный бюджет";
  if ((d.message ?? "").length > 1000) e.message = "Не более 1000 символов";
  if (!d.consent) e.consent = "Нужно согласие, чтобы мы могли связаться с вами";
  return e;
}
