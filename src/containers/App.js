import rav from '@rav'

import { Router, Route } from '@rav/router'

import Header from '../components/Header'

import Home from '../pages/Home'
import A from '../pages/A'
import B from '../pages/B'
import C from '../pages/C'

import './App.css'

const App = () =>
    rav.div([
        Header(),
        Router([
            Route({ component: Home, path: '/' }),
            Route({ component: A, path: '/a' }),
            Route({ component: B, path: '/b' }),
            Route({ component: C, path: '/c' }),
        ]),
    ])

export default App
