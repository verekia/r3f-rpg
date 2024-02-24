import { useFrame } from '@react-three/fiber'

import { PLAYER_SPEED } from '#/lib/constants'
import { pi } from '#/lib/util'
import useStore from '#/store'
import { players } from '#/world'

const MovementSystem = () => {
  useFrame(() => {
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
      player.tra.rot.velZ = 2
    } else if (useStore.getState().inputs.turnRight) {
      player.tra.rot.velZ = -2
    } else {
      player.tra.rot.velZ = 0
    }
  })

  return null
}

export default MovementSystem
