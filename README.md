# ELLORIA

Сайт жилого посёлка в Тюмени: каталог домов, медиагалерея и форма обратной связи.
Монорепозиторий объединяет веб-приложение, API для обработки заявок и общий HTTP-контракт.

[Открыть сайт →](https://elloria.ru)

## Возможности

- Каталог проектов домов с фотографиями и визуализациями.
- Медиагалерея с изображениями и видео.
- Приём заявок и выгрузка в XLSX.

## Стек

| Часть | Технологии |
| --- | --- |
| [Frontend](web) | Next.js 16, React 19, TypeScript, Tailwind CSS, Radix UI |
| [Backend](api) | Fastify 5, TypeScript, PostgreSQL 18.6, Drizzle ORM, Zod |
| [Контракты](contracts/openapi.yaml) | OpenAPI, генерация TypeScript-типов и Zod-схем |

API покрыт интеграционными тестами с PostgreSQL. CI проверяет код, сборку и актуальность сгенерированного контракта.

## Локальный запуск

Требуются Node.js 26.13.0 LTS, pnpm 12.16.1 и Docker Compose v2. Команды выполняются из корня репозитория:

```sh
npm install --global pnpm@12.16.1
pnpm install --frozen-lockfile
cp api/.env.example api/.env
cp web/.env.example web/.env.local
pnpm run db:up
pnpm run db:migrate
pnpm run dev
```

Сайт: [localhost:3000](http://localhost:3000) · API: [localhost:5000](http://localhost:5000) · Swagger: [документация API](http://localhost:5000/documentation).

## Проверки и документация

При запущенном PostgreSQL:

```sh
pnpm run check
```

- [Карта документации и порядок ведения планов и решений](docs/README.md).
- [Разработка Web](web/README.md) и [API](api/README.md).
- [Конфигурация API и подключение Web](docs/guides/api-configuration.md).
- [Локальный запуск и проверка контейнеров](docs/guides/local-containers.md).
- [Ручной регресс](docs/guides/regression.md).

Production-окружение настраивается отдельным репозиторием.

---

Проект опубликован для портфолио с разрешения владельца. Права на фотографии, видео, визуализации, товарные обозначения и шрифты принадлежат их владельцам.
