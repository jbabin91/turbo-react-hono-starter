import { defineConfig } from 'cz-git';

/**
 * Commit scope options for the monorepo
 * Format: type(scope): subject
 * Examples:
 * - feat(frontend): add new dashboard
 * - ci(workflow): add release action
 * - docs(cursor): add typescript standards
 * - docs(readme): update installation steps
 * - chore(deps): bump dependencies
 */
const scopeOptions = [
  // Apps
  'frontend', // React web application
  'backend', // Hono API server

  // Packages
  'ui', // Component library
  'eslint', // ESLint configuration
  'tsconfig', // TypeScript configuration

  // Root
  'repo', // Repository configuration
  'deps', // Dependencies
  'workflow', // GitHub Actions
  'readme', // Documentation
  'cursor', // Cursor AI rules
];

export default defineConfig({
  extends: ['@commitlint/config-conventional'],
  prompt: {
    alias: {
      // Dependencies
      b: 'chore(deps): bump dependencies',
      u: 'chore(deps): update lockfile',

      // Documentation
      d: 'docs(readme): update documentation',
      c: 'docs(cursor): update AI rules',

      // Testing
      tf: 'test(frontend): add tests',
      tu: 'test(ui): add tests',
      tb: 'test(backend): add tests',

      // Quick fixes
      ff: 'fix(frontend): quick fix',
      fb: 'fix(backend): quick fix',
      fu: 'fix(ui): quick fix',

      // Styles
      s: 'style(ui): update styles',
      sf: 'style(frontend): update styles',

      // Configuration
      r: 'chore(repo): update configuration',
      w: 'ci(workflow): update github actions',
    },
    messages: {
      type: "Select the type of change you're committing:",
      scope: 'Select the scope of this change (optional):',
      subject: 'Write a short, imperative mood description of the change:\n',
      body: 'Provide a longer description of the change (optional):\n',
      breaking: 'List any breaking changes (optional):\n',
      footer: 'List any issues closed by this change (optional):\n',
    },
    types: [
      { value: 'feat', name: 'feat:     ✨ A new feature', emoji: '✨' },
      { value: 'fix', name: 'fix:      🐛 A bug fix', emoji: '🐛' },
      {
        value: 'docs',
        name: 'docs:     📚 Documentation only changes',
        emoji: '📚',
      },
      {
        value: 'style',
        name: 'style:    💎 Changes that do not affect the meaning of the code',
        emoji: '💎',
      },
      {
        value: 'refactor',
        name: 'refactor: ♻️  A code change that neither fixes a bug nor adds a feature',
        emoji: '♻️',
      },
      {
        value: 'perf',
        name: 'perf:     ⚡️ A code change that improves performance',
        emoji: '⚡️',
      },
      {
        value: 'test',
        name: 'test:     ✅ Adding missing tests or correcting existing tests',
        emoji: '✅',
      },
      {
        value: 'build',
        name: 'build:    📦 Changes that affect the build system or external dependencies',
        emoji: '📦',
      },
      {
        value: 'ci',
        name: 'ci:       🎡 Changes to our CI configuration files and scripts',
        emoji: '🎡',
      },
      {
        value: 'chore',
        name: 'chore:    🔨 Other changes that do not modify src or test files',
        emoji: '🔨',
      },
      {
        value: 'revert',
        name: 'revert:   ⏪ Reverts a previous commit',
        emoji: '⏪',
      },
    ],
    allowBreakingChanges: ['feat', 'fix', 'refactor', 'perf'],
    allowCustomIssuePrefix: false,
    allowEmptyIssuePrefix: false,
    enableMultipleScopes: true,
    maxSubjectLength: 100,
    scopeEnumSeparator: ',',
    skipQuestions: ['footer'],
    useEmoji: true,
    upperCaseSubject: false,
  },
  rules: {
    // Only include rules that differ from @commitlint/config-conventional defaults
    'scope-enum': [2, 'always', scopeOptions],
    'scope-empty': [2, 'never'],
    'subject-case': [
      2,
      'never',
      ['sentence-case', 'start-case', 'pascal-case', 'upper-case'],
    ],
  },
  helpUrl:
    'https://github.com/conventional-changelog/commitlint/#what-is-commitlint',
});
