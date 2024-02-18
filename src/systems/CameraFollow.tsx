import { useFrame } from '@react-three/fiber'

import { cameras, players } from '#/world'

const Y_OFFSET = -4
const RECT_WIDTH = 1.5
const RECT_HEIGHT = 1
const CATCH_UP_SPEED = 4

const CameraFollowSystem = () => {
  useFrame((_, dt) => {
    const [player] = players
    const [camera] = cameras

    if (!player) {
      return
    }

    const dx = player.tra.pos.x - camera.tra.pos.x
    const dy = player.tra.pos.y - camera.tra.pos.y + Y_OFFSET

    const speedX = Math.max(0, Math.abs(dx) - RECT_WIDTH / 2) * dt * CATCH_UP_SPEED
    const speedY = Math.max(0, Math.abs(dy) - RECT_HEIGHT / 2) * dt * CATCH_UP_SPEED

    if (speedX > 0 || speedY > 0) {
      camera.tra.pos.x += Math.sign(dx) * speedX
      camera.tra.pos.y += Math.sign(dy) * speedY
    }
  })

  return null
}

export default CameraFollowSystem
