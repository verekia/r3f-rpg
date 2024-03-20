import {
  DetailedHTMLProps,
  forwardRef,
  HTMLAttributes,
  MutableRefObject,
  useEffect,
  useRef,
} from 'react'

import { mp, useMP } from 'manapotion'

const { sin, cos, sqrt, pow, atan2 } = Math
const pi = Math.PI

export type JoystickData = {
  isActive: boolean
  identifier: number
  originX: number
  originY: number
  originAngle: number
  originDistance: number
  originDistanceRatio: number
  followX: number
  followY: number
  followAngle: number
  followDistance: number
  followDistanceRatio: number
  currentX: number
  currentY: number
  movementX: number
  movementY: number
}

export const createJoystick = (): JoystickData => ({
  isActive: false,
  identifier: undefined,
  originX: 0,
  originY: 0,
  originAngle: 0,
  originDistance: 0,
  originDistanceRatio: 0,
  followX: 0,
  followY: 0,
  followAngle: 0,
  followDistance: 0,
  followDistanceRatio: 0,
  currentX: 0,
  currentY: 0,
  movementX: 0,
  movementY: 0,
})

type JoystickAreaProps = {
  name?: string
  object?: JoystickData
  maxFollowDistance?: number
  maxOriginDistance?: number
  onStart?: (joystick: JoystickData) => void
  onMove?: (joystick: JoystickData) => void
  onEnd?: (joystick: JoystickData) => void
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>

// react-merge-refs v2.1.1
function mergeRefs<T = any>(
  refs: Array<React.MutableRefObject<T> | React.LegacyRef<T> | undefined | null>,
): React.RefCallback<T> {
  return value => {
    refs.forEach(ref => {
      if (typeof ref === 'function') {
        ref(value)
      } else if (ref != null) {
        ;(ref as React.MutableRefObject<T | null>).current = value
      }
    })
  }
}

const JoystickAreaBase = (
  {
    name,
    object,
    maxFollowDistance = 50,
    maxOriginDistance,
    onStart,
    onMove,
    onEnd,
    ...props
  }: JoystickAreaProps,
  ref: MutableRefObject<HTMLDivElement>,
) => {
  const localRef = useRef<HTMLDivElement>(null)
  const mpJoystick = useMP(s => s[name])
  const resetMovementTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const endResetTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const joystick = object ?? mpJoystick

  const mergedRefs = mergeRefs([localRef, ref])

  useEffect(() => {
    const resetJoystick = () => {
      joystick.identifier = undefined
      joystick.isActive = false
      joystick.originX = 0
      joystick.originY = 0
      joystick.originAngle = 0
      joystick.originDistance = 0
      joystick.originDistanceRatio = 0
      joystick.followX = 0
      joystick.followY = 0
      joystick.followAngle = 0
      joystick.followDistance = 0
      joystick.followDistanceRatio = 0
      joystick.currentX = 0
      joystick.currentY = 0
      joystick.movementX = 0
      joystick.movementY = 0
    }

    const handleTouchStart = (e: TouchEvent) => {
      e.preventDefault()

      if (!joystick || joystick.identifier != undefined) {
        return
      }

      const touch = e.changedTouches.item(0)
      const target = e.target as HTMLDivElement
      const currentX = touch.clientX
      const currentY = target.offsetHeight - touch.clientY

      joystick.identifier = touch.identifier
      joystick.isActive = true
      joystick.originX = currentX
      joystick.originY = currentY
      joystick.originAngle = 0
      joystick.originDistance = 0
      joystick.originDistanceRatio = 0
      joystick.followX = currentX
      joystick.followY = currentY
      joystick.followAngle = 0
      joystick.followDistance = 0
      joystick.followDistanceRatio = 0
      joystick.currentX = currentX
      joystick.currentY = currentY
      joystick.movementX = 0
      joystick.movementY = 0

      onStart?.(joystick)
    }

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault()

      if (!joystick) {
        return
      }

      for (let i = 0; i < e.changedTouches.length; i++) {
        const touch = e.changedTouches.item(i)

        if (joystick.identifier !== touch.identifier) {
          continue
        }

        const target = e.target as HTMLDivElement

        const fingerPositionX = touch.clientX
        const fingerPositionY = target.offsetHeight - touch.clientY
        const fingerOriginDistance = sqrt(
          pow(fingerPositionX - joystick.originX, 2) + pow(fingerPositionY - joystick.originY, 2),
        )

        joystick.originAngle =
          (atan2(fingerPositionY - joystick.originY, fingerPositionX - joystick.originX) + 2 * pi) %
          (2 * pi)
        joystick.followAngle =
          (atan2(fingerPositionY - joystick.followY, fingerPositionX - joystick.followX) + 2 * pi) %
          (2 * pi)

        const currentX = maxOriginDistance
          ? joystick.originX +
            Math.min(fingerOriginDistance, maxOriginDistance) * cos(joystick.originAngle)
          : touch.clientX
        const currentY = maxOriginDistance
          ? joystick.originY +
            Math.min(fingerOriginDistance, maxOriginDistance) * sin(joystick.originAngle)
          : target.offsetHeight - touch.clientY

        joystick.movementX = currentX - joystick.currentX
        joystick.movementY = currentY - joystick.currentY
        joystick.currentX = currentX
        joystick.currentY = currentY

        joystick.originDistance = sqrt(
          pow(currentX - joystick.originX, 2) + pow(currentY - joystick.originY, 2),
        )
        if (joystick.originDistance > maxOriginDistance - 0.01) {
          joystick.originDistance = maxOriginDistance
        }

        joystick.originDistanceRatio = maxOriginDistance
          ? joystick.originDistance / maxOriginDistance
          : 1
        if (joystick.originDistanceRatio > 0.99) {
          joystick.originDistanceRatio = 1
        }

        joystick.followDistance = sqrt(
          pow(currentX - joystick.followX, 2) + pow(currentY - joystick.followY, 2),
        )
        if (joystick.followDistance > maxFollowDistance - 0.01) {
          joystick.followDistance = maxFollowDistance
        }

        joystick.followDistanceRatio = maxFollowDistance
          ? joystick.followDistance / maxFollowDistance
          : 1

        joystick.originAngle =
          (atan2(currentY - joystick.originY, currentX - joystick.originX) + 2 * pi) % (2 * pi)
        joystick.followAngle =
          (atan2(currentY - joystick.followY, currentX - joystick.followX) + 2 * pi) % (2 * pi)

        if (joystick.followDistance >= maxFollowDistance) {
          const oppositeFollowAngle = Math.atan2(
            joystick.followY - currentY,
            joystick.followX - currentX,
          )
          joystick.followX = currentX + maxFollowDistance * cos(oppositeFollowAngle)
          joystick.followY = currentY + maxFollowDistance * sin(oppositeFollowAngle)
        }

        onMove?.(joystick)

        clearTimeout(resetMovementTimeoutRef.current)
        resetMovementTimeoutRef.current = setTimeout(() => {
          if (joystick && joystick.identifier !== undefined) {
            joystick.movementX = 0
            joystick.movementY = 0

            onMove?.(joystick)
          }
        }, 70)
      }
    }

    const handleTouchEnd = (e: TouchEvent) => {
      e.preventDefault()

      if (!joystick) {
        return
      }

      for (let i = 0; i < e.changedTouches.length; i++) {
        const touch = e.changedTouches.item(i)

        if (joystick.identifier !== touch.identifier) {
          continue
        }

        joystick.movementX = 0
        joystick.movementY = 0

        onEnd?.(joystick)

        endResetTimeoutRef.current = setTimeout(() => {
          resetJoystick()
          onEnd?.(joystick)
        }, 50)
      }
    }

    const element = localRef.current

    // Binding events by ref instead of JSX attributes to make them active instead of passive
    // and have access to e.preventDefault(). Without e.preventDefault(), the UI is no longer
    // interactable while joysticks are moving due to touchmove.
    element.addEventListener('touchstart', handleTouchStart /*, { passive: false } */)
    element.addEventListener('touchmove', handleTouchMove /*, { passive: false } */)
    element.addEventListener('touchend', handleTouchEnd /*, { passive: false } */)

    return () => {
      clearTimeout(resetMovementTimeoutRef.current)
      clearTimeout(endResetTimeoutRef.current)
      element.removeEventListener('touchstart', handleTouchStart)
      element.removeEventListener('touchmove', handleTouchMove)
      element.removeEventListener('touchend', handleTouchEnd)
    }
  }, [joystick, maxFollowDistance, maxOriginDistance, name, onEnd, onMove, onStart])

  if (!joystick) {
    console.error('JoystickArea: an object or name is required')
    return null
  }

  return <div ref={mergedRefs} {...props} />
}

export const JoystickArea = forwardRef<HTMLDivElement, JoystickAreaProps>(JoystickAreaBase)
JoystickArea.displayName = 'JoystickArea'
