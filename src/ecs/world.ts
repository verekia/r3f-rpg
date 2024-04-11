import { Circle, System as DetectCollisionsSystem, Polygon } from 'detect-collisions'
import { World } from 'miniplex'
import createReactAPI from 'miniplex-react'
import { Object3D } from 'three'
import { StoreApi, UseBoundStore } from 'zustand'

import nanoid from '#/lib/nanoid'
import { PlayerState } from '#/player/player-store'

export type Tra = {
  pos: { x: number; y: number; z?: number; velX?: number; velY?: number; velZ?: number }
  rot: { x?: number; y?: number; z: number; velX?: number; velY?: number; velZ?: number }
  sca: {
    x?: number
    y?: number
    z?: number
    all?: number
    velX?: number
    velY?: number
    velZ?: number
    velAll?: number
  }
}

type KeyPressEvent = { type: 'keypress'; key: string }
type InputEvent = { category: 'input' } & KeyPressEvent

type JumpEvent = { type: 'jump' }
type MovementEvent = { category: 'movement' } & JumpEvent

type Event = InputEvent | MovementEvent

type EntityBase = {
  id: string
  createdAt: number
  removalTimer?: number
  toBeRemoved?: true
}

export type Entity = {
  three?: Object3D
  player?: { usePlayerStore: UseBoundStore<StoreApi<PlayerState>> }
  enemy?: true
  camera?: true
  dcZone?: { system: DetectCollisionsSystem; obstaclesPolygon: Polygon }
  dcBody?: Circle
  tra?: Tra
  reactRef?: any
  event?: Event
} & EntityBase

export const world = new World<Entity>()

export const createBase = () => ({ id: nanoid(), createdAt: performance.now() })

export const markForRemoval = (e: Entity) => world.addComponent(e, 'toBeRemoved', true)

export const ECS = createReactAPI(world)
