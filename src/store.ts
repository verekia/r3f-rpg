import { create } from 'zustand'

import { FOREST_ROUTE, LANDING_ROUTE, Route } from '#/routes'

type Store = {
  route: Route
  setRoute: (route: Route) => void
}

const useStore = create<Store>(set => ({
  route: import.meta.env.VITE_PLAY_IMMEDIATELY ? FOREST_ROUTE : LANDING_ROUTE,
  setRoute: (route: Route) => set(() => ({ route })),
}))

export default useStore
