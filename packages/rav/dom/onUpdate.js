import { addProcess } from '../processor'

const onUpdate = callback => addProcess(callback)

export { onUpdate }
