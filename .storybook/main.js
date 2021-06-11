module.exports = {
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  typescript: {
    // HACK: workaround for https://github.com/storybookjs/storybook/issues/15067
    reactDocgen: 'none'
  }
};
