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

Biome проверяет форматирование, импорты и общие ошибки в коде, JSON и CSS.
ESLint проверяет Next.js, React и типы. Steiger проверяет слои FSD, направления
импортов и публичные API срезов. Дублирующие правила ESLint отключены в
[списке соответствий](eslint-biome-overlaps.mjs).
`lint` запускает все три проверки без изменения файлов; `lint:fix` применяет
безопасные автоисправления Biome и ESLint, затем проверяет FSD.
`format` только форматирует файлы. Steiger также доступен отдельно:
`pnpm --filter @elloria/web run lint:fsd`. Ошибки и предупреждения останавливают проверку.
Корневые `lint` и `check`, а также CI включают эту проверку через Web `lint`.
ESLint ограничивает строки кода 120 символами. Длинные списки Tailwind-классов
разбивайте на строки массива и соединяйте через `.join(' ')`.

Из корня проекта:

```sh
pnpm --filter @elloria/web run lint
pnpm --filter @elloria/web run typecheck
pnpm --filter @elloria/web run test
pnpm --filter @elloria/web run build
```

Корневая команда `check` включает Web-тесты. Новые тесты пишите в `*.test.ts` и `*.test.tsx`.

Общая проверка приложения: `pnpm run check`.
