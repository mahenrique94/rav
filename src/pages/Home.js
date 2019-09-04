import { createComponent } from '@rav/dom'

const Home = () => (
    <div>
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Birth</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Matheus</td>
                    <td>25</td>
                    <td>25/05/1994</td>
                </tr>
                <tr>
                    <td>João</td>
                    <td>18</td>
                    <td>28/02/1991</td>
                </tr>
            </tbody>
        </table>
    </div>
)

export default Home
