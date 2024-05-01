import { create } from 'zustand'

import { FOREST_ROUTE, LANDING_ROUTE, Route } from '#/routing/routes'

import type { MeshLambertMaterial } from 'three'

type Store = {
  globalMaterials: { palette: MeshLambertMaterial | null }
  setGlobalMaterials: (globalMaterials: { palette: MeshLambertMaterial }) => void
  route: Route
  setRoute: (route: Route) => void
  skin: '#FFC0CB' | '#8B4513'
  hair: '#A0522D' | '#F5DEB3'
  chest: 'none' | 'basic'
  pants: 'none' | 'basic'
  gloves: 'none' | 'a' | 'b'
  boots: 'none' | 'a' | 'b'
}

const useStore = create<Store>(set => ({
  globalMaterials: { palette: null },
  setGlobalMaterials: globalMaterials => set(() => ({ globalMaterials })),
  route: process.env.NEXT_PUBLIC_PLAY_IMMEDIATELY ? FOREST_ROUTE : LANDING_ROUTE,
  setRoute: (route: Route) => set(() => ({ route })),
  skin: '#FFC0CB',
  hair: '#A0522D',
  chest: 'basic',
  pants: 'basic',
  gloves: 'a',
  boots: 'a',
}))

export default useStore
