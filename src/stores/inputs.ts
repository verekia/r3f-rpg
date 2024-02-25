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
  fullscreen: false,
}

export type Inputs = typeof defaultInputs

export const inputKeys = Object.keys(defaultInputs) as (keyof Inputs)[]

type Store = {
  inputs: Inputs
  setInput: <K extends keyof Inputs>(key: K, value: Inputs[K]) => void
  enterFullscreen: () => void
  exitFullscreen: () => void
}

export const useInputStore = create<Store>(set => ({
  inputs: defaultInputs,
  setInput: <K extends keyof Inputs>(key: K, value: Inputs[K]) =>
    set(state => ({ inputs: { ...state.inputs, [key]: value } })),
  enterFullscreen: () => {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen()
    } else if ((document.documentElement as any).mozRequestFullScreen) {
      ;(document.documentElement as any).mozRequestFullScreen()
    } else if ((document.documentElement as any).webkitRequestFullscreen) {
      ;(document.documentElement as any).webkitRequestFullscreen()
    } else if ((document.documentElement as any).msRequestFullscreen) {
      ;(document.documentElement as any).msRequestFullscreen()
    }
  },
  exitFullscreen: () => {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    } else if ((document as any).mozCancelFullScreen) {
      ;(document as any).mozCancelFullScreen()
    } else if ((document as any).webkitExitFullscreen) {
      ;(document as any).webkitExitFullscreen()
    } else if ((document as any).msExitFullscreen) {
      ;(document as any).msExitFullscreen()
    }
  },
}))

export const getInput = <K extends keyof Inputs>(key: K): Inputs[K] =>
  useInputStore.getState().inputs[key]
export const { setInput } = useInputStore.getState()
