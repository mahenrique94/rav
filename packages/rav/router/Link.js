import { createComponent } from '../dom'
import { emit } from '../event'

const Link = props => createComponent('a', {
    ...props,
    href: props.to,
    onClick: event => {
        event.preventDefault()
        emit('ROUTE_CHANGE', props.component().outerHTML)
        history.pushState(props.component().outerHTML, 'title', props.to)
    }
}, props.children)

export default Link
