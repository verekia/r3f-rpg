// Can also use 'manapotion' namespace instead
import '@manapotion/react'

declare module '@manapotion/react' {
  interface CustomSlice {
    movementMobileJoystick: {
      angle?: number
      angleDiff?: number
      force?: number
      forceDiff?: number
      vector: { x?: number; y?: number }
      vectorDiff?: { x?: number; y?: number }
    }
    cameraMobileJoystick: {
      angle?: number
      angleDiff?: number
      force?: number
      forceDiff?: number
      vector: { x?: number; y?: number }
      vectorDiff?: { x?: number; y?: number }
    }
  }
}
