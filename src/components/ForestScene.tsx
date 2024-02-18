import { useEffect } from 'react'

import Camera from '#/components/Camera'
import Enemy from '#/components/Enemy'
import Player from '#/components/Player'
import { pi } from '#/lib/util'
import { cameras, createCamera, createEnemy, createPlayer, ECS, enemies, players } from '#/world'

const ForestScene = () => {
  useEffect(() => {
    createPlayer({ pos: { x: -2, y: 0, z: 0 }, rot: { x: 0, y: 0, z: 0 }, sca: {} })
    createEnemy({ pos: { x: 2, y: 0, z: 0 }, rot: { x: 0, y: 0, z: 0 }, sca: {} })
    createEnemy({ pos: { x: 2, y: 2, z: 0 }, rot: { x: 0, y: 0, z: 0 }, sca: {} })
    createEnemy({ pos: { x: 2, y: -2, z: 0 }, rot: { x: 0, y: 0, z: 0 }, sca: {} })
    createCamera({ pos: { x: 0, y: 0, z: 10 }, rot: { x: -pi / 2, y: 0, z: 0 }, sca: {} })
  }, [])

  return (
    <>
      <ambientLight intensity={Math.PI / 2} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
      <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
      <ECS.Entities in={enemies} children={Enemy} />
      <ECS.Entities in={players} children={Player} />
      <ECS.Entities in={cameras} children={Camera} />
    </>
  )
}

export default ForestScene
