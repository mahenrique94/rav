import { createComponent } from '@rav/dom'

import { Link } from '@rav/router'

import A from '../../pages/A'
import B from '../../pages/B'
import C from '../../pages/C'
import Home from '../../pages/Home'

import './Menu.css'

const Menu = () => (
    <nav className="menu">
        <ul className="menu__list">
            <li className="menu__item">
                <Link className="menu__link" component={Home} to="/">
                    Home
                </Link>
            </li>
            <li className="menu__item">
                <Link className="menu__link" component={A} to="/">
                    A
                </Link>
            </li>
            <li className="menu__item">
                <Link className="menu__link" component={B} to="/">
                    B
                </Link>
            </li>
            <li className="menu__item">
                <Link className="menu__link" component={C} to="/">
                    C
                </Link>
            </li>
        </ul>
    </nav>
)

export default Menu
