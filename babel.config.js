const htmlPlugin = require('./packages/rav/plugins/html')
const jsxPlugin = require('@babel/plugin-syntax-jsx')

module.exports = function(api) {
    api.cache(true)

    const plugins = [jsxPlugin, htmlPlugin]

    const presets = [
        [
            '@babel/env',
            {
                useBuiltIns: 'usage',
                corejs: {
                    version: 3
                }
            }
        ]
    ]

    return {
        plugins,
        presets
    }
}
