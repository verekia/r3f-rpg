import { useEffect } from 'react'

import { pi } from 'manapotion'

import Camera from '#/components/Camera'
import Enemy from '#/components/Enemy'
import Player from '#/components/Player'
import ForestModel from '#/models/ForestModel'
import ForestNavmesh from '#/models/ForestNavmesh'
import ForestObstacles from '#/models/ForestObstacles'
import ForestObstaclesVertices from '#/models/ForestObstaclesVertices'
import {
  cameras,
  createCamera,
  createEnemy,
  createPlayer,
  dcZones,
  ECS,
  enemies,
  players,
  world,
} from '#/world'

const ForestScene = () => {
  useEffect(() => {
    const player = createPlayer({ pos: { x: 0, y: 0, z: 0.5 }, rot: { x: 0, y: 0, z: 0 }, sca: {} })

    const [dcZone] = dcZones
    // The DC system might not be ready yet
    if (dcZone) {
      dcZone.dcZone.system.insert(player.dcBody)
    }

    createCamera({ pos: { x: 0, y: -4, z: 7 }, rot: { x: -pi / 3, y: 0, z: 0 }, sca: {} })
    createEnemy({ pos: { x: -2, y: 5, z: 0.5 }, rot: { x: 0, y: 0, z: 0 }, sca: {} })
    createEnemy({ pos: { x: 5, y: -1, z: 0.5 }, rot: { x: 0, y: 0, z: 0 }, sca: {} })
    createEnemy({ pos: { x: -4, y: -4, z: 0.5 }, rot: { x: 0, y: 0, z: 0 }, sca: {} })

    return () => world.clear()
  }, [])

  return (
    <>
      <ambientLight intensity={3} />
      <directionalLight position={[10, 10, 10]} intensity={3} castShadow />
      <ECS.Entities in={enemies} children={Enemy} />
      <ECS.Entities in={players} children={Player} />
      <ECS.Entities in={cameras} children={Camera} />
      <ForestModel />
      <ForestNavmesh />
      <ForestObstacles />
      <ForestObstaclesVertices />
    </>
  )
}

export default ForestScene
