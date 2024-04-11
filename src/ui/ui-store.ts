import { create } from 'zustand'

const defaultUI = {
  midScreenErrorMessage: null as string | null,
}

export type UI = typeof defaultUI

export const uiKeys = Object.keys(defaultUI) as (keyof UI)[]

type UIStore = {
  ui: UI
  setUI: <K extends keyof UI>(key: K, value: UI[K]) => void
}

export const useUIStore = create<UIStore>(set => ({
  ui: defaultUI,
  setUI: <K extends keyof UI>(key: K, value: UI[K]) =>
    set(state => ({ ui: { ...state.ui, [key]: value } })),
}))

export const getUI = <K extends keyof UI>(key: K): UI[K] => useUIStore.getState().ui[key]
export const { setUI } = useUIStore.getState()
