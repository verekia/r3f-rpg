import { useEffect } from 'react'

import Camera from '#/components/Camera'
import Enemy from '#/components/Enemy'
import Player from '#/components/Player'
import { pi } from '#/lib/util'
import {
  cameras,
  createCamera,
  createEnemy,
  createPlayer,
  ECS,
  enemies,
  players,
  world,
} from '#/world'

const ForestScene = () => {
  useEffect(() => {
    createPlayer({ pos: { x: -2, y: 0, z: 0 }, rot: { x: 0, y: 0, z: 0 }, sca: {} })
    createEnemy({ pos: { x: 2, y: 0, z: 0 }, rot: { x: 0, y: 0, z: 0 }, sca: {} })
    createEnemy({ pos: { x: 2, y: 2, z: 0 }, rot: { x: 0, y: 0, z: 0 }, sca: {} })
    createEnemy({ pos: { x: 2, y: -2, z: 0 }, rot: { x: 0, y: 0, z: 0 }, sca: {} })
    createCamera({ pos: { x: 0, y: 0, z: 10 }, rot: { x: -pi / 2, y: 0, z: 0 }, sca: {} })

    return () => world.clear()
  }, [])

  return (
    <>
      <ambientLight intensity={3} />
      <directionalLight position={[10, 10, 10]} intensity={3} castShadow />
      <ECS.Entities in={enemies} children={Enemy} />
      <ECS.Entities in={players} children={Player} />
      <ECS.Entities in={cameras} children={Camera} />
      <mesh rotation-x={-pi / 2} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshLambertMaterial color="green" />
      </mesh>
    </>
  )
}

export default ForestScene
