import { useEffect, useRef } from 'react'

import { useAnimations, useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

import useStore from '#/core/store'

import type { Group, Mesh } from 'three'

const { PI: pi } = Math

type GLTFResult = GLTF & {
  nodes: {
    Body: THREE.SkinnedMesh
    BootsA: THREE.SkinnedMesh
    BootsB: THREE.SkinnedMesh
    Chest: THREE.SkinnedMesh
    Eye: THREE.SkinnedMesh
    GlovesA: THREE.SkinnedMesh
    GlovesB: THREE.SkinnedMesh
    Hair: THREE.SkinnedMesh
    Pants: THREE.SkinnedMesh
    mixamorigHips: THREE.Bone
  }
  materials: {
    Skin: THREE.MeshStandardMaterial
    Palette: THREE.MeshStandardMaterial
  }
  animations: GLTFAction[]
}

type ActionName =
  | 'Attack'
  | 'Hit'
  | 'Idle'
  | 'Jumping'
  | 'Running'
  | 'Strafe Left'
  | 'Strafe Right'
  | 'Walking Backward'
interface GLTFAction extends THREE.AnimationClip {
  name: ActionName
}
type ContextType = Record<
  string,
  React.ForwardRefExoticComponent<
    JSX.IntrinsicElements['skinnedMesh'] | JSX.IntrinsicElements['bone']
  >
>

const path = '/models/player/player-rigged-all-transformed.glb'

const PlayerModel = (
  props: JSX.IntrinsicElements['group'] & { action: ActionName; modelRotZ: number },
) => {
  const groupRef = useRef<Group>(null)
  const { nodes, materials, animations } = useGLTF(path) as GLTFResult
  const { actions } = useAnimations(animations, groupRef)
  const swordRef = useRef<Mesh>(null)
  const paletteMaterial = useStore(s => s.globalMaterials.palette)
  const chest = useStore(s => s.chest)
  const pants = useStore(s => s.pants)
  const gloves = useStore(s => s.gloves)
  const boots = useStore(s => s.boots)
  const skin = useStore(s => s.skin)
  const hair = useStore(s => s.hair)

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
            skeleton={nodes.Body.skeleton}
            rotation={[Math.PI / 2, 0, 0]}
            scale={0.01}
          >
            <meshLambertMaterial color={skin} />
          </skinnedMesh>
          {boots === 'a' && (
            <skinnedMesh
              name="BootsA"
              geometry={nodes.BootsA.geometry}
              material={paletteMaterial}
              skeleton={nodes.BootsA.skeleton}
              rotation={[Math.PI / 2, 0, 0]}
              scale={0.01}
            />
          )}
          {boots === 'b' && (
            <skinnedMesh
              name="BootsB"
              geometry={nodes.BootsB.geometry}
              material={paletteMaterial}
              skeleton={nodes.BootsB.skeleton}
              rotation={[Math.PI / 2, 0, 0]}
              scale={0.01}
            />
          )}
          {chest === 'basic' && (
            <skinnedMesh
              name="Chest"
              geometry={nodes.Chest.geometry}
              material={paletteMaterial}
              skeleton={nodes.Chest.skeleton}
              rotation={[Math.PI / 2, 0, 0]}
              scale={0.01}
            />
          )}
          <skinnedMesh
            name="Eye"
            geometry={nodes.Eye.geometry}
            material={paletteMaterial}
            skeleton={nodes.Eye.skeleton}
            rotation={[Math.PI / 2, 0, 0]}
            scale={0.01}
          />
          {gloves === 'a' && (
            <skinnedMesh
              name="GlovesA"
              geometry={nodes.GlovesA.geometry}
              material={paletteMaterial}
              skeleton={nodes.GlovesA.skeleton}
              rotation={[Math.PI / 2, 0, 0]}
              scale={0.01}
            />
          )}
          {gloves === 'b' && (
            <skinnedMesh
              name="GlovesB"
              geometry={nodes.GlovesB.geometry}
              material={paletteMaterial}
              skeleton={nodes.GlovesB.skeleton}
              rotation={[Math.PI / 2, 0, 0]}
              scale={0.01}
            />
          )}
          <skinnedMesh
            name="Hair"
            geometry={nodes.Hair.geometry}
            skeleton={nodes.Hair.skeleton}
            rotation={[Math.PI / 2, 0, 0]}
            scale={0.01}
          >
            <meshLambertMaterial color={hair} />
          </skinnedMesh>
          {pants === 'basic' && (
            <skinnedMesh
              name="Pants"
              geometry={nodes.Pants.geometry}
              material={paletteMaterial}
              skeleton={nodes.Pants.skeleton}
              rotation={[Math.PI / 2, 0, 0]}
              scale={0.01}
            />
          )}
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
