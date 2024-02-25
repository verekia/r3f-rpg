import { useFrame } from '@react-three/fiber'

import { DEFAULT_CAMERA_ROT_X } from '#/lib/constants'
import { lerp, pi } from '#/lib/util'
import { useInputStore } from '#/stores/inputs'
import { cameras, players } from '#/world'

const Z_OFFSET = 3
const DISTANCE_FROM_PLAYER = 4
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

    camera.tra.rot.z = lerp(camera.tra.rot.z, player.tra.rot.z, 0.5) - pi / 4
    camera.tra.rot.y = lerp(camera.tra.rot.y!, 0, 0.1)

    if (useInputStore.getState().inputs.pointerLock) {
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
      player.tra.pos.x - Math.cos(player.tra.rot.z) * DISTANCE_FROM_PLAYER,
      0.5,
    )

    camera.tra.pos.y = lerp(
      camera.tra.pos.y,
      player.tra.pos.y - Math.sin(player.tra.rot.z) * DISTANCE_FROM_PLAYER,
      0.5,
    )
  })

  return null
}

export default CameraFollowSystem
