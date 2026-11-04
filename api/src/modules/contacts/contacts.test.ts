import { inArray } from 'drizzle-orm';
import ExcelJS from 'exceljs';
import type { FastifyInstance } from 'fastify';
import { afterAll, beforeAll, describe, expect, test as it, test } from 'vitest';

import { buildApp } from '#app/app';
import { parseEnvironment } from '#app/config/env';
import { contacts } from '#app/db/schema/contacts';
import { zContact } from '#app/generated/zod.gen';

describe('Заявки', () => {
  let app: FastifyInstance;
  const ids: number[] = [];
  const payload = { name: 'Иван', phone: '+7 (999) 123-45-67' };
  beforeAll(async () => {
    app = await buildApp({
      environment: parseEnvironment({
        NODE_ENV: 'test',
        DATABASE_URL: process.env.DATABASE_URL,
        EXPORT_KEY: 'export-test-key',
        LOG_LEVEL: 'silent',
        RATE_LIMIT_MAX: '1000',
      }),
    });
  });
  afterAll(async () => {
    if (ids.length > 0) await app.db.delete(contacts).where(inArray(contacts.id, ids));
    await app.close();
  });
  it('принимает запрос текущей формы и назначает дату', async () => {
    const start = Date.now();
    const response = await app.inject({
      method: 'POST',
      url: '/contacts',
      payload: { ...payload, name: '  Иван  ', createdAt: '2000-01-01T00:00:00.000Z' },
    });
    expect(response.statusCode).toBe(201);
    const contact = zContact.parse(response.json());
    ids.push(contact.id);
    expect(contact).toMatchObject(payload);
    expect(Date.parse(contact.createdAt)).toBeGreaterThanOrEqual(start - 1000);
    const row = await app.db.query.contacts.findFirst({ where: inArray(contacts.id, [contact.id]) });
    expect(row?.name).toBe('Иван');
    expect(row?.createdAt.toISOString()).toBe(contact.createdAt);
  });
  it('не возвращает удалённое поле источника', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/contacts',
      payload: { name: 'Анна', phone: payload.phone, from: 'Старый клиент' },
    });
    expect(response.statusCode).toBe(201);
    ids.push(response.json().id);
    expect(response.json()).not.toHaveProperty('from');
  });
  it.each([{ name: '' }, { name: '   ' }, { name: 'x'.repeat(256) }, { phone: '89991234567' }, { phone: null }])(
    'отклоняет неверную заявку %j',
    async (invalid) => {
      const response = await app.inject({ method: 'POST', url: '/contacts', payload: { ...payload, ...invalid } });
      expect(response.statusCode).toBe(400);
      expect(response.json()).toMatchObject({
        code: 'invalid_request',
        details: expect.arrayContaining([{ path: expect.stringMatching(/^body\./), message: expect.any(String) }]),
      });
    },
  );
  it('обрабатывает повреждённый JSON и неверный Content-Type', async () => {
    const malformed = await app.inject({
      method: 'POST',
      url: '/contacts',
      payload: '{',
      headers: { 'content-type': 'application/json' },
    });
    expect(malformed.statusCode).toBe(400);
    expect(malformed.json().code).toBe('invalid_request');
    const unsupported = await app.inject({
      method: 'POST',
      url: '/contacts',
      payload: 'name=test',
      headers: { 'content-type': 'application/xml' },
    });
    expect(unsupported.statusCode).toBe(415);
    expect(unsupported.json().code).toBe('unsupported_media_type');
  });
  it('отклоняет слишком большое тело запроса', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/contacts',
      payload: { ...payload, name: 'x'.repeat(2 * 1024 * 1024) },
    });
    expect(response.statusCode).toBe(413);
    expect(response.json().code).toBe('payload_too_large');
  });

  it.each(['', '?key=', '?key=wrong', '?other=export-test-key'])('защищает выгрузку %s', async (query) => {
    const response = await app.inject(`/contacts/export${query}`);
    expect(response.statusCode).toBe(401);
    expect(response.json().code).toBe('unauthenticated');
  });
  it('выгружает больше одной порции и возвращает корректный XLSX', async () => {
    const inserted = await app.db
      .insert(contacts)
      .values(Array.from({ length: 501 }, (_, index) => ({ name: `Заявка ${index}`, phone: payload.phone })))
      .returning({ id: contacts.id });
    ids.push(...inserted.map((row) => row.id));
    const response = await app.inject('/contacts/export?key=export-test-key');
    expect(response.statusCode).toBe(200);
    expect(response.headers['content-type']).toContain(
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    expect(response.headers['content-disposition']).toMatch(/contacts_export_\d{4}-\d{2}-\d{2}\.xlsx/);
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(Uint8Array.from(response.rawPayload).buffer);
    const sheet = workbook.getWorksheet('Contacts');
    expect(sheet?.getRow(1).values).toEqual([undefined, 'ID', 'Имя', 'Телефон', 'Дата создания']);
    const exported = sheet?.getColumn(1).values.slice(2);
    expect(exported).toEqual([...ids].sort((a, b) => a - b));
    expect(sheet?.getRow(1).font.bold).toBe(true);
  });
  it('пустая таблица даёт XLSX с заголовками', async () => {
    await app.db.delete(contacts).where(inArray(contacts.id, ids));
    const response = await app.inject('/contacts/export?key=export-test-key');
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(Uint8Array.from(response.rawPayload).buffer);
    expect(workbook.getWorksheet('Contacts')?.rowCount).toBe(1);
  });
});
