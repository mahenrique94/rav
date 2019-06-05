import { createComponent } from '../dom'
import { listen } from '../event'

listen('ROUTE_CHANGE', data => {
    const router = document.querySelector('#router')
    router.innerHTML = data
})

const Router = createComponent('div', { id: 'router' }, history.state)

export default Router
