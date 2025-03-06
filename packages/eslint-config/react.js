import tanstackQuery from '@tanstack/eslint-plugin-query';
import tanstackRouter from '@tanstack/eslint-plugin-router';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import tailwindcss from 'eslint-plugin-tailwindcss';
import tseslint from 'typescript-eslint';

import { config as baseConfig } from './base.js';

/** @type {import("typescript-eslint").Config} */
export const config = tseslint.config(
  ...Object.values(baseConfig),
  // React specific files
  {
    files: ['**/*.{jsx,tsx}'],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
  },
  // React recommended configs
  {
    plugins: {
      react,
    },
    rules: {
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
    },
  },
  // React Hooks recommended config
  {
    plugins: {
      'react-hooks': reactHooks,
    },
    rules: reactHooks.configs.recommended.rules,
  },
  // JSX A11y recommended config
  {
    plugins: {
      'jsx-a11y': jsxA11y,
    },
    rules: jsxA11y.configs.recommended.rules,
  },
  // Tailwind recommended config
  {
    plugins: {
      tailwindcss,
    },
    rules: tailwindcss.configs.recommended.rules,
  },
  // TanStack Query recommended config
  ...tanstackQuery.configs['flat/recommended'],
  // TanStack Router recommended config
  ...tanstackRouter.configs['flat/recommended'],
  // React specific settings and overrides
  {
    rules: {
      // Accessibility overrides
      'jsx-a11y/anchor-is-valid': [
        'error',
        {
          aspects: ['invalidHref', 'preferButton'],
          components: ['Link'],
          specialLink: ['hrefLeft', 'hrefRight'],
        },
      ],
      'react-hooks/exhaustive-deps': 'error',
      // React Hooks overrides
      'react-hooks/rules-of-hooks': 'error',
      'react/jsx-sort-props': [
        'error',
        {
          callbacksLast: true,
          ignoreCase: true,
          noSortAlphabetically: false,
          reservedFirst: true,
          shorthandFirst: true,
          shorthandLast: false,
        },
      ],
      // React overrides
      'react/prop-types': 'off',
    },
    settings: {
      react: { version: 'detect' },
      tailwindcss: {
        callees: ['cn', 'cva'],
        config: '../../tailwind.config.ts',
      },
    },
  },
);
