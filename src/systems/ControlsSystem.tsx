import { useFrame } from '@react-three/fiber'
import { clamp, mp, pi } from 'manapotion'

import { between } from '#/lib/util'
import { setControl } from '#/stores/controls'
import { jump } from '#/systems/MovementSystem'

const MAX_MOVEMENT = 60

const mobileJoystickUp = () => {
  const { movementMobileJoystick } = mp()

  if (movementMobileJoystick.angle === undefined || movementMobileJoystick.force === undefined)
    return false

  return (
    movementMobileJoystick.force > 0.2 &&
    between(movementMobileJoystick.angle, pi / 4, (3 * pi) / 4)
  )
}

const mobileJoystickDown = () => {
  const { movementMobileJoystick } = mp()

  if (movementMobileJoystick.angle === undefined || movementMobileJoystick.force === undefined)
    return false

  return (
    movementMobileJoystick.force > 0.2 &&
    between(movementMobileJoystick.angle, (4 * pi) / 3, (5 * pi) / 3)
  )
}

const mobileJoystickLeft = () => {
  const { movementMobileJoystick } = mp()

  if (movementMobileJoystick.angle === undefined || movementMobileJoystick.force === undefined)
    return false

  return (
    movementMobileJoystick.force > 0.2 && between(movementMobileJoystick.angle, pi, (7 * pi) / 6)
  )
}

const mobileJoystickRight = () => {
  const { movementMobileJoystick } = mp()

  if (movementMobileJoystick.angle === undefined || movementMobileJoystick.force === undefined)
    return false

  return (
    movementMobileJoystick.force > 0.2 &&
    between(movementMobileJoystick.angle, (11 * pi) / 6, 2 * pi)
  )
}

const mobileJoystickDownLeft = () => {
  const { movementMobileJoystick } = mp()

  if (movementMobileJoystick.angle === undefined || movementMobileJoystick.force === undefined)
    return false

  return (
    movementMobileJoystick.force > 0.2 &&
    between(movementMobileJoystick.angle, (7 * pi) / 6, (4 * pi) / 3)
  )
}

const mobileJoystickDownRight = () => {
  const { movementMobileJoystick } = mp()

  if (movementMobileJoystick.angle === undefined || movementMobileJoystick.force === undefined)
    return false

  return (
    movementMobileJoystick.force > 0.2 &&
    between(movementMobileJoystick.angle, (5 * pi) / 3, (11 * pi) / 6)
  )
}

const mobileJoystickUpLeft = () => {
  const { movementMobileJoystick } = mp()

  if (movementMobileJoystick.angle === undefined || movementMobileJoystick.force === undefined)
    return false

  return (
    movementMobileJoystick.force > 0.2 && between(movementMobileJoystick.angle, (3 * pi) / 4, pi)
  )
}

const mobileJoystickUpRight = () => {
  const { movementMobileJoystick } = mp()

  if (movementMobileJoystick.angle === undefined || movementMobileJoystick.force === undefined)
    return false

  return movementMobileJoystick.force > 0.2 && between(movementMobileJoystick.angle, 0, pi / 4)
}

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
  if (mobileJoystickUp()) return true

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
  if (mobileJoystickDown()) return true

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
  if (mobileJoystickLeft()) return true

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
  if (mobileJoystickRight()) return true

  return false
}

const getForwardLeft = () => {
  const { isPointerLocked, isLeftMouseDown, isRightMouseDown, keys } = mp()
  const k = keys.byCode

  if (k.KeyQ && k.KeyW) return true
  if (isPointerLocked && ((k.KeyA && k.KeyW) || (k.ArrowUp && k.ArrowLeft))) return true
  if (isLeftMouseDown && isRightMouseDown && k.KeyQ) return true
  if (isLeftMouseDown && isRightMouseDown && (k.ArrowLeft || k.KeyA)) return true
  if (mobileJoystickUpLeft()) return true

  return false
}

const getForwardRight = () => {
  const { isPointerLocked, isLeftMouseDown, isRightMouseDown, keys } = mp()
  const k = keys.byCode

  if (k.KeyE && k.KeyW) return true
  if (isPointerLocked && ((k.KeyD && k.KeyW) || (k.ArrowUp && k.ArrowRight))) return true
  if (isLeftMouseDown && isRightMouseDown && k.KeyE) return true
  if (isLeftMouseDown && isRightMouseDown && (k.ArrowRight || k.KeyD)) return true
  if (mobileJoystickUpRight()) return true

  return false
}

const getBackwardLeft = () => {
  const { isPointerLocked, keys } = mp()
  const k = keys.byCode

  if (k.KeyQ && k.KeyS) return true
  if (isPointerLocked && ((k.KeyA && k.KeyS) || (k.ArrowDown && k.ArrowLeft))) return true
  if (mobileJoystickDownLeft()) return true

  return false
}

const getBackwardRight = () => {
  const { isPointerLocked, keys } = mp()
  const k = keys.byCode

  if (k.KeyE && k.KeyS) return true
  if (isPointerLocked && ((k.KeyD && k.KeyS) || (k.ArrowDown && k.ArrowRight))) return true
  if (mobileJoystickDownRight()) return true

  return false
}

// This system registers intents of player controls based on inputs and resolves input conflicts.
// It does not manage whether or not these intents are valid in the world.

const ControlsSystem = () => {
  useFrame(() => {
    const { cameraMobileJoystick, keys } = mp()
    const { isPointerLocked, mouseMovementX, mouseMovementY } = mp()

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
      setControl(
        'manualRotZ',
        -Math.cos(cameraMobileJoystick.angle) * Math.min(cameraMobileJoystick.forceDiff, 2),
      )
    } else {
      setControl('manualRotZ', undefined)
      setControl('manualRotX', undefined)
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
