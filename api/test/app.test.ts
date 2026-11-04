import { Writable } from 'node:stream';

import type { FastifyInstance } from 'fastify';
import { afterAll, beforeAll, describe, expect, test as it, test } from 'vitest';

import { buildApp } from '#app/app';
import { parseEnvironment } from '#app/config/env';

const environment = () =>
  parseEnvironment({
    NODE_ENV: 'test',
    DATABASE_URL: process.env.DATABASE_URL,
    EXPORT_KEY: 'test-secret',
    LOG_LEVEL: 'silent',
  });

describe('Приложение', () => {
  let app: FastifyInstance;
  beforeAll(async () => {
    app = await buildApp({ environment: environment() });
  });
  afterAll(async () => {
    await app.close();
  });

  it('отдаёт health, liveness, readiness и документацию', async () => {
    expect((await app.inject('/health')).json()).toMatchObject({ status: 'OK', environment: 'test' });
    expect((await app.inject('/health/live')).json()).toEqual({ status: 'alive' });
    expect((await app.inject('/health/ready')).json()).toEqual({ status: 'ready' });
    expect((await app.inject('/documentation/json')).json()).toMatchObject({ openapi: '3.1.0' });
  });
  it('разрешает CORS только для настроенного сайта', async () => {
    const allowed = await app.inject({
      url: '/contacts',
      method: 'OPTIONS',
      headers: { origin: 'http://localhost:3000', 'access-control-request-method': 'POST' },
    });
    expect(allowed.headers['access-control-allow-origin']).toBe('http://localhost:3000');
    const denied = await app.inject({ url: '/health', headers: { origin: 'https://unknown.example' } });
    expect(denied.headers['access-control-allow-origin']).toBeUndefined();
    expect(denied.headers['x-content-type-options']).toBe('nosniff');
  });
  it('возвращает единый формат для неизвестного маршрута', async () => {
    const response = await app.inject('/unknown?key=secret');
    expect(response.statusCode).toBe(404);
    expect(response.json()).toMatchObject({ code: 'not_found', message: expect.any(String) });
  });
  it('ограничивает частоту запросов и исключает health из лимита', async () => {
    const limited = await buildApp({ environment: { ...environment(), RATE_LIMIT_MAX: 1 } });
    try {
      expect((await limited.inject('/contacts/export?key=wrong')).statusCode).toBe(401);
      const response = await limited.inject('/contacts/export?key=wrong');
      expect(response.statusCode).toBe(429);
      expect(response.json().code).toBe('rate_limited');
      expect((await limited.inject('/health/live')).statusCode).toBe(200);
    } finally {
      await limited.close();
    }
  });
  it('readiness возвращает 503 без БД, liveness продолжает работать', async () => {
    const offline = await buildApp({
      environment: { ...environment(), DATABASE_URL: 'postgresql://postgres:invalid@127.0.0.1:1/offline' },
    });
    try {
      const response = await offline.inject('/health/ready');
      expect(response.statusCode).toBe(503);
      expect(response.json()).toEqual({ status: 'not_ready' });
      expect((await offline.inject('/health/live')).statusCode).toBe(200);
      const failed = await offline.inject({
        method: 'POST',
        url: '/contacts',
        payload: { name: 'Иван', phone: '+7 (999) 123-45-67' },
      });
      expect(failed.statusCode).toBe(500);
      expect(failed.json()).toEqual({
        error: 'Internal Server Error',
        code: 'internal_error',
        message: 'Внутренняя ошибка сервера',
      });
    } finally {
      await offline.close();
    }
  });
  it('readiness возвращает 503 при отсутствующей таблице', async () => {
    const databaseUrl = new URL(environment().DATABASE_URL);
    databaseUrl.searchParams.set('options', '-c search_path=pg_catalog');
    const empty = await buildApp({ environment: { ...environment(), DATABASE_URL: databaseUrl.toString() } });
    try {
      const response = await empty.inject('/health/ready');
      expect(response.statusCode).toBe(503);
      expect(response.json()).toEqual({ status: 'not_ready' });
    } finally {
      await empty.close();
    }
  });

  it('не пишет ключи и персональные данные в логи', async () => {
    const entries: string[] = [];
    const stream = new Writable({
      write(chunk, _encoding, callback) {
        entries.push(chunk.toString());
        callback();
      },
    });
    const logged = await buildApp({
      environment: { ...environment(), NODE_ENV: 'production', LOG_LEVEL: 'info' },
      loggerStream: stream,
    });
    try {
      await logged.inject({
        url: '/contacts/export?key=log-secret',
        headers: { authorization: 'Bearer private-token' },
      });
      await logged.inject({
        method: 'POST',
        url: '/contacts',
        payload: { name: 'private-name', phone: 'private-phone' },
      });
      const output = entries.join('');
      expect(output).toContain('/contacts/export');
      expect(output).not.toContain('log-secret');
      expect(output).not.toContain('private-token');
      expect(output).not.toContain('private-name');
      expect(output).not.toContain('private-phone');
      expect((await logged.inject('/documentation')).statusCode).toBe(404);
    } finally {
      await logged.close();
    }
  });
});
