import storybook from 'eslint-plugin-storybook';
import tseslint from 'typescript-eslint';

import { config as baseConfig } from './base.js';

/** @type {import("typescript-eslint").Config} */
export const config = tseslint.config(
  ...Object.values(baseConfig),
  // Storybook specific ignores
  {
    ignores: ['**/storybook-static/**'],
  },
  // Storybook recommended config
  ...storybook.configs['flat/recommended'],
  // Storybook specific rules
  {
    files: ['**/*.stories.{ts,tsx,js,jsx}', '**/stories/**/*'],
    rules: {
      // Allow default exports for stories
      'import-x/no-default-export': 'off',
      // Allow props spreading in stories
      'react/jsx-props-no-spreading': 'off',
    },
  },
);
