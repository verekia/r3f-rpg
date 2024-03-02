import { useFrame } from '@react-three/fiber'
import { clamp, getBrowserState, liveBrowserState, pi } from '@v1v2/engine'

import { between } from '#/lib/util'
import { setControl } from '#/stores/controls'
import { mobileJoystick1, useInputStore } from '#/stores/inputs'
import { cameraUTurn } from '#/systems/CameraFollow'
import { jump, uTurn } from '#/systems/MovementSystem'
import { inputEvents, markForRemoval } from '#/world'

const MAX_MOVEMENT = 60

const joystickForward = () => {
  if (mobileJoystick1.angle === undefined || mobileJoystick1.force === undefined) return false

  return mobileJoystick1.force > 0.2 && between(mobileJoystick1.angle, pi / 4, (3 * pi) / 4)
}

const joystickBackward = () => {
  if (mobileJoystick1.angle === undefined || mobileJoystick1.force === undefined) return false

  return mobileJoystick1.force > 0.2 && between(mobileJoystick1.angle, (4 * pi) / 3, (5 * pi) / 3)
}

const joystickStrafeLeft = () => {
  if (mobileJoystick1.angle === undefined || mobileJoystick1.force === undefined) return false

  return mobileJoystick1.force > 0.2 && between(mobileJoystick1.angle, pi, (7 * pi) / 6)
}

const joystickStrafeRight = () => {
  if (mobileJoystick1.angle === undefined || mobileJoystick1.force === undefined) return false

  return mobileJoystick1.force > 0.2 && between(mobileJoystick1.angle, (11 * pi) / 6, 2 * pi)
}

const joystickBackwardLeft = () => {
  if (mobileJoystick1.angle === undefined || mobileJoystick1.force === undefined) return false

  return mobileJoystick1.force > 0.2 && between(mobileJoystick1.angle, (7 * pi) / 6, (4 * pi) / 3)
}

const joystickBackwardRight = () => {
  if (mobileJoystick1.angle === undefined || mobileJoystick1.force === undefined) return false

  return mobileJoystick1.force > 0.2 && between(mobileJoystick1.angle, (5 * pi) / 3, (11 * pi) / 6)
}

const getForward = () => {
  const i = useInputStore.getState().inputs
  const { isPointerLocked, isLeftMouseDown, isRightMouseDown } = getBrowserState()

  if (i.KeyQ && i.KeyW && i.KeyE) return true

  if (i.KeyQ || i.KeyE) return false
  if (i.KeyS || i.ArrowDown) return false
  if (isPointerLocked && (i.KeyA || i.ArrowLeft)) return false
  if (isPointerLocked && (i.KeyD || i.ArrowRight)) return false

  if (i.KeyW || i.ArrowUp) return true
  if (isLeftMouseDown && isRightMouseDown) return true
  if (joystickForward()) return true

  return false
}

const getBackward = () => {
  const i = useInputStore.getState().inputs
  const { isPointerLocked, isLeftMouseDown, isRightMouseDown } = getBrowserState()

  if (i.KeyQ && i.KeyS && i.KeyE) return true
  if (i.KeyQ || i.KeyE) return false
  if (i.KeyW || i.ArrowUp) return false
  if (isLeftMouseDown && isRightMouseDown) return false
  if (isPointerLocked && (i.KeyA || i.ArrowLeft)) return false
  if (isPointerLocked && (i.KeyD || i.ArrowRight)) return false
  if (i.KeyS || i.ArrowDown) return true
  if (joystickBackward()) return true

  return false
}

const getTurnLeft = () => {
  const i = useInputStore.getState().inputs
  const { isPointerLocked } = getBrowserState()

  if (isPointerLocked) return false
  if (i.KeyD || i.ArrowRight) return false
  if (i.KeyA || i.ArrowLeft) return true

  return false
}

const getTurnRight = () => {
  const i = useInputStore.getState().inputs
  const { isPointerLocked } = getBrowserState()

  if (isPointerLocked) return false
  if (i.KeyA || i.ArrowLeft) return false
  if (i.KeyD || i.ArrowRight) return true

  return false
}

