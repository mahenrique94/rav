import rav from '../'
import { emit } from '../event'

const handleClick = (component, to) => {
    event.preventDefault()
    const render = component.innerHTML
    emit('ROUTE_CHANGE', render)
    history.pushState(render, null, to)
}

const Link = (content, props) =>
    rav.a(content, {
        ...props,
        onClick: event => {
            event.preventDefault()
            handleClick(props.component(), props.to)
        },
    })

export default Link
