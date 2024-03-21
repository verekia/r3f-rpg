import { Joystick } from '@manapotion/react'

declare module '@manapotion/react' {
  interface CustomSlice {
    movementJoystick: Joystick
    cameraJoystick: Joystick
  }
}
