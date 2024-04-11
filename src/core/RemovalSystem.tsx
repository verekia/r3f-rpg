import { useMainLoop } from '@manapotion/react'

import { STAGE_CLEANUP } from '#/core/core-constants'
import { markForRemoval, world } from '#/ecs/world'

const RemovalSystem = () => {
  useMainLoop(
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
