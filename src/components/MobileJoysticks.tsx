import { useEffect, useRef, useState } from 'react'

import clsx from 'clsx'
import { atan2, cos, mp, pi, pow, sin, sqrt } from 'manapotion'

mp().movementMobileJoystick = {
  angle: undefined,
  angleDiff: undefined,
  force: undefined,
  forceDiff: undefined,
  vector: { x: undefined, y: undefined },
  vectorDiff: { x: undefined, y: undefined },
}

mp().cameraMobileJoystick = {
  angle: undefined,
  angleDiff: undefined,
  force: undefined,
  forceDiff: undefined,
  vector: { x: undefined, y: undefined },
  vectorDiff: { x: undefined, y: undefined },
}

const MobileJoysticks = ({ className, ...props }: { className?: string }) => {
  const ref = useRef<HTMLDivElement>(null)
  const leftJoystickViewerRef = useRef<HTMLDivElement>(null)
  const [isLeftHelperShown, setIsLeftHelperShown] = useState(true)
  const [isRightHelperShown, setIsRightHelperShown] = useState(true)
  const resetRightMovementTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const leftJoystickRef = useRef<{
    identifier: number
    originX: number
    originY: number
    originAngle: number
    originDistance: number
    followX: number
    followY: number
    followAngle: number
    followDistance: number
    currentX: number
    currentY: number
    movementX: number
    movementY: number
  } | null>(null)
  const rightJoystickRef = useRef<{
    identifier: number
    originX: number
    originY: number
    originAngle: number
    originDistance: number
    followX: number
    followY: number
    followAngle: number
    followDistance: number
    currentX: number
    currentY: number
    movementX: number
    movementY: number
  } | null>(null)

  const handleTouchStart = (e: TouchEvent) => {
    e.preventDefault()

    for (let i = 0; i < e.changedTouches.length; i++) {
      const touch = e.changedTouches.item(i)
      const currentX = touch.clientX
      const currentY = window.innerHeight - touch.clientY

      if (touch.clientX < window.innerWidth / 2) {
        leftJoystickRef.current = {
          identifier: touch.identifier,
          originX: currentX,
          originY: currentY,
          originAngle: 0,
          originDistance: 0,
          followX: currentX,
          followY: currentY,
          followAngle: 0,
          followDistance: 0,
          currentX,
          currentY,
          movementX: 0,
          movementY: 0,
        }
        mp().movementMobileJoystick.angle = 0
        mp().movementMobileJoystick.force = 0
        setIsLeftHelperShown(false)
      } else if (touch.clientX > window.innerWidth / 2) {
        rightJoystickRef.current = {
          identifier: touch.identifier,
          originX: currentX,
          originY: currentY,
          originAngle: 0,
          originDistance: 0,
          followX: currentX,
          followY: currentY,
          followAngle: 0,
          followDistance: 0,
          currentX,
          currentY,
          movementX: 0,
          movementY: 0,
        }
        // Update MP
        mp().cameraMobileJoystick.vectorDiff.x = 0
        mp().cameraMobileJoystick.vectorDiff.y = 0
        setIsRightHelperShown(false)
      }
    }
  }

  const handleTouchMove = (e: TouchEvent) => {
    e.preventDefault()

    for (let i = 0; i < e.changedTouches.length; i++) {
      const touch = e.changedTouches.item(i)
      const currentX = touch.clientX
      const currentY = window.innerHeight - touch.clientY

      if (leftJoystickRef.current?.identifier === touch.identifier) {
        leftJoystickRef.current.movementX = currentX - leftJoystickRef.current.currentX
        leftJoystickRef.current.movementY = currentY - leftJoystickRef.current.currentY
        leftJoystickRef.current.currentX = currentX
        leftJoystickRef.current.currentY = currentY
        leftJoystickRef.current.originDistance = sqrt(
          pow(currentX - leftJoystickRef.current.originX, 2) +
            pow(currentY - leftJoystickRef.current.originY, 2),
        )
        leftJoystickRef.current.followDistance = sqrt(
          pow(currentX - leftJoystickRef.current.followX, 2) +
            pow(currentY - leftJoystickRef.current.followY, 2),
        )
        leftJoystickRef.current.originAngle =
          (atan2(
            currentY - leftJoystickRef.current.originY,
            currentX - leftJoystickRef.current.originX,
          ) +
            2 * pi) %
          (2 * pi)
        leftJoystickRef.current.followAngle =
          (atan2(
            currentY - leftJoystickRef.current.followY,
            currentX - leftJoystickRef.current.followX,
          ) +
            2 * pi) %
          (2 * pi)
        // Update Mp
        mp().movementMobileJoystick.angle = leftJoystickRef.current.followAngle
        mp().movementMobileJoystick.force = leftJoystickRef.current.followDistance

        const followDistance = 50

        if (leftJoystickRef.current.followDistance > followDistance) {
          const oppositeFollowAngle = Math.atan2(
            leftJoystickRef.current.followY - currentY,
            leftJoystickRef.current.followX - currentX,
          )
          leftJoystickRef.current.followX = currentX + followDistance * cos(oppositeFollowAngle)
          leftJoystickRef.current.followY = currentY + followDistance * sin(oppositeFollowAngle)
        }
      } else if (rightJoystickRef.current?.identifier === touch.identifier) {
        rightJoystickRef.current.movementX = currentX - rightJoystickRef.current.currentX
        rightJoystickRef.current.movementY = currentY - rightJoystickRef.current.currentY
        // Update MP
        mp().cameraMobileJoystick.vectorDiff.x = rightJoystickRef.current.movementX
        mp().cameraMobileJoystick.vectorDiff.y = rightJoystickRef.current.movementY

        rightJoystickRef.current.currentX = currentX
        rightJoystickRef.current.currentY = currentY
        rightJoystickRef.current.originDistance = sqrt(
          pow(currentX - rightJoystickRef.current.originX, 2) +
            pow(currentY - rightJoystickRef.current.originY, 2),
        )
        rightJoystickRef.current.followDistance = sqrt(
          pow(currentX - rightJoystickRef.current.followX, 2) +
            pow(currentY - rightJoystickRef.current.followY, 2),
        )
        rightJoystickRef.current.originAngle =
          (atan2(
            currentY - rightJoystickRef.current.originY,
            currentX - rightJoystickRef.current.originX,
          ) +
            2 * pi) %
          (2 * pi)
        rightJoystickRef.current.followAngle =
          (atan2(
            currentY - rightJoystickRef.current.followY,
            currentX - rightJoystickRef.current.followX,
          ) +
            2 * pi) %
          (2 * pi)

        clearTimeout(resetRightMovementTimeoutRef.current)
        resetRightMovementTimeoutRef.current = setTimeout(() => {
          if (rightJoystickRef.current) {
            rightJoystickRef.current.movementX = 0
            rightJoystickRef.current.movementY = 0
            // Update MP
            mp().cameraMobileJoystick.vectorDiff.x = 0
            mp().cameraMobileJoystick.vectorDiff.y = 0
          }
        }, 70)
      }
    }
  }

  const handleTouchEnd = (e: TouchEvent) => {
    e.preventDefault()

    for (let i = 0; i < e.changedTouches.length; i++) {
      const touch = e.changedTouches.item(i)

      if (leftJoystickRef.current?.identifier === touch.identifier) {
        leftJoystickRef.current.movementX = 0
        leftJoystickRef.current.movementY = 0
        setTimeout(() => {
          leftJoystickRef.current = null
          // Update MP
          mp().movementMobileJoystick.angle = 0
          mp().movementMobileJoystick.force = 0
        }, 50)
      } else if (rightJoystickRef.current?.identifier === touch.identifier) {
        rightJoystickRef.current.movementX = 0
        rightJoystickRef.current.movementY = 0
        // Update MP
        mp().cameraMobileJoystick.vectorDiff.x = 0
        mp().cameraMobileJoystick.vectorDiff.y = 0

        setTimeout(() => (rightJoystickRef.current = null), 50)
      }
    }
  }

  useEffect(() => {
    const element = ref.current

    // My UI was no longer clickable while joysticks were moving.

    // https://stackoverflow.com/questions/63663025/react-onwheel-handler-cant-preventdefault-because-its-a-passive-event-listenev

    // If I use onTouchMove={handleTouchMove} instead, I cannot call e.preventDefault()
    // because it's a passive event listener. Binding the event listener manually
    // works. { passive: false } worked, but it doesn't seem necessary.

    element.addEventListener('touchstart', handleTouchStart /*, { passive: false }*/)
    element.addEventListener('touchmove', handleTouchMove /*, { passive: false }*/)
    element.addEventListener('touchend', handleTouchEnd /*, { passive: false }*/)

    return () => {
      element.removeEventListener('touchstart', handleTouchStart)
      element.removeEventListener('touchmove', handleTouchMove)
      element.removeEventListener('touchend', handleTouchEnd)
    }
  }, [])

  return (
    <>
      <div ref={ref} className={clsx('desktop:hidden', className)} {...props}>
        <div
          ref={leftJoystickViewerRef}
          className="pointer-events-none absolute -ml-4 -mt-4 size-8 rounded-full bg-white/50 transition-opacity"
        />
        {isLeftHelperShown && (
          <div className="pointer-events-none absolute left-0 flex h-full w-1/2 select-none items-center justify-center">
            Drag to move
          </div>
        )}
        {isRightHelperShown && (
          <div className="pointer-events-none absolute right-0 flex h-full w-1/2 select-none items-center justify-center">
            Drag to rotate the camera
          </div>
        )}
      </div>
    </>
  )
}

export default MobileJoysticks
