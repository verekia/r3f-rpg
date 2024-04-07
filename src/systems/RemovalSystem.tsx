import { useAnimationFrame } from '@manapotion/r3f'

import { STAGE_CLEANUP } from '#/lib/stages'
import { markForRemoval, world } from '#/world'

const RemovalSystem = () => {
  useAnimationFrame(
    ({ delta }) => {
      for (const e of world.with('removalTimer')) {
        e.removalTimer -= delta
        if (e.removalTimer <= 0) {
          markForRemoval(e)
        }
      }

      for (const e of world.with('toBeRemoved')) {
        world.remove(e)
      }
    },
    { stage: STAGE_CLEANUP },
  )

  return null
}

export default RemovalSystem
