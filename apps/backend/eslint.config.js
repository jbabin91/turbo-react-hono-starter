import { config as honoConfig } from '@repo/eslint-config/hono.js';

/** @type {import("eslint").Linter.Config[]} */
export default [
  ...honoConfig,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.json', './tsconfig.lint.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  // Additional backend-specific overrides if needed
  {
    rules: {
      // Add any app-specific rule overrides here
    },
  },
];
