import { useFrame } from '@react-three/fiber'
import { lerp, mp, pi } from 'manapotion'

import { DEFAULT_CAMERA_ROT_X } from '#/lib/constants'
import { cameras, players } from '#/world'

const Z_OFFSET = 3
const CAMERA_DISTANCE_FROM_PLAYER = 4
const HEIGHT_ADJUSTMENT_FACTOR = 2
const DISTANCE_ADJUSTMENT_FACTOR = -3

const adjustHeightBasedOnPitch = (pitch: number, baseHeight: number, adjustmentFactor: number) =>
  baseHeight + Math.sin(-pitch) * adjustmentFactor

const adjustDistanceBasedOnPitch = (
  pitch: number,
  baseDistance: number,
  adjustmentFactor: number,
) => baseDistance + Math.sin(-pitch) * adjustmentFactor

const CameraFollowSystem = () => {
  useFrame(() => {
    const [player] = players
    const [camera] = cameras

    if (!player || !camera) {
      return
    }

    // There is something weird with this lerp and rot Z
    camera.tra.rot.z = lerp(camera.tra.rot.z, player.tra.rot.z, 0.5) - pi / 4

    camera.tra.rot.y = lerp(camera.tra.rot.y!, 0, 0.1)

    if (mp().isPointerLocked) {
      // if (useStore.getState().controls.manualRotX) {
      //   camera.tra.rot.x! = lerp(
      //     camera.tra.rot.x!,
      //     camera.tra.rot.x! + useStore.getState().controls.manualRotX!,
      //     0.1,
      //   )
      // }
      // const adjustedZOffset = adjustHeightBasedOnPitch(
      //   camera.tra.rot.x!,
      //   Z_OFFSET,
      //   HEIGHT_ADJUSTMENT_FACTOR,
      // )
      // const adjustedDistanceFromPlayer = adjustDistanceBasedOnPitch(
      //   camera.tra.rot.x!,
      //   DISTANCE_FROM_PLAYER,
      //   DISTANCE_ADJUSTMENT_FACTOR,
      // )
      // camera.tra.pos.z = lerp(camera.tra.pos.z!, adjustedZOffset, 0.1)
      // camera.tra.pos.x = lerp(
      //   camera.tra.pos.x,
      //   player.tra.pos.x - Math.cos(player.tra.rot.z) * adjustedDistanceFromPlayer,
      //   0.5,
      // )
      // camera.tra.pos.y = lerp(
      //   camera.tra.pos.y,
      //   player.tra.pos.y - Math.sin(player.tra.rot.z) * adjustedDistanceFromPlayer,
      //   0.5,
      // )
    } else {
    }
    camera.tra.rot.x = lerp(camera.tra.rot.x!, DEFAULT_CAMERA_ROT_X, 0.1)
    camera.tra.pos.z = lerp(camera.tra.pos.z!, Z_OFFSET, 0.1)
    camera.tra.pos.x = lerp(
      camera.tra.pos.x,
      player.tra.pos.x - Math.cos(player.tra.rot.z) * CAMERA_DISTANCE_FROM_PLAYER,
      0.5,
    )

    camera.tra.pos.y = lerp(
      camera.tra.pos.y,
      player.tra.pos.y - Math.sin(player.tra.rot.z) * CAMERA_DISTANCE_FROM_PLAYER,
      0.5,
    )
  })

  return null
}

export const cameraUTurn = () => {
  const [player] = players
  const [camera] = cameras

  if (!player || !camera) {
    return
  }

  // Duplicated from above
  camera.tra.pos.x = player.tra.pos.x - Math.cos(player.tra.rot.z) * CAMERA_DISTANCE_FROM_PLAYER
  camera.tra.pos.y = player.tra.pos.y - Math.sin(player.tra.rot.z) * CAMERA_DISTANCE_FROM_PLAYER

  // This needs a tweak to match exactly the normal camera follow
  camera.tra.rot.z = player.tra.rot.z - pi / 4
}

export default CameraFollowSystem
