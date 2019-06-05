const dictionary = new Map()
dictionary.set('className', 'class')

const createComponent = (type, attributes, content) => {
    const newComponent = document.createElement(type)

    if (attributes) {
        Object.entries(attributes).forEach(([ key, value ]) => {
            if (key.startsWith('on')) {
                newComponent.addEventListener(key.substring(2).toLowerCase(), value)
            } else {
                newComponent.setAttribute(dictionary.get(key) || key, value)
            }
        })
    }

    if (content) {
        switch (typeof content) {
            case 'array':
                content.forEach(element => newComponent.appendChild(element.call()))
                break
            case 'function':
                newComponent.appendChild(content.call())
                break
            case 'object':
                if (Array.isArray(content)) {
                    content.forEach(element => newComponent.appendChild(element))
                    break
                }
                newComponent.appendChild(content)
                break
            case 'string':
                newComponent.innerHTML = content
                break
            default:
                newComponent.appendChild(content)
        }
    }

    return newComponent
}

export { createComponent }
