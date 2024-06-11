export default {
  // Type check TypeScript files
  '(apps|packages|tooling)/**/*.(ts|tsx)': () => 'pnpm typecheck',
  // Lint then format TypeScript and JavaScript files
  '(apps|packages|tooling)/**/*.(ts|tsx|js)': (files) => [
    `pnpm eslint ${files.join(' ')}`,
    `pnpm prettier -uc ${files.join(' ')}`,
  ],
};
