const path = require('path')

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
  }
}
