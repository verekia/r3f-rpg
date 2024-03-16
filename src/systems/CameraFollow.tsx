import { useFrame } from '@react-three/fiber'
import { cos, mp, pi, sin } from 'manapotion'

import { DEFAULT_CAMERA_ROT_X } from '#/lib/constants'
import { cameras, players } from '#/world'

const Z_OFFSET = 3
const RADIUS_FROM_PLAYER = 3.8

const CameraFollowSystem = () => {
  useFrame(() => {
    const { isPointerLocked, isLeftMouseDown, isRightMouseDown, canHover } = mp()
    const [player] = players
    const [camera] = cameras

    if (!player || !camera) {
      return
    }

    if (!canHover) {
      camera.tra.pos.x = player.tra.pos.x + cos(camera.tra.rot.z - pi / 2) * RADIUS_FROM_PLAYER
      camera.tra.pos.y = player.tra.pos.y + sin(camera.tra.rot.z - pi / 2) * RADIUS_FROM_PLAYER

      camera.tra.pos.z = Z_OFFSET
      camera.tra.rot.x = DEFAULT_CAMERA_ROT_X
      return
    }

    if (isPointerLocked && isRightMouseDown) {
      camera.tra.pos.x = player.tra.pos.x + cos(player.tra.rot.z - pi) * RADIUS_FROM_PLAYER
      camera.tra.pos.y = player.tra.pos.y + sin(player.tra.rot.z - pi) * RADIUS_FROM_PLAYER

      camera.tra.rot.z = player.tra.rot.z - pi / 2

      // camera.tra.pos.x =
      //   player.tra.pos.x +
      //   cos(player.tra.rot.z - pi) * RADIUS_FROM_PLAYER * sin(camera.tra.rot.x)

      // camera.tra.pos.y =
      //   player.tra.pos.y +
      //   RADIUS_FROM_PLAYER * sin(camera.tra.rot.x) * sin(player.tra.rot.z - pi)

      // camera.tra.pos.z = player.tra.pos.z + RADIUS_FROM_PLAYER * cos(camera.tra.rot.x)

      return
    }

    if (isPointerLocked && isLeftMouseDown) {
      camera.tra.pos.x = player.tra.pos.x + cos(camera.tra.rot.z - pi / 2) * RADIUS_FROM_PLAYER
      camera.tra.pos.y = player.tra.pos.y + sin(camera.tra.rot.z - pi / 2) * RADIUS_FROM_PLAYER

      camera.tra.pos.z = Z_OFFSET
      camera.tra.rot.x = DEFAULT_CAMERA_ROT_X

      return
    }

    // Normal case
    if (!isPointerLocked && canHover) {
      camera.tra.rot.x = DEFAULT_CAMERA_ROT_X
      camera.tra.rot.z = player.tra.rot.z - pi / 2

      camera.tra.pos.x = player.tra.pos.x + cos(camera.tra.rot.z - pi / 2) * RADIUS_FROM_PLAYER
      camera.tra.pos.y = player.tra.pos.y + sin(camera.tra.rot.z - pi / 2) * RADIUS_FROM_PLAYER

      camera.tra.pos.z = player.tra.pos.z + RADIUS_FROM_PLAYER * cos(camera.tra.rot.x)
    }
  })

  return null
}

export default CameraFollowSystem
