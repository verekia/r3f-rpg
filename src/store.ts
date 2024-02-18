import { create } from 'zustand'

import { LANDING_ROUTE, Route } from '#/routes'

interface Store {
  route: Route
  setRoute: (route: Route) => void
  inputs: {
    up: boolean
    down: boolean
    left: boolean
    right: boolean
  }
  setInput: (input: string, value: boolean) => void
}

const useStore = create<Store>(set => ({
  route: LANDING_ROUTE,
  setRoute: (route: Route) => set(() => ({ route })),
  inputs: {
    up: false,
    down: false,
    left: false,
    right: false,
  },
  setInput: (input, value) => set(state => ({ inputs: { ...state.inputs, [input]: value } })),
}))

export default useStore
