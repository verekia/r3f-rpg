import { useRef, useState } from 'react'

import clsx from 'clsx'
import { atan2, mp, pi, pow, sqrt, useFrameBefore, useMP } from 'manapotion'

import type { TouchEvent } from 'react'

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
  const [isLeftHelperShown, setIsLeftHelperShown] = useState(true)
  const [isRightHelperShown, setIsRightHelperShown] = useState(true)
  const canHover = useMP(s => s.canHover)
  const resetRightMovementTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const leftJoystickRef = useRef<{
    identifier: number
    originX: number
    originY: number
    currentX: number
    currentY: number
    distance: number
    angle: number
    movementX: number
    movementY: number
  } | null>(null)
  const rightJoystickRef = useRef<{
    identifier: number
    originX: number
    originY: number
    currentX: number
    currentY: number
    distance: number
    angle: number
    movementX: number
    movementY: number
  } | null>(null)

  useFrameBefore(() => {
    mp().cameraMobileJoystick.vectorDiff.x = rightJoystickRef.current?.movementX
    mp().cameraMobileJoystick.vectorDiff.y = rightJoystickRef.current?.movementY
    mp().movementMobileJoystick.angle = leftJoystickRef.current?.angle
    mp().movementMobileJoystick.force = leftJoystickRef.current?.distance
  })

  const handleTouchStart = (e: TouchEvent) => {
    for (let i = 0; i < e.touches.length; i++) {
      const touch = e.touches.item(i)
      const currentX = touch.clientX
      const currentY = window.innerHeight - touch.clientY

      if (touch.clientX < window.innerWidth / 2) {
        leftJoystickRef.current = {
          identifier: touch.identifier,
          originX: currentX,
          originY: currentY,
          currentX,
          currentY,
          distance: 0,
          angle: 0,
          movementX: 0,
          movementY: 0,
        }
        setIsLeftHelperShown(false)
      } else if (touch.clientX > window.innerWidth / 2) {
        rightJoystickRef.current = {
          identifier: touch.identifier,
          originX: currentX,
          originY: currentY,
          currentX,
          currentY,
          distance: 0,
          angle: 0,
          movementX: 0,
          movementY: 0,
        }
        setIsRightHelperShown(false)
      }
    }
  }

  const handleTouchMove = (e: TouchEvent) => {
    for (let i = 0; i < e.touches.length; i++) {
      const touch = e.touches.item(i)
      const currentX = touch.clientX
      const currentY = window.innerHeight - touch.clientY

      if (leftJoystickRef.current?.identifier === touch.identifier) {
        leftJoystickRef.current.movementX = currentX - leftJoystickRef.current.currentX
        leftJoystickRef.current.movementY = currentY - leftJoystickRef.current.currentY
        leftJoystickRef.current.currentX = currentX
        leftJoystickRef.current.currentY = currentY
        leftJoystickRef.current.distance = sqrt(
          pow(currentX - leftJoystickRef.current.originX, 2) +
            pow(currentY - leftJoystickRef.current.originY, 2),
        )
        leftJoystickRef.current.angle =
          (atan2(
            currentY - leftJoystickRef.current.originY,
            currentX - leftJoystickRef.current.originX,
          ) +
            2 * pi) %
          (2 * pi)
      } else if (rightJoystickRef.current?.identifier === touch.identifier) {
        rightJoystickRef.current.movementX = currentX - rightJoystickRef.current.currentX
        rightJoystickRef.current.movementY = currentY - rightJoystickRef.current.currentY
        rightJoystickRef.current.currentX = currentX
        rightJoystickRef.current.currentY = currentY
        rightJoystickRef.current.distance = sqrt(
          pow(currentX - rightJoystickRef.current.originX, 2) +
            pow(currentY - rightJoystickRef.current.originY, 2),
        )
        rightJoystickRef.current.angle = atan2(
          currentX - rightJoystickRef.current.originY,
          currentY - rightJoystickRef.current.originX,
        )

        clearTimeout(resetRightMovementTimeoutRef.current)
        resetRightMovementTimeoutRef.current = setTimeout(() => {
          if (rightJoystickRef.current) {
            rightJoystickRef.current.movementX = 0
            rightJoystickRef.current.movementY = 0
          }
        }, 70)
      }
    }
  }

  const handleTouchEnd = (e: TouchEvent) => {
    for (let i = 0; i < e.changedTouches.length; i++) {
      const touch = e.changedTouches.item(i)

      if (leftJoystickRef.current?.identifier === touch.identifier) {
        leftJoystickRef.current.movementX = 0
        leftJoystickRef.current.movementY = 0
        setTimeout(() => (leftJoystickRef.current = null), 50)
      } else if (rightJoystickRef.current?.identifier === touch.identifier) {
        rightJoystickRef.current.movementX = 0
        rightJoystickRef.current.movementY = 0
        setTimeout(() => (rightJoystickRef.current = null), 50)
      }
    }
  }

  if (canHover) return null

  return (
    <>
      <div
        ref={ref}
        className={clsx('desktop:hidden', className)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        {...props}
      >
        {isLeftHelperShown && (
          <div className="pointer-events-none absolute left-0 flex h-full w-1/2 items-center justify-center">
            Drag to move
          </div>
        )}
        {isRightHelperShown && (
          <div className="pointer-events-none absolute right-0 flex h-full w-1/2 items-center justify-center">
            Drag to rotate the camera
          </div>
        )}
      </div>
    </>
  )
}

export default MobileJoysticks
