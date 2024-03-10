import { useEffect, useRef } from 'react'

import { useAnimations, useGLTF } from '@react-three/drei'
import { pi } from 'manapotion'
import { GLTF } from 'three-stdlib'

import type { Group, Mesh } from 'three'

type GLTFResult = GLTF & {
  nodes: {
    Body: THREE.SkinnedMesh
    Eye: THREE.SkinnedMesh
    mixamorigHips: THREE.Bone
  }
  materials: {
    Palette: THREE.MeshStandardMaterial
  }
  animations: GLTFAction[]
}

type ActionName = 'Attack' | 'Hit' | 'Idle' | 'Running'
interface GLTFAction extends THREE.AnimationClip {
  name: ActionName
}

const path = '/models/player/player-transformed.glb'

const PlayerModel = (
  props: JSX.IntrinsicElements['group'] & { action: ActionName; modelRotZ: number },
) => {
  const groupRef = useRef<Group>(null)
  const { nodes, materials, animations } = useGLTF(path) as GLTFResult
  const { actions } = useAnimations(animations, groupRef)
  const swordRef = useRef<Mesh>(null)

  useEffect(() => {
    actions[props.action]?.reset().fadeIn(0.12).play()
    return () => {
      actions[props.action]?.fadeOut(0.12)
    }
  }, [props.action])

  useEffect(() => {
    if (groupRef.current && swordRef.current) {
      const handBone = groupRef.current.getObjectByName('mixamorigRightHand')
      if (handBone) {
        handBone.add(swordRef.current)
        swordRef.current.position.set(250, 150, 0)
        swordRef.current.rotation.set(0, 0, 0.3)
      }

      return () => {
        if (handBone && swordRef.current) {
          handBone.remove(swordRef.current)
        }
      }
    }
  }, [])

  return (
    <>
      <group ref={groupRef} {...props} dispose={null}>
        <group name="Scene" rotation-y={props.modelRotZ}>
          <group name="Player" rotation={[pi / 2, 0, -pi / 2]} scale={0.008}>
            <primitive object={nodes.mixamorigHips} />
          </group>
          <skinnedMesh
            name="Body"
            geometry={nodes.Body.geometry}
            material={materials.Palette}
            skeleton={nodes.Body.skeleton}
            rotation={[Math.PI / 2, 0, 0]}
            scale={0.01}
          />
          <skinnedMesh
            name="Eye"
            geometry={nodes.Eye.geometry}
            material={materials.Palette}
            skeleton={nodes.Eye.skeleton}
            rotation={[Math.PI / 2, 0, 0]}
            scale={0.01}
          />
        </group>
      </group>
      <mesh ref={swordRef} scale={1000}>
        <boxGeometry args={[0.7, 0.05, 0.05]} />
        <meshBasicMaterial color="red" />
      </mesh>
    </>
  )
}

useGLTF.preload(path)

export default PlayerModel
