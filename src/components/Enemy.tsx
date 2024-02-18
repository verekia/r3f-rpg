import { ECS, Entity } from '#/world'

const Enemy = (props: Entity) => {
  return (
    <ECS.Component name="three">
      <mesh>
        <boxGeometry />
        <meshBasicMaterial color="red" />
      </mesh>
    </ECS.Component>
  )
}

export default Enemy
