import fastifyCors from '@fastify/cors';
import fastifyHelmet from '@fastify/helmet';
import fastifyRateLimit from '@fastify/rate-limit';
import type { FastifyInstance } from 'fastify';

import type { Environment } from '#app/config/env';

export async function registerSecurity(app: FastifyInstance, environment: Environment): Promise<void> {
  app.addHook('onSend', async (_request, reply) => {
    reply.header('Cache-Control', 'no-store');
    reply.header('Referrer-Policy', 'no-referrer');
  });

  await app.register(fastifyCors, { origin: environment.CORS_ORIGIN });
  await app.register(fastifyHelmet, { contentSecurityPolicy: environment.NODE_ENV === 'production' });
  await app.register(fastifyRateLimit, {
    max: environment.RATE_LIMIT_MAX,
    timeWindow: environment.RATE_LIMIT_TIME_WINDOW,
  });
}
