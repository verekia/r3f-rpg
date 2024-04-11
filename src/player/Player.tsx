import { ECS, Entity } from '#/ecs/world'
import PlayerModel from '#/player/PlayerModel'

const Player = ({ player }: Entity) => {
  const animation = player?.usePlayerStore((state: any) => state.animation)
  const modelRotZ = player?.usePlayerStore((state: any) => state.modelRotZ)

  return (
    <ECS.Component name="three">
      <group scale={0.2}>
        <PlayerModel action={animation} modelRotZ={modelRotZ} />
      </group>
    </ECS.Component>
  )
}

export default Player
