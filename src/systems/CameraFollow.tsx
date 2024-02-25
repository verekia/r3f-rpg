import { useFrame } from '@react-three/fiber'

import { lerp, pi } from '#/lib/util'
import { cameras, players } from '#/world'

const Z_OFFSET = 3
const DISTANCE_FROM_PLAYER = 4
const VERTICAL_ANGLE = -0.35

const CameraFollowSystem = () => {
  useFrame(() => {
    const [player] = players
    const [camera] = cameras

    if (!player || !camera) {
      return
    }

    camera.tra.pos.x = lerp(
      camera.tra.pos.x,
      player.tra.pos.x - Math.cos(player.tra.rot.z) * DISTANCE_FROM_PLAYER,
      0.5,
    )

    camera.tra.pos.y = lerp(
      camera.tra.pos.y,
      player.tra.pos.y - Math.sin(player.tra.rot.z) * DISTANCE_FROM_PLAYER,
      0.5,
    )

    camera.tra.pos.z = lerp(camera.tra.pos.z!, Z_OFFSET, 0.1)
    camera.tra.rot.z = lerp(camera.tra.rot.z, player.tra.rot.z, 0.5) - pi / 4
    camera.tra.rot.x = lerp(camera.tra.rot.x!, VERTICAL_ANGLE, 0.1)
    camera.tra.rot.y = lerp(camera.tra.rot.y!, 0, 0.1)
  })

  return null
}

export default CameraFollowSystem