const getStrafeLeft = () => {
  const i = useInputStore.getState().inputs
  const { isPointerLocked, isLeftMouseDown, isRightMouseDown } = getBrowserState()

  if (i.ArrowUp || i.KeyW) return false
  if (i.ArrowDown || i.KeyS) return false
  if (i.KeyE) return false
  if (isPointerLocked && (i.KeyD || i.ArrowRight)) return false
  if (isLeftMouseDown && isRightMouseDown) return false
  if (i.KeyQ) return true
  if (isPointerLocked && (i.KeyA || i.ArrowLeft)) return true
  if (joystickStrafeLeft()) return true

  return false
}

const getStrafeRight = () => {
  const i = useInputStore.getState().inputs
  const { isPointerLocked, isLeftMouseDown, isRightMouseDown } = getBrowserState()

  if (i.KeyQ) return false
  if (isPointerLocked && (i.KeyA || i.ArrowLeft)) return false
  if (i.KeyW || i.ArrowUp) return false
  if (i.KeyS || i.ArrowDown) return false
  if (isLeftMouseDown && isRightMouseDown) return false
  if (i.KeyE) return true
  if (isPointerLocked && (i.KeyD || i.ArrowRight)) return true
  if (joystickStrafeRight()) return true

  return false
}

const getForwardLeft = () => {
  const i = useInputStore.getState().inputs
  const { isPointerLocked, isLeftMouseDown, isRightMouseDown } = getBrowserState()

  if (i.KeyQ && i.KeyW) return true
  if (isPointerLocked && ((i.KeyA && i.KeyW) || (i.ArrowUp && i.ArrowLeft))) return true
  if (isLeftMouseDown && isRightMouseDown && i.KeyQ) return true
  if (isLeftMouseDown && isRightMouseDown && (i.ArrowLeft || i.KeyA)) return true

  return false
}

const getForwardRight = () => {
  const i = useInputStore.getState().inputs
  const { isPointerLocked, isLeftMouseDown, isRightMouseDown } = getBrowserState()

  if (i.KeyE && i.KeyW) return true
  if (isPointerLocked && ((i.KeyD && i.KeyW) || (i.ArrowUp && i.ArrowRight))) return true
  if (isLeftMouseDown && isRightMouseDown && i.KeyE) return true
  if (isLeftMouseDown && isRightMouseDown && (i.ArrowRight || i.KeyD)) return true

  return false
}

const getBackwardLeft = () => {
  const i = useInputStore.getState().inputs
  const { isPointerLocked } = getBrowserState()

  if (i.KeyQ && i.KeyS) return true
  if (isPointerLocked && ((i.KeyA && i.KeyS) || (i.ArrowDown && i.ArrowLeft))) return true
  if (joystickBackwardLeft()) return true

  return false
}

const getBackwardRight = () => {
  const i = useInputStore.getState().inputs
  const { isPointerLocked } = getBrowserState()

  if (i.KeyE && i.KeyS) return true
  if (isPointerLocked && ((i.KeyD && i.KeyS) || (i.ArrowDown && i.ArrowRight))) return true
  if (joystickBackwardRight()) return true

  return false
}

// This system registers intents of player controls based on inputs and resolves input conflicts.
// It does not manage whether or not these intents are valid in the world.

const ControlsSystem = () => {
  useFrame(() => {
    const inputs = useInputStore.getState().inputs

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
    setControl('jump', inputs.Space)

    if (getBrowserState().isPointerLocked) {
      if (liveBrowserState.mouseMovementX !== undefined) {
        setControl('manualRotZ', -clamp(liveBrowserState.mouseMovementX, MAX_MOVEMENT) / 100)
      }
      if (liveBrowserState.mouseMovementY !== undefined) {
        setControl('manualRotX', -clamp(liveBrowserState.mouseMovementY, MAX_MOVEMENT) / 100)
      }
    } else if (
      mobileJoystick1.force !== undefined &&
      mobileJoystick1.angle !== undefined &&
      mobileJoystick1.force > 0.2
    ) {
      if (between(mobileJoystick1.angle, 0, pi)) {
        setControl('manualRotZ', (mobileJoystick1.angle - pi / 2) * 0.1)
      } else {
        setControl('manualRotZ', undefined)
      }
    } else {
      setControl('manualRotZ', undefined)
      setControl('manualRotX', undefined)
    }

    for (const e of inputEvents) {
      if (e.event.type === 'keypress' && e.event.key === 'Space') {
        jump()
      }
      if (e.event.type === 'keypress' && e.event.key === 'KeyX') {
        uTurn()
        cameraUTurn()
      }

      markForRemoval(e)
    }
  })

  return null
}

export default ControlsSystem
