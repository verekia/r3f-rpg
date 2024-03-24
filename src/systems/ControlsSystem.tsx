import { clamp, mp, pi, useFrameEffect } from '@manapotion/r3f'

import { setControl, useControlsStore } from '#/stores/controls'
import { jump } from '#/systems/MovementSystem'
import { cameras, players } from '#/world'

const MAX_MOVEMENT = 300

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
  const { isPointerLocked, isRightMouseDown, keys } = mp()
  const k = keys.byCode

  if (isPointerLocked && isRightMouseDown) return false
  if (k.KeyD || k.ArrowRight) return false
  if (k.KeyA || k.ArrowLeft) return true

  return false
}

const getTurnRight = () => {
  const { isPointerLocked, isRightMouseDown, keys } = mp()
  const k = keys.byCode

  if (isPointerLocked && isRightMouseDown) return false
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
  if (isPointerLocked && isRightMouseDown && (k.KeyA || k.ArrowLeft)) return true

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
  if (isPointerLocked && isRightMouseDown && (k.KeyD || k.ArrowRight)) return true

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
  // Using useFrameEffect instead of useFrame is a lucky workaround. There is an unresolved
  // underlying issue. Rotation glitches and weird slighly off rotation happen when using useFrame.
  useFrameEffect(() => {
    const { movementJoystick, cameraJoystick, keys, isLeftMouseDown, isRightMouseDown } = mp()
    const { isPointerLocked, mouseMovementX, mouseMovementY } = mp()
    const [camera] = cameras
    const [player] = players

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

    if (
      movementJoystick.followDistance !== undefined &&
      movementJoystick.followAngle !== undefined
    ) {
      useControlsStore.getState().controls.forwardDirection =
        movementJoystick.followDistance < 30
          ? undefined
          : camera.tra.rot.z + movementJoystick.followAngle
    } else {
      useControlsStore.getState().controls.forwardDirection = undefined
    }

    if (
      isPointerLocked &&
      ((mouseMovementY > 0 && camera.tra.rot.x < 0) ||
        (mouseMovementY < 0 && camera.tra.rot.x > -pi / 3))
    ) {
      camera.tra.rot.x += clamp(mouseMovementY, -MAX_MOVEMENT, MAX_MOVEMENT) / 1000
    }

    if (isPointerLocked && isLeftMouseDown && !isRightMouseDown) {
      camera.tra.rot.z -= clamp(mouseMovementX, -MAX_MOVEMENT, MAX_MOVEMENT) * 0.003
    } else if (isPointerLocked && isRightMouseDown) {
      player.tra.rot.z -= clamp(mouseMovementX, -MAX_MOVEMENT, MAX_MOVEMENT) * 0.003
    }

    camera.tra.rot.z -= cameraJoystick.movementX * 0.015

    if (
      (cameraJoystick.movementY > 0 && camera.tra.rot.x < 0) ||
      (cameraJoystick.movementY < 0 && camera.tra.rot.x > -pi / 3)
    ) {
      camera.tra.rot.x += cameraJoystick.movementY * 0.015
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

export const pressedBothMouseButtons = () => {
  const [camera] = cameras
  const [player] = players

  if (!player || !camera) {
    return
  }

  player.tra.rot.z = camera.tra.rot.z + pi / 2
}

export default ControlsSystem
