import js from '@eslint/js';
import prettierConfig from 'eslint-config-prettier';
import importX from 'eslint-plugin-import-x';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
// @ts-ignore
import sortKeysFix from 'eslint-plugin-sort-keys-fix';
import turboPlugin from 'eslint-plugin-turbo';
import unicorn from 'eslint-plugin-unicorn';
import globals from 'globals';
import tseslint from 'typescript-eslint';

/** @type {import("typescript-eslint").Config} */
export const config = tseslint.config(
  // Base ignores
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/storybook-static/**',
      '**/.turbo/**',
      '**/coverage/**',
      '**/public/**',
      '**/build/**',
    ],
  },
  // Global settings and basic rules
  {
    languageOptions: {
      globals: {
        ...globals.builtin,
        ...globals.browser,
      },
    },
  },
  // Default rules
  {
    plugins: {
      'import-x': importX,
      'simple-import-sort': simpleImportSort,
      'sort-keys-fix': sortKeysFix,
      turbo: turboPlugin,
      unicorn,
    },
    rules: {
      // JS recommended rules
      ...js.configs.recommended.rules,
      // Unicorn recommended rules
      ...unicorn.configs.recommended.rules,
      // Import rules
      'import-x/first': 'error',
      'import-x/newline-after-import': 'error',
      'import-x/no-duplicates': ['error', { 'prefer-inline': true }],
      'simple-import-sort/exports': 'error',
      'simple-import-sort/imports': 'error',
      // Object sorting
      'sort-keys-fix/sort-keys-fix': 'error',
      // Turbo rules
      'turbo/no-undeclared-env-vars': 'warn',
      // Unicorn overrides
      'unicorn/filename-case': [
        'error',
        {
          cases: {
            camelCase: true,
            kebabCase: true,
            pascalCase: true,
          },
        },
      ],
      'unicorn/no-null': 'off',
      'unicorn/prevent-abbreviations': 'off',
    },
  },
  // TypeScript config
  {
    extends: [
      ...tseslint.configs.recommendedTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: true,
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
    },
    rules: {
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@typescript-eslint/consistent-type-exports': 'error',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { fixStyle: 'inline-type-imports', prefer: 'type-imports' },
      ],
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-floating-promises': 'off',
      '@typescript-eslint/no-misused-promises': [
        'error',
        { checksVoidReturn: { attributes: false } },
      ],
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/only-throw-error': 'off',
      '@typescript-eslint/restrict-template-expressions': 'off',
    },
  },
  // Prettier config must be last
  prettierConfig,
);
