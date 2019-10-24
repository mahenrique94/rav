import { EVENTS } from '../constants/events'

import { stack } from './stack'
import { listen } from '../event'

const CALL_STACK = stack()

const addProcess = frame => CALL_STACK.push(frame)

listen(EVENTS.STACK_PUSH_FRAME, () => {
    const lastFrame = CALL_STACK.pop()
    if (lastFrame) {
        lastFrame()
    }
})

export { addProcess }
