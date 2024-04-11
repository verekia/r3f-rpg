import { create } from 'zustand'

import { FOREST_ROUTE, LANDING_ROUTE, Route } from '#/routing/routes'

import type { MeshLambertMaterial } from 'three'

type Store = {
  globalMaterials: { palette: MeshLambertMaterial | null }
  setGlobalMaterials: (globalMaterials: { palette: MeshLambertMaterial }) => void
  route: Route
  setRoute: (route: Route) => void
}

const useStore = create<Store>(set => ({
  globalMaterials: { palette: null },
  setGlobalMaterials: globalMaterials => set(() => ({ globalMaterials })),
  route: process.env.NEXT_PUBLIC_PLAY_IMMEDIATELY ? FOREST_ROUTE : LANDING_ROUTE,
  setRoute: (route: Route) => set(() => ({ route })),
}))

export default useStore
