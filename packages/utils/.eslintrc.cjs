/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ['@repo/eslint-config/base.js'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    project: ['./tsconfig.json', './tsconfig.lint.json'],
    sourceType: 'module',
    tsconfigRootDir: __dirname,
  },
  overrides: [
    {
      files: ['**/schema/*.ts'],
      rules: {
        'sort-keys-fix/sort-keys-fix': 'off',
      },
    },
  ],
};
