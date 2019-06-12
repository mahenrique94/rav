import { createComponent } from '../dom'
import { emit } from '../event'

const Link = props => createComponent('a', {
    ...props,
    href: props.to,
    onClick: event => {
        event.preventDefault()
        const render = props.component().outerHTML
        emit('ROUTE_CHANGE', render)
        history.pushState(render, 'title', props.to)
    }
}, props.children)

export default Link
