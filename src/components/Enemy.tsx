import { ECS } from '#/world'

const Enemy = () => (
  <ECS.Component name="three">
    <mesh>
      <boxGeometry />
      <meshBasicMaterial color="red" />
    </mesh>
  </ECS.Component>
)

export default Enemy
