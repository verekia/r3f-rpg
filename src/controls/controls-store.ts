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
}

type ControlsState = typeof defaultControls
type ControlsKey = keyof ControlsState

export const useControlsStore = create<ControlsState>(() => structuredClone(defaultControls))

export const getControls = useControlsStore.getState
export const setControl = (key: ControlsKey, value: ControlsState[ControlsKey]) =>
  useControlsStore.setState(s => ({ ...s, [key]: value }))
export const resetControls = () => useControlsStore.setState(structuredClone(defaultControls))
