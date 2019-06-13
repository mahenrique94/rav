import { createComponent } from '@rav/dom'
import { Router } from '@rav/router'

import Header from '../components/Header'

import './App.css'

const App = createComponent(
    'main',
    {
        className: 'container'
    },
    [Header, Router]
)

export default App
