import { defineConfig } from 'vitest/config';

export default defineConfig({
  // Configure Vitest (https://vitest.dev/config/)
  test: {
    coverage: {
      all: true,
      clean: true,
      cleanOnRerun: true,
      exclude: [
        'node_modules/**',
        'dist/**',
        '**/*.d.ts',
        '**/*.config.*',
        '**/coverage/**',
        'tests/**',
        '**/*.test.{ts,tsx}',
        '**/*.stories.{ts,tsx}',
        '.storybook/**',
        'src/index.tsx',
      ],
      include: ['src/**'],
      provider: 'v8',
      reporter: ['text', 'json-summary', 'html'],
      reportsDirectory: './coverage',
      skipFull: true,
      thresholds: {
        branches: 50,
        functions: 80,
        lines: 80,
        statements: 80,
      },
    },
    environment: 'jsdom',
    setupFiles: ['./tests/vitest.setup.ts'],
  },
});
