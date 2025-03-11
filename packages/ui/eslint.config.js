import { config as reactConfig } from '@repo/eslint-config/react.js';
import { config as storybookConfig } from '@repo/eslint-config/storybook.js';

/** @type {import("eslint").Linter.Config[]} */
export default [
  ...reactConfig,
  ...storybookConfig,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parserOptions: {
        project: [
          './tsconfig.json',
          './tsconfig.lint.json',
          './tsconfig.test.json',
        ],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  // Additional frontend-specific overrides if needed
  {
    rules: {
      // Add any app-specific rule overrides here
    },
  },
];
