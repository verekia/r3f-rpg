import { useFrame } from '@react-three/fiber'
import { clamp, mp } from 'manapotion'

import { setControl, useControlsStore } from '#/stores/controls'
import { jump } from '#/systems/MovementSystem'
import { cameras } from '#/world'

const MAX_MOVEMENT = 60

const getForward = () => {
  const { isPointerLocked, isLeftMouseDown, isRightMouseDown, keys } = mp()
  const k = keys.byCode

  if (k.KeyQ && k.KeyW && k.KeyE) return true

  if (k.KeyQ || k.KeyE) return false
  if (k.KeyS || k.ArrowDown) return false
  if (isPointerLocked && (k.KeyA || k.ArrowLeft)) return false
  if (isPointerLocked && (k.KeyD || k.ArrowRight)) return false

  if (k.KeyW || k.ArrowUp) return true
  if (isLeftMouseDown && isRightMouseDown) return true

  return false
}

const getBackward = () => {
  const { isPointerLocked, isLeftMouseDown, isRightMouseDown, keys } = mp()
  const k = keys.byCode

  if (k.KeyQ && k.KeyS && k.KeyE) return true
  if (k.KeyQ || k.KeyE) return false
  if (k.KeyW || k.ArrowUp) return false
  if (isLeftMouseDown && isRightMouseDown) return false
  if (isPointerLocked && (k.KeyA || k.ArrowLeft)) return false
  if (isPointerLocked && (k.KeyD || k.ArrowRight)) return false
  if (k.KeyS || k.ArrowDown) return true

  return false
}

const getTurnLeft = () => {
  const { isPointerLocked, keys } = mp()
  const k = keys.byCode

  if (isPointerLocked) return false
  if (k.KeyD || k.ArrowRight) return false
  if (k.KeyA || k.ArrowLeft) return true

  return false
}

const getTurnRight = () => {
  const { isPointerLocked, keys } = mp()
  const k = keys.byCode

  if (isPointerLocked) return false
  if (k.KeyA || k.ArrowLeft) return false
  if (k.KeyD || k.ArrowRight) return true

  return false
}

const getStrafeLeft = () => {
  const { isPointerLocked, isLeftMouseDown, isRightMouseDown, keys } = mp()
  const k = keys.byCode

  if (k.ArrowUp || k.KeyW) return false
  if (k.ArrowDown || k.KeyS) return false
  if (k.KeyE) return false
  if (isPointerLocked && (k.KeyD || k.ArrowRight)) return false
  if (isLeftMouseDown && isRightMouseDown) return false
  if (k.KeyQ) return true
  if (isPointerLocked && (k.KeyA || k.ArrowLeft)) return true

  return false
}

const getStrafeRight = () => {
  const { isPointerLocked, isLeftMouseDown, isRightMouseDown, keys } = mp()
  const k = keys.byCode

  if (k.KeyQ) return false
  if (isPointerLocked && (k.KeyA || k.ArrowLeft)) return false
  if (k.KeyW || k.ArrowUp) return false
  if (k.KeyS || k.ArrowDown) return false
  if (isLeftMouseDown && isRightMouseDown) return false
  if (k.KeyE) return true
  if (isPointerLocked && (k.KeyD || k.ArrowRight)) return true

  return false
}

const getForwardLeft = () => {
  const { isPointerLocked, isLeftMouseDown, isRightMouseDown, keys } = mp()
  const k = keys.byCode

  if (k.KeyQ && k.KeyW) return true
  if (isPointerLocked && ((k.KeyA && k.KeyW) || (k.ArrowUp && k.ArrowLeft))) return true
  if (isLeftMouseDown && isRightMouseDown && k.KeyQ) return true
  if (isLeftMouseDown && isRightMouseDown && (k.ArrowLeft || k.KeyA)) return true

  return false
}

const getForwardRight = () => {
  const { isPointerLocked, isLeftMouseDown, isRightMouseDown, keys } = mp()
  const k = keys.byCode

  if (k.KeyE && k.KeyW) return true
  if (isPointerLocked && ((k.KeyD && k.KeyW) || (k.ArrowUp && k.ArrowRight))) return true
  if (isLeftMouseDown && isRightMouseDown && k.KeyE) return true
  if (isLeftMouseDown && isRightMouseDown && (k.ArrowRight || k.KeyD)) return true

  return false
}

const getBackwardLeft = () => {
  const { isPointerLocked, keys } = mp()
  const k = keys.byCode

  if (k.KeyQ && k.KeyS) return true
  if (isPointerLocked && ((k.KeyA && k.KeyS) || (k.ArrowDown && k.ArrowLeft))) return true

  return false
}

const getBackwardRight = () => {
  const { isPointerLocked, keys } = mp()
  const k = keys.byCode

  if (k.KeyE && k.KeyS) return true
  if (isPointerLocked && ((k.KeyD && k.KeyS) || (k.ArrowDown && k.ArrowRight))) return true

  return false
}

// This system registers intents of player controls based on inputs and resolves input conflicts.
// It does not manage whether or not these intents are valid in the world.

const ControlsSystem = () => {
  useFrame(() => {
    const { movementMobileJoystick, cameraMobileJoystick, keys } = mp()
    const { isPointerLocked, mouseMovementX, mouseMovementY } = mp()
    const [camera] = cameras

    setControl('forward', getForward())
    setControl('backward', getBackward())
    setControl('strafeLeft', getStrafeLeft())
    setControl('strafeRight', getStrafeRight())
    setControl('forwardLeft', getForwardLeft())
    setControl('forwardRight', getForwardRight())
    setControl('backwardLeft', getBackwardLeft())
    setControl('backwardRight', getBackwardRight())
    setControl('turnLeft', getTurnLeft())
    setControl('turnRight', getTurnRight())
    setControl('jump', Boolean(keys.byCode.Space))

    if (movementMobileJoystick.force !== undefined && movementMobileJoystick.angle !== undefined) {
      useControlsStore.getState().controls.forwardDirection =
        movementMobileJoystick.force < 0.2
          ? undefined
          : camera.tra.rot.z + movementMobileJoystick.angle
    } else {
      useControlsStore.getState().controls.forwardDirection = undefined
    }

    if (isPointerLocked) {
      if (mouseMovementX !== undefined) {
        setControl('manualRotZ', -clamp(mouseMovementX, MAX_MOVEMENT) / 100)
      }
      if (mouseMovementY !== undefined) {
        setControl('manualRotX', clamp(mouseMovementY, MAX_MOVEMENT) / 100)
      }
    } else if (
      cameraMobileJoystick.force !== undefined &&
      cameraMobileJoystick.angle !== undefined &&
      cameraMobileJoystick.forceDiff !== undefined
    ) {
      camera.tra.rot.z +=
        Math.cos(cameraMobileJoystick.angle) * Math.min(cameraMobileJoystick.forceDiff, 2)
    }
  })

  return null
}

export const pressedSpace = () => {
  jump()
}

export const pressedJumpButton = () => {
  jump()
}

export default ControlsSystem
