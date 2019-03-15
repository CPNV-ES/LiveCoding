const path = require('path')
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')

/**
 * Vue CLI plugins config
 */
module.exports = {
  lintOnSave: false,
  /**
   * Load scss vars globally
   */
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        path.resolve(__dirname, 'src/assets/scss/vars.scss')
      ]
    }
  },
  productionSourceMap: false,
  publicPath: '/LiveCoding',
  configureWebpack: {
    plugins: [
      new MonacoWebpackPlugin({
        languages: [
          'javascript',
          'typescript',
          'json',
          'html',
          'markdown',
          'php',
          'python',
          'ruby'
        ]
      })
    ]
  }
}
