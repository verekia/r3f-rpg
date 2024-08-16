import { useEffect } from 'react'

import { GradientTexture, GradientType } from '@react-three/drei'
import { BackSide } from 'three'

import Camera from '#/camera/Camera'
import { DEFAULT_CAMERA_ROT_X } from '#/camera/camera-constants'
import { cameras, createCamera } from '#/camera/cameras-ecs'
import { ECS, world } from '#/ecs/world'
import { createEnemy, enemies } from '#/enemy/enemies-ecs'
import Enemy from '#/enemy/Enemy'
import { dcZones } from '#/physics/physics-ecs'
import Player from '#/player/Player'
import { createPlayer, players } from '#/player/players-ecs'
import CityModel from '#/scenes/CityModel'
import CityNavmeshModel from '#/scenes/CityNavmeshModel'
import ForestModel from '#/scenes/ForestModel'
import { Model as IslandModel } from '#/scenes/IslandModel'

const ForestScene = () => {
  useEffect(() => {
    const player = createPlayer({
      pos: { x: 106, y: 8, z: 0.5 },
      rot: { x: 0, y: 0, z: 0 },
      sca: {},
    })

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
      <ambientLight intensity={1.6} />
      <directionalLight position={[10, 10, 10]} intensity={2.5} />

      {/* Doesn't work well with WebGPU */}
      <directionalLight
        position={[200, 160, -150]}
        intensity={6}
        castShadow
        // The map size doesn't get HMR, refresh page
        shadow-mapSize={[8192, 8192]}
        // shadow-bias={0.005}
      >
        <orthographicCamera attach="shadow-camera" args={[-75, 75, 75, -75]} near={50} far={250} />
      </directionalLight>
      {/* <ECS.Entities in={enemies}>{Enemy}</ECS.Entities> */}
      <ECS.Entities in={players}>{Player}</ECS.Entities>
      <ECS.Entities in={cameras}>{Camera}</ECS.Entities>
      <IslandModel />
      <mesh scale={1200} rotation-x={-Math.PI / 2} position-z={-100} position-x={100}>
        <circleGeometry />
        <meshBasicMaterial>
          <GradientTexture
            stops={[0, 0.2]}
            colors={['#187af2', '#239bfc']}
            size={2048}
            width={2048}
            // @ts-expect-error
            type={GradientType.Radial}
          />
        </meshBasicMaterial>
      </mesh>
      <mesh scale={1500} position-y={-10} position-z={-100} position-x={100}>
        <sphereGeometry args={[1, 32, 16, 0, 2 * Math.PI, 0, Math.PI / 2]} />
        <meshBasicMaterial side={BackSide}>
          <GradientTexture stops={[0.75, 1]} colors={['#1476ff', '#57d2ff']} />
        </meshBasicMaterial>
      </mesh>
      {/* <Sky sunPosition={[1, 1, 1]} rayleigh={1} /> */}
      {/* <CityNavmeshModel /> */}
      {/* <ForestNavmesh /> */}
      {/* <ForestObstacles /> */}
      {/* <ForestObstaclesVertices /> */}
    </>
  )
}

export default ForestScene
