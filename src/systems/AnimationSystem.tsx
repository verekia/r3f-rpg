import { useFrame } from '@react-three/fiber'

import { players } from '#/world'

const AnimationSystem = () => {
  useFrame(() => {
    const [player] = players

    if (!player) {
      return
    }

    const previousAnimation = player.animation

    if (player.tra.pos.velX || player.tra.pos.velY) {
      player.animation = 'Running'
    } else {
      player.animation = 'Idle'
    }

    if (previousAnimation !== player.animation) {
      player.reactRef.current.rerender()
    }
  })

  return null
}

export default AnimationSystem
