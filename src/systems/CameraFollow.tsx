import { getBrowser, getMouse } from '@manapotion/r3f'
import { useFrame } from '@react-three/fiber'

import { cameras, players } from '#/world'

const { PI: pi, cos, sin } = Math

const HEAD = 1.6
const RADIUS = 3.8 // from player

const CameraFollowSystem = () => {
  useFrame(() => {
    const mouse = getMouse()
    const { isDesktop } = getBrowser()

    const [player] = players
    const [camera] = cameras

    if (!player || !camera) {
      return
    }

    camera.tra.pos.z = player.tra.pos.z + HEAD + RADIUS * sin(-camera.tra.rot.x)

    const isLockedBehind = (mouse.locked && mouse.buttons.right) || (!mouse.locked && isDesktop)

    if (isLockedBehind) {
      camera.tra.rot.z = player.tra.rot.z - pi / 2
    }

    camera.tra.pos.x =
      player.tra.pos.x + RADIUS * cos(camera.tra.rot.z - pi / 2) * cos(-camera.tra.rot.x)
    camera.tra.pos.y =
      player.tra.pos.y + RADIUS * sin(camera.tra.rot.z - pi / 2) * cos(-camera.tra.rot.x)
  })

  return null
}

export default CameraFollowSystem
