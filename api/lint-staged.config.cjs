module.exports = {
  '*.{js,cjs,mjs,json,jsonc}': 'pnpm exec biome check --write --no-errors-on-unmatched',
  '*.ts': [
    'pnpm exec biome check --write --no-errors-on-unmatched',
    'pnpm --dir .. exec cspell --config cspell.config.yaml --no-must-find-files',
  ],
  'README.md': 'pnpm --dir .. exec cspell --config cspell.config.yaml --no-must-find-files',
};
