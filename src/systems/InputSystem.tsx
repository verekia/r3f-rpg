import { useEffect } from 'react'

import useStore from '#/store'

const InputSystem = () => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'KeyW') {
        useStore.getState().setControl('forward', true)
      } else if (e.code === 'KeyS') {
        useStore.getState().setControl('backward', true)
      } else if (e.code === 'KeyA') {
        useStore.getState().setControl('turnLeft', true)
      } else if (e.code === 'KeyD') {
        useStore.getState().setControl('turnRight', true)
      } else if (e.code === 'KeyQ') {
        useStore.getState().setControl('strafeLeft', true)
      } else if (e.code === 'KeyE') {
        useStore.getState().setControl('strafeRight', true)
      } else if (e.code === 'Space') {
        useStore.getState().setControl('jump', true)
      }
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'KeyW') {
        useStore.getState().setControl('forward', false)
      } else if (e.code === 'KeyS') {
        useStore.getState().setControl('backward', false)
      } else if (e.code === 'KeyA') {
        useStore.getState().setControl('turnLeft', false)
      } else if (e.code === 'KeyD') {
        useStore.getState().setControl('turnRight', false)
      } else if (e.code === 'KeyQ') {
        useStore.getState().setControl('strafeLeft', false)
      } else if (e.code === 'KeyE') {
        useStore.getState().setControl('strafeRight', false)
      } else if (e.code === 'Space') {
        useStore.getState().setControl('jump', false)
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
