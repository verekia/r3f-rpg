import { ECS } from '#/ecs/world'

const Enemy = () => (
  <ECS.Component name="three">
    <mesh castShadow>
      <boxGeometry />
      <meshLambertMaterial color="red" />
    </mesh>
  </ECS.Component>
)

export default Enemy
