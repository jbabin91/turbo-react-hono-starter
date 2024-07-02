/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ['@repo/eslint-config/base.js'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    project: ['./tsconfig.json', './tsconfig.app.json', './tsconfig.node.json'],
    sourceType: 'module',
    tsconfigRootDir: __dirname,
  },
};
