import rav, { onMount, onUpdate, createState } from '@rav'

const Home = () => {
    const [people, updatePeople] = createState([{ name: 'Matheus', birthDay: '25/05/1994' }])

    onMount(() => {
        console.log('Component was mounted')
        fetch('http://www.mocky.io/v2/5d712370330000e09f7797fb')
            .then(resp => resp.json())
            .then(({ result }) => updatePeople(result))
    })

    onUpdate(() => {
        console.log('Component was updated')
    })

    return rav.div(
        rav.table([
            rav.thead(rav.tr([rav.th('Name'), rav.th('Birth')])),
            rav.tbody(people.map(person => rav.tr([rav.td(person.name), rav.td(person.birthDay)]))),
        ]),
    )
}

export default Home
