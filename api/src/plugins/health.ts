import { sql } from 'drizzle-orm';
import type { FastifyInstance } from 'fastify';

import type { Environment } from '#app/config/env';
import { zGetHealthResponse, zGetLivenessResponse, zGetReadinessResponse } from '#app/generated/zod.gen';

export function registerHealth(app: FastifyInstance, environment: Environment): void {
  const config = { rateLimit: false };

  app.get(
    '/health',
    {
      config,
      schema: { response: { 200: zGetHealthResponse } },
    },
    async () => ({ status: 'OK', timestamp: new Date().toISOString(), environment: environment.NODE_ENV }),
  );

  app.get(
    '/health/live',
    {
      config,
      schema: { response: { 200: zGetLivenessResponse } },
    },
    async () => ({ status: 'alive' }),
  );

  app.get(
    '/health/ready',
    {
      config,
      schema: { response: { 200: zGetReadinessResponse, 503: zGetReadinessResponse } },
    },
    async (_request, reply) => {
      try {
        await app.db.execute(sql`select id, name, phone, created_at, updated_at from contacts limit 0`);
        return reply.code(200).send({ status: 'ready' });
      } catch {
        return reply.code(503).send({ status: 'not_ready' });
      }
    },
  );
}
