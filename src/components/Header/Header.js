import rav from '@rav'

import Menu from '../Menu'

import './Header.css'

const Header = () => rav.header(Menu(), { className: 'header' })

export default Header
