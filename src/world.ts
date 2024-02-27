import { Circle, System as DetectCollisionsSystem, Polygon } from 'detect-collisions'
import { World } from 'miniplex'
import createReactAPI from 'miniplex-react'
import { Object3D } from 'three'
import { create, StoreApi, UseBoundStore } from 'zustand'

import nanoid from '#/lib/nanoid'

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

type PlayerAnimation =
  | 'Idle'
  | 'Running'
  | 'Walking Backward'
  | 'Strafe Left'
  | 'Strafe Right'
  | 'Jumping'

type PlayerStore = {
  animation: PlayerAnimation
  setAnimation: (animation: PlayerAnimation) => void
  modelRotZ: number
  setModelRotZ: (modelRotZ: number) => void
}

type KeyPressEvent = { type: 'keypress'; key: string }
type InputEvent = { category: 'input' } & KeyPressEvent

type JumpEvent = { type: 'jump' }
type UTurnEvent = { type: 'uTurn' }
type MovementEvent = { category: 'movement' } & (JumpEvent | UTurnEvent)

type Event = InputEvent | MovementEvent

type EntityBase = {
  id: string
  createdAt: number
  removalTimer?: number
  toBeRemoved?: true
}

export type Entity = {
  three?: Object3D
  player?: { usePlayerStore: UseBoundStore<StoreApi<PlayerStore>> }
  enemy?: true
  camera?: true
  dcZone?: { system: DetectCollisionsSystem; obstaclesPolygon: Polygon }
  dcBody?: Circle
  tra?: Tra
  reactRef?: any
  event?: Event
} & EntityBase

export const world = new World<Entity>()

const createBase = () => ({
  id: nanoid(),
  createdAt: performance.now(),
})

export const createPlayer = (tra: Tra) =>
  world.add({
    ...createBase(),
    player: {
      usePlayerStore: create<PlayerStore>(set => ({
        animation: 'Idle',
        setAnimation: (animation: PlayerAnimation) => set({ animation }),
        modelRotZ: 0,
        setModelRotZ: (modelRotZ: number) => set({ modelRotZ }),
      })),
    },
    tra,
    dcBody: new Circle({ x: 0, y: 0 }, 0.5),
  })
export const createEnemy = (tra: Tra) => world.add({ ...createBase(), enemy: true, tra })
export const createCamera = (tra: Tra) => world.add({ ...createBase(), camera: true, tra })
export const createEvent = (event: Event) => world.add({ ...createBase(), event })
export const createDCZone = (system: DetectCollisionsSystem, obstaclesPolygon: Polygon) =>
  world.add({ ...createBase(), dcZone: { system, obstaclesPolygon } })

export const markForRemoval = (e: Entity) => world.addComponent(e, 'toBeRemoved', true)

export const players = world.with('player', 'tra', 'dcBody')
export const enemies = world.with('enemy', 'tra')
export const cameras = world.with('camera', 'tra')
export const dcZones = world.with('dcZone')
export const dcBodies = world.with('dcBody')
export const inputEvents = world.with('event').where(e => e.event.category === 'input')
export const movementEvents = world.with('event').where(e => e.event.category === 'movement')

export const ECS = createReactAPI(world)
