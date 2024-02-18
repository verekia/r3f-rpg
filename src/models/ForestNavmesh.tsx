import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    Navmesh: THREE.Mesh
  }
  materials: {
    Palette: THREE.MeshStandardMaterial
  }
}

const path = '/models/forest/forest-navmesh-transformed.glb'

const ForestNavmesh = () => {
  const { nodes } = useGLTF(path) as GLTFResult

  console.log(nodes.Navmesh.geometry.attributes.position.array)

  return null

  // return (
  //   <group {...props} dispose={null}>
  //     <mesh
  //       geometry={nodes.Navmesh.geometry}
  //       material={materials.Palette}
  //       position={[0.6, 0.001, 0]}
  //       scale={6.7}
  //     />
  //   </group>
  // )
}

useGLTF.preload(path)

export default ForestNavmesh
