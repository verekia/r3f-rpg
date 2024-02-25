import { useFrame } from '@react-three/fiber'

import { PLAYER_ROTATION_SPEED, PLAYER_SPEED } from '#/lib/constants'
import { pi } from '#/lib/util'
import useStore from '#/store'
import { players } from '#/world'

const GRAVITY = -9.8 // Adjust gravity force as needed
const JUMP_VELOCITY = 4.5 // Adjust for desired jump strength
const Z_OFFSET = 0

const MovementSystem = () => {
  useFrame((_, dt) => {
    const [player] = players

    if (!player) return

    if (
      useStore.getState().inputs.forward &&
      !useStore.getState().inputs.strafeLeft &&
      !useStore.getState().inputs.strafeRight &&
      !useStore.getState().inputs.backward
    ) {
      player.tra.pos.velX = Math.cos(player.tra.rot.z) * PLAYER_SPEED
      player.tra.pos.velY = Math.sin(player.tra.rot.z) * PLAYER_SPEED
    } else if (
      useStore.getState().inputs.backward &&
      !useStore.getState().inputs.strafeLeft &&
      !useStore.getState().inputs.strafeRight &&
      !useStore.getState().inputs.forward
    ) {
      player.tra.pos.velX = -Math.cos(player.tra.rot.z) * PLAYER_SPEED
      player.tra.pos.velY = -Math.sin(player.tra.rot.z) * PLAYER_SPEED
    } else if (
      useStore.getState().inputs.strafeLeft &&
      !useStore.getState().inputs.forward &&
      !useStore.getState().inputs.strafeRight &&
      !useStore.getState().inputs.backward
    ) {
      player.tra.pos.velX = Math.cos(player.tra.rot.z + pi / 2) * PLAYER_SPEED
      player.tra.pos.velY = Math.sin(player.tra.rot.z + pi / 2) * PLAYER_SPEED
    } else if (
      useStore.getState().inputs.strafeRight &&
      !useStore.getState().inputs.forward &&
      !useStore.getState().inputs.strafeLeft &&
      !useStore.getState().inputs.backward
    ) {
      player.tra.pos.velX = -Math.cos(player.tra.rot.z + pi / 2) * PLAYER_SPEED
      player.tra.pos.velY = -Math.sin(player.tra.rot.z + pi / 2) * PLAYER_SPEED
    } else if (
      useStore.getState().inputs.forward &&
      useStore.getState().inputs.strafeLeft &&
      !useStore.getState().inputs.strafeRight &&
      !useStore.getState().inputs.backward
    ) {
      player.tra.pos.velX = Math.cos(player.tra.rot.z + pi / 4) * PLAYER_SPEED
      player.tra.pos.velY = Math.sin(player.tra.rot.z + pi / 4) * PLAYER_SPEED
    } else if (
      useStore.getState().inputs.forward &&
      !useStore.getState().inputs.strafeLeft &&
      useStore.getState().inputs.strafeRight &&
      !useStore.getState().inputs.backward
    ) {
      player.tra.pos.velX = Math.cos(player.tra.rot.z - pi / 4) * PLAYER_SPEED
      player.tra.pos.velY = Math.sin(player.tra.rot.z - pi / 4) * PLAYER_SPEED
    } else if (
      useStore.getState().inputs.backward &&
      useStore.getState().inputs.strafeLeft &&
      !useStore.getState().inputs.strafeRight &&
      !useStore.getState().inputs.forward
    ) {
      player.tra.pos.velX = -Math.cos(player.tra.rot.z - pi / 4) * PLAYER_SPEED
      player.tra.pos.velY = -Math.sin(player.tra.rot.z - pi / 4) * PLAYER_SPEED
    } else if (
      useStore.getState().inputs.backward &&
      !useStore.getState().inputs.strafeLeft &&
      useStore.getState().inputs.strafeRight &&
      !useStore.getState().inputs.forward
    ) {
      player.tra.pos.velX = -Math.cos(player.tra.rot.z + pi / 4) * PLAYER_SPEED
      player.tra.pos.velY = -Math.sin(player.tra.rot.z + pi / 4) * PLAYER_SPEED
    } else {
      player.tra.pos.velX = 0
      player.tra.pos.velY = 0
    }

    if (useStore.getState().inputs.turnLeft) {
      player.tra.rot.velZ = PLAYER_ROTATION_SPEED
    } else if (useStore.getState().inputs.turnRight) {
      player.tra.rot.velZ = -PLAYER_ROTATION_SPEED
    } else {
      player.tra.rot.velZ = 0
    }

    const isGrounded = player.tra.pos.z! <= Z_OFFSET

    if (isGrounded) {
      player.tra.pos.z = Z_OFFSET // Ensure player is exactly on the ground
      player.tra.pos.velZ = 0 // Reset vertical velocity when grounded
    }

    if (player.tra.pos.velZ === undefined) {
      player.tra.pos.velZ = 0
    }

    // Apply gravity
    player.tra.pos.velZ! += GRAVITY * dt * 1.8

    // Check if jump input is active and player is grounded
    if (useStore.getState().inputs.jump && isGrounded) {
      player.tra.pos.velZ = JUMP_VELOCITY // Apply initial jump velocity
    }

    // Clamp player's position to ground level to prevent it from going below
    if (player.tra.pos.z! < 0) {
      player.tra.pos.z = Z_OFFSET
      player.tra.pos.velZ = 0
    }
  })

  return null
}

export default MovementSystem
