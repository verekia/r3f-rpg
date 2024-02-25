import { useEffect } from 'react'

import useStore from '#/store'

const InputSystem = () => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'KeyW') {
        useStore.getState().setInput('forward', true)
      } else if (e.code === 'KeyS') {
        useStore.getState().setInput('backward', true)
      } else if (e.code === 'KeyA') {
        useStore.getState().setInput('turnLeft', true)
      } else if (e.code === 'KeyD') {
        useStore.getState().setInput('turnRight', true)
      } else if (e.code === 'KeyQ') {
        useStore.getState().setInput('strafeLeft', true)
      } else if (e.code === 'KeyE') {
        useStore.getState().setInput('strafeRight', true)
      } else if (e.code === 'Space') {
        useStore.getState().setInput('jump', true)
      }
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'KeyW') {
        useStore.getState().setInput('forward', false)
      } else if (e.code === 'KeyS') {
        useStore.getState().setInput('backward', false)
      } else if (e.code === 'KeyA') {
        useStore.getState().setInput('turnLeft', false)
      } else if (e.code === 'KeyD') {
        useStore.getState().setInput('turnRight', false)
      } else if (e.code === 'KeyQ') {
        useStore.getState().setInput('strafeLeft', false)
      } else if (e.code === 'KeyE') {
        useStore.getState().setInput('strafeRight', false)
      } else if (e.code === 'Space') {
        useStore.getState().setInput('jump', false)
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
