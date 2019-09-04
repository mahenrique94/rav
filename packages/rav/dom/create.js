import { PRIVATE_ATTRIBUTES } from '../constants/attributes'
import { DICTIONARY, ELEMENTS } from '../constants/elements'

const createElement = (type, content, props) => {
    const newElement = document.createElement(type)

    if (props) {
        Object.entries(props).forEach(([key, value]) => {
            if (key.startsWith('on')) {
                newElement.addEventListener(key.substring(2).toLowerCase(), value)
            } else {
                if (PRIVATE_ATTRIBUTES.includes(key)) {
                    return
                }
                newElement.setAttribute(DICTIONARY.get(key) || key, value)
            }
        })
    }

    switch (typeof content) {
        case 'object':
            if (content) {
                if (Array.isArray(content)) {
                    content.forEach(c => newElement.appendChild(c))
                    break
                }
                newElement.appendChild(content)
            }
            break
        default:
            newElement.innerHTML = content
    }

    return newElement
}

const createComponent = ELEMENTS.map(element => (content, props) => createElement(element, content, props)).reduce(
    (acc, element, index) => {
        acc[ELEMENTS[index]] = element
        return acc
    },
    {},
)

export { createComponent }
