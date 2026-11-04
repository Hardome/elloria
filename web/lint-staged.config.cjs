module.exports = {
  '*.{ts,tsx,mjs,cjs}': [
    'pnpm exec biome check --write --no-errors-on-unmatched',
    'pnpm exec eslint --fix --max-warnings 0 --no-warn-ignored',
  ],
  '*.{css,json,jsonc}': 'pnpm exec biome check --write --no-errors-on-unmatched',
};
