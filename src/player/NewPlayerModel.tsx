/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.0 new-player.glb -t -T 
Files: new-player.glb [218.13KB] > /Users/verekia/Local/Code/r3f-rpg/public/models/player/new-player-transformed.glb [117.68KB] (46%)
*/

import React, { useEffect, useRef } from 'react'

import { useAnimations, useGLTF } from '@react-three/drei'
import { useGraph } from '@react-three/fiber'
import * as THREE from 'three'
import { GLTF, SkeletonUtils } from 'three-stdlib'

import useStore from '#/core/store'

type ActionName = '0TPose' | 'Idle' | 'Jump' | 'Run' | 'ShootLeft' | 'ShootRight'

interface GLTFAction extends THREE.AnimationClip {
  name: ActionName
}

type GLTFResult = GLTF & {
  nodes: {
    Body: THREE.SkinnedMesh
    Eyes: THREE.SkinnedMesh
    HairLong: THREE.SkinnedMesh
    HairShort: THREE.SkinnedMesh
    Root: THREE.Bone
    IKLegPoleL: THREE.Bone
    IKLegTargetL: THREE.Bone
    IKLegPoleR: THREE.Bone
    IKLegTargetR: THREE.Bone
  }
  materials: {
    Skin: THREE.MeshStandardMaterial
    Eyes: THREE.MeshStandardMaterial
    Hair: THREE.MeshStandardMaterial
  }
  animations: GLTFAction[]
}

type GLTFResultWeapons = GLTF & {
  nodes: {
    Sword_1: THREE.Mesh
    Sword_2: THREE.Mesh
    Sword_3: THREE.Mesh
    Dagger_1: THREE.Mesh
    Dagger_2: THREE.Mesh
    Dagger_3: THREE.Mesh
    Gun_1: THREE.Mesh
    Gun_2: THREE.Mesh
    Gun_3: THREE.Mesh
  }
  materials: {
    WhiteMetal: THREE.MeshStandardMaterial
    Laser: THREE.MeshStandardMaterial
    Kevlar: THREE.MeshStandardMaterial
  }
  animations: GLTFAction[]
}

