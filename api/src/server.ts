import { buildApp } from '#app/app';
import { parseEnvironment } from '#app/config/env';
import { loadEnvironmentFile } from '#app/config/load-env';

loadEnvironmentFile();
const environment = parseEnvironment(process.env);
const app = await buildApp({ environment });
let isShuttingDown = false;

async function shutdown(): Promise<void> {
  if (isShuttingDown) return;
  isShuttingDown = true;
  try {
    await app.close();
  } catch {
    app.log.error('Не удалось корректно остановить сервер');
    process.exitCode = 1;
  }
}

process.once('SIGINT', () => {
  void shutdown();
});
process.once('SIGTERM', () => {
  void shutdown();
});

try {
  await app.listen({ host: environment.HOST, port: environment.PORT });
} catch {
  app.log.error('Не удалось запустить сервер');
  process.exitCode = 1;
  await app.close();
}
