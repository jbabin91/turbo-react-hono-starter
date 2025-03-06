# @repo/eslint-config

ESLint v9 flat configurations for the monorepo.

## Overview

This package provides shared ESLint configurations using the new ESLint v9 flat config format. Each configuration is focused on specific use cases and can be composed together as needed.

## Configurations

### Base Configuration (`@repo/eslint-config/base`)

Core configuration that includes:

- TypeScript support with strict type checking
- Import sorting and validation
- Object key sorting
- Unicorn rules for better practices
- Turbo rules for monorepo
- Prettier integration

### React Configuration (`@repo/eslint-config/react`)

React-specific configuration that includes:

- React and JSX rules
- React Hooks rules
- JSX accessibility (a11y)
- TanStack Query rules
- TanStack Router rules
- Tailwind CSS validation
- Browser environment settings

### Node.js Configuration (`@repo/eslint-config/node`)

Node.js-specific configuration that includes:

- Node.js environment globals
- Node.js best practices
- Security rules
- Error handling rules

### Hono Configuration (`@repo/eslint-config/hono`)

API-focused configuration that includes:

- Strict TypeScript rules
- API-focused best practices
- Promise handling rules
- Type safety rules

### Storybook Configuration (`@repo/eslint-config/storybook`)

Storybook-specific configuration that includes:

- Storybook best practices
- Story-specific rule overrides
- Component documentation rules

## Usage

Since we're using ESLint v9's flat config system, you'll need to create an `eslint.config.js` file (not `.eslintrc.js`):

```js
// eslint.config.js
import baseConfig from '@repo/eslint-config/base';
import reactConfig from '@repo/eslint-config/react';
import nodeConfig from '@repo/eslint-config/node';
import honoConfig from '@repo/eslint-config/hono';
import storybookConfig from '@repo/eslint-config/storybook';

// For a React application
export default [
  ...baseConfig,
  ...reactConfig,
  // Optional: Add Storybook config if you're using it
  ...storybookConfig,
];

// For a Node.js API
export default [
  ...baseConfig,
  ...nodeConfig,
];

// For a Hono API
export default [
  ...baseConfig,
  ...honoConfig,
];
```

## Features

### Type Safety

- ✨ Strict TypeScript checking
- 🔒 Type-aware linting
- 📝 Consistent type imports/exports
- ⚡ Inline type imports

### Code Quality

- 🎯 Modern JavaScript/TypeScript best practices
- 🔄 Automatic import sorting
- 🎨 Consistent code formatting with Prettier
- 🔑 Object key sorting
- 🦄 Unicorn rules for better practices

### React Development

- ⚛️ React best practices
- 🪝 Hooks rules and dependency checking
- ♿ Accessibility checks
- 🎨 Tailwind CSS class validation
- 🔄 TanStack Query optimization
- 🛣️ TanStack Router validation
- 🔍 Route type safety

### API Development

- 🔒 Strict type safety
- ⚡ Promise handling
- 🛡️ Error boundary types
- 📝 API documentation rules

### Storybook

- 📚 Story best practices
- 🎨 Component documentation
- 🔧 Flexible prop spreading
- 📝 Default export allowance

## Configuration Details

Each configuration is carefully crafted to work with ESLint v9's flat config system. The configurations:

- Use the new flat config format
- Properly handle file patterns
- Correctly manage plugin dependencies
- Follow separation of concerns
- Enable type-aware linting where appropriate

## Contributing

When adding new rules or making changes:

1. Ensure changes follow ESLint v9 flat config best practices
2. Keep configurations focused and maintainable
3. Document any new rules or changes
4. Test changes across different project types

## License

MIT
