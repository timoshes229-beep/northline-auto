"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, Loader2 } from "lucide-react";
import { useId, useState, type FormEvent } from "react";
import { Button } from "./ui";
import { validateLead, type LeadErrors, type LeadPayload } from "@/lib/lead";

interface Props {
  defaultTopic?: string;
  autoFocus?: boolean;
  onDone?: () => void;
}

const budgets = ["до $20 000", "$20 000 – 40 000", "$40 000 – 70 000", "$70 000 – 100 000", "более $100 000"];

export default function LeadForm({ defaultTopic = "", autoFocus, onDone }: Props) {
  const uid = useId();
  const [data, setData] = useState<LeadPayload>({
    name: "",
    phone: "",
    budget: "",
    message: defaultTopic,
    consent: false,
  });
  const [errors, setErrors] = useState<LeadErrors>({});
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const set = <K extends keyof LeadPayload>(k: K, v: LeadPayload[K]) => {
    setData((d) => ({ ...d, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const errs = validateLead(data);
    setErrors(errs);
    if (Object.keys(errs).length) {
      const first = Object.keys(errs)[0];
      document.getElementById(`${uid}-${first}`)?.focus();
      return;
    }
    setState("sending");
    // Статическая версия (GitHub Pages): сервера нет, заявка только проверяется в браузере
    if (process.env.NEXT_PUBLIC_STATIC === "1") {
      await new Promise((r) => setTimeout(r, 700));
      setState("sent");
      return;
    }
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) {
        if (json.errors) setErrors(json.errors);
        throw new Error(json.message || "Ошибка");
      }
      setState("sent");
    } catch {
      setState("error");
    }
  };

  if (state === "sent") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-start gap-5 rounded-2xl border border-gold/30 bg-gold/5 p-6"
        role="status"
      >
        <span className="grid h-12 w-12 place-items-center rounded-full bg-gold text-ink">
          <Check size={22} />
        </span>
        <div>
          <p className="h-display text-lg">Заявка принята</p>
          <p className="lead mt-2 text-[15px]">
            Спасибо, {data.name.split(" ")[0]}. Это демо-версия сайта: заявка проверена, но пока никуда не
            отправляется — приём заявок подключается отдельно (CRM или Telegram-бот).
          </p>
        </div>
        {onDone && (
          <Button variant="ghost" onClick={onDone} icon={false}>
            Закрыть
          </Button>
        )}
      </motion.div>
    );
  }

  const err = (k: keyof LeadErrors) => (
    <AnimatePresence>
      {errors[k] && (
        <motion.p
          id={`${uid}-${k}-err`}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="mt-2 text-[13px] text-[#e08a7c]"
        >
          {errors[k]}
        </motion.p>
      )}
    </AnimatePresence>
  );

  const a11y = (k: keyof LeadErrors) => ({
    id: `${uid}-${k}`,
    "aria-invalid": errors[k] ? true : undefined,
    "aria-describedby": errors[k] ? `${uid}-${k}-err` : undefined,
  });

  return (
    <form onSubmit={submit} noValidate className="grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${uid}-name`} className="mb-2 block text-[13px] text-mute">
            Имя
          </label>
          <input
            {...a11y("name")}
            className="field"
            autoComplete="name"
            autoFocus={autoFocus}
            value={data.name}
            onChange={(e) => set("name", e.target.value)}
            placeholder="Как к вам обращаться"
          />
          {err("name")}
        </div>
        <div>
          <label htmlFor={`${uid}-phone`} className="mb-2 block text-[13px] text-mute">
            Телефон
          </label>
          <input
            {...a11y("phone")}
            className="field"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={data.phone}
            onChange={(e) => set("phone", e.target.value)}
            placeholder="+380 ..."
          />
          {err("phone")}
        </div>
      </div>
      <div>
        <label htmlFor={`${uid}-budget`} className="mb-2 block text-[13px] text-mute">
          Бюджет
        </label>
        <select {...a11y("budget")} className="field" value={data.budget} onChange={(e) => set("budget", e.target.value)}>
          <option value="">Выберите диапазон</option>
          {budgets.map((b) => (
            <option key={b}>{b}</option>
          ))}
        </select>
        {err("budget")}
      </div>
      <div>
        <label htmlFor={`${uid}-message`} className="mb-2 block text-[13px] text-mute">
          Какой автомобиль ищете <span className="text-mute/60">(необязательно)</span>
        </label>
        <textarea
          {...a11y("message")}
          className="field min-h-[96px] resize-y"
          value={data.message}
          onChange={(e) => set("message", e.target.value)}
          placeholder="Марка, модель, год, пожелания"
        />
        {err("message")}
      </div>
      <div>
        <label className="flex cursor-pointer items-start gap-3 text-[13px] leading-relaxed text-mute">
          <input
            {...a11y("consent")}
            type="checkbox"
            checked={data.consent}
            onChange={(e) => set("consent", e.target.checked)}
            className="mt-0.5 h-5 w-5 shrink-0 accent-[#C7A56B]"
          />
          Согласен на обработку персональных данных для связи по заявке
        </label>
        {err("consent")}
      </div>
      {state === "error" && (
        <p role="alert" className="rounded-xl border border-[#e08a7c]/40 bg-[#e08a7c]/10 p-4 text-[14px] text-[#f0b3a8]">
          Не удалось отправить заявку. Проверьте поля или попробуйте ещё раз.
        </p>
      )}
      <Button type="submit" disabled={state === "sending"} className="w-full sm:w-auto" icon={state !== "sending"}>
        {state === "sending" ? (
          <span className="inline-flex items-center gap-2">
            <Loader2 size={16} className="animate-spin" /> Отправляем
          </span>
        ) : (
          "Отправить заявку"
        )}
      </Button>
    </form>
  );
}
