import { createComponent } from '@rav/dom'

import { Router } from '@rav/router'

import Header from '../components/Header'

import './App.css'

const App = () => (
    <div>
        <Header />
        <Router />
    </div>
)

export default App
