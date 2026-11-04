import { describe, expect, test as it, test } from 'vitest';

import { parseEnvironment } from '#app/config/env';

const valid = { DATABASE_URL: 'postgresql://postgres:postgres@localhost/elloria', EXPORT_KEY: 'test-key' };

describe('Настройки окружения', () => {
  it('применяет значения по умолчанию и разбирает origins и прокси', () => {
    const environment = parseEnvironment({
      ...valid,
      CORS_ORIGIN: 'http://localhost:3000, https://elloria.ru',
      TRUST_PROXY: '172.30.0.0/24',
    });
    expect(environment.PORT).toBe(5000);
    expect(environment.CORS_ORIGIN).toEqual(['http://localhost:3000', 'https://elloria.ru']);
    expect(environment.TRUST_PROXY).toEqual(['172.30.0.0/24']);
  });
  it.each([
    { DATABASE_URL: 'https://localhost' },
    { EXPORT_KEY: '' },
    { PORT: '70000' },
    { CORS_ORIGIN: 'https://elloria.ru/path' },
    { TRUST_PROXY: 'true' },
    { TRUST_PROXY: '127.0.0.1/99' },
    { RATE_LIMIT_TIME_WINDOW: 'invalid' },
  ])('отклоняет неверные параметры %j', (invalid) => {
    expect(() => parseEnvironment({ ...valid, ...invalid })).toThrow();
  });
});
