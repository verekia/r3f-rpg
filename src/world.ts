import { World } from 'miniplex'
import createReactAPI from 'miniplex-react'
import { Object3D } from 'three'

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

export type Entity = {
  three?: Object3D
  player?: boolean
  enemy?: boolean
  camera?: boolean
  tra?: Tra
}

export const world = new World<Entity>()

export const createPlayer = (tra: Tra) => world.add({ player: true, tra })
export const createEnemy = (tra: Tra) => world.add({ enemy: true, tra })
export const createCamera = (tra: Tra) => world.add({ camera: true, tra })

export const players = world.with('player', 'tra')
export const enemies = world.with('enemy', 'tra')
export const cameras = world.with('camera', 'tra')

export const ECS = createReactAPI(world)
