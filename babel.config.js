module.exports = function(api) {
    api.cache(true)

    const presets = [
        [
            '@babel/env',
            {
                useBuiltIns: 'usage'
            }
        ]
    ]

    return {
        presets
    }
}
