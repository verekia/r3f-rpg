import { useEffect, useRef } from 'react'

import { useAnimations, useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { Quaternion, Vector3 } from 'three'
import { GLTF } from 'three-stdlib'

import { pi } from '#/lib/util'

// import { useFrame } from '@react-three/fiber'

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

const PlayerModel = (props: JSX.IntrinsicElements['group'] & { action: ActionName }) => {
  const group = useRef<THREE.Group>(null)
  const { nodes, materials, animations } = useGLTF(path) as GLTFResult
  const { actions } = useAnimations(animations, group)
  // const helmetRef = useRef(null)
  const swordRef = useRef(null)

  // Object.keys(actions)

  useEffect(() => {
    actions[props.action]?.reset().fadeIn(0.5).play()
    return () => {
      actions[props.action]?.fadeOut(0.5)
    }
  }, [props.action])

  useFrame(() => {
    if (!swordRef.current || !group.current /* || !helmetRef.current */) return

    // const handBone = group.current.getObjectByName('mixamorigRightHand')
    // if (handBone) {
    //   swordRef.current.position.copy(handBone.getWorldPosition(new Vector3(0, 0, 0)))
    //   swordRef.current.quaternion.copy(handBone.getWorldQuaternion(new Quaternion()))

    //   const gripAdjustment = new Vector3(0.4, 0.1, 0)
    //   gripAdjustment.applyQuaternion(swordRef.current.quaternion)
    //   swordRef.current.position.add(gripAdjustment)
    // }

    // const headBone = group.current.getObjectByName('mixamorigHead')
    // if (headBone) {
    //   helmetRef.current.position.copy(headBone.getWorldPosition(new Vector3()))
    //   helmetRef.current.quaternion.copy(headBone.getWorldQuaternion(new Quaternion()))

    //   const helmetAdjustment = new Vector3(0, 0.1, 0)
    //   helmetAdjustment.applyQuaternion(helmetRef.current.quaternion)
    //   helmetRef.current.position.add(helmetAdjustment)
    // }
  })

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Player" rotation={[pi / 2, 0, -pi / 2]} scale={0.01}>
          <primitive object={nodes.mixamorigHips} />
          {/* <mesh ref={swordRef} scale={1000}>
            <boxGeometry args={[1, 0.05, 0.05]} />
            <meshBasicMaterial color="red" />
          </mesh> */}
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
  )
}

useGLTF.preload(path)

export default PlayerModel
