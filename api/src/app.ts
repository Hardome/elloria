import type { Writable } from 'node:stream';

import Fastify, { type FastifyInstance } from 'fastify';
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod';

import type { Environment } from '#app/config/env';
import { contactModule } from '#app/modules/contacts/index';
import { registerDatabase } from '#app/plugins/database';
import { registerDocumentation } from '#app/plugins/documentation';
import { registerErrorHandler } from '#app/plugins/error-handler';
import { registerHealth } from '#app/plugins/health';
import { registerSecurity } from '#app/plugins/security';

export async function buildApp(options: {
  environment: Environment;
  loggerStream?: Writable;
}): Promise<FastifyInstance> {
  const { environment } = options;
  const app = Fastify({
    bodyLimit: 2 * 1024 * 1024,
    trustProxy: environment.TRUST_PROXY.length > 0 ? environment.TRUST_PROXY : false,
    logger: {
      level: environment.LOG_LEVEL,
      redact: ['req.headers.authorization', 'req.headers.cookie', 'res.headers["set-cookie"]'],
      // URL выгрузки содержит секрет: журналы сохраняют только путь без query.
      serializers: {
        req: (request: { method: string; url: string }) => ({
          method: request.method,
          url: request.url.split('?')[0] ?? '/',
        }),
      },
      ...(options.loggerStream ? { stream: options.loggerStream } : {}),
      ...(environment.NODE_ENV === 'development' && !options.loggerStream
        ? {
            transport: { target: 'pino-pretty', options: { colorize: true, ignore: 'pid,hostname' } },
          }
        : {}),
    },
  });

  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);

  try {
    registerErrorHandler(app);
    await registerSecurity(app, environment);
    await registerDatabase(app, environment);
    registerHealth(app, environment);

    if (environment.NODE_ENV !== 'production') await registerDocumentation(app);

    await app.register(contactModule, { exportKey: environment.EXPORT_KEY });
    await app.ready();

    return app;
  } catch (error) {
    await app.close();

    throw error;
  }
}
