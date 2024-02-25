import { useFrame } from '@react-three/fiber'
import { match } from 'ts-pattern'

import { clamp } from '#/lib/util'
import { setControl } from '#/stores/controls'
import { useInputStore } from '#/stores/inputs'

const SENSITIVITY_THRESHOLD = 6
const MAX_MOVEMENT = 60

// This systems registers intents of player controls based on i. It does not manager
// whether or not these actions are valid.

const ControlsSystem = () => {
  useFrame(() => {
    const { inputs } = useInputStore.getState()

    setControl(
      'forward',
      match(inputs)
        .with({ KeyS: true }, () => false)
        .with({ KeyQ: true }, () => false)
        .with({ KeyE: true }, () => false)
        .with({ ArrowDown: true }, () => false)
        .with({ KeyA: true, pointerLock: true }, () => false)
        .with({ KeyD: true, pointerLock: true }, () => false)
        .with({ KeyW: true }, () => true)
        .with({ ArrowUp: true }, () => true)
        .with({ mouseLeft: true, mouseRight: true }, () => true)
        .otherwise(() => false),
    )

    setControl(
      'backward',
      match(inputs)
        .with({ KeyW: true }, () => false)
        .with({ KeyQ: true }, () => false)
        .with({ KeyE: true }, () => false)
        .with({ ArrowUp: true }, () => false)
        .with({ mouseLeft: true, mouseRight: true }, () => false)
        .with({ KeyA: true, pointerLock: true }, () => false)
        .with({ KeyD: true, pointerLock: true }, () => false)
        .with({ KeyS: true }, () => true)
        .with({ ArrowDown: true }, () => true)
        .otherwise(() => false),
    )

    setControl(
      'strafeLeft',
      match(inputs)
        .with({ KeyW: true }, () => false)
        .with({ KeyS: true }, () => false)
        .with({ KeyE: true }, () => false)
        .with({ KeyD: true, pointerLock: true }, () => false)
        .with({ ArrowUp: true }, () => false)
        .with({ ArrowDown: true }, () => false)
        .with({ mouseLeft: true, mouseRight: true }, () => false)
        .with({ KeyQ: true }, () => true)
        .with({ KeyA: true, pointerLock: true }, () => true)
        .otherwise(() => false),
    )

    setControl(
      'strafeRight',
      match(inputs)
        .with({ KeyW: true }, () => false)
        .with({ KeyS: true }, () => false)
        .with({ KeyQ: true }, () => false)
        .with({ KeyA: true, pointerLock: true }, () => false)
        .with({ ArrowUp: true }, () => false)
        .with({ ArrowDown: true }, () => false)
        .with({ mouseLeft: true, mouseRight: true }, () => false)
        .with({ KeyE: true }, () => true)
        .with({ KeyD: true, pointerLock: true }, () => true)
        .otherwise(() => false),
    )

    setControl(
      'forwardLeft',
      match(inputs)
        .with({ KeyQ: true, KeyW: true }, () => true)
        .with({ KeyA: true, KeyW: true, pointerLock: true }, () => true)
        .with({ KeyQ: true, mouseLeft: true, mouseRight: true }, () => true)
        .with({ KeyA: true, mouseLeft: true, mouseRight: true }, () => true)
        .otherwise(() => false),
    )

    setControl(
      'forwardRight',
      match(inputs)
        .with({ KeyE: true, KeyW: true }, () => true)
        .with({ KeyD: true, KeyW: true, pointerLock: true }, () => true)
        .with({ KeyE: true, mouseLeft: true, mouseRight: true }, () => true)
        .with({ KeyD: true, mouseLeft: true, mouseRight: true }, () => true)
        .otherwise(() => false),
    )

    setControl(
      'backwardLeft',
      match(inputs)
        .with({ KeyQ: true, KeyS: true }, () => true)
        .otherwise(() => false),
    )

    setControl(
      'backwardRight',
      match(inputs)
        .with({ KeyE: true, KeyS: true }, () => true)
        .otherwise(() => false),
    )

    setControl(
      'turnLeft',
      match(inputs)
        .with({ pointerLock: true }, () => false)
        .with({ KeyD: true }, () => false)
        .with({ ArrowRight: true }, () => false)
        .with({ KeyA: true }, () => true)
        .with({ ArrowLeft: true }, () => true)
        .otherwise(() => false),
    )

    setControl(
      'turnRight',
      match(inputs)
        .with({ pointerLock: true }, () => false)
        .with({ KeyA: true }, () => false)
        .with({ ArrowLeft: true }, () => false)
        .with({ KeyD: true }, () => true)
        .with({ ArrowRight: true }, () => true)
        .otherwise(() => false),
    )

    setControl('jump', inputs.Space)

    if (inputs.pointerLock) {
      setControl(
        'manualRotZ',
        -(Math.abs(inputs.mouseMovementX) < SENSITIVITY_THRESHOLD
          ? 0
          : clamp(inputs.mouseMovementX, MAX_MOVEMENT)) / 100,
      )

      setControl(
        'manualRotX',
        -(Math.abs(inputs.mouseMovementY) < SENSITIVITY_THRESHOLD
          ? 0
          : clamp(inputs.mouseMovementY, MAX_MOVEMENT)) / 100,
      )
    }
  })

  return null
}

export default ControlsSystem
