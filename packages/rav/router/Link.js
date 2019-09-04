import { EVENTS } from '../constants/events'

import rav from '../'
import { emit } from '../event'

const handleClick = to => {
    emit(EVENTS.ROUTER_ROUTE_CHANGE, to)
    history.pushState(null, null, to)
}

const Link = (content, props) =>
    rav.a(content, {
        ...props,
        onClick: event => {
            event.preventDefault()
            handleClick(props.to)
        },
    })

export default Link
