import { fileURLToPath } from 'node:url';

import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: {
      '#app': fileURLToPath(new URL('./src', import.meta.url)),
      '#test': fileURLToPath(new URL('./test', import.meta.url)),
    },
  },
  test: {
    environment: 'node',
    fsModuleCache: false,
    globalSetup: ['./test/global-setup.ts'],
    setupFiles: ['./test/setup-environment.ts'],
    fileParallelism: false,
    clearMocks: true,
    restoreMocks: true,
  },
});
