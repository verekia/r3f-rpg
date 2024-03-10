/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 forest.glb --transform -t 
Files: forest.glb [46.84KB] > /Users/verekia/Local/Code/r3f-rpg/public/models/forest/forest-transformed.glb [4.87KB] (90%)
*/

import { useGLTF } from '@react-three/drei'

import { paletteMaterial } from '#/lib/materials'

import type { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    Ground: THREE.Mesh
  }
  materials: {
    Palette: THREE.MeshStandardMaterial
  }
}

const path = '/models/forest/forest-transformed.glb'

const ForestModel = (props: JSX.IntrinsicElements['group']) => {
  const { nodes } = useGLTF(path) as GLTFResult

  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Ground.geometry} material={paletteMaterial} scale={25}></mesh>
    </group>
  )
}

useGLTF.preload(path)

export default ForestModel
