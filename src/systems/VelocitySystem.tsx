import { useAnimationFrame } from '@manapotion/react'

import { STAGE_PHYSICS } from '#/lib/stages'
import { exists } from '#/lib/util'
import { world } from '#/world'

const VelocitySystem = () => {
  useAnimationFrame(
    ({ delta: dt }) => {
      for (const e of world.with('tra')) {
        exists(e.tra.pos.velX) && (e.tra.pos.x += e.tra.pos.velX! * dt)
        exists(e.tra.pos.velY) && (e.tra.pos.y += e.tra.pos.velY! * dt)
        exists(e.tra.pos.velZ) && (e.tra.pos.z! += e.tra.pos.velZ! * dt)

        exists(e.tra.rot.velX) && (e.tra.rot.x! += e.tra.rot.velX! * dt)
        exists(e.tra.rot.velY) && (e.tra.rot.y! += e.tra.rot.velY! * dt)
        exists(e.tra.rot.velZ) && (e.tra.rot.z! += e.tra.rot.velZ! * dt)

        if (exists(e.tra.sca.velAll)) {
          e.tra.sca.x! += e.tra.sca.velAll! * dt
          e.tra.sca.y! += e.tra.sca.velAll! * dt
          e.tra.sca.z! += e.tra.sca.velAll! * dt
        } else {
          exists(e.tra.sca.velX) && (e.tra.sca.x! += e.tra.sca.velX! * dt)
          exists(e.tra.sca.velY) && (e.tra.sca.y! += e.tra.sca.velY! * dt)
          exists(e.tra.sca.velZ) && (e.tra.sca.z! += e.tra.sca.velZ! * dt)
        }
      }
    },
    { stage: STAGE_PHYSICS },
  )

  return null
}

export default VelocitySystem
