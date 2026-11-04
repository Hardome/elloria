import { drizzle, type NodePgDatabase } from 'drizzle-orm/node-postgres';
import type { FastifyInstance, FastifyPluginAsync } from 'fastify';
import fastifyPlugin from 'fastify-plugin';
import { Pool } from 'pg';

import type { Environment } from '#app/config/env';
import * as databaseSchema from '#app/db/schema/index';

declare module 'fastify' {
  interface FastifyInstance {
    db: NodePgDatabase<typeof databaseSchema>;
  }
}

const databasePlugin: FastifyPluginAsync<{ databaseUrl: string }> = async (app, options) => {
  const pool = new Pool({
    connectionString: options.databaseUrl,
    connectionTimeoutMillis: 3000,
    query_timeout: 10_000,
    statement_timeout: 10_000,
  });

  pool.on('error', () => app.log.error('Потеряно неактивное соединение с БД'));

  app.decorate('db', drizzle({ client: pool, schema: databaseSchema }));

  app.addHook('onClose', () => pool.end());
};

export async function registerDatabase(app: FastifyInstance, environment: Environment): Promise<void> {
  await app.register(fastifyPlugin(databasePlugin, { name: 'database' }), {
    databaseUrl: environment.DATABASE_URL,
  });
}
