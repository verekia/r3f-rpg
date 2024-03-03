import { ManaPotionState } from 'manapotion'

declare module 'manapotion' {
  function mp(): ManaPotionState & {
    mobileJoystick1: {
      angle: number | undefined
      force: number | undefined
    }
  }
}
