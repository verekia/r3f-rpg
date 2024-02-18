import { ECS } from '#/world'

const Player = () => (
  <ECS.Component name="three">
    <mesh>
      <boxGeometry />
      <meshBasicMaterial color="blue" />
    </mesh>
  </ECS.Component>
)

export default Player
