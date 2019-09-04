const jsx = require('@babel/plugin-syntax-jsx').default

const { declare } = require('@babel/helper-plugin-utils')
const { types: t } = require('@babel/core')

const { createIdentifierParser } = require('./utils')
const { helper } = require('./helpers')

const BABEL_VERSION = 7

module.exports = declare((api, options) => {
    api.assertVersion(BABEL_VERSION)

    const PRAGMA_DEFAULT = options.pragma || 'createComponent'
    const PRAGMA_FRAG_DEFAULT = options.pragmaFrag || 'createFragment'
    const THROW_IF_NAMESPACE = options.throwIfNamespace === undefined ? true : !!options.throwIfNamespace

    const visitor = helper({
        pre: state => {
            const tagName = state.tagName
            const args = state.args
            // TODO => Remove t.react
            if (t.react.isCompatTag(tagName)) {
                args.push(t.stringLiteral(tagName))
            } else {
                args.push(state.tagExpr)
            }
        },

        post(state, pass) {
            state.callee = pass.get('jsxIdentifier')()
        },

        throwIfNamespace: THROW_IF_NAMESPACE
    })

    visitor.Program = {
        enter: (_, state) => {
            const pragmaSet = !!options.pragma
            const pragmaFragSet = !!options.pragmaFrag
            state.set('jsxIdentifier', createIdentifierParser(PRAGMA_DEFAULT))
            state.set('jsxFragIdentifier', createIdentifierParser(PRAGMA_FRAG_DEFAULT))
            state.set('usedFragment', false)
            state.set('pragmaSet', pragmaSet)
            state.set('pragmaFragSet', pragmaFragSet)
        },
        exit(_, state) {
            if (state.get('pragmaSet') && state.get('usedFragment') && !state.get('pragmaFragSet')) {
                throw new Error('[RAV] JSX Transform => Pragma has been set but pragmafrag has not been set')
            }
        }
    }

    visitor.JSXAttribute = path => {
        if (t.isJSXElement(path.node.value)) {
            path.node.value = t.jsxExpressionContainer(path.node.value)
        }
    }

    return {
        name: 'transform-rav-jsx',
        inherits: jsx,
        visitor
    }
})
