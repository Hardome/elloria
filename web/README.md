# Веб-приложение ELLORIA

Next.js 16, React 19, TypeScript и Tailwind CSS. Приложение содержит каталог проектов домов,
медиагалерею, форму заявки и страницы согласия и политики обработки данных.
Изображения и видео размещены в `public`.

## Разработка

Используйте Node.js 24.19+ и pnpm 12.6.0. Установка выполняется из корня монорепозитория:

```sh
corepack pnpm install --frozen-lockfile
cp web/.env.example web/.env.local
corepack pnpm run dev
```

API и PostgreSQL должны быть подготовлены по [корневой инструкции](../README.md).
Сайт доступен на `http://localhost:3000`.
Браузер отправляет `POST /api/contacts`; Next.js проксирует запросы в API.
Для локального запуска адрес задаётся через `BACKEND_INTERNAL_URL` в `web/.env.local`.

## Проверки

Из корня проекта:

```sh
corepack pnpm --filter @elloria/web run lint
corepack pnpm --filter @elloria/web run typecheck
corepack pnpm --filter @elloria/web run build
```

Общая проверка приложения: `corepack pnpm run check`.
Production-конфигурация и эксплуатация ведутся в отдельном приватном репозитории.
