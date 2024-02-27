import { useFrame } from '@react-three/fiber'
import { clamp, pi } from '@v1v2/engine'
import { match, P } from 'ts-pattern'

import { between } from '#/lib/util'
import { setControl } from '#/stores/controls'
import { useInputStore } from '#/stores/inputs'
import { cameraUTurn } from '#/systems/CameraFollow'
import { jump, uTurn } from '#/systems/MovementSystem'
import { inputEvents, markForRemoval } from '#/world'

const SENSITIVITY_THRESHOLD = 6
const MAX_MOVEMENT = 60

// This is to avoid creating objects at every frame
const yes = () => true
const no = () => false
const s = { KeyS: true }
const q = { KeyQ: true }
const e = { KeyE: true }
const w = { KeyW: true }
const a = { KeyA: true }
const d = { KeyD: true }
const up = { ArrowUp: true }
const down = { ArrowDown: true }
const left = { ArrowLeft: true }
const right = { ArrowRight: true }
const pointerLock = { pointerLock: true }
const a_pointerLock = { KeyA: true, pointerLock: true }
const d_pointerLock = { KeyD: true, pointerLock: true }
const a_s_pointerLock = { KeyA: true, KeyS: true, pointerLock: true }
const d_s_pointerLock = { KeyD: true, KeyS: true, pointerLock: true }
const a_w_pointerLock = { KeyA: true, KeyW: true, pointerLock: true }
const d_w_pointerLock = { KeyD: true, KeyW: true, pointerLock: true }
const left_pointerLock = { ArrowLeft: true, pointerLock: true }
const right_pointerLock = { ArrowRight: true, pointerLock: true }
const up_left_pointerLock = { ArrowUp: true, ArrowLeft: true, pointerLock: true }
const up_right_pointerLock = { ArrowUp: true, ArrowRight: true, pointerLock: true }
const left_down_pointerLock = { ArrowLeft: true, ArrowDown: true, pointerLock: true }
const right_down_pointerLock = { ArrowRight: true, ArrowDown: true, pointerLock: true }
const mouse_both = { mouseLeft: true, mouseRight: true }
const mouse_both_e = { mouseLeft: true, mouseRight: true, KeyE: true }
const mouse_both_q = { mouseLeft: true, mouseRight: true, KeyQ: true }
const mouse_both_d = { mouseLeft: true, mouseRight: true, KeyD: true }
const mouse_both_a = { mouseLeft: true, mouseRight: true, KeyA: true }
const mouse_both_left = { mouseLeft: true, mouseRight: true, ArrowLeft: true }
const mouse_both_right = { mouseLeft: true, mouseRight: true, ArrowRight: true }
const q_w_e = { KeyQ: true, KeyW: true, KeyE: true }
const q_s_e = { KeyQ: true, KeyS: true, KeyE: true }
const q_w = { KeyQ: true, KeyW: true }
const w_e = { KeyW: true, KeyE: true }
const q_s = { KeyQ: true, KeyS: true }
const e_s = { KeyE: true, KeyS: true }

const joystickForward = () => {
  const { inputs } = useInputStore.getState()
  if (inputs.nippleForce === undefined || inputs.nippleAngle === undefined) return false
  return inputs.nippleForce > 0.2 && between(inputs.nippleAngle, pi / 4, (3 * pi) / 4)
}

const joystickBackward = () => {
  const { inputs } = useInputStore.getState()
  if (inputs.nippleForce === undefined || inputs.nippleAngle === undefined) return false
  return inputs.nippleForce > 0.2 && between(inputs.nippleAngle, (4 * pi) / 3, (5 * pi) / 3)
}

const joystickStrafeLeft = () => {
  const { inputs } = useInputStore.getState()
  if (inputs.nippleForce === undefined || inputs.nippleAngle === undefined) return false
  return inputs.nippleForce > 0.2 && between(inputs.nippleAngle, pi, (7 * pi) / 6)
}

const joystickStrafeRight = () => {
  const { inputs } = useInputStore.getState()
  if (inputs.nippleForce === undefined || inputs.nippleAngle === undefined) return false
  return inputs.nippleForce > 0.2 && between(inputs.nippleAngle, (11 * pi) / 6, 2 * pi)
}

const joystickBackwardLeft = () => {
  const { inputs } = useInputStore.getState()
  if (inputs.nippleForce === undefined || inputs.nippleAngle === undefined) return false
  return inputs.nippleForce > 0.2 && between(inputs.nippleAngle, (7 * pi) / 6, (4 * pi) / 3)
}

