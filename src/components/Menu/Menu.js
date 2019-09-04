import rav from '@rav'

import { Link } from '@rav/router'

import './Menu.css'

const Menu = () =>
    rav.nav(
        rav.ul(
            [
                rav.li(
                    Link('Home', {
                        className: 'menu__link',
                        to: '/',
                    }),
                    { className: 'menu__item' },
                ),
                rav.li(
                    Link('A', {
                        className: 'menu__link',
                        to: '/a',
                    }),
                    { className: 'menu__item' },
                ),
                rav.li(
                    Link('B', {
                        className: 'menu__link',
                        to: '/b',
                    }),
                    { className: 'menu__item' },
                ),
                rav.li(
                    Link('C', {
                        className: 'menu__link',
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
