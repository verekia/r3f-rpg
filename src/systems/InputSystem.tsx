import { useEffect } from 'react'

import { setControl } from '#/stores/controls'
import { getInput, inputKeys, setInput } from '#/stores/inputs'

import type { Inputs } from '#/stores/inputs'

const InputSystem = () => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (inputKeys.includes(e.code as keyof Inputs)) {
        setInput(e.code as keyof Inputs, true)
      }
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      if (inputKeys.includes(e.code as keyof Inputs)) {
        setInput(e.code as keyof Inputs, false)
      }
    }

    const handlePointerLockChange = () => {
      setInput('pointerLock', document.pointerLockElement !== null)
    }

    const handleMouseMove = (e: MouseEvent) => {
      setInput('mouseMovementX', e.movementX)
      setInput('mouseMovementY', e.movementY)
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

      if (getInput('pointerLock') && e.button === 2) {
        document.exitPointerLock()
        // This shouldn't be here
        setControl('manualRotZ', undefined)
        setControl('manualRotX', undefined)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    document.addEventListener('pointerlockchange', handlePointerLockChange)
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
      document.removeEventListener('pointerlockchange', handlePointerLockChange)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

  return null
}

export default InputSystem
