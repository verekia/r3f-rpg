import { useEffect } from 'react'

import { getBrowserState, unlockPointer } from '@v1v2/engine'

import { inputKeys, setInput, useInputStore } from '#/stores/inputs'
import { createEvent } from '#/world'

import type { Inputs } from '#/stores/inputs'

const InputSystem = () => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (inputKeys.includes(e.code as keyof Inputs)) {
        if (!useInputStore.getState().inputs[e.code as keyof Inputs]) {
          createEvent({ category: 'input', type: 'keypress', key: e.code })
        }
        setInput(e.code as keyof Inputs, true)
      }
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      if (inputKeys.includes(e.code as keyof Inputs)) {
        setInput(e.code as keyof Inputs, false)
      }
    }

    // For some reason, pointer down event doesn't get fired when one mouse button is
    // already down and another is pressed. Using mouseDown is a workaround.
    const handleMouseDown = (e: MouseEvent) => {
      if (e.button === 0) {
        setInput('mouseLeft', true)
      } else if (e.button === 2) {
        setInput('mouseRight', true)
      }
    }

    const handleMouseUp = (e: MouseEvent) => {
      if (e.button === 0) {
        setInput('mouseLeft', false)
      } else if (e.button === 2) {
        setInput('mouseRight', false)
      }

      if (getBrowserState().isPointerLocked && e.button === 2) {
        unlockPointer()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

  return null
}

export default InputSystem
