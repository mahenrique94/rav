import rav from '../'
import { listen } from '../event'

listen('ROUTE_CHANGE', data => {
    const router = document.querySelector('#router')
    router.innerHTML = data
})

const Router = () =>
    rav.div(history.state, {
        id: 'router',
    })

export default Router
