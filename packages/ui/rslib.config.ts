import { defineConfig } from '@rslib/core';

export default defineConfig({
  lib: [
    {
      dts: true,
      format: 'esm',
    },
  ],
  output: {
    cleanDistPath: true,
    sourceMap: true,
  },
  source: {
    entry: {
      index: './src/index.tsx',
    },
    exclude: [
      '**/*.stories.*',
      '**/*.test.*',
      '**/tests/**',
      '**/__tests__/**',
      '.storybook/**',
      'vitest.config.*',
      'rslib.config.*',
    ],
  },
});
