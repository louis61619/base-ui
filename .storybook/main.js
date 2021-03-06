// const path = require('path')

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    // '@storybook/preset-create-react-app',
    '@storybook/preset-scss'
    // '@storybook/addon-docs'
    // {
    //   name: '@storybook/addon-docs',
    //   options: {
    //     // configureJSX: true,
    //     // babelOptions: {},
    //     // sourceLoaderOptions: null,
    //     transcludeMarkdown: true
    //   }
    // }
  ]
  // webpackFinal: async (config) => {
  //   config.resolve.modules = [...(config.resolve.modules || []), path.resolve('./')]
  //   return config
  // }
  // webpackFinal: async (config, { configType }) => {
  //   config.resolve.alias = {
  //     ...config.resolve.alias,
  //     packages: path.resolve(__dirname, '../src/components')
  //   }
  //   return config
  // }
}
