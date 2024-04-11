import { useEffect, useRef } from 'react'

import { useAnimations, useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

import useStore from '#/core/store'

import type { Group, Mesh } from 'three'

const { PI: pi } = Math

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
  const { nodes, animations } = useGLTF(path) as GLTFResult
  const { actions } = useAnimations(animations, groupRef)
  const swordRef = useRef<Mesh>(null)
  const paletteMaterial = useStore(s => s.globalMaterials.palette)

  useEffect(() => {
    actions[props.action]?.reset().fadeIn(0.12).play()
    return () => {
      actions[props.action]?.fadeOut(0.12)
    }
  }, [props.action, actions])

  useEffect(() => {
    const initialSwordRef = swordRef.current

    if (groupRef.current && swordRef.current) {
      const handBone = groupRef.current.getObjectByName('mixamorigRightHand')
      if (handBone) {
        handBone.add(swordRef.current)
        swordRef.current.position.set(250, 150, 0)
        swordRef.current.rotation.set(0, 0, 0.3)
      }

      return () => {
        if (handBone && initialSwordRef) {
          handBone.remove(initialSwordRef)
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
            material={paletteMaterial}
            skeleton={nodes.Body.skeleton}
            rotation={[pi / 2, 0, 0]}
            scale={0.01}
          />
          <skinnedMesh
            name="Eye"
            geometry={nodes.Eye.geometry}
            material={paletteMaterial}
            skeleton={nodes.Eye.skeleton}
            rotation={[pi / 2, 0, 0]}
            scale={0.01}
          />
        </group>
      </group>
      <mesh ref={swordRef} scale={1000}>
        <boxGeometry args={[0.7, 0.05, 0.05]} />
        <meshLambertMaterial color="red" />
      </mesh>
    </>
  )
}

useGLTF.preload(path)

export default PlayerModel
