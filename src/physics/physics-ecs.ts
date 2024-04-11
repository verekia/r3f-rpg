import { System as DetectCollisionsSystem, Polygon } from 'detect-collisions'

import { createBase, world } from '#/ecs/world'

export const createDCZone = (system: DetectCollisionsSystem, obstaclesPolygon: Polygon) =>
  world.add({ ...createBase(), dcZone: { system, obstaclesPolygon } })

export const dcZones = world.with('dcZone')
export const dcBodies = world.with('dcBody')
