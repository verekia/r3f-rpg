import { useFrame } from '@react-three/fiber'
import { cos, lerp, mp, pi, sin } from 'manapotion'

import { DEFAULT_CAMERA_ROT_X } from '#/lib/constants'
import { cameras, players } from '#/world'

const Z_OFFSET = 3
const CAMERA_DISTANCE_FROM_PLAYER = 4

const CameraFollowSystem = () => {
  useFrame(() => {
    const { isPointerLocked, isLeftMouseDown, isRightMouseDown, canHover } = mp()
    const [player] = players
    const [camera] = cameras

    if (!player || !camera) {
      return
    }

    if (!canHover) {
      camera.tra.pos.x =
        player.tra.pos.x + cos(camera.tra.rot.z - pi / 2) * CAMERA_DISTANCE_FROM_PLAYER
      camera.tra.pos.y =
        player.tra.pos.y + sin(camera.tra.rot.z - pi / 2) * CAMERA_DISTANCE_FROM_PLAYER

      camera.tra.pos.z = Z_OFFSET
      camera.tra.rot.x = DEFAULT_CAMERA_ROT_X
      return
    }

    if (isPointerLocked && isRightMouseDown) {
      camera.tra.pos.x = player.tra.pos.x + cos(player.tra.rot.z - pi) * CAMERA_DISTANCE_FROM_PLAYER
      camera.tra.pos.y = player.tra.pos.y + sin(player.tra.rot.z - pi) * CAMERA_DISTANCE_FROM_PLAYER

      camera.tra.rot.z = player.tra.rot.z - pi / 2

      // camera.tra.pos.x =
      //   player.tra.pos.x +
      //   cos(player.tra.rot.z - pi) * CAMERA_DISTANCE_FROM_PLAYER * sin(camera.tra.rot.x)

      // camera.tra.pos.y =
      //   player.tra.pos.y +
      //   CAMERA_DISTANCE_FROM_PLAYER * sin(camera.tra.rot.x) * sin(player.tra.rot.z - pi)

      // camera.tra.pos.z = player.tra.pos.z + CAMERA_DISTANCE_FROM_PLAYER * cos(camera.tra.rot.x)

      return
    }

    if (isPointerLocked && isLeftMouseDown) {
      camera.tra.pos.x =
        player.tra.pos.x + cos(camera.tra.rot.z - pi / 2) * CAMERA_DISTANCE_FROM_PLAYER
      camera.tra.pos.y =
        player.tra.pos.y + sin(camera.tra.rot.z - pi / 2) * CAMERA_DISTANCE_FROM_PLAYER

      camera.tra.pos.z = Z_OFFSET
      camera.tra.rot.x = DEFAULT_CAMERA_ROT_X

      return
    }

    // Normal case
    if (!isPointerLocked && canHover) {
      // There is something weird with this lerp and rot Z
      camera.tra.rot.z = lerp(camera.tra.rot.z, player.tra.rot.z, 0.5) - pi / 4

      camera.tra.rot.x = lerp(camera.tra.rot.x!, DEFAULT_CAMERA_ROT_X, 0.1)
      camera.tra.pos.z = lerp(camera.tra.pos.z!, Z_OFFSET, 0.1)
      camera.tra.pos.x = lerp(
        camera.tra.pos.x,
        player.tra.pos.x - cos(player.tra.rot.z) * CAMERA_DISTANCE_FROM_PLAYER,
        0.5,
      )

      camera.tra.pos.y = lerp(
        camera.tra.pos.y,
        player.tra.pos.y - sin(player.tra.rot.z) * CAMERA_DISTANCE_FROM_PLAYER,
        0.5,
      )
    }
  })

  return null
}

export default CameraFollowSystem
