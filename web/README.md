# Веб-приложение ELLORIA

Next.js 16, React 19, TypeScript и Tailwind CSS. Приложение содержит каталог проектов домов,
медиагалерею, форму заявки и страницы согласия и политики обработки данных.
Изображения и видео размещены в `public`.

## Разработка

Используйте Node.js 26.13.0 LTS и pnpm 12.16.1. Установка выполняется из корня монорепозитория:

```sh
pnpm install --frozen-lockfile
cp web/.env.example web/.env.local
pnpm run dev
```

API и PostgreSQL должны быть подготовлены по [корневой инструкции](../README.md).
Сайт доступен на `http://localhost:3000`.
Браузер отправляет `POST /api/contacts`; Next.js проксирует запросы в API.
Настройка адресов описана в [руководстве конфигурации](../docs/guides/api-configuration.md#web-и-прокси).

## Правила разработки

- [Структура Next.js, компоненты, формы и запросы](../docs/rules/web-guidelines.md).
- [Токены, типографика, общие UI-компоненты и доступность](../docs/rules/design-system.md).
- [Ручной регресс сайта и формы заявки](../docs/guides/regression.md).

## Проверки

Из корня проекта:

```sh
pnpm --filter @elloria/web run lint
pnpm --filter @elloria/web run typecheck
pnpm --filter @elloria/web run build
```

Общая проверка приложения: `pnpm run check`.
