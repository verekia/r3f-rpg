import { PerspectiveCamera } from '@react-three/drei'

import { ECS, Entity } from '#/world'

const Camera = (props: Entity) => {
  return (
    <ECS.Component name="three">
      <PerspectiveCamera makeDefault />
    </ECS.Component>
  )
}

export default Camera
