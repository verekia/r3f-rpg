import { getJoysticks, getKeyboard, getMouse, useMainLoop } from '@manapotion/react'
import { clamp } from 'three/src/math/MathUtils'

import { queryClient } from '#/lib/react-query'
import { STAGE_CONTROLS } from '#/lib/stages'
import { setControl, useControlsStore } from '#/stores/controls'
import { requestJump } from '#/systems/MovementSystem'
import { cameras, players } from '#/world'

const { PI: pi } = Math

const MAX_MOVEMENT = 300

const getForward = () => {
  const mouse = getMouse()
  const k = getKeyboard().codes

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
  const mouse = getMouse()
  const k = getKeyboard().codes

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
  const mouse = getMouse()
  const k = getKeyboard().codes

  if (mouse.locked && mouse.buttons.right) return false
  if (k.KeyD || k.ArrowRight) return false
  if (k.KeyA || k.ArrowLeft) return true

  return false
}

const getTurnRight = () => {
  const mouse = getMouse()
  const k = getKeyboard().codes

  if (mouse.locked && mouse.buttons.right) return false
  if (k.KeyA || k.ArrowLeft) return false
  if (k.KeyD || k.ArrowRight) return true

  return false
}

const getStrafeLeft = () => {
  const mouse = getMouse()
  const k = getKeyboard().codes

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
  const mouse = getMouse()
  const k = getKeyboard().codes

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
  const mouse = getMouse()
  const k = getKeyboard().codes

  if (k.KeyQ && k.KeyW) return true
  if (mouse.locked && ((k.KeyA && k.KeyW) || (k.ArrowUp && k.ArrowLeft))) return true
  if (mouse.buttons.left && mouse.buttons.right && k.KeyQ) return true
  if (mouse.buttons.left && mouse.buttons.right && (k.ArrowLeft || k.KeyA)) return true

  return false
}

const getForwardRight = () => {
  const mouse = getMouse()
  const k = getKeyboard().codes

  if (k.KeyE && k.KeyW) return true
  if (mouse.locked && ((k.KeyD && k.KeyW) || (k.ArrowUp && k.ArrowRight))) return true
  if (mouse.buttons.left && mouse.buttons.right && k.KeyE) return true
  if (mouse.buttons.left && mouse.buttons.right && (k.ArrowRight || k.KeyD)) return true

  return false
}

const getBackwardLeft = () => {
  const mouse = getMouse()
  const k = getKeyboard().codes

  if (k.KeyQ && k.KeyS) return true
  if (mouse.locked && ((k.KeyA && k.KeyS) || (k.ArrowDown && k.ArrowLeft))) return true

  return false
}

const getBackwardRight = () => {
  const mouse = getMouse()
  const k = getKeyboard().codes

  if (k.KeyE && k.KeyS) return true
  if (mouse.locked && ((k.KeyD && k.KeyS) || (k.ArrowDown && k.ArrowRight))) return true

  return false
}

// This system registers intents of player controls based on inputs and resolves input conflicts.
// It does not manage whether or not these intents are valid in the world.

const ControlsSystem = () => {
  // Using useFrameEffect instead of useFrame is a lucky workaround. There is an unresolved
  // underlying issue. Rotation glitches and weird slighly off rotation happen when using useFrame.
  useMainLoop(
    () => {
      const movementJoystick = getJoysticks().movement
      const cameraJoystick = getJoysticks().rotation
      const mouse = getMouse()

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
      setControl('jump', Boolean(getKeyboard().codes.Space))

      if (
        movementJoystick.follow.distance !== undefined &&
        movementJoystick.follow.angle !== undefined
      ) {
        useControlsStore.getState().controls.forwardDirection =
          movementJoystick.follow.distance < 30
            ? undefined
            : camera.tra.rot.z + movementJoystick.follow.angle
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

      camera.tra.rot.z -= cameraJoystick.movement.x * 0.015

      if (
        (cameraJoystick.movement.y > 0 && camera.tra.rot.x < 0) ||
        (cameraJoystick.movement.y < 0 && camera.tra.rot.x > -pi / 3)
      ) {
        camera.tra.rot.x += cameraJoystick.movement.y * 0.015
      }
    },
    { stage: STAGE_CONTROLS },
  )

  return null
}

export const pressedSpace = () => {
  const { error } = requestJump()

  if (error?.code === 'ERROR_CODE_JUMP_NOT_GROUNDED') {
    queryClient.setQueryData(['MidScreenErrorMessage'], 'You cannot jump while in the air!')
  }
}

// Mobile button
export const pressedJumpButton = () => {
  const { error } = requestJump()

  if (error?.code === 'ERROR_CODE_JUMP_NOT_GROUNDED') {
    queryClient.setQueryData(['MidScreenErrorMessage'], 'You cannot jump while in the air!')
  }
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
