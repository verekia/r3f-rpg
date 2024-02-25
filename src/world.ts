import { Circle, System as DetectCollisionsSystem, Polygon } from 'detect-collisions'
import { World } from 'miniplex'
import createReactAPI from 'miniplex-react'
import { Object3D } from 'three'
import { create, StoreApi, UseBoundStore } from 'zustand'

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
}

export type Entity = {
  three?: Object3D
  player?: { usePlayerStore: UseBoundStore<StoreApi<PlayerStore>> }
  enemy?: boolean
  camera?: boolean
  dcZone?: { system: DetectCollisionsSystem; obstaclesPolygon: Polygon }
  dcBody?: Circle
  tra?: Tra
  reactRef?: any
}

export const world = new World<Entity>()

export const createPlayer = (tra: Tra) =>
  world.add({
    player: {
      usePlayerStore: create<PlayerStore>(set => ({
        animation: 'Idle',
        setAnimation: (animation: PlayerAnimation) => set({ animation }),
      })),
    },
    tra,
    dcBody: new Circle({ x: 0, y: 0 }, 0.5),
  })
export const createEnemy = (tra: Tra) => world.add({ enemy: true, tra })
export const createCamera = (tra: Tra) => world.add({ camera: true, tra })

export const players = world.with('player', 'tra', 'dcBody')
export const enemies = world.with('enemy', 'tra')
export const cameras = world.with('camera', 'tra')
export const dcZones = world.with('dcZone')
export const dcBodies = world.with('dcBody')

export const ECS = createReactAPI(world)
