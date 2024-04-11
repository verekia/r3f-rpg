import { useEffect } from 'react'

import Camera from '#/camera/Camera'
import { DEFAULT_CAMERA_ROT_X } from '#/camera/camera-constants'
import { cameras, createCamera } from '#/camera/cameras-ecs'
import { ECS, world } from '#/ecs/world'
import { createEnemy, enemies } from '#/enemy/enemies-ecs'
import Enemy from '#/enemy/Enemy'
import { dcZones } from '#/physics/physics-ecs'
import Player from '#/player/Player'
import { createPlayer, players } from '#/player/players-ecs'
import ForestModel from '#/scenes/ForestModel'

const ForestScene = () => {
  useEffect(() => {
    const player = createPlayer({ pos: { x: 0, y: 0, z: 0.5 }, rot: { x: 0, y: 0, z: 0 }, sca: {} })

    const [dcZone] = dcZones
    // The DC system might not be ready yet
    if (dcZone) {
      dcZone.dcZone.system.insert(player.dcBody)
    }

    createCamera({
      pos: { x: 0, y: -4, z: 7 },
      rot: { x: DEFAULT_CAMERA_ROT_X, y: 0, z: 0 },
      sca: {},
    })
    createEnemy({ pos: { x: -2, y: 5, z: 0.5 }, rot: { x: 0, y: 0, z: 0 }, sca: {} })
    createEnemy({ pos: { x: 5, y: -1, z: 0.5 }, rot: { x: 0, y: 0, z: 0 }, sca: {} })
    createEnemy({ pos: { x: -4, y: -4, z: 0.5 }, rot: { x: 0, y: 0, z: 0 }, sca: {} })

    return () => world.clear()
  }, [])

  return (
    <>
      <ambientLight intensity={3} />
      <directionalLight position={[10, 10, 10]} intensity={3} castShadow />
      <ECS.Entities in={enemies}>{Enemy}</ECS.Entities>
      <ECS.Entities in={players}>{Player}</ECS.Entities>
      <ECS.Entities in={cameras}>{Camera}</ECS.Entities>
      <ForestModel />
      {/* <ForestNavmesh /> */}
      {/* <ForestObstacles /> */}
      {/* <ForestObstaclesVertices /> */}
    </>
  )
}

export default ForestScene
