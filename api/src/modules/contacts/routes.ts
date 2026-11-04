import { createHash, timingSafeEqual } from 'node:crypto';

import type { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod';

import type { RouteHandlers } from '#app/generated/fastify.gen';
import { zApiError, zCreateContactBody, zCreateContactResponse, zExportContactsQuery } from '#app/generated/zod.gen';
import { exportContacts } from '#app/modules/contacts/export';
import { toContact } from '#app/modules/contacts/mapper';
import type { ContactRepository } from '#app/modules/contacts/repository';

export function registerContactRoutes(app: FastifyInstance, repository: ContactRepository, exportKey: string): void {
  const typedApp = app.withTypeProvider<ZodTypeProvider>();

  const createContact: RouteHandlers['createContact'] = async (request, reply) => {
    const body = request.body;
    const contact = await repository.create({
      name: body.name.trim(),
      phone: body.phone.trim(),
      ...(body.from !== undefined ? { from: body.from.trim() } : {}),
    });
    return reply.code(201).send(toContact(contact));
  };

  typedApp.post('/contacts', {
    schema: { body: zCreateContactBody, response: { 201: zCreateContactResponse, 400: zApiError, 429: zApiError } },
    handler: createContact,
  });

  typedApp.get('/contacts/export', {
    schema: {
      querystring: zExportContactsQuery,
      response: { 200: z.instanceof(Buffer), 400: zApiError, 401: zApiError, 429: zApiError },
    },
    handler: async (request, reply) => {
      const key = request.query.key ?? '';
      const digest = (value: string) => createHash('sha256').update(value).digest();

      if (!key || !timingSafeEqual(digest(key), digest(exportKey))) {
        return reply
          .code(401)
          .send({ error: 'Unauthorized', code: 'unauthenticated', message: 'Неверный ключ выгрузки' });
      }

      const buffer = await exportContacts(repository);
      const date = new Date().toISOString().split('T')[0];

      return reply
        .code(200)
        .type('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
        .header('Content-Disposition', `attachment; filename="contacts_export_${date}.xlsx"`)
        .send(buffer);
    },
  });
}
