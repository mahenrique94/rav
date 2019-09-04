const init = (component, selector) => {
    const target = document.querySelector(selector)
    if (target) {
        switch (typeof component) {
            case 'string':
                target.innerHTML = component
                break
            case 'function':
                target.appendChild(component.call())
                break
            default:
                target.appendChild(component)
        }
    } else {
        console.error('[RAV] Init => You must provided a existing selector element')
    }
}

export { init }
