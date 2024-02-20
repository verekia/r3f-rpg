import { useImperativeHandle, useRef, useState } from 'react'

import PlayerModel from '#/models/PlayerModel'
import { ECS, Entity } from '#/world'

const Player = ({ animation }: Entity) => {
  const [, rerender_] = useState({})
  const ref = useRef<any>(null)

  useImperativeHandle(ref, () => ({ rerender: () => rerender_({}) }), [])

  return (
    <>
      <ECS.Component name="three">
        <group scale={0.2}>
          <PlayerModel action={animation!} />
        </group>
      </ECS.Component>
      <ECS.Component name="reactRef" data={ref} />
    </>
  )
}

export default Player
