import rav from '@rav'

import { Router } from '@rav/router'

import Header from '../components/Header'

import './App.css'

const App = () => rav.div([Header(), Router()])

export default App
