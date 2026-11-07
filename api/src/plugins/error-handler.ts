import type { FastifyInstance } from 'fastify';
import { hasZodFastifySchemaValidationErrors, isResponseSerializationError } from 'fastify-type-provider-zod';

const errorCodes: Record<number, string> = {
  400: 'invalid_request',
  401: 'unauthenticated',
  403: 'forbidden',
  404: 'not_found',
  413: 'payload_too_large',
  415: 'unsupported_media_type',
  429: 'rate_limited',
  500: 'internal_error',
  503: 'service_unavailable',
};

function getStatusCode(error: unknown): number {
  if (isResponseSerializationError(error)) return 500;
  if (
    typeof error === 'object' &&
    error !== null &&
    'statusCode' in error &&
    typeof error.statusCode === 'number' &&
    error.statusCode >= 400 &&
    error.statusCode <= 599
  )
    return error.statusCode;
  return 500;
}

function getMessage(error: unknown, status: number): string {
  if (status === 429) return 'Превышен лимит запросов';
  if (status >= 500) return 'Внутренняя ошибка сервера';

  return error instanceof Error ? error.message : 'Некорректный запрос';
}

export function registerErrorHandler(app: FastifyInstance): void {
  app.setNotFoundHandler((_request, reply) =>
    reply.code(404).send({
      error: 'Not Found',
      code: 'not_found',
      message: 'Маршрут не найден',
    }),
  );

  app.setErrorHandler((error, request, reply) => {
    if (hasZodFastifySchemaValidationErrors(error)) {
      return reply.code(400).send({
        error: 'Bad Request',
        code: 'invalid_request',
        message: 'Ошибка проверки данных запроса',
        details: error.validation.map((issue) => ({
          path: `${error.validationContext ?? 'request'}${issue.instancePath.replaceAll('/', '.')}`,
          message: issue.message ?? 'Некорректное значение',
        })),
      });
    }

    const status = getStatusCode(error);

    if (status >= 500) request.log.error({ statusCode: status }, 'Ошибка обработки запроса');

    return reply.code(status).send({
      error: status >= 500 ? 'Internal Server Error' : 'Request Error',
      code: errorCodes[status] ?? 'unknown_error',
      message: getMessage(error, status),
    });
  });
}
