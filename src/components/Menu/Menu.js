import { createComponent } from '@rav/dom'

import { Link } from '@rav/router'

import A from '../../pages/A'
import B from '../../pages/B'
import C from '../../pages/C'
import Home from '../../pages/Home'

import './Menu.css'

const MenuLinkHome = Link({
    children: 'Home',
    className: 'menu__link',
    component: Home,
    to: '/'
})

const MenuItemHome = createComponent(
    'li',
    {
        className: 'menu__item'
    },
    MenuLinkHome
)

const MenuLinkA = Link({
    children: 'A',
    className: 'menu__link',
    component: A,
    to: '/a'
})

const MenuItemA = createComponent(
    'li',
    {
        className: 'menu__item'
    },
    MenuLinkA
)

const MenuLinkB = Link({
    children: 'B',
    className: 'menu__link',
    component: B,
    to: '/b'
})

const MenuItemB = createComponent(
    'li',
    {
        className: 'menu__item'
    },
    MenuLinkB
)

const MenuLinkC = Link({
    children: 'C',
    className: 'menu__link',
    component: C,
    to: '/c'
})

const MenuItemC = createComponent(
    'li',
    {
        className: 'menu__item'
    },
    MenuLinkC
)

const MenuList = createComponent(
    'ul',
    {
        className: 'menu__list'
    },
    [MenuItemHome, MenuItemA, MenuItemB, MenuItemC]
)

const Menu = createComponent(
    'nav',
    {
        className: 'menu'
    },
    MenuList
)

export default Menu
