const esutils = require('esutils')

const { types: t } = require('@babel/core')

const convertJSXIdentifier = (node, parent) => {
    if (t.isJSXIdentifier(node)) {
        if (node.name === 'this' && t.isReferenced(node, parent)) {
            return t.thisExpression()
        } else if (esutils.keyword.isIdentifierNameES6(node.name)) {
            node.type = 'Identifier'
        } else {
            return t.stringLiteral(node.name)
        }
    } else if (t.isJSXMemberExpression(node)) {
        return t.memberExpression(convertJSXIdentifier(node.object, node), convertJSXIdentifier(node.property, node))
    } else if (t.isJSXNamespacedName(node)) {
        return t.stringLiteral(`${node.namespace.name}:${node.name.name}`)
    }

    return node
}

const convertAttributeValue = node => {
    if (t.isJSXExpressionContainer(node)) {
        return node.expression
    } else {
        return node
    }
}

const convertAttribute = node => {
    const value = convertAttributeValue(node.value || t.booleanLiteral(true))

    if (t.isStringLiteral(value) && !t.isJSXExpressionContainer(node.value)) {
        value.value = value.value.replace(/\n\s+/g, ' ')
        if (value.extra && value.extra.raw) {
            delete value.extra.raw
        }
    }

    if (t.isJSXNamespacedName(node.name)) {
        node.name = t.stringLiteral(node.name.namespace.name + ':' + node.name.name.name)
    } else if (esutils.keyword.isIdentifierNameES6(node.name.name)) {
        node.name.type = 'Identifier'
    } else {
        node.name = t.stringLiteral(node.name.name)
    }

    return t.inherits(t.objectProperty(node.name, value), node)
}

const buildElementCall = (path, file, options) => {
    if (options.filter && !options.filter(path.node, file)) {
        return
    }

    const openingPath = path.get('openingElement')
    openingPath.parent.children = t.react.buildChildren(openingPath.parent)

    const tagExpr = convertJSXIdentifier(openingPath.node.name, openingPath.node)
    const args = []

    let tagName
    if (t.isIdentifier(tagExpr)) {
        tagName = tagExpr.name
    } else if (t.isLiteral(tagExpr)) {
        tagName = tagExpr.value
    }

    const state = {
        tagExpr: tagExpr,
        tagName: tagName,
        args: args
    }

    if (options.pre) {
        options.pre(state, file)
    }

    let attribs = openingPath.node.attributes
    if (attribs.length) {
        attribs = buildOpeningElementAttributes(attribs, file)
    } else {
        attribs = t.nullLiteral()
    }

    args.push(attribs, ...path.node.children)

    if (options.post) {
        options.post(state, file)
    }

    return state.call || t.callExpression(state.callee, args)
}

const pushProps = (_props, objs) => {
    if (!_props.length) {
        return _props
    }

    objs.push(t.objectExpression(_props))
    return []
}

const buildOpeningElementAttributes = (attribs, file) => {
    let _props = []
    const objs = []
    const useBuiltIns = file.opts.useBuiltIns || false

    if (typeof useBuiltIns !== 'boolean') {
        throw new Error('[RAV] transform-rav-jsx => Currently only accepts a boolean option for useBuiltIns (defaults to false)')
    }

    while (attribs.length) {
        const prop = attribs.shift()
        if (t.isJSXSpreadAttribute(prop)) {
            _props = pushProps(_props, objs)
            objs.push(prop.argument)
        } else {
            _props.push(convertAttribute(prop))
        }
    }

    pushProps(_props, objs)

    if (objs.length === 1) {
        attribs = objs[0]
    } else {
        if (!t.isObjectExpression(objs[0])) {
            objs.unshift(t.objectExpression([]))
        }
        const helper = useBuiltIns ? t.memberExpression(t.identifier('Object'), t.identifier('assign')) : file.addHelper('extends')
        attribs = t.callExpression(helper, objs)
    }

    return attribs
}

const buildFragmentCall = (path, file, options) => {
    if (options.filter && !options.filter(path.node, file)) {
        return
    }

    const openingPath = path.get('openingElement')
    openingPath.parent.children = t.react.buildChildren(openingPath.parent)

    const args = []
    const tagName = null
    const tagExpr = file.get('jsxFragIdentifier')()

    const state = {
        tagExpr: tagExpr,
        tagName: tagName,
        args: args
    }

    if (options.pre) {
        options.pre(state, file)
    }

    args.push(t.nullLiteral(), ...path.node.children)

    if (options.post) {
        options.post(state, file)
    }

    file.set('usedFragment', true)
    return state.call || t.callExpression(state.callee, args)
}

const helper = options => {
    const visitor = {}

    visitor.JSXNamespacedName = path => {
        if (opts.throwIfNamespace) {
            throw path.buildCodeFrameError(
                "[RAV] JSXNamespacedName => Namespace tags are not supported by default. RAV's JSX doesn't support namespace tags. You can turn on the 'throwIfNamespace' flag to bypass this warning."
            )
        }
    }

    visitor.JSXSpreadChild = path => {
        throw path.buildCodeFrameError('[RAV] JSXSpreadChild => Spread children are not supported in RAV.')
    }

    visitor.JSXElement = {
        exit(path, file) {
            const callExpr = buildElementCall(path, file, options)
            if (callExpr) {
                path.replaceWith(t.inherits(callExpr, path.node))
            }
        }
    }

    visitor.JSXFragment = {
        exit(path, file) {
            const callExpr = buildFragmentCall(path, file, options)
            if (callExpr) {
                path.replaceWith(t.inherits(callExpr, path.node))
            }
        }
    }

    return visitor
}

module.exports = {
    helper
}
