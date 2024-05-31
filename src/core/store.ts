import { create } from 'zustand'

import { FOREST_ROUTE, LANDING_ROUTE, Route } from '#/routing/routes'

import type { MeshToonMaterial } from 'three'

export type Glove = 'none' | 'mittensBasic' | 'mittensGold' | 'longGlovesBasic' | 'longGlovesGold'
export type Boots = 'none' | 'shoesBasic' | 'shoesGold' | 'longBasic' | 'longGold'
export type Chest = 'none' | 'chestBasic' | 'chestGold'
export type Pants = 'none' | 'pantsBasic' | 'pantsGold'

type Store = {
  globalMaterials: { palette: MeshToonMaterial | null }
  setGlobalMaterials: (globalMaterials: { palette: MeshToonMaterial }) => void
  route: Route
  setRoute: (route: Route) => void
  skin: '#FFC0CB' | '#8B4513'
  hair: '#A0522D' | '#F5DEB3'
  chest: Chest
  pants: Pants
  gloves: Glove
  boots: Boots
}

const useStore = create<Store>(set => ({
  globalMaterials: { palette: null },
  setGlobalMaterials: globalMaterials => set(() => ({ globalMaterials })),
  route: process.env.NEXT_PUBLIC_PLAY_IMMEDIATELY ? FOREST_ROUTE : LANDING_ROUTE,
  setRoute: (route: Route) => set(() => ({ route })),
  skin: '#FFC0CB',
  hair: '#A0522D',
  chest: 'chestBasic',
  pants: 'pantsBasic',
  gloves: 'mittensBasic',
  boots: 'shoesBasic',
}))

export default useStore
