import { createBase, Tra, world } from '#/ecs/world'

export const createCamera = (tra: Tra) => world.add({ ...createBase(), camera: true, tra })
export const cameras = world.with('camera', 'tra')
