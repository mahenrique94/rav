import { createComponent } from '@rav/dom'

import Menu from '../Menu'

import './Header.css'

const Header = createComponent(
    'header',
    {
        className: 'header'
    },
    Menu
)

export default Header
