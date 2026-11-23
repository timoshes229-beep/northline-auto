import { NextResponse } from "next/server";
import { validateLead, type LeadPayload } from "@/lib/lead";

/**
 * Приём заявок. ДЕМО: заявка валидируется и пишется в лог сервера.
 * Чтобы получать заявки по-настоящему — отправьте их отсюда в CRM, на e-mail
 * или в Telegram-бота (токен держите в переменных окружения, не в коде).
 */
export async function POST(req: Request) {
  let body: Partial<LeadPayload>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Некорректный запрос" }, { status: 400 });
  }

  const errors = validateLead(body);
  if (Object.keys(errors).length) {
    return NextResponse.json({ ok: false, errors, message: "Проверьте поля формы" }, { status: 422 });
  }

  console.info("[lead:demo]", { name: body.name, budget: body.budget, at: new Date().toISOString() });
  return NextResponse.json({ ok: true, demo: true });
}
