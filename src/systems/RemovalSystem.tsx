import { useFrame } from '@react-three/fiber'

import { markForRemoval, world } from '#/world'

const RemovalSystem = () => {
  useFrame((_, dt) => {
    for (const e of world.with('removalTimer')) {
      e.removalTimer -= dt
      if (e.removalTimer <= 0) {
        markForRemoval(e)
      }
    }

    for (const e of world.with('toBeRemoved')) {
      world.remove(e)
    }
  })

  return null
}

export default RemovalSystem
