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
  weapon: 'sword' | 'gun' | 'dagger'
  setWeapon: (weapon: 'sword' | 'gun' | 'dagger') => void
  modelRotZ: number
  setModelRotZ: (modelRotZ: number) => void
}
