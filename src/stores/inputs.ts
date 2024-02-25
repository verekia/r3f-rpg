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
  nippleAngle: undefined as number | undefined,
  nippleForce: undefined as number | undefined,
}

export type Inputs = typeof defaultInputs

export const inputKeys = Object.keys(defaultInputs) as (keyof Inputs)[]

type Store = {
  inputs: Inputs
  setInput: <K extends keyof Inputs>(key: K, value: Inputs[K]) => void
  enterFullscreen: () => void
  exitFullscreen: () => void
  lockLandscape: () => void
  unlockOrientation: () => void
  lockEscape: () => void
  unlockEscape: () => void
}

export const useInputStore = create<Store>((set, get) => ({
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

    get().lockLandscape()
    get().lockEscape()
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

    get().unlockOrientation()
    get().unlockEscape()
  },
  lockLandscape: () => {
    if (screen.orientation.type.startsWith('landscape')) {
      return
    }
    if ('lock' in screen.orientation) {
      screen.orientation.lock('landscape')
    }
  },
  unlockOrientation: () => {
    if ('unlock' in screen.orientation) {
      screen.orientation.unlock()
    }
  },
  lockEscape: () => {
    if ('keyboard' in navigator && 'lock' in (navigator.keyboard as any)) {
      ;((navigator.keyboard as any).lock as any)(['Escape'])
    }
  },
  unlockEscape: () => {
    if ('keyboard' in navigator && 'unlock' in (navigator.keyboard as any)) {
      ;((navigator.keyboard as any).unlock as any)()
    }
  },
}))

export const getInput = <K extends keyof Inputs>(key: K): Inputs[K] =>
  useInputStore.getState().inputs[key]
export const { setInput } = useInputStore.getState()
