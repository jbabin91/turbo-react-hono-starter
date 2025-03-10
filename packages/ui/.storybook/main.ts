import path from 'node:path';

import { type StorybookConfig } from 'storybook-react-rsbuild';

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string): any {
  return path.dirname(path.resolve(path.join(value, 'package.json')));
}

const config: StorybookConfig = {
  addons: [
    '@storybook/addon-onboarding',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    {
      name: getAbsolutePath('storybook-addon-rslib'),
    },
  ],
  docs: {
    autodocs: 'tag',
  },
  framework: {
    name: getAbsolutePath('storybook-react-rsbuild'),
    options: {},
  },
  stories: [
    '../stories/**/*.mdx',
    '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  typescript: {
    check: true,
    reactDocgen: 'react-docgen-typescript',
  },
};

export default config;
