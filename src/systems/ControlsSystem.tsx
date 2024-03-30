import { clamp, mp, useFrameEffect } from '@manapotion/r3f'

import { setControl, useControlsStore } from '#/stores/controls'
import { jump } from '#/systems/MovementSystem'
import { cameras, players } from '#/world'

const { PI: pi } = Math

const MAX_MOVEMENT = 300

const getForward = () => {
  const { mouse, keyboard } = mp()
  const k = keyboard.byCode

  if (k.KeyQ && k.KeyW && k.KeyE) return true

  if (k.KeyQ || k.KeyE) return false
  if (k.KeyS || k.ArrowDown) return false
  if (mouse.locked && (k.KeyA || k.ArrowLeft)) return false
  if (mouse.locked && (k.KeyD || k.ArrowRight)) return false

  if (k.KeyW || k.ArrowUp) return true
  if (mouse.buttons.left && mouse.buttons.right) return true

  return false
}

const getBackward = () => {
  const { mouse, keyboard } = mp()
  const k = keyboard.byCode

  if (k.KeyQ && k.KeyS && k.KeyE) return true
  if (k.KeyQ || k.KeyE) return false
  if (k.KeyW || k.ArrowUp) return false
  if (mouse.buttons.left && mouse.buttons.right) return false
  if (mouse.locked && (k.KeyA || k.ArrowLeft)) return false
  if (mouse.locked && (k.KeyD || k.ArrowRight)) return false
  if (k.KeyS || k.ArrowDown) return true

  return false
}

const getTurnLeft = () => {
  const { mouse, keyboard } = mp()
  const k = keyboard.byCode

  if (mouse.locked && mouse.buttons.right) return false
  if (k.KeyD || k.ArrowRight) return false
  if (k.KeyA || k.ArrowLeft) return true

  return false
}

const getTurnRight = () => {
  const { mouse, keyboard } = mp()
  const k = keyboard.byCode

  if (mouse.locked && mouse.buttons.right) return false
  if (k.KeyA || k.ArrowLeft) return false
  if (k.KeyD || k.ArrowRight) return true

  return false
}

const getStrafeLeft = () => {
  const { mouse, keyboard } = mp()
  const k = keyboard.byCode

  if (k.ArrowUp || k.KeyW) return false
  if (k.ArrowDown || k.KeyS) return false
  if (k.KeyE) return false
  if (mouse.locked && (k.KeyD || k.ArrowRight)) return false
  if (mouse.buttons.left && mouse.buttons.right) return false
  if (k.KeyQ) return true
  if (mouse.locked && mouse.buttons.right && (k.KeyA || k.ArrowLeft)) return true

  return false
}

const getStrafeRight = () => {
  const { mouse, keyboard } = mp()
  const k = keyboard.byCode

  if (k.KeyQ) return false
  if (mouse.locked && (k.KeyA || k.ArrowLeft)) return false
  if (k.KeyW || k.ArrowUp) return false
  if (k.KeyS || k.ArrowDown) return false
  if (mouse.buttons.left && mouse.buttons.right) return false
  if (k.KeyE) return true
  if (mouse.locked && mouse.buttons.right && (k.KeyD || k.ArrowRight)) return true

  return false
}

const getForwardLeft = () => {
  const { mouse, keyboard } = mp()
  const k = keyboard.byCode

  if (k.KeyQ && k.KeyW) return true
  if (mouse.locked && ((k.KeyA && k.KeyW) || (k.ArrowUp && k.ArrowLeft))) return true
  if (mouse.buttons.left && mouse.buttons.right && k.KeyQ) return true
  if (mouse.buttons.left && mouse.buttons.right && (k.ArrowLeft || k.KeyA)) return true

  return false
}

const getForwardRight = () => {
  const { mouse, keyboard } = mp()
  const k = keyboard.byCode

  if (k.KeyE && k.KeyW) return true
  if (mouse.locked && ((k.KeyD && k.KeyW) || (k.ArrowUp && k.ArrowRight))) return true
  if (mouse.buttons.left && mouse.buttons.right && k.KeyE) return true
  if (mouse.buttons.left && mouse.buttons.right && (k.ArrowRight || k.KeyD)) return true

  return false
}

const getBackwardLeft = () => {
  const { mouse, keyboard } = mp()
  const k = keyboard.byCode

  if (k.KeyQ && k.KeyS) return true
  if (mouse.locked && ((k.KeyA && k.KeyS) || (k.ArrowDown && k.ArrowLeft))) return true

  return false
}

const getBackwardRight = () => {
  const { mouse, keyboard } = mp()
  const k = keyboard.byCode

  if (k.KeyE && k.KeyS) return true
  if (mouse.locked && ((k.KeyD && k.KeyS) || (k.ArrowDown && k.ArrowRight))) return true

  return false
}

// This system registers intents of player controls based on inputs and resolves input conflicts.
// It does not manage whether or not these intents are valid in the world.

const ControlsSystem = () => {
  // Using useFrameEffect instead of useFrame is a lucky workaround. There is an unresolved
  // underlying issue. Rotation glitches and weird slighly off rotation happen when using useFrame.
  useFrameEffect(() => {
    const { movementJoystick, cameraJoystick, mouse, keyboard } = mp()
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
    setControl('jump', Boolean(keyboard.byCode.Space))

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
      mouse.locked &&
      ((mouse.movement.y > 0 && camera.tra.rot.x < 0) ||
        (mouse.movement.y < 0 && camera.tra.rot.x > -pi / 3))
    ) {
      camera.tra.rot.x += clamp(mouse.movement.y, -MAX_MOVEMENT, MAX_MOVEMENT) / 1000
    }

    if (mouse.locked && mouse.buttons.left && !mouse.buttons.right) {
      camera.tra.rot.z -= clamp(mouse.movement.x, -MAX_MOVEMENT, MAX_MOVEMENT) * 0.003
    } else if (mouse.locked && mouse.buttons.right) {
      player.tra.rot.z -= clamp(mouse.movement.x, -MAX_MOVEMENT, MAX_MOVEMENT) * 0.003
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
