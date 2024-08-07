import { Circle } from 'detect-collisions'
import { create } from 'zustand'

import { createBase, Tra, world } from '#/ecs/world'
import { PlayerAnimation, PlayerState } from '#/player/player-store'

export const createPlayer = (tra: Tra) =>
  world.add({
    ...createBase(),
    player: {
      usePlayerStore: create<PlayerState>(set => ({
        weapon: 'sword',
        setWeapon: (weapon: 'sword' | 'gun' | 'dagger') => set({ weapon }),
        animation: 'Idle',
        setAnimation: (animation: PlayerAnimation) => set({ animation }),
        modelRotZ: 0,
        setModelRotZ: (modelRotZ: number) => set({ modelRotZ }),
      })),
    },
    tra,
    dcBody: new Circle({ x: 0, y: 0 }, 0.5),
  })
export const players = world.with('player', 'tra', 'dcBody')
