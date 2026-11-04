import { randomUUID } from 'node:crypto';
import { fileURLToPath } from 'node:url';

import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { Pool } from 'pg';
import type { TestProject } from 'vitest/node';

import { parseDatabaseUrl } from '#app/config/env';
import { loadEnvironmentFile } from '#app/config/load-env';

declare module 'vitest' {
  export interface ProvidedContext {
    databaseUrl: string;
  }
}

export default async function setup(project: TestProject): Promise<() => Promise<void>> {
  loadEnvironmentFile();
  const sourceUrl = parseDatabaseUrl(process.env.TEST_DATABASE_URL ?? process.env.DATABASE_URL);
  const name = `elloria_tests_${randomUUID().replaceAll('-', '')}`;
  const testUrl = new URL(sourceUrl);
  testUrl.pathname = `/${name}`;
  const admin = new Pool({ connectionString: sourceUrl, connectionTimeoutMillis: 3000 });
  const pool = new Pool({ connectionString: testUrl.toString() });
  const drop = async () => {
    await admin.query(`drop database if exists "${name}" with (force)`);
    await admin.end();
  };
  try {
    await admin.query(`create database "${name}"`);
    const database = drizzle({ client: pool });
    const options = { migrationsFolder: fileURLToPath(new URL('../src/db/migrations', import.meta.url)) };
    await migrate(database, options);
    await pool.query("insert into contacts (name, phone) values ('Повторная миграция', '+7 (999) 123-45-67')");
    await migrate(database, options);
    const result = await pool.query('select count(*)::int as count from contacts');
    if (result.rows[0]?.count !== 1) throw new Error('Повторная миграция изменила данные');
    await pool.query('delete from contacts');
    project.provide('databaseUrl', testUrl.toString());
  } catch (error) {
    await pool.end();
    await drop();
    throw error;
  }
  await pool.end();
  return drop;
}
