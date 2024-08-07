import { ECS, Entity } from '#/ecs/world'
import { Model as PlayerModel } from '#/player/NewPlayerModel'

const Player = ({ player }: Entity) => {
  // Alternatively, watch for changes in a player.animation non-reactive value
  // That worked well for the version version of the game and is probably not
  // that expensive. This lets me keep the world and systems Zustand-free.
  const animation = player?.usePlayerStore((state: any) => state.animation)
  const weapon = player?.usePlayerStore((state: any) => state.weapon)
  // const modelRotZ = player?.usePlayerStore((state: any) => state.modelRotZ)

  return (
    <ECS.Component name="three">
      <group scale={0.2}>
        <PlayerModel action={animation} /*modelRotZ={modelRotZ}*/ weapon={weapon} />
      </group>
    </ECS.Component>
  )
}

export default Player
