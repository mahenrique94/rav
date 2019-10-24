import { EVENTS } from '../constants/events'

import { emit } from '../event'

const stack = () => ({
    frames: [],
    push(newFrame) {
        this.frames = [...this.frames, newFrame]
        emit(EVENTS.STACK_PUSH_FRAME)
    },
    pop() {
        const newFrames = [...this.frames]
        const frameOut = newFrames.pop()
        this.frames = newFrames
        return frameOut
    },
})

export { stack }