const joystickBackwardRight = () => {
  const { inputs } = useInputStore.getState()
  if (inputs.nippleForce === undefined || inputs.nippleAngle === undefined) return false
  return inputs.nippleForce > 0.2 && between(inputs.nippleAngle, (5 * pi) / 3, (11 * pi) / 6)
}

// This system registers intents of player controls based on inputs and resolves input conflicts.
// It does not manage whether or not these intents are valid in the world.

const ControlsSystem = () => {
  useFrame(() => {
    const { inputs } = useInputStore.getState()

    setControl(
      'forward',
      match(inputs)
        .with(q_w_e, yes)
        .with(q, no)
        .with(e, no)
        .with(P.union(s, down), no)
        .with(P.union(a_pointerLock, left_pointerLock), no)
        .with(P.union(d_pointerLock, right_pointerLock), no)
        .with(P.union(w, up), yes)
        .with(mouse_both, yes)
        .with(P.when(joystickForward), yes)
        .otherwise(no),
    )

    setControl(
      'backward',
      match(inputs)
        .with(q_s_e, yes)
        .with(q, no)
        .with(e, no)
        .with(P.union(w, up), no)
        .with(mouse_both, no)
        .with(P.union(a_pointerLock, left_pointerLock), no)
        .with(P.union(d_pointerLock, right_pointerLock), no)
        .with(P.union(s, down), yes)
        .with(P.when(joystickBackward), yes)
        .otherwise(no),
    )

    setControl(
      'strafeLeft',
      match(inputs)
        .with(P.union(up, w), no)
        .with(P.union(down, s), no)
        .with(e, no)
        .with(d_pointerLock, no)
        .with(mouse_both, no)
        .with(q, yes)
        .with(a_pointerLock, yes)
        .with(left_pointerLock, yes)
        .with(P.when(joystickStrafeLeft), yes)
        .otherwise(no),
    )

    setControl(
      'strafeRight',
      match(inputs)
        .with(q, no)
        .with(a_pointerLock, no)
        .with(P.union(up, w), no)
        .with(P.union(down, s), no)
        .with(mouse_both, no)
        .with(e, yes)
        .with(d_pointerLock, yes)
        .with(right_pointerLock, yes)
        .with(P.when(joystickStrafeRight), yes)
        .otherwise(no),
    )

    setControl(
      'forwardLeft',
      match(inputs)
        // .with(w_e, no)
        .with(q_w, yes)
        .with(P.union(a_w_pointerLock, up_left_pointerLock), yes)
        .with(mouse_both_q, yes)
        .with(P.union(mouse_both_a, mouse_both_left), yes)
        .otherwise(no),
    )

    setControl(
      'forwardRight',
      match(inputs)
        // .with(q_w, no)
        .with(w_e, yes)
        .with(P.union(d_w_pointerLock, up_right_pointerLock), yes)
        .with(mouse_both_e, yes)
        .with(P.union(mouse_both_d, mouse_both_right), yes)
        .otherwise(no),
    )

    setControl(
      'backwardLeft',
      match(inputs)
        .with(q_s, yes)
        .with(P.union(a_s_pointerLock, left_down_pointerLock), yes)
        .with(P.when(joystickBackwardLeft), yes)
        .otherwise(no),
    )

    setControl(
      'backwardRight',
      match(inputs)
        .with(e_s, yes)
        .with(P.union(d_s_pointerLock, right_down_pointerLock), yes)
        .with(P.when(joystickBackwardRight), yes)
        .otherwise(no),
    )

    setControl(
      'turnLeft',
      match(inputs)
        .with(pointerLock, no)
        .with(P.union(d, right), no)
        .with(P.union(a, left), yes)
        // .with(P.when(joystickTurnLeft), yes)
        .otherwise(no),
    )

    setControl(
      'turnRight',
      match(inputs)
        .with(pointerLock, no)
        .with(P.union(a, left), no)
        .with(P.union(d, right), yes)
        // .with(P.when(joystickTurnRight), yes)
        .otherwise(no),
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
    } else if (inputs.nippleAngle && inputs.nippleForce && inputs.nippleForce > 0.2) {
      if (between(inputs.nippleAngle, 0, pi)) {
        setControl('manualRotZ', (inputs.nippleAngle - pi / 2) * 0.1)
      } else {
        setControl('manualRotZ', undefined)
      }
    } else {
      setControl('manualRotZ', undefined)
      setControl('manualRotX', undefined)
    }

    for (const e of inputEvents) {
      if (e.event.type === 'keypress' && e.event.key === 'Space') {
        jump()
      }
      if (e.event.type === 'keypress' && e.event.key === 'KeyX') {
        uTurn()
        cameraUTurn()
      }

      markForRemoval(e)
    }
  })

  return null
}

export default ControlsSystem
