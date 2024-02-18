import { useFrame } from '@react-three/fiber'

import { PLAYER_SPEED } from '#/lib/constants'
import useStore from '#/store'
import { players } from '#/world'

const MovementSystem = () => {
  useFrame(() => {
    const [player] = players
    if (useStore.getState().inputs.up) {
      player.tra.pos.velY = PLAYER_SPEED
    } else if (useStore.getState().inputs.down) {
      player.tra.pos.velY = -PLAYER_SPEED
    } else {
      player.tra.pos.velY = 0
    }
    if (useStore.getState().inputs.left) {
      player.tra.pos.velX = -PLAYER_SPEED
    } else if (useStore.getState().inputs.right) {
      player.tra.pos.velX = PLAYER_SPEED
    } else {
      player.tra.pos.velX = 0
    }
  })

  return null
}

export default MovementSystem
