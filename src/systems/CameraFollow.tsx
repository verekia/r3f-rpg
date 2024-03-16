import { useFrame } from '@react-three/fiber'
import { cos, mp, pi, sin } from 'manapotion'

import { DEFAULT_CAMERA_ROT_X } from '#/lib/constants'
import { cameras, players } from '#/world'

const HEAD = 1.8
const RADIUS = 3.8 // from player

const CameraFollowSystem = () => {
  useFrame(() => {
    const { isPointerLocked, isRightMouseDown, canHover } = mp()
    const [player] = players
    const [camera] = cameras

    if (!player || !camera) {
      return
    }

    camera.tra.pos.z = player.tra.pos.z + HEAD + RADIUS * sin(-camera.tra.rot.x)

    const isLockedBehind = (isPointerLocked && isRightMouseDown) || (!isPointerLocked && canHover)

    if (isLockedBehind) {
      camera.tra.rot.z = player.tra.rot.z - pi / 2
      // camera.tra.rot.x = DEFAULT_CAMERA_ROT_X
    }

    camera.tra.pos.x =
      player.tra.pos.x + RADIUS * cos(camera.tra.rot.z - pi / 2) * cos(-camera.tra.rot.x)
    camera.tra.pos.y =
      player.tra.pos.y + RADIUS * sin(camera.tra.rot.z - pi / 2) * cos(-camera.tra.rot.x)
  })

  return null
}

export default CameraFollowSystem
