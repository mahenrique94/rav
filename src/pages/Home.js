import { createComponent } from '@rav/dom'

const TableHeaderColumn = name => createComponent('th', null, name)
const TableHeaderRow = () =>
    createComponent('tr', null, [TableHeaderColumn('Name'), TableHeaderColumn('Age'), TableHeaderColumn('Birth')])
const TableHeader = () => createComponent('thead', null, TableHeaderRow())

const TableBodyColumn = name => createComponent('td', null, name)
const TableBodyRow = () =>
    createComponent('tr', null, [TableBodyColumn('Matheus'), TableBodyColumn('25'), TableBodyColumn('25/05/1994')])
const TableBody = () => createComponent('tbody', null, TableBodyRow())

const Table = () => createComponent('table', null, [TableHeader(), TableBody()])

const Home = () => createComponent('div', null, Table())

export default Home
