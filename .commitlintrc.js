import { defineConfig } from 'cz-git';

/**
 * Commit scope options for the monorepo
 * Format: type(scope): subject
 * Example: feat(frontend): add new dashboard
 */
const scopeOptions = [
  // Main applications
  'frontend', // React web application
  'backend', // Hono API server

  // Shared packages
  'ui', // Component library and design system
  'eslint-config', // Shared ESLint configuration
  'typescript-config', // Shared TypeScript configuration

  // Global scopes
  'repo', // Repository-wide changes (e.g., root configuration)
  'dependencies', // Dependency updates and management
  'config', // Build, tool, and environment configurations
  'ci', // CI/CD pipeline and workflows
  'docs', // Documentation updates and improvements
  'changesets', // Changeset related operations
];

export default defineConfig({
  extends: ['@commitlint/config-conventional'],
  prompt: {
    alias: {
      b: 'chore(dependencies): bump dependencies',
      c: 'chore(changesets): add changesets',
      r: 'chore(repo): update repository configuration',
      d: 'docs(docs): update documentation',
      t: 'test(frontend): add unit tests',
      f: 'fix(frontend): quick fix',
      s: 'style(ui): update styles',
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
        name: 'docs:     📝 Documentation only changes',
        emoji: '📝',
      },
      {
        value: 'style',
        name: 'style:    💄 Changes that do not affect the meaning of the code',
        emoji: '💄',
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
        name: 'build:    📦️ Changes that affect the build system or external dependencies',
        emoji: '📦️',
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
        name: 'revert:   ⏪️ Reverts a previous commit',
        emoji: '⏪️',
      },
    ],
    allowBreakingChanges: ['feat', 'fix', 'refactor', 'perf'],
    allowCustomIssuePrefix: false,
    allowEmptyIssuePrefix: false,
    enableMultipleScopes: true,
    maxSubjectLength: 100,
    scopeEnumSeparator: ',',
    skipQuestions: [],
    useEmoji: true,
    upperCaseSubject: false,
  },
  rules: {
    'scope-enum': [2, 'always', scopeOptions],
    'subject-empty': [2, 'never'],
    'subject-min-length': [2, 'always', 2],
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'perf',
        'test',
        'build',
        'ci',
        'chore',
        'revert',
      ],
    ],
    'body-leading-blank': [1, 'always'],
    'footer-leading-blank': [1, 'always'],
    'header-max-length': [2, 'always', 100],
    'subject-case': [
      2,
      'never',
      ['sentence-case', 'start-case', 'pascal-case', 'upper-case'],
    ],
  },
});
