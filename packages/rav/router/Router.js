import { EVENTS } from '../constants/events'

import rav from '../'
import { listen } from '../event'

const ROOT_PATH = '/'
const routes = new Map()

const handleRouteChange = newPath => {
    const targetComponent = routes.get(newPath)
    if (targetComponent) {
        const router = document.querySelector('#router')
        if (router) {
            router.innerHTML = ''
            router.appendChild(targetComponent())
        } else {
            setTimeout(() => {
                const router = document.querySelector('#router')
                router.innerHTML = ''
                router.appendChild(targetComponent())
            }, 500)
        }
    }
}

listen(EVENTS.ROUTER_ROUTE_CHANGE, newPath => handleRouteChange(newPath))

listen(EVENTS.ROUTER_ROUTE_ADD, data => {
    routes.set(data.path, data.component)
    if (data.path === ROOT_PATH) {
        handleRouteChange(data.path)
    }
})

const Router = () => {
    history.pushState(null, null, '/')
    return rav.div(history.state, {
        id: 'router',
    })
}

export default Router
