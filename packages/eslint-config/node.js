import globals from 'globals';
import tseslint from 'typescript-eslint';

import { config as baseConfig } from './base.js';

/** @type {import("typescript-eslint").Config} */
export const config = tseslint.config(
  ...Object.values(baseConfig),
  // Node specific files
  {
    files: ['**/*.{js,ts}'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  // Node specific rules
  {
    rules: {
      'handle-callback-err': 'error',
      'no-buffer-constructor': 'error',
      'no-new-require': 'error',
      'no-path-concat': 'error',
      'no-process-exit': 'error',
      'no-sync': 'error',
    },
  },
);
