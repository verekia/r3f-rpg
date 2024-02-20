import { useEffect } from 'react'

import { useGLTF } from '@react-three/drei'
import { System } from 'detect-collisions'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

import { dcBodies, world } from '#/world'

type GLTFResult = GLTF & {
  nodes: {
    Obstacles: THREE.Mesh
  }
  materials: {
    Palette: THREE.MeshStandardMaterial
  }
}

const path = '/models/forest/forest-obstacles-transformed.glb'

const ForestObstacles = () => {
  const { nodes } = useGLTF(path) as GLTFResult

  useEffect(() => {
    const positionsArray = []
    const positions = nodes.Obstacles.geometry.attributes.position.array

    for (let i = 0; i < positions.length; i += 3) {
      positionsArray.push({ x: positions[i], y: positions[i + 1] })
    }

    // console.log(positionsArray)

    const system = new System()
    const obstaclesPolygon = system.createPolygon(
      { x: 0, y: 0 },
      [
        { x: 10, y: 10 },
        { x: 10, y: 13 },
        { x: 13, y: 13 },
        { x: 13, y: 10 },
      ],
      { isStatic: true },
    )
    const dcZone = world.add({ dcZone: { system, obstaclesPolygon } })

    for (const e of dcBodies) {
      system.insert(e.dcBody)
    }

    return () => {
      system.clear()
      world.remove(dcZone)
    }
  }, [])

  return null
  // return (
  //   <group {...props} dispose={null}>
  //     <mesh
  //       geometry={nodes.Obstacles.geometry}
  //       material={materials.Palette}
  //       position={[0.6, 0.001, 0]}
  //       scale={6.7}
  //     />
  //   </group>
  // )
}

useGLTF.preload(path)

export default ForestObstacles
