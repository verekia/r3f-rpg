import { ECS } from '#/world'

const Player = () => (
  <ECS.Component name="three">
    <mesh castShadow>
      <boxGeometry />
      <meshLambertMaterial color="blue" />
    </mesh>
  </ECS.Component>
)

export default Player
