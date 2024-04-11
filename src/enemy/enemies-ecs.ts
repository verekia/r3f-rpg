import { createBase, Tra, world } from '#/ecs/world'

export const createEnemy = (tra: Tra) => world.add({ ...createBase(), enemy: true, tra })
export const enemies = world.with('enemy', 'tra')
