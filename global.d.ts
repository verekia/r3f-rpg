// Can also use 'manapotion' namespace instead
import { JoystickData } from '#/components/JoystickArea'

import '@manapotion/react'

declare module '@manapotion/react' {
  interface CustomSlice {
    movementMobileJoystick: JoystickData
    cameraMobileJoystick: JoystickData
  }
}
