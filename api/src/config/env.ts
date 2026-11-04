import { isIP } from 'node:net';

import { z } from 'zod';

const databaseUrlSchema = z.string().refine((value) => {
  try {
    return ['postgres:', 'postgresql:'].includes(new URL(value).protocol);
  } catch {
    return false;
  }
}, 'DATABASE_URL должен содержать адрес PostgreSQL');

function isProxyAddress(value: string): boolean {
  const [address, prefix, extra] = value.split('/');
  const version = isIP(address ?? '');
  return (
    version !== 0 &&
    extra === undefined &&
    (prefix === undefined || (/^\d+$/.test(prefix) && Number(prefix) <= (version === 4 ? 32 : 128)))
  );
}

const environmentSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  HOST: z.string().min(1).default('127.0.0.1'),
  PORT: z.coerce.number().int().min(1).max(65_535).default(5000),
  DATABASE_URL: databaseUrlSchema,
  EXPORT_KEY: z.string().trim().min(1),
  CORS_ORIGIN: z
    .string()
    .default('http://localhost:3000')
    .transform((value) => value.split(',').map((origin) => origin.trim()))
    .pipe(
      z
        .array(
          z.url().refine((value) => {
            const url = new URL(value);
            return ['http:', 'https:'].includes(url.protocol) && url.origin === value;
          }, 'Укажите origin без пути'),
        )
        .min(1),
    ),
  LOG_LEVEL: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent']).default('info'),
  TRUST_PROXY: z
    .string()
    .default('')
    .transform((value) =>
      value
        .split(',')
        .map((entry) => entry.trim())
        .filter(Boolean),
    )
    .pipe(z.array(z.string().refine(isProxyAddress, 'Укажите IP или CIDR доверенного прокси'))),
  RATE_LIMIT_MAX: z.coerce.number().int().positive().default(100),
  RATE_LIMIT_TIME_WINDOW: z
    .string()
    .regex(/^\d+ (second|minute|hour)s?$/)
    .default('1 minute'),
});

export type Environment = z.output<typeof environmentSchema>;

export function parseEnvironment(source: NodeJS.ProcessEnv): Environment {
  return environmentSchema.parse(source);
}

export function parseDatabaseUrl(value: string | undefined): string {
  return databaseUrlSchema.parse(value);
}
