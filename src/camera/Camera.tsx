import { PerspectiveCamera } from '@react-three/drei'

import { ECS } from '#/ecs/world'

const Camera = () => (
  <ECS.Component name="three">
    <PerspectiveCamera makeDefault rotation-order="YXZ" />
  </ECS.Component>
)

export default Camera
