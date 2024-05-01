import { useEffect, useRef } from 'react'

import { useAnimations, useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

import useStore from '#/core/store'
import { boots, chests, gloves, pants } from '#/gear/gear'

import type { Group, Mesh } from 'three'

const { PI: pi } = Math

type GLTFResult = GLTF & {
  nodes: {
    Body: THREE.SkinnedMesh
    BootsLong: THREE.SkinnedMesh
    BootsShort: THREE.SkinnedMesh
    Chest: THREE.SkinnedMesh
    Eye: THREE.SkinnedMesh
    GlovesLong_1: THREE.SkinnedMesh
    GlovesLong_2: THREE.SkinnedMesh
    GlovesMittens_1: THREE.SkinnedMesh
    GlovesMittens_2: THREE.SkinnedMesh
    Hair: THREE.SkinnedMesh
    Pants: THREE.SkinnedMesh
    mixamorigHips: THREE.Bone
  }
  materials: {
    Skin: THREE.MeshStandardMaterial
    Primary: THREE.MeshStandardMaterial
    Palette: THREE.MeshStandardMaterial
    Secondary: THREE.MeshStandardMaterial
    Hair: THREE.MeshStandardMaterial
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
  const chestName = useStore(s => s.chest)
  const pantsName = useStore(s => s.pants)
  const glovesName = useStore(s => s.gloves)
  const bootsName = useStore(s => s.boots)
  const skin = useStore(s => s.skin)
  const hair = useStore(s => s.hair)

  const gloveDef = gloves[glovesName]
  const bootsDef = boots[bootsName]
  const chestDef = chests[chestName]
  const pantsDef = pants[pantsName]

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
          {chestDef && (
            <skinnedMesh
              key={chestDef.mesh} // Otherwise it doesn't update
              name={chestDef.mesh}
              geometry={nodes[chestDef.mesh].geometry}
              skeleton={nodes[chestDef.mesh].skeleton}
            >
              <meshLambertMaterial color={chestDef.colors[0]} />
            </skinnedMesh>
          )}
          {pantsDef && (
            <skinnedMesh
              key={pantsDef.mesh} // Otherwise it doesn't update
              name={pantsDef.mesh}
              geometry={nodes[pantsDef.mesh].geometry}
              skeleton={nodes[pantsDef.mesh].skeleton}
            >
              <meshLambertMaterial color={pantsDef.colors[0]} />
            </skinnedMesh>
          )}
          <skinnedMesh
            name="Eye"
            geometry={nodes.Eye.geometry}
            material={paletteMaterial}
            skeleton={nodes.Eye.skeleton}
            rotation={[Math.PI / 2, 0, 0]}
            scale={0.01}
          />
          {gloveDef && (
            <group name="Gloves" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
              {gloveDef.colors.map((c, i) => (
                <skinnedMesh
                  key={`${c}_${gloveDef.mesh}`}
                  name={`${gloveDef.mesh}_${i + 1}`}
                  geometry={nodes[`${gloveDef.mesh}_${i + 1}`].geometry}
                  skeleton={nodes[`${gloveDef.mesh}_${i + 1}`].skeleton}
                >
                  <meshLambertMaterial color={c} />
                </skinnedMesh>
              ))}
            </group>
          )}
          {bootsDef && (
            <skinnedMesh
              key={bootsDef.mesh} // Otherwise it doesn't update
              name={bootsDef.mesh}
              geometry={nodes[bootsDef.mesh].geometry}
              skeleton={nodes[bootsDef.mesh].skeleton}
            >
              <meshLambertMaterial color={bootsDef.colors[0]} />
            </skinnedMesh>
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
