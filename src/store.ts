import { create } from 'zustand'

import { FOREST_ROUTE, LANDING_ROUTE, Route } from '#/routes'

type Store = {
  rendererName?: string
  setRendererName: (name: string) => void
  route: Route
  setRoute: (route: Route) => void
}

const useStore = create<Store>(set => ({
  rendererName: undefined,
  route: import.meta.env.VITE_PLAY_IMMEDIATELY ? FOREST_ROUTE : LANDING_ROUTE,

  setRendererName: name => set(() => ({ rendererName: name })),
  setRoute: (route: Route) => set(() => ({ route })),
}))

export default useStore
