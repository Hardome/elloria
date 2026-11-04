# ELLORIA

Сайт жилого посёлка с каталогом домов, медиагалереей и формой обратной связи.
Монорепозиторий объединяет Next.js-приложение, Fastify API и общий HTTP-контракт.

## Состав

| Каталог | Назначение |
| --- | --- |
| `web` | Next.js 16, React 19, TypeScript, Tailwind CSS и Radix UI |
| `api` | Fastify 5, Drizzle ORM, PostgreSQL 16, Zod, XLSX-выгрузка |
| `contracts` | OpenAPI, из которого генерируются типы и схемы API |

API разделён на инфраструктурные плагины и предметные модули. Маршруты отвечают за HTTP,
репозиторий — за PostgreSQL, отдельный сервис формирует XLSX.
Vitest проверяет HTTP и настоящую БД; Biome, cspell и Knip проверяют код API.
Frontend использует ESLint и TypeScript.

Репозиторий содержит только приложение и воспроизводимое локальное окружение.
Production-инфраструктура, серверные настройки и рабочие данные хранятся отдельно.

## Локальный запуск

Нужны Node.js 24.19+, pnpm 12.6.0 и Docker Compose v2.

```sh
corepack pnpm install --frozen-lockfile
cp api/.env.example api/.env
cp web/.env.example web/.env.local
corepack pnpm run db:up
corepack pnpm run db:migrate
corepack pnpm run dev
```

Сайт: `http://localhost:3000`, API: `http://localhost:5000`, Swagger: `http://localhost:5000/documentation`.
Веб-приложение проксирует `/api/*` в API. Внешний адрес API не требуется для сборки.
Демонстрационные реквизиты PostgreSQL и ключ выгрузки предназначены только для локального запуска.

Для запуска готовых контейнеров:

```sh
docker compose --profile app up -d --build
```

Compose ждёт PostgreSQL, применяет миграции и запускает API и web.
При повторном запуске после изменения схемы выполните `docker compose --profile app run --rm migrate`
перед обновлением API. Остановка: `docker compose --profile app down`.

## Контракт и проверки

Источник контракта — `contracts/openapi.yaml`; `api/src/generated` вручную не редактируется.

```sh
corepack pnpm run codegen
corepack pnpm run check
```

Для `check` PostgreSQL должен работать. Тесты создают отдельную временную БД и удаляют её после
завершения; пользователь PostgreSQL должен иметь права создания БД. При необходимости задайте
`TEST_DATABASE_URL`; по умолчанию используется `DATABASE_URL` из `api/.env`.
CI запускает те же проверки на PostgreSQL 16 и проверяет актуальность сгенерированных файлов.

API принимает `POST /contacts` с `name`, `phone`, необязательным `from`, возвращает `201`
и созданную заявку. Телефон: `+7 (999) 123-45-67`. Сервер назначает дату самостоятельно.
Выгрузка: `GET /contacts/export?key=...`. Readiness: `GET /health/ready`.
Ошибки имеют формат `{ error, code, message, details? }`.

## Права на материалы

Код и материалы опубликованы для портфолио с разрешения владельца.
Условия использования приведены в [NOTICE.md](NOTICE.md).
