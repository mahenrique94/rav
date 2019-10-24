import { addProcess } from '../processor'

const onMount = callback => addProcess(callback)

export { onMount }
