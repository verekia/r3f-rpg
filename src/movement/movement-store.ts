import { create } from 'zustand'

const defaultMovementState = {
  isGrounded: false,
}

type MovementState = typeof defaultMovementState
type MovementKey = keyof MovementState

export const useMovementStore = create<MovementState>(() => structuredClone(defaultMovementState))

export const getMovement = useMovementStore.getState
export const setMovement = (key: MovementKey, value: MovementState[MovementKey]) =>
  useMovementStore.setState(s => ({ ...s, [key]: value }))
export const resetMovement = () => useMovementStore.setState(structuredClone(defaultMovementState))
