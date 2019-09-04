import rav from '@rav'

const Home = () =>
    rav.div(
        rav.table([
            rav.thead(rav.tr([rav.th('Name'), rav.th('Age'), rav.th('Birth')])),
            rav.tbody([
                rav.tr([rav.td('Matheus'), rav.td('25'), rav.td('25/05/1994')]),
                rav.tr([rav.td('João'), rav.td('18'), rav.td('28/02/1991')]),
            ]),
        ]),
    )

export default Home
