import { Joystick, ManaPotionState } from '@manapotion/react'

declare module '@manapotion/react' {
  interface ManaPotionState {
    movementJoystick: Joystick
    cameraJoystick: Joystick
  }
}
