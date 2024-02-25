import { useEffect } from 'react'

import { useFrame } from '@react-three/fiber'

import useStore from '#/store'

const SENSITIVITY_THRESHOLD = 6

const PointerSystem = () => {
  useEffect(() => {
    const handlePointerLockChange = () => {
      useStore.getState().setInput('pointerLock', document.pointerLockElement !== null)
    }

    const handlePointerMove = (e: PointerEvent) => {
      if (useStore.getState().inputs.pointerLock) {
        useStore.getState().setInput('pointerMovementX', e.movementX)
        useStore.getState().setInput('pointerMovementY', e.movementY)
      } else {
        useStore.getState().setControl('manualRotZ', undefined)
        useStore.getState().setControl('manualRotX', undefined)
      }
    }

    const handlePointerUp = () => {
      if (useStore.getState().inputs.pointerLock) {
        document.exitPointerLock()
      }
    }

    // For some reason, pointer down event doesn't get fired when one mouse button is
    // already down and another is pressed. Using mouseDown is a workaround.
    const handleMouseDown = (e: MouseEvent) => {
      if (useStore.getState().inputs.pointerLock && e.button === 0) {
        useStore.getState().setControl('forward', true)
      }
    }

    const handleMouseUp = (e: MouseEvent) => {
      if (useStore.getState().inputs.pointerLock && e.button === 0) {
        useStore.getState().setControl('forward', false)
      }
    }

    document.addEventListener('pointerlockchange', handlePointerLockChange)
    document.addEventListener('pointermove', handlePointerMove)
    document.addEventListener('pointerup', handlePointerUp)
    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      document.removeEventListener('pointerlockchange', handlePointerLockChange)
      document.removeEventListener('pointermove', handlePointerMove)
      document.removeEventListener('pointerup', handlePointerUp)
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

  useFrame(() => {
    if (useStore.getState().inputs.pointerLock) {
      const { pointerMovementX, pointerMovementY } = useStore.getState().inputs

      useStore
        .getState()
        .setControl(
          'manualRotZ',
          -(Math.abs(pointerMovementX) < SENSITIVITY_THRESHOLD ? 0 : pointerMovementX) / 100,
        )
      useStore
        .getState()
        .setControl(
          'manualRotX',
          -(Math.abs(pointerMovementY) < SENSITIVITY_THRESHOLD ? 0 : pointerMovementY) / 100,
        )
    }
  })

  return null
}

export default PointerSystem
