/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.0 island.glb -t -T 
Files: island.glb [76.88KB] > /Users/verekia/Local/Code/r3f-rpg/public/models/island/island-transformed.glb [6.53KB] (92%)
*/

import { useEffect } from 'react'

import { useGLTF } from '@react-three/drei'
import { BufferAttribute, BufferGeometry, Mesh, MeshBasicMaterial, Vector3 } from 'three'
import { GLTF } from 'three-stdlib'

import useStore from '#/core/store'

type GLTFResult = GLTF & {
  nodes: {
    Ground: THREE.Mesh
  }
  materials: {
    PaletteMaterial001: THREE.MeshStandardMaterial
  }
}

export function Model(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('/models/island/island-transformed.glb') as GLTFResult

  const navmesh = useStore(s => s.navmesh)
  const setNavmesh = useStore(s => s.setNavmesh)

  useEffect(() => {
    const geometry = nodes.Ground.geometry

    if (!geometry.hasAttribute('normal')) {
      geometry.computeVertexNormals()
    }

    const positionAttribute = geometry.getAttribute('position')
    const normalAttribute = geometry.getAttribute('normal')
    const indexAttribute = geometry.getIndex()

    const navmeshIndices = []
    const upVector = new Vector3(0, 1, 0)

    // NOTE: This actually doesn't work. render the navmesh to see that it includes steep faces.

    // Set your desired steepness threshold (45 degrees in this case)
    const steepnessThreshold = Math.cos(Math.PI)

    for (let i = 0; i < indexAttribute.count; i += 3) {
      const idxA = indexAttribute.getX(i)
      const idxB = indexAttribute.getX(i + 1)
      const idxC = indexAttribute.getX(i + 2)

      const normal = new Vector3(
        normalAttribute.getX(i),
        normalAttribute.getY(i),
        normalAttribute.getZ(i),
      )

      // Calculate the dot product of the triangle's normal with the up vector
      const dotProduct = normal.dot(upVector)

      // console.log({ dotProduct, steepnessThreshold })

      // Filter out triangles steeper than the threshold
      if (dotProduct < steepnessThreshold) continue

      navmeshIndices.push([idxA, idxB, idxC])
    }

    const navmeshGeometry = new BufferGeometry()
    const flatNavmeshIndices = navmeshIndices.flat()
    const navmeshIndexAttribute = new BufferAttribute(new Uint32Array(flatNavmeshIndices), 1)

    navmeshGeometry.setAttribute('position', positionAttribute)
    navmeshGeometry.setIndex(navmeshIndexAttribute)

    const navmeshMaterial = new MeshBasicMaterial({ color: 0xff0000, wireframe: true })
    const newNavmesh = new Mesh(navmeshGeometry, navmeshMaterial)

    navmeshGeometry.computeBoundingBox()
    navmeshGeometry.computeBoundingSphere()

    setNavmesh(newNavmesh)
  }, [nodes.Ground.geometry, setNavmesh])

  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Ground.geometry}>
        <meshLambertMaterial map={materials.PaletteMaterial001.map} />
      </mesh>
      {/* {navmesh && <primitive object={navmesh} />} */}
    </group>
  )
}

useGLTF.preload('/models/island/island-transformed.glb')
