import { create } from 'zustand'

import { FOREST_ROUTE, LANDING_ROUTE, Route } from '#/routes'

type Controls = {
  forward: boolean
  backward: boolean
  turnLeft: boolean
  turnRight: boolean
  strafeLeft: boolean
  strafeRight: boolean
  jump: boolean
  manualRotZ?: number
  manualRotX?: number
}

type Inputs = {
  pointerLock: boolean
  pointerMovementX: number
  pointerMovementY: number
}

type Store = {
  rendererName?: string
  setRendererName: (name: string) => void
  route: Route
  setRoute: (route: Route) => void
  controls: Controls
  setControl: (key: keyof Controls, value: Controls[keyof Controls]) => void
  inputs: Inputs
  setInput: (key: keyof Inputs, value: Inputs[keyof Inputs]) => void
}

const useStore = create<Store>(set => ({
  rendererName: undefined,
  route: import.meta.env.VITE_PLAY_IMMEDIATELY ? FOREST_ROUTE : LANDING_ROUTE,
  controls: {
    forward: false,
    backward: false,
    turnLeft: false,
    turnRight: false,
    strafeLeft: false,
    strafeRight: false,
    jump: false,
    manualRotZ: 0,
    manualRotX: 0,
  },
  inputs: {
    keyW: false,
    keyA: false,
    keyS: false,
    keyD: false,
    keyQ: false,
    keyE: false,
    space: false,
    arrowUp: false,
    arrowDown: false,
    arrowLeft: false,
    arrowRight: false,
    pointerLock: false,
    pointerMovementX: 0,
    pointerMovementY: 0,
  },
  setRendererName: name => set(() => ({ rendererName: name })),
  setRoute: (route: Route) => set(() => ({ route })),
  setControl: (key: keyof Controls, value: Controls[keyof Controls]) =>
    set(state => ({ controls: { ...state.controls, [key]: value } })),
  setInput: (key: keyof Inputs, value: Inputs[keyof Inputs]) =>
    set(state => ({ inputs: { ...state.inputs, [key]: value } })),
}))

export default useStore
