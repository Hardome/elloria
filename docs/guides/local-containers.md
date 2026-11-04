# Локальный запуск и проверка контейнеров

Инструкция описывает запуск приложения и проверку образов через локальный Docker Compose.
Все команды выполняются из корня приложения; нужен Docker Engine с Compose v2.

## Состав

| Сервис | Назначение |
| --- | --- |
| `database` | PostgreSQL 18.6 с томом `postgres18_data` |
| `migrate` | Одноразовое применение миграций из образа API |
| `api` | Fastify, готовность проверяется через `/health/ready` |
| `web` | Next.js standalone, проверка главной страницы |

Профиль `app` включает миграции, API и Web. Compose ждёт готовности БД,
успешного завершения миграций и готовности API перед запуском Web.
Параметры подключения и ключ экспорта в этом Compose предназначены для локального запуска.

## Сборка и запуск

```sh
pnpm run check:containers
```

Команда выполняет `docker compose --profile app up -d --build --wait --wait-timeout 180`.
При успехе сервисы готовы, а одноразовый migrator завершился с кодом 0.
Для сборки Web нужен доступ к используемым Google Fonts.

Проверьте состояние и логи:

```sh
docker compose --profile app ps -a
docker compose --profile app logs --no-color migrate api web
```

Адреса: Web — `http://localhost:3000`, API — `http://localhost:5000`,
PostgreSQL — `127.0.0.1:55439` (порт БД меняется через `DATABASE_PORT`).
Перед запуском освободите порты, занятые development-процессами.

## Проверки приложения

- `GET /health/live` возвращает `200` и `status: alive`.
- `GET /health/ready` возвращает `200` и `status: ready` при доступной схеме.
- Главная страница и медиа загружаются, форма отправляет заявку через `/api/contacts`.
- Выгрузка с локальным ключом возвращает XLSX; без ключа — `401`.
- API работает с `NODE_ENV=production`, поэтому Swagger отключён.

Используйте [ручной регресс](regression.md) для пользовательских сценариев.
Локальная готовность контейнеров не проверяет внешний DNS, HTTPS и серверный reverse proxy.

## Изменение схемы в существующем локальном окружении

Пересоберите образы, примените новые миграции и затем обновите сервисы:

```sh
docker compose --profile app build
docker compose --profile app run --rm migrate
docker compose --profile app up -d --wait --wait-timeout 180
```

Если миграция завершилась с ошибкой, остановитесь и изучите причину до обновления сервисов.
Не удаляйте volume ради исправления ошибки миграции.
Правила изменения схемы — в [руководстве БД](../rules/database-guidelines.md).

## Остановка

```sh
docker compose --profile app down
```

Команда сохраняет данные тома. Не добавляйте `--volumes`, если БД нужно сохранить.
