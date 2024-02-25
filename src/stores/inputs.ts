import { create } from 'zustand'

const defaultInputs = {
  KeyW: false,
  KeyA: false,
  KeyS: false,
  KeyD: false,
  KeyQ: false,
  KeyE: false,
  Space: false,
  ArrowUp: false,
  ArrowDown: false,
  ArrowLeft: false,
  ArrowRight: false,
  mouseLeft: false,
  mouseRight: false,
  pointerLock: false,
  mouseMovementX: 0,
  mouseMovementY: 0,
}

export type Inputs = typeof defaultInputs

export const inputKeys = Object.keys(defaultInputs) as (keyof Inputs)[]

type Store = {
  inputs: Inputs
  setInput: <K extends keyof Inputs>(key: K, value: Inputs[K]) => void
}

export const useInputStore = create<Store>(set => ({
  inputs: defaultInputs,
  setInput: <K extends keyof Inputs>(key: K, value: Inputs[K]) =>
    set(state => ({ inputs: { ...state.inputs, [key]: value } })),
}))

export const getInput = <K extends keyof Inputs>(key: K): Inputs[K] =>
  useInputStore.getState().inputs[key]
export const { setInput } = useInputStore.getState()
