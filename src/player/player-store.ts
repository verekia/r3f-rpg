export type PlayerAnimation =
  | 'Idle'
  | 'Running'
  | 'Walking Backward'
  | 'Strafe Left'
  | 'Strafe Right'
  | 'Jumping'

export type PlayerState = {
  animation: PlayerAnimation
  setAnimation: (animation: PlayerAnimation) => void
  modelRotZ: number
  setModelRotZ: (modelRotZ: number) => void
}
