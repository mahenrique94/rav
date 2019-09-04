import rav from '@rav'

import { Link } from '@rav/router'

import A from '../../pages/A'
import B from '../../pages/B'
import C from '../../pages/C'
import Home from '../../pages/Home'

import './Menu.css'

const Menu = () =>
    rav.nav(
        rav.ul(
            [
                rav.li(
                    Link('Home', {
                        className: 'menu__link',
                        component: Home,
                        to: '/',
                    }),
                    { className: 'menu__item' },
                ),
                rav.li(
                    Link('A', {
                        className: 'menu__link',
                        component: A,
                        to: '/a',
                    }),
                    { className: 'menu__item' },
                ),
                rav.li(
                    Link('B', {
                        className: 'menu__link',
                        component: B,
                        to: '/b',
                    }),
                    { className: 'menu__item' },
                ),
                rav.li(
                    Link('C', {
                        className: 'menu__link',
                        component: C,
                        to: '/c',
                    }),
                    { className: 'menu__item' },
                ),
            ],
            { className: 'menu__list' },
        ),
        { className: 'menu' },
    )

export default Menu
