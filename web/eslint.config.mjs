import {defineConfig} from "eslint/config";

import {
    fixupConfigRules,
    fixupPluginRules,
} from "@eslint/compat";

import tsParser from "@typescript-eslint/parser";
import globals from "globals";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import reactHooks from "eslint-plugin-react-hooks";
import react from "eslint-plugin-react";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import js from "@eslint/js";

import nextPlugin from '@next/eslint-plugin-next';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import {
    FlatCompat,
} from "@eslint/eslintrc";

const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default defineConfig([
    nextPlugin.configs.recommended,
    nextPlugin.configs['core-web-vitals'],
    {
    extends: fixupConfigRules(compat.extends(
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:react-hooks/recommended",
        "plugin:@typescript-eslint/strict",
        "plugin:@typescript-eslint/stylistic-type-checked"
    )),

    languageOptions: {
        globals: {
            ...globals.browser,
            ...globals.node,
            ...globals.jest,
            "describe": true,
            "it": true,
            "expect": true,
            "jest": true,
        },

        parser: tsParser,
        "sourceType": "module",
        "ecmaVersion": 2021,

        parserOptions: {
            "tsconfigRootDir": __dirname,
            "project": ["./tsconfig.json"],

            "ecmaFeatures": {
                "jsx": true,
                "impliedStrict": true,
            },
        },
    },

    plugins: {
        "@typescript-eslint": fixupPluginRules(typescriptEslint),
        "react-hooks": fixupPluginRules(reactHooks),
        react: fixupPluginRules(react),
        "simple-import-sort": simpleImportSort,
    },

    settings: {
        "react": {
            "version": "detect",
        },
    },

    rules: {
        "no-console": 2,
        "rest-spread-spacing": [2, "never"],
        "object-shorthand": [2, "always"],
        "space-before-blocks": 2,
        "operator-linebreak": [2, "after"],

        "object-curly-newline": [2, {
            "consistent": true,
        }],

        "newline-per-chained-call": [2, {
            "ignoreChainWithDepth": 2,
        }],

        "new-parens": 2,

        "lines-between-class-members": [2, "always", {
            "exceptAfterSingleLine": true,
        }],

        "function-paren-newline": [2, "consistent"],
        "array-bracket-newline": [2, "consistent"],
        "array-element-newline": [2, "consistent"],
        "no-shadow": 2,
        "require-await": 2,

        "prefer-promise-reject-errors": [2, {
            "allowEmptyReject": true,
        }],

        "no-useless-return": 2,
        "no-useless-concat": 2,
        "no-useless-catch": 2,
        "no-return-await": 2,
        "no-return-assign": 2,
        "no-new-wrappers": 2,
        "no-loop-func": 2,
        "no-caller": 2,
        "array-callback-return": 2,
        "no-setter-return": 2,
        "no-import-assign": 2,
        "no-async-promise-executor": 2,

        "no-extra-parens": [2, "all", {
            "ignoreJSX": "all",
        }],

        "block-scoped-var": 2,
        "curly": [2, "all"],
        "dot-location": [2, "property"],

        "dot-notation": [2, {
            "allowPattern": "^[a-z]+(_[a-z]+)+$",
        }],

        "eqeqeq": [2, "always", {
            "null": "ignore",
        }],

        "max-classes-per-file": [2, 1],

        "no-else-return": [2, {
            "allowElseIf": true,
        }],

        "no-empty-function": 2,
        "no-eq-null": 2,
        "no-eval": 2,
        "no-floating-decimal": 2,
        "no-labels": 2,

        "no-implicit-coercion": [2, {
            "allow": ["!!", "~"],
        }],

        "no-invalid-this": 0,
        "prefer-const": 2,
        "prefer-template": 2,
        "no-useless-computed-key": 2,
        "no-useless-rename": 2,
        "prefer-arrow-callback": 2,
        "no-throw-literal": 2,
        "yoda": 2,
        "array-bracket-spacing": 2,
        "block-spacing": [2, "always"],
        "brace-style": 2,
        "camelcase": 2,
        "comma-dangle": 2,
        "comma-spacing": 2,
        "comma-style": 2,
        "computed-property-spacing": 2,
        "func-call-spacing": 2,
        "id-denylist": [2, "e", "data", "date", "items"],
        "jsx-quotes": [2, "prefer-single"],

        "key-spacing": [2, {
            "mode": "strict",
            "beforeColon": false,
        }],

        "keyword-spacing": [2, {
            "overrides": {
                "catch": {
                    "after": false,
                },
            },
        }],

        "max-nested-callbacks": [2, 2],
        // "new-cap": 2,
        "no-lonely-if": 2,
        "no-multi-assign": 2,

        "no-multiple-empty-lines": [2, {
            "max": 1,
        }],

        "no-nested-ternary": 2,
        "no-trailing-spaces": 2,

        "no-unneeded-ternary": [2, {
            "defaultAssignment": false,
        }],

        "no-whitespace-before-property": 2,
        "object-curly-spacing": 2,
        "operator-assignment": [2, "always"],
        "prefer-object-spread": 2,
        "semi": 2,
        "semi-spacing": 2,
        "semi-style": 2,
        "space-before-function-paren": [2, "never"],
        "space-in-parens": [2, "never"],
        "space-infix-ops": 2,
        "wrap-regex": 2,

        "arrow-body-style": [2, "as-needed", {
            "requireReturnForObjectLiteral": true,
        }],

        "arrow-parens": [2, "always"],

        "arrow-spacing": [2, {
            "before": true,
            "after": true,
        }],

        "generator-star-spacing": [2, {
            "before": false,
            "after": true,
        }],

        "no-duplicate-imports": 2,
        "no-useless-constructor": 2,
        "no-var": 2,
        "max-len": [2, 100],

        "quotes": [2, "single", {
            "avoidEscape": true,
            "allowTemplateLiterals": true,
        }],

        "no-tabs": 2,
        "no-unreachable": 2,
        "no-multi-spaces": 2,
        "no-proto": 2,

        "prefer-destructuring": [2, {
            "object": true,
            "array": false,
        }],

        "prefer-rest-params": 2,
        "prefer-spread": 2,
        "symbol-description": 2,
        "template-curly-spacing": [2, "never"],
        "no-useless-escape": 0,

        "indent": [2, 2, {
            "SwitchCase": 1,
            "VariableDeclarator": 1,
        }],

        "padding-line-between-statements": ["error", {
            "blankLine": "always",
            "prev": ["const", "let", "var"],
            "next": "*",
        }, {
            "blankLine": "any",
            "prev": ["const", "let", "var"],
            "next": ["const", "let", "var"],
        }, {
            "blankLine": "always",
            "prev": "*",
            "next": "return",
        }],

        "no-self-compare": 2,
        "require-atomic-updates": 2,
        "default-case-last": 2,
        "default-param-last": 2,

        "max-lines": [2, {
            "max": 1100,
        }],

        "no-alert": 0,
        "no-extend-native": 2,
        "no-implied-eval": 2,
        "no-lone-blocks": 2,
        "no-new-func": 2,
        "no-new-object": 2,
        "no-sequences": 2,
        "no-useless-call": 2,
        "no-void": 2,
        "no-await-in-loop": 2,
        "no-promise-executor-return": 2,
        "function-call-argument-newline": [2, "consistent"],

        "object-property-newline": [2, {
            "allowAllPropertiesOnSameLine": true,
        }],

        "react/jsx-tag-spacing": [2, {
            "closingSlash": "never",
            "beforeSelfClosing": "always",
            "afterOpening": "never",
            "beforeClosing": "never",
        }],

        "react/jsx-fragments": [2, "element"],
        "react/jsx-no-useless-fragment": 2,

        "react/jsx-curly-newline": [2, {
            "multiline": "require",
            "singleline": "consistent",
        }],

        "react/no-this-in-sfc": 2,
        "react/no-direct-mutation-state": 2,
        "react/no-did-mount-set-state": 2,
        "react/forbid-foreign-prop-types": 2,
        "react/no-access-state-in-setstate": 2,
        "react/no-danger": 2,
        "react/no-danger-with-children": 2,
        "react/no-deprecated": 2,
        "react/no-find-dom-node": 2,
        "react/no-multi-comp": 2,
        "react/no-redundant-should-component-update": 2,
        "react/no-typos": 2,
        "react/no-string-refs": 2,
        "react/no-unknown-property": 2,
        "react/no-unsafe": 2,
        "react/no-unused-prop-types": 2,
        "react/no-unused-state": 2,
        "react/prefer-es6-class": [2, "always"],
        "react/prefer-stateless-function": 2,
        "react/prop-types": 0,
        "react/require-render-return": 2,

        "react/self-closing-comp": [2, {
            "component": true,
            "html": true,
        }],

        "react/jsx-boolean-value": [2, "always"],

        "react/jsx-closing-bracket-location": [2, {
            "location": "line-aligned",
        }],

        "react/jsx-closing-tag-location": 2,

        "react/jsx-curly-spacing": [2, {
            "when": "never",
            "children": true,
        }],

        "react/jsx-curly-brace-presence": ["error",  { 
            "props": "always",    
            "children": "always"
        }],

        "react/jsx-equals-spacing": [2, "never"],
        "react/jsx-first-prop-new-line": [2, "multiline-multiprop"],
        "react/jsx-indent-props": [2, 2],
        "react/jsx-key": 2,

        "react/jsx-max-props-per-line": [2, {
            "when": "multiline",
        }],

        "react/jsx-no-duplicate-props": 2,
        "react/jsx-no-literals": 2,

        "react/jsx-no-undef": [2, {
            "allowGlobals": true,
        }],

        "react/jsx-pascal-case": 2,
        "react/jsx-props-no-multi-spaces": 2,
        "react/jsx-uses-react": 2,
        "react/jsx-uses-vars": 2,
        "react/react-in-jsx-scope": "off",

        "react/jsx-wrap-multilines": [2, {
            "declaration": "parens-new-line",
            "assignment": "parens-new-line",
            "return": "parens-new-line",
            "arrow": "parens-new-line",
            "condition": "parens-new-line",
            "logical": "parens-new-line",
            "prop": "parens-new-line",
        }],

        "react/button-has-type": [2, {
            "button": true,
            "submit": true,
            "reset": true,
        }],

        "react/default-props-match-prop-types": 2,
        "react/no-array-index-key": 2,
        "react/no-children-prop": 2,
        "react/state-in-constructor": [2, "always"],
        "react/style-prop-object": 2,

        "react/jsx-no-bind": [2, {
            "allowArrowFunctions": true,
        }],

        "react/jsx-no-comment-textnodes": 2,

        // "react/function-component-definition": [2, {
        //     "namedComponents": "arrow-function",
        //     "unnamedComponents": "arrow-function",
        // }],

        "react-hooks/exhaustive-deps": 2,
        "@typescript-eslint/prefer-nullish-coalescing": 0,
        "@typescript-eslint/restrict-template-expressions": 0,
        "testing-library/no-render-in-lifecycle": 0,

        "simple-import-sort/imports": ["error", {
            groups: [["^react", "^@?\\w", "^[a-z]"], ["^\\u0000"], [
                "^(@/components|@/lib|@/hooks)(/.*|$)",
            ], ["^\\.\\.(?!/?$)", "^\\.\\./?$"], ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"], ["^.+\\.s?css$"]],
        }],

        "simple-import-sort/exports": "error",
    },
}]);
