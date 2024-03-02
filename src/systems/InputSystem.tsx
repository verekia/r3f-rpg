import { useEffect } from 'react'

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

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  return null
}

export default InputSystem
