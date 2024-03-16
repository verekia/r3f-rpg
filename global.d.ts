// Can also use 'manapotion' namespace instead
import '@manapotion/react'

declare module '@manapotion/react' {
  interface CustomSlice {
    movementMobileJoystick: { angle?: number; force?: number; forceDiff?: number }
    cameraMobileJoystick: { angle?: number; force?: number; forceDiff?: number }
  }
}
