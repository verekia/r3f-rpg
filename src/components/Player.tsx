import { ECS, Entity } from '#/world'

const Player = (props: Entity) => {
  return (
    <ECS.Component name="three">
      <mesh>
        <boxGeometry />
        <meshBasicMaterial color="blue" />
      </mesh>
    </ECS.Component>
  )
}

export default Player
