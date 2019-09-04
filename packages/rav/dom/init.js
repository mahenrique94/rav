const init = (component, selector) => {
    const target = document.querySelector(selector)
    if (target) {
        const root = component.call(this)
        switch (typeof root) {
            case 'string':
                target.innerHTML = root
            default:
                target.appendChild(root)
        }
    } else {
        console.error('[RAV] Init => You must provided a existing selector element')
    }
}

export { init }
