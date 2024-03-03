// Can also use 'manapotion' namespace instead
import '@manapotion/react'

declare module '@manapotion/react' {
  interface CustomSlice {
    mobileJoystick1: { angle?: number; force?: number }
  }
}
