import { create } from 'zustand'

import { FOREST_ROUTE, LANDING_ROUTE, Route } from '#/routes'

type Inputs = {
  forward: boolean
  backward: boolean
  turnLeft: boolean
  turnRight: boolean
  strafeLeft: boolean
  strafeRight: boolean
  jump: boolean
}

type Store = {
  rendererName?: string
  setRendererName: (name: string) => void
  route: Route
  setRoute: (route: Route) => void
  inputs: Inputs
  setInput: (key: keyof Inputs, value: boolean) => void
}

const useStore = create<Store>(set => ({
  rendererName: undefined,
  setRendererName: name => set(() => ({ rendererName: name })),
  route: import.meta.env.VITE_PLAY_IMMEDIATELY ? FOREST_ROUTE : LANDING_ROUTE,
  setRoute: (route: Route) => set(() => ({ route })),
  inputs: {
    forward: false,
    backward: false,
    turnLeft: false,
    turnRight: false,
    strafeLeft: false,
    strafeRight: false,
    jump: false,
  },
  setInput: (key: keyof Inputs, value: boolean) =>
    set(state => ({ inputs: { ...state.inputs, [key]: value } })),
}))

export default useStore
