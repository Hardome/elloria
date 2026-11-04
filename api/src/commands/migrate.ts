import { fileURLToPath } from 'node:url';

import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { Pool } from 'pg';

import { parseDatabaseUrl } from '#app/config/env';
import { loadEnvironmentFile } from '#app/config/load-env';

loadEnvironmentFile();

const pool = new Pool({ connectionString: parseDatabaseUrl(process.env.DATABASE_URL), connectionTimeoutMillis: 3000 });

try {
  await migrate(drizzle({ client: pool }), {
    migrationsFolder: fileURLToPath(new URL('../../src/db/migrations', import.meta.url)),
  });
} finally {
  await pool.end();
}
