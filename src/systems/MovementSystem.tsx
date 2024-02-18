import { useFrame } from '@react-three/fiber'

import { PLAYER_RADIUS, PLAYER_SPEED } from '#/lib/constants'
import { pi } from '#/lib/util'
import useStore from '#/store'
import { dcZones, players } from '#/world'

const MovementSystem = () => {
  useFrame(() => {
    const [player] = players
    const [dcZone] = dcZones

    if (!player || !dcZone) return

    const angle =
      useStore.getState().inputs.up && useStore.getState().inputs.left
        ? (3 * pi) / 4
        : useStore.getState().inputs.up && useStore.getState().inputs.right
          ? pi / 4
          : useStore.getState().inputs.down && useStore.getState().inputs.left
            ? (5 * pi) / 4
            : useStore.getState().inputs.down && useStore.getState().inputs.right
              ? (7 * pi) / 4
              : useStore.getState().inputs.up
                ? pi / 2
                : useStore.getState().inputs.down
                  ? (3 * pi) / 2
                  : useStore.getState().inputs.left
                    ? pi
                    : useStore.getState().inputs.right
                      ? 0
                      : null

    if (angle === null) {
      player.tra.pos.velX = 0
      player.tra.pos.velY = 0
      return
    }

    // Logic taken from Mini Mana

    const desiredPosX = player.tra.pos.x + Math.cos(angle) * PLAYER_RADIUS * 0.8
    const desiredPosY = player.tra.pos.y + Math.sin(angle) * PLAYER_RADIUS * 0.8

    player.dcBody.setPosition(desiredPosX, desiredPosY)

    let collided = false

    dcZone.dcZone.system.checkOne(player.dcBody, res => {
      const { a, overlapV } = res
      const correctedPosX = a.x - overlapV.x
      const correctedPosY = a.y - overlapV.y

      player.dcBody?.setPosition(correctedPosX, correctedPosY)

      collided = true

      return false // Keep checking for more collisions (corner of obstacle + door for instance)
    })

    if (collided) {
      const dirX = player.dcBody.x - player.tra.pos.x
      const dirY = player.dcBody.y - player.tra.pos.y
      const dirLength = Math.sqrt(dirX * dirX + dirY * dirY)
      const dirNormX = dirX / dirLength
      const dirNormY = dirY / dirLength

      const correctedOverlap =
        dcZone.dcZone.system.response.overlap < 1 ? dcZone.dcZone.system.response.overlap : 0.2

      player.tra.pos.velX = dirNormX * PLAYER_SPEED * (1 - correctedOverlap)
      player.tra.pos.velY = dirNormY * PLAYER_SPEED * (1 - correctedOverlap)
    } else {
      const dirX = desiredPosX - player.tra.pos.x
      const dirY = desiredPosY - player.tra.pos.y
      const dirLength = Math.sqrt(dirX * dirX + dirY * dirY)
      const dirNormX = dirX / dirLength
      const dirNormY = dirY / dirLength

      player.tra.pos.velX = dirNormX * PLAYER_SPEED
      player.tra.pos.velY = dirNormY * PLAYER_SPEED
    }
  })

  return null
}

export default MovementSystem
