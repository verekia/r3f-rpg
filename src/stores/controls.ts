import { create } from 'zustand'

const defaultControls = {
  forwardDirection: undefined as number | undefined,
  forward: false,
  forwardLeft: false,
  forwardRight: false,
  backward: false,
  backwardLeft: false,
  backwardRight: false,
  turnLeft: false,
  turnRight: false,
  strafeLeft: false,
  strafeRight: false,
  jump: false,
  manualRotZ: undefined as number | undefined,
  manualRotX: undefined as number | undefined,
}

export type Controls = typeof defaultControls

export const controlsKeys = Object.keys(defaultControls) as (keyof Controls)[]

type Store = {
  controls: Controls
  setControl: <K extends keyof Controls>(key: K, value: Controls[K]) => void
}

export const useControlsStore = create<Store>(set => ({
  controls: defaultControls,
  setControl: <K extends keyof Controls>(key: K, value: Controls[K]) =>
    set(state => ({ controls: { ...state.controls, [key]: value } })),
}))

export const getControl = <K extends keyof Controls>(key: K): Controls[K] =>
  useControlsStore.getState().controls[key]
export const { setControl } = useControlsStore.getState()
