# NORTHLINE AUTO

Сайт компании по подбору и доставке автомобилей из США и Канады в Украину.
Next.js 15 · React 19 · TypeScript · Tailwind CSS 4 · GSAP + ScrollTrigger · Framer Motion · Lucide.

## Запуск

```bash
npm install
npm run dev     # http://localhost:3210
npm run build && npm start
```

## Что где менять

| Что | Файл |
|---|---|
| Контакты, соцсети, навигация | `lib/site.ts` |
| Автомобили каталога, этапы, галерея, отзывы | `lib/data.ts` |
| Все изображения (путь, alt, кадрирование) | `lib/images.ts` + `public/images/` |
| Тарифы калькулятора | `lib/tariffs.ts` |
| Приём заявок (подключить CRM/Telegram) | `app/api/lead/route.ts` |

## Важно

Это демо-версия: автомобили, цены, отзывы, контакты и ставки калькулятора — **примеры**, а не реальные данные.
Ставки таможенных платежей в `lib/tariffs.ts` — заглушки, сверьте их с действующим законодательством.
Фотографии — бесплатные снимки с Unsplash (Unsplash License), замените их собственными.