export function Model(
  props: JSX.IntrinsicElements['group'] & {
    action: ActionName
    weapon: 'sword' | 'gun' | 'dagger'
    weaponTier: 'wooden' | 'cyber' | 'evil'
  },
) {
  const groupRef = React.useRef<THREE.Group>()
  const { scene, animations } = useGLTF('/models/player/player.glb')
  const { nodes: weaponNodes } = useGLTF('/models/player/weapons.glb') as GLTFResultWeapons
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene])
  const { nodes, materials } = useGraph(clone) as GLTFResult
  const { actions } = useAnimations(animations, groupRef)
  const rightWeaponRef = useRef<THREE.Group>(null)
  const skin = useStore(s => s.skin)
  const hair = useStore(s => s.hair)
  const hairLength = useStore(s => s.hairLength)

  useEffect(() => {
    actions[props.action]?.reset().fadeIn(0.12).play()
    return () => {
      actions[props.action]?.fadeOut(0.12)
    }
  }, [props.action, actions])

  useEffect(() => {
    const initialRightWeaponRef = rightWeaponRef.current
    const handBone = groupRef.current.getObjectByName('HandR')
    handBone.add(rightWeaponRef.current)
    rightWeaponRef.current.position.set(0, 0.35, 0)

    return () => {
      handBone.remove(initialRightWeaponRef)
    }
  }, [])

  return (
    <group ref={groupRef} {...props} dispose={null} rotation-y={Math.PI / 2}>
      <primitive object={nodes.Root} />
      <primitive object={nodes.IKLegPoleL} />
      <primitive object={nodes.IKLegTargetL} />
      <primitive object={nodes.IKLegPoleR} />
      <primitive object={nodes.IKLegTargetR} />
      <skinnedMesh name="Body" geometry={nodes.Body.geometry} skeleton={nodes.Body.skeleton}>
        <meshLambertMaterial color={skin} />
      </skinnedMesh>
      <skinnedMesh name="Eyes" geometry={nodes.Eyes.geometry} skeleton={nodes.Eyes.skeleton}>
        <meshLambertMaterial color="#fff" />
      </skinnedMesh>
      {hairLength === 'long' ? (
        <skinnedMesh
          key="hairLong"
          name="HairLong"
          geometry={nodes.HairLong.geometry}
          skeleton={nodes.HairLong.skeleton}
        >
          <meshLambertMaterial color={hair} />
        </skinnedMesh>
      ) : (
        <skinnedMesh
          key="hairShort"
          name="HairShort"
          geometry={nodes.HairShort.geometry}
          skeleton={nodes.HairShort.skeleton}
        >
          <meshLambertMaterial color={hair} />
        </skinnedMesh>
      )}
      <group dispose={null} ref={rightWeaponRef} rotation-x={Math.PI / 2} rotation-y={Math.PI}>
        {props.weapon === 'sword' ? (
          // Without a key, the weapons do not get swapped out correctly
          <group key="sword">
            <mesh geometry={weaponNodes.Sword_1.geometry}>
              <meshLambertMaterial
                color={
                  props.weaponTier === 'wooden'
                    ? '#843'
                    : props.weaponTier === 'cyber'
                      ? '#eee'
                      : '#222'
                }
              />
            </mesh>
            <mesh geometry={weaponNodes.Sword_2.geometry}>
              <meshLambertMaterial
                color={
                  props.weaponTier === 'wooden'
                    ? 'orange'
                    : props.weaponTier === 'cyber'
                      ? '#0fd'
                      : '#a00'
                }
              />
            </mesh>
            <mesh geometry={weaponNodes.Sword_3.geometry}>
              <meshLambertMaterial
                color={
                  props.weaponTier === 'wooden'
                    ? 'orange'
                    : props.weaponTier === 'cyber'
                      ? '#222'
                      : '#a00'
                }
              />
            </mesh>
          </group>
        ) : props.weapon === 'gun' ? (
          <group key="gun">
            <mesh geometry={weaponNodes.Gun_1.geometry}>
              <meshLambertMaterial
                color={
                  props.weaponTier === 'wooden'
                    ? '#843'
                    : props.weaponTier === 'cyber'
                      ? '#eee'
                      : '#222'
                }
              />
            </mesh>
            <mesh geometry={weaponNodes.Gun_2.geometry}>
              <meshLambertMaterial
                color={
                  props.weaponTier === 'wooden'
                    ? 'orange'
                    : props.weaponTier === 'cyber'
                      ? '#0fd'
                      : '#a00'
                }
              />
            </mesh>
            <mesh geometry={weaponNodes.Gun_3.geometry}>
              <meshLambertMaterial
                color={
                  props.weaponTier === 'wooden'
                    ? 'orange'
                    : props.weaponTier === 'cyber'
                      ? '#222'
                      : '#a00'
                }
              />
            </mesh>
          </group>
        ) : props.weapon === 'dagger' ? (
          <group key="dagger">
            <mesh geometry={weaponNodes.Dagger_1.geometry}>
              <meshLambertMaterial
                color={
                  props.weaponTier === 'wooden'
                    ? '#843'
                    : props.weaponTier === 'cyber'
                      ? '#eee'
                      : '#222'
                }
              />
            </mesh>
            <mesh geometry={weaponNodes.Dagger_2.geometry}>
              <meshLambertMaterial
                color={
                  props.weaponTier === 'wooden'
                    ? 'orange'
                    : props.weaponTier === 'cyber'
                      ? '#0fd'
                      : '#a00'
                }
              />
            </mesh>
            <mesh geometry={weaponNodes.Dagger_3.geometry}>
              <meshLambertMaterial
                color={
                  props.weaponTier === 'wooden'
                    ? 'orange'
                    : props.weaponTier === 'cyber'
                      ? '#222'
                      : '#a00'
                }
              />
            </mesh>
          </group>
        ) : null}
      </group>
    </group>
  )
}

useGLTF.preload('/models/player/player.glb')
useGLTF.preload('/models/player/weapons.glb')
