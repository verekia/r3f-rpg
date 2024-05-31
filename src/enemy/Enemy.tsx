import { ECS } from '#/ecs/world'

const Enemy = () => (
  <ECS.Component name="three">
    <mesh castShadow>
      <boxGeometry />
      <meshToonMaterial color="red" />
    </mesh>
  </ECS.Component>
)

export default Enemy
