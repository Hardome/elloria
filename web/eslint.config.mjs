import js from '@eslint/js';
import nextPlugin from '@next/eslint-plugin-next';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import { defineConfig, globalIgnores } from 'eslint/config';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';

import { biomeOwnedEslintRules } from './eslint-biome-overlaps.mjs';

export default defineConfig([
  globalIgnores(['.next/**', 'node_modules/**', 'out/**', 'coverage/**', 'next-env.d.ts']),
  {
    files: ['**/*.{mjs,cjs}'],
    extends: [js.configs.recommended],
    languageOptions: { globals: globals.node },
    rules: Object.fromEntries(Object.entries(biomeOwnedEslintRules).filter(([rule]) => !rule.includes('/'))),
  },
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      react.configs.flat.recommended,
      react.configs.flat['jsx-runtime'],
      reactHooks.configs.flat.recommended,
      typescriptEslint.configs['flat/strict'],
      typescriptEslint.configs['flat/stylistic-type-checked'],
      nextPlugin.configs['core-web-vitals'],
    ],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: { projectService: true, tsconfigRootDir: import.meta.dirname },
    },
    settings: { react: { version: 'detect' } },
    rules: {
      ...{
        'no-console': 2,
        'object-shorthand': [2, 'always'],
        'no-shadow': 2,
        'require-await': 2,
        'prefer-promise-reject-errors': [
          2,
          {
            allowEmptyReject: true,
          },
        ],
        'no-useless-return': 2,
        'no-return-await': 2,
        'no-return-assign': 2,
        'no-loop-func': 2,
        'no-caller': 2,
        'array-callback-return': 2,
        'no-setter-return': 2,
        'block-scoped-var': 2,
        'dot-notation': [
          2,
          {
            allowPattern: '^[a-z]+(_[a-z]+)+$',
          },
        ],
        'max-classes-per-file': [2, 1],
        'no-else-return': [
          2,
          {
            allowElseIf: true,
          },
        ],
        'no-empty-function': 2,
        'no-eq-null': 2,
        'no-floating-decimal': 2,
        'no-labels': 2,
        'no-implicit-coercion': [
          2,
          {
            allow: ['!!', '~'],
          },
        ],
        'no-invalid-this': 0,
        'prefer-arrow-callback': 2,
        'no-throw-literal': 2,
        camelcase: 2,
        'id-denylist': [2, 'e', 'data', 'date', 'items'],
        'max-nested-callbacks': [2, 2],
        'no-multi-assign': 2,
        'arrow-body-style': [
          2,
          'as-needed',
          {
            requireReturnForObjectLiteral: true,
          },
        ],
        'no-duplicate-imports': ['error', { allowSeparateTypeImports: true }],
        'no-var': 2,
        'max-len': [
          'error',
          {
            code: 120,
            tabWidth: 2,
          },
        ],
        'no-unreachable': 2,
        'prefer-destructuring': [
          2,
          {
            object: true,
            array: false,
          },
        ],
        'prefer-spread': 2,
        'symbol-description': 2,
        'no-self-compare': 2,
        'require-atomic-updates': 2,
        'default-param-last': 2,
        'max-lines': [
          2,
          {
            max: 1100,
          },
        ],
        'no-alert': 0,
        'no-extend-native': 2,
        'no-implied-eval': 2,
        'no-lone-blocks': 2,
        'no-new-func': 2,
        'no-new-object': 2,
        'no-useless-call': 2,
        'no-await-in-loop': 2,
        'no-promise-executor-return': 2,
        'react/jsx-fragments': [2, 'element'],
        'react/no-this-in-sfc': 2,
        'react/no-direct-mutation-state': 2,
        'react/no-did-mount-set-state': 2,
        'react/forbid-foreign-prop-types': 2,
        'react/no-access-state-in-setstate': 2,
        'react/no-danger': 2,
        'react/no-deprecated': 2,
        'react/no-find-dom-node': 2,
        'react/no-multi-comp': 2,
        'react/no-redundant-should-component-update': 2,
        'react/no-typos': 2,
        'react/no-string-refs': 2,
        'react/no-unknown-property': 2,
        'react/no-unsafe': 2,
        'react/no-unused-prop-types': 2,
        'react/no-unused-state': 2,
        'react/prefer-es6-class': [2, 'always'],
        'react/prefer-stateless-function': 2,
        'react/prop-types': 0,
        'react/require-render-return': 2,
        'react/jsx-boolean-value': [2, 'always'],
        'react/jsx-curly-brace-presence': [
          'error',
          {
            props: 'always',
            children: 'always',
          },
        ],
        'react/jsx-no-literals': 2,
        'react/jsx-no-undef': [
          2,
          {
            allowGlobals: true,
          },
        ],
        'react/jsx-pascal-case': 2,
        'react/jsx-uses-react': 2,
        'react/jsx-uses-vars': 2,
        'react/react-in-jsx-scope': 'off',
        'react/default-props-match-prop-types': 2,
        'react/state-in-constructor': [2, 'always'],
        'react/style-prop-object': 2,
        'react/jsx-no-bind': [
          2,
          {
            allowArrowFunctions: true,
          },
        ],
        'react/jsx-no-comment-textnodes': 2,
        '@typescript-eslint/prefer-nullish-coalescing': 0,
        '@typescript-eslint/restrict-template-expressions': 0,
        'testing-library/no-render-in-lifecycle': 0,
      },
      ...biomeOwnedEslintRules,
    },
  },
]);
