import { EVENTS } from '../constants/events'
import { emit } from '../event'

const Route = props => emit(EVENTS.ROUTER_ROUTE_ADD, props)

export default Route
