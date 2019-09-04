const { types: t } = require('@babel/core')

const createIdentifierParser = id => () => {
    return id
        .split('.')
        .map(name => t.identifier(name))
        .reduce((object, property) => t.memberExpression(object, property))
}

module.exports = {
    createIdentifierParser
}
