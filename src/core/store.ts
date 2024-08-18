import { create } from 'zustand'

import { FOREST_ROUTE, LANDING_ROUTE, Route } from '#/routing/routes'

import type { Mesh, MeshToonMaterial } from 'three'

export type Chest = 'none' | 'chestBasic' | 'chestCyber'
export type Legs = 'none' | 'shortsBasic' | 'skirtBasic' | 'shortsCyber' | 'skirtCyber'
export type Hands = 'none' | 'glovesBasic' | 'glovesCyber'
export type Feet = 'none' | 'shoesBasic' | 'shoesCyber'

type Store = {
  globalMaterials: { palette: MeshToonMaterial | null }
  setGlobalMaterials: (globalMaterials: { palette: MeshToonMaterial }) => void
  route: Route
  setRoute: (route: Route) => void
  skin: '#fa9' | '#8B4513'
  hair: '#A0522D' | '#F5DEB3'
  hairLength: 'long' | 'short' | 'punk'
  chest: Chest
  legs: Legs
  hands: Hands
  feet: Feet
  navmesh: Mesh | null
  setNavmesh: (navmesh: Mesh) => void
}

const useStore = create<Store>(set => ({
  globalMaterials: { palette: null },
  setGlobalMaterials: globalMaterials => set(() => ({ globalMaterials })),
  route: process.env.NEXT_PUBLIC_PLAY_IMMEDIATELY ? FOREST_ROUTE : LANDING_ROUTE,
  setRoute: (route: Route) => set(() => ({ route })),
  skin: '#fa9', // Fot toon material, better pink: #f76
  hair: '#A0522D',
  hairLength: 'long',
  chest: 'chestBasic',
  legs: 'shortsBasic',
  hands: 'glovesBasic',
  feet: 'shoesBasic',
  navmesh: null,
  setNavmesh: navmesh => set(() => ({ navmesh })),
}))

export default useStore
