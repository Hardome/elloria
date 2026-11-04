import type { KnipConfig } from 'knip';

const config: KnipConfig = {
  project: ['src/**/*.ts', 'test/**/*.ts'],
  ignore: ['src/generated/**'],
  ignoreDependencies: ['pino-pretty'],
};

export default config;
