const events = new Map()

const emit = (type, data) => {
    const event = events.get(type)
    if (event) {
        event(data)
    }
}

const listen = (type, fn) => events.set(type, fn)

export { emit, listen }
