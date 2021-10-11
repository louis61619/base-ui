const path = require('path')

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    // '@storybook/preset-create-react-app',
    '@storybook/preset-scss'
  ],
  webpackFinal: async (config) => {
    config.resolve.modules = [
      path.resolve(__dirname, '..', 'src'),
      path.resolve(__dirname, '..', 'node_modules')
    ]

    return config
  }
}
