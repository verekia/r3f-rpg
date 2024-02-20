import { useFrame } from '@react-three/fiber'

import { players } from '#/world'

const AnimationSystem = () => {
  useFrame(() => {
    const [player] = players

    if (!player) {
      return
    }

    if (player.tra.pos.velX || player.tra.pos.velY) {
      player.player.usePlayerStore.getState().setAnimation('Running')
    } else {
      player.player.usePlayerStore.getState().setAnimation('Idle')
    }
  })

  return null
}

export default AnimationSystem
