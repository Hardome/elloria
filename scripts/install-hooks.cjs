const { execFileSync } = require('node:child_process');
const { existsSync } = require('node:fs');

// В образах нет Git, а при установке production-зависимостей — Lefthook.
if (existsSync('.git') && existsSync('node_modules/lefthook/bin/index.js')) {
  execFileSync(process.execPath, ['node_modules/lefthook/bin/index.js', 'install'], { stdio: 'inherit' });
}
