import { lerp } from '@manapotion/r3f'
import { useFrame } from '@react-three/fiber'

import { PLAYER_ROTATION_SPEED, PLAYER_SPEED, PLAYER_SPEED_BACKWARD } from '#/lib/constants'
import { useControlsStore } from '#/stores/controls'
import { cameras, players } from '#/world'

const { PI: pi, cos, sin } = Math

const GRAVITY = -9.8 // Adjust gravity force as needed
const JUMP_VELOCITY = 4.5 // Adjust for desired jump strength
const Z_OFFSET = 0
const MODEL_ROT_LERP_FACTOR = 0.4

const MovementSystem = () => {
  useFrame((_, dt) => {
    const [player] = players
    const [camera] = cameras

    if (!player) return

    const { controls } = useControlsStore.getState()

    const isGrounded = player.tra.pos.z! <= Z_OFFSET

    const forwardDirection = () => {
      if (controls.forwardDirection === undefined) {
        return
      }
      player.tra.rot.z = controls.forwardDirection
      player.tra.pos.velX = cos(controls.forwardDirection) * PLAYER_SPEED
      player.tra.pos.velY = sin(controls.forwardDirection) * PLAYER_SPEED
      isGrounded && player.player.usePlayerStore.getState().setAnimation('Running')
    }

    const forward = () => {
      player.tra.pos.velX = cos(player.tra.rot.z) * PLAYER_SPEED
      player.tra.pos.velY = sin(player.tra.rot.z) * PLAYER_SPEED
      isGrounded && player.player.usePlayerStore.getState().setAnimation('Running')
      player.player.usePlayerStore.getState().modelRotZ = lerp(
        player.player.usePlayerStore.getState().modelRotZ,
        0,
        MODEL_ROT_LERP_FACTOR,
      )
    }

    const backward = () => {
      player.tra.pos.velX = -cos(player.tra.rot.z) * PLAYER_SPEED_BACKWARD
      player.tra.pos.velY = -sin(player.tra.rot.z) * PLAYER_SPEED_BACKWARD
      isGrounded && player.player.usePlayerStore.getState().setAnimation('Walking Backward')
      player.player.usePlayerStore.getState().modelRotZ = lerp(
        player.player.usePlayerStore.getState().modelRotZ,
        0,
        MODEL_ROT_LERP_FACTOR,
      )
    }

    const strafeLeft = () => {
      player.tra.pos.velX = cos(player.tra.rot.z + pi / 2) * PLAYER_SPEED
      player.tra.pos.velY = sin(player.tra.rot.z + pi / 2) * PLAYER_SPEED
      isGrounded && player.player.usePlayerStore.getState().setAnimation('Strafe Left')
      player.player.usePlayerStore.getState().modelRotZ = lerp(
        player.player.usePlayerStore.getState().modelRotZ,
        isGrounded ? 0 : pi / 2,
        MODEL_ROT_LERP_FACTOR,
      )
    }

    const strafeRight = () => {
      player.tra.pos.velX = -cos(player.tra.rot.z + pi / 2) * PLAYER_SPEED
      player.tra.pos.velY = -sin(player.tra.rot.z + pi / 2) * PLAYER_SPEED
      isGrounded && player.player.usePlayerStore.getState().setAnimation('Strafe Right')
      player.player.usePlayerStore.getState().modelRotZ = lerp(
        player.player.usePlayerStore.getState().modelRotZ,
        isGrounded ? 0 : -pi / 2,
        MODEL_ROT_LERP_FACTOR,
      )
    }

    const forwardLeft = () => {
      player.tra.pos.velX = cos(player.tra.rot.z + pi / 4) * PLAYER_SPEED
      player.tra.pos.velY = sin(player.tra.rot.z + pi / 4) * PLAYER_SPEED
      isGrounded && player.player.usePlayerStore.getState().setAnimation('Running')
      player.player.usePlayerStore.getState().modelRotZ = lerp(
        player.player.usePlayerStore.getState().modelRotZ,
        pi / 4,
        MODEL_ROT_LERP_FACTOR,
      )
    }

    const forwardRight = () => {
      player.tra.pos.velX = cos(player.tra.rot.z - pi / 4) * PLAYER_SPEED
      player.tra.pos.velY = sin(player.tra.rot.z - pi / 4) * PLAYER_SPEED
      isGrounded && player.player.usePlayerStore.getState().setAnimation('Running')
      player.player.usePlayerStore.getState().modelRotZ = lerp(
        player.player.usePlayerStore.getState().modelRotZ,
        -pi / 4,
        MODEL_ROT_LERP_FACTOR,
      )
    }

    const backwardLeft = () => {
      player.tra.pos.velX = -cos(player.tra.rot.z - pi / 4) * PLAYER_SPEED_BACKWARD
      player.tra.pos.velY = -sin(player.tra.rot.z - pi / 4) * PLAYER_SPEED_BACKWARD
      isGrounded && player.player.usePlayerStore.getState().setAnimation('Walking Backward')
      player.player.usePlayerStore.getState().modelRotZ = lerp(
        player.player.usePlayerStore.getState().modelRotZ,
        -pi / 4,
        MODEL_ROT_LERP_FACTOR,
      )
    }

    const backwardRight = () => {
      player.tra.pos.velX = -cos(player.tra.rot.z + pi / 4) * PLAYER_SPEED_BACKWARD
      player.tra.pos.velY = -sin(player.tra.rot.z + pi / 4) * PLAYER_SPEED_BACKWARD
      isGrounded && player.player.usePlayerStore.getState().setAnimation('Walking Backward')
      player.player.usePlayerStore.getState().modelRotZ = lerp(
        player.player.usePlayerStore.getState().modelRotZ,
        pi / 4,
        MODEL_ROT_LERP_FACTOR,
      )
    }

    const idle = () => {
      player.tra.pos.velX = 0
      player.tra.pos.velY = 0
      isGrounded && player.player.usePlayerStore.getState().setAnimation('Idle')
    }

    if (controls.forwardDirection !== undefined) {
      forwardDirection()
    } else if (controls.forward) {
      forward()
    } else if (controls.backward) {
      backward()
    } else if (controls.strafeLeft) {
      strafeLeft()
    } else if (controls.strafeRight) {
      strafeRight()
    } else if (controls.forwardLeft) {
      forwardLeft()
    } else if (controls.forwardRight) {
      forwardRight()
    } else if (controls.backwardLeft) {
      backwardLeft()
    } else if (controls.backwardRight) {
      backwardRight()
    } else {
      idle()
    }

    if (controls.turnLeft) {
      player.tra.rot.velZ = PLAYER_ROTATION_SPEED
    } else if (controls.turnRight) {
      player.tra.rot.velZ = -PLAYER_ROTATION_SPEED
    } else if (player.tra.rot.velZ) {
      player.tra.rot.velZ = 0
    } else {
      player.tra.rot.velZ = 0
    }

    if (isGrounded) {
      player.tra.pos.z = Z_OFFSET // Ensure player is exactly on the ground
      player.tra.pos.velZ = 0 // Reset vertical velocity when grounded
    } else {
      player.player.usePlayerStore.getState().setAnimation('Jumping')
    }

    if (player.tra.pos.velZ === undefined) {
      player.tra.pos.velZ = 0
    }

    // Apply gravity
    player.tra.pos.velZ! += GRAVITY * dt * 1.8

    // Clamp player's position to ground level to prevent it from going below
    if (player.tra.pos.z! < 0) {
      player.tra.pos.z = Z_OFFSET
      player.tra.pos.velZ = 0
    }
  })

  return null
}

export const jump = () => {
  const [player] = players
  const isGrounded = player.tra.pos.z! <= Z_OFFSET

  if (isGrounded) {
    player.tra.pos.velZ = JUMP_VELOCITY
  }
}

export default MovementSystem
