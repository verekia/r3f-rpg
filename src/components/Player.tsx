import PlayerModel from '#/models/PlayerModel'
import { ECS, Entity } from '#/world'

const Player = ({ player }: Entity) => {
  const animation = player?.usePlayerStore((state: any) => state.animation)

  return (
    <ECS.Component name="three">
      <group scale={0.2}>
        <PlayerModel action={animation} />
      </group>
    </ECS.Component>
  )
}

export default Player
