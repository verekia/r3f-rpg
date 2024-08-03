/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from 'react'

import { useGLTF } from '@react-three/drei'

const Model = props => {
  const { nodes, materials } = useGLTF('/models/city/city-navmesh.glb')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Navmesh.geometry} material={nodes.Navmesh.material} name="city-navmesh">
        <meshBasicMaterial color="red" wireframe />
      </mesh>
    </group>
  )
}

useGLTF.preload('/models/city/city-navmesh.glb')

export default Model
