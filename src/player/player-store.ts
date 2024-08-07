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
  weaponTier: 'wooden' | 'cyber' | 'evil'
  setWeaponTier: (weaponTier: 'wooden' | 'cyber' | 'evil') => void
  modelRotZ: number
  setModelRotZ: (modelRotZ: number) => void
}
