import { create } from 'zustand'

import { LANDING_ROUTE, Route } from '#/routes'

interface Store {
  route: Route
  setRoute: (route: Route) => void
}

const useStore = create<Store>(set => ({
  route: LANDING_ROUTE,
  setRoute: (route: Route) => set(() => ({ route })),
}))

export default useStore
