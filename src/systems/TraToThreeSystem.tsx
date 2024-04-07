import { useAnimationFrame } from '@manapotion/r3f'

import { STAGE_RENDER } from '#/lib/stages'
import { exists } from '#/lib/util'
import { world } from '#/world'

const TraToThreeSystem = () => {
  useAnimationFrame(
    () => {
      for (const e of world.with('tra', 'three')) {
        e.three.position.x = e.tra.pos.x
        e.three.position.z = -e.tra.pos.y
        exists(e.tra.pos.z) && (e.three.position.y = e.tra.pos.z!)

        exists(e.tra.rot.x) && (e.three.rotation.x = e.tra.rot.x!)
        exists(e.tra.rot.y) && (e.three.rotation.z = -e.tra.rot.y!)
        e.three.rotation.y = e.tra.rot.z

        if (exists(e.tra.sca.all)) {
          e.three.scale.x = e.tra.sca.all!
          e.three.scale.y = e.tra.sca.all!
          e.three.scale.z = e.tra.sca.all!
        } else {
          exists(e.tra.sca.x) && (e.three.scale.x = e.tra.sca.x!)
          exists(e.tra.sca.y) && (e.three.scale.z = e.tra.sca.y!)
          exists(e.tra.sca.z) && (e.three.scale.y = e.tra.sca.z!)
        }
      }
    },
    { stage: STAGE_RENDER },
  )

  return null
}

export default TraToThreeSystem
