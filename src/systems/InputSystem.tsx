import { useEffect } from 'react'

import useStore from '#/store'

const InputSystem = () => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'KeyW') {
        useStore.getState().setInput('up', true)
      } else if (e.code === 'KeyS') {
        useStore.getState().setInput('down', true)
      } else if (e.code === 'KeyA') {
        useStore.getState().setInput('left', true)
      } else if (e.code === 'KeyD') {
        useStore.getState().setInput('right', true)
      }
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'KeyW') {
        useStore.getState().setInput('up', false)
      } else if (e.code === 'KeyS') {
        useStore.getState().setInput('down', false)
      } else if (e.code === 'KeyA') {
        useStore.getState().setInput('left', false)
      } else if (e.code === 'KeyD') {
        useStore.getState().setInput('right', false)
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
