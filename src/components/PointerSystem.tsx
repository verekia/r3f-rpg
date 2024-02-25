import { useEffect } from 'react'

import { useFrame } from '@react-three/fiber'

import { clamp } from '#/lib/util'
import useStore from '#/store'

const SENSITIVITY_THRESHOLD = 6
const MAX_MOVEMENT = 60

const PointerSystem = () => {
  useEffect(() => {
    const handlePointerLockChange = () => {
      useStore.getState().setInput('pointerLock', document.pointerLockElement !== null)
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (useStore.getState().inputs.pointerLock) {
        useStore.getState().setInput('mouseMovementX', e.movementX)
        useStore.getState().setInput('mouseMovementY', e.movementY)
      } else {
        useStore.getState().setControl('manualRotZ', undefined)
        useStore.getState().setControl('manualRotX', undefined)
      }
    }

    // For some reason, pointer down event doesn't get fired when one mouse button is
    // already down and another is pressed. Using mouseDown is a workaround.
    const handleMouseDown = (e: MouseEvent) => {
      if (e.button === 0) {
        useStore.getState().setInput('mouseLeft', true)
      } else if (e.button === 2) {
        useStore.getState().setInput('mouseRight', true)
      }
    }

    const handleMouseUp = (e: MouseEvent) => {
      if (e.button === 0) {
        useStore.getState().setInput('mouseLeft', false)
      } else if (e.button === 2) {
        useStore.getState().setInput('mouseRight', false)
      }

      if (useStore.getState().inputs.pointerLock && e.button === 2) {
        document.exitPointerLock()
        useStore.getState().setControl('manualRotZ', undefined)
        useStore.getState().setControl('manualRotX', undefined)
      }
    }

    document.addEventListener('pointerlockchange', handlePointerLockChange)
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      document.removeEventListener('pointerlockchange', handlePointerLockChange)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

  useFrame(() => {
    if (useStore.getState().inputs.pointerLock) {
      const { mouseMovementX, mouseMovementY } = useStore.getState().inputs

      useStore
        .getState()
        .setControl(
          'manualRotZ',
          -(Math.abs(mouseMovementX) < SENSITIVITY_THRESHOLD
            ? 0
            : clamp(mouseMovementX, MAX_MOVEMENT)) / 100,
        )
      useStore
        .getState()
        .setControl(
          'manualRotX',
          -(Math.abs(mouseMovementY) < SENSITIVITY_THRESHOLD
            ? 0
            : clamp(mouseMovementY, MAX_MOVEMENT)) / 100,
        )
    }
  })

  return null
}

export default PointerSystem
