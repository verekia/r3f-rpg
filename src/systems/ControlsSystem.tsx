import { useFrame } from '@react-three/fiber'
import { clamp, getBrowserState, liveBrowserState, pi } from '@v1v2/engine'

import { between } from '#/lib/util'
import { setControl } from '#/stores/controls'
import { useInputStore } from '#/stores/inputs'
import { cameraUTurn } from '#/systems/CameraFollow'
import { jump, uTurn } from '#/systems/MovementSystem'
import { inputEvents, markForRemoval } from '#/world'

const MAX_MOVEMENT = 60

const joystickForward = () => {
  const { inputs } = useInputStore.getState()
  if (inputs.nippleForce === undefined || inputs.nippleAngle === undefined) return false
  return inputs.nippleForce > 0.2 && between(inputs.nippleAngle, pi / 4, (3 * pi) / 4)
}

const joystickBackward = () => {
  const { inputs } = useInputStore.getState()
  if (inputs.nippleForce === undefined || inputs.nippleAngle === undefined) return false
  return inputs.nippleForce > 0.2 && between(inputs.nippleAngle, (4 * pi) / 3, (5 * pi) / 3)
}

const joystickStrafeLeft = () => {
  const { inputs } = useInputStore.getState()
  if (inputs.nippleForce === undefined || inputs.nippleAngle === undefined) return false
  return inputs.nippleForce > 0.2 && between(inputs.nippleAngle, pi, (7 * pi) / 6)
}

const joystickStrafeRight = () => {
  const { inputs } = useInputStore.getState()
  if (inputs.nippleForce === undefined || inputs.nippleAngle === undefined) return false
  return inputs.nippleForce > 0.2 && between(inputs.nippleAngle, (11 * pi) / 6, 2 * pi)
}

const joystickBackwardLeft = () => {
  const { inputs } = useInputStore.getState()
  if (inputs.nippleForce === undefined || inputs.nippleAngle === undefined) return false
  return inputs.nippleForce > 0.2 && between(inputs.nippleAngle, (7 * pi) / 6, (4 * pi) / 3)
}

const joystickBackwardRight = () => {
  const { inputs } = useInputStore.getState()
  if (inputs.nippleForce === undefined || inputs.nippleAngle === undefined) return false
  return inputs.nippleForce > 0.2 && between(inputs.nippleAngle, (5 * pi) / 3, (11 * pi) / 6)
}

const getForward = () => {
  const i = useInputStore.getState().inputs
  const { isPointerLocked } = getBrowserState()

  if (i.KeyQ && i.KeyW && i.KeyE) return true

  if (i.KeyQ || i.KeyE) return false
  if (i.KeyS || i.ArrowDown) return false
  if (isPointerLocked && (i.KeyA || i.ArrowLeft)) return false
  if (isPointerLocked && (i.KeyD || i.ArrowRight)) return false

  if (i.KeyW || i.ArrowUp) return true
  if (i.mouseLeft && i.mouseRight) return true
  if (joystickForward()) return true

  return false
}

const getBackward = () => {
  const i = useInputStore.getState().inputs
  const { isPointerLocked } = getBrowserState()

  if (i.KeyQ && i.KeyS && i.KeyE) return true
  if (i.KeyQ || i.KeyE) return false
  if (i.KeyW || i.ArrowUp) return false
  if (i.mouseLeft && i.mouseRight) return false
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
  const { isPointerLocked } = getBrowserState()

  if (i.ArrowUp || i.KeyW) return false
  if (i.ArrowDown || i.KeyS) return false
  if (i.KeyE) return false
  if (isPointerLocked && (i.KeyD || i.ArrowRight)) return false
  if (i.mouseLeft && i.mouseRight) return false
  if (i.KeyQ) return true
  if (isPointerLocked && (i.KeyA || i.ArrowLeft)) return true
  if (joystickStrafeLeft()) return true

  return false
}

const getStrafeRight = () => {
  const i = useInputStore.getState().inputs
  const { isPointerLocked } = getBrowserState()

  if (i.KeyQ) return false
  if (isPointerLocked && (i.KeyA || i.ArrowLeft)) return false
  if (i.KeyW || i.ArrowUp) return false
  if (i.KeyS || i.ArrowDown) return false
  if (i.mouseLeft && i.mouseRight) return false
  if (i.KeyE) return true
  if (isPointerLocked && (i.KeyD || i.ArrowRight)) return true
  if (joystickStrafeRight()) return true

  return false
}

const getForwardLeft = () => {
  const i = useInputStore.getState().inputs
  const { isPointerLocked } = getBrowserState()

  if (i.KeyQ && i.KeyW) return true
  if (isPointerLocked && ((i.KeyA && i.KeyW) || (i.ArrowUp && i.ArrowLeft))) return true
  if (i.mouseLeft && i.mouseRight && i.KeyQ) return true
  if (i.mouseLeft && i.mouseRight && (i.ArrowLeft || i.KeyA)) return true

  return false
}

const getForwardRight = () => {
  const i = useInputStore.getState().inputs
  const { isPointerLocked } = getBrowserState()

  if (i.KeyE && i.KeyW) return true
  if (isPointerLocked && ((i.KeyD && i.KeyW) || (i.ArrowUp && i.ArrowRight))) return true
  if (i.mouseLeft && i.mouseRight && i.KeyE) return true
  if (i.mouseLeft && i.mouseRight && (i.ArrowRight || i.KeyD)) return true

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
    } else if (inputs.nippleAngle && inputs.nippleForce && inputs.nippleForce > 0.2) {
      if (between(inputs.nippleAngle, 0, pi)) {
        setControl('manualRotZ', (inputs.nippleAngle - pi / 2) * 0.1)
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
