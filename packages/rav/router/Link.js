import { createComponent } from '../dom'
import { emit } from '../event'

const handleClick = event => {
    event.preventDefault()
    const render = props.component().outerHTML
    emit('ROUTE_CHANGE', render)
    history.pushState(render, 'title', props.to)
}

const Link = props => (
    <a {...props} onClick={handleClick}>
        {props.children}
    </a>
)

export default Link
