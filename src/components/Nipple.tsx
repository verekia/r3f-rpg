import { useCallback, useEffect, useRef, useState } from 'react'

import clsx from 'clsx'
import { mp, useMP } from 'manapotion'

import type { EventData, JoystickManager, JoystickOutputData } from 'nipplejs'

let nippleManager: JoystickManager

mp().movementMobileJoystick = {
  angle: undefined,
  force: undefined,
  forceDiff: undefined,
  vector: { x: undefined, y: undefined },
  vectorDiff: { x: undefined, y: undefined },
}

mp().cameraMobileJoystick = {
  angle: undefined,
  force: undefined,
  forceDiff: undefined,
  vector: { x: undefined, y: undefined },
  vectorDiff: { x: undefined, y: undefined },
}

const Nipple = ({ className, ...props }: { className?: string }) => {
  const ref = useRef<HTMLDivElement>(null)
  const [isLeftHelperShown, setIsLeftHelperShown] = useState(true)
  const [isRightHelperShown, setIsRightHelperShown] = useState(true)
  const canHover = useMP(s => s.canHover)
  const resetRightMovementTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleMove = useCallback(
    (_: EventData, { force, angle, vector, instance }: JoystickOutputData) => {
      const width = ref.current.getBoundingClientRect().width

      if (instance.position.x < width / 2) {
        mp().movementMobileJoystick.angle = angle.radian
        mp().movementMobileJoystick.forceDiff = (mp().movementMobileJoystick.force ?? force) - force
        mp().movementMobileJoystick.force = force
        mp().movementMobileJoystick.vector.x = vector.x
        mp().movementMobileJoystick.vector.y = vector.y
        mp().movementMobileJoystick.vectorDiff.x =
          (mp().movementMobileJoystick.vector.x ?? vector.x) - vector.x
        mp().movementMobileJoystick.vectorDiff.y =
          (mp().movementMobileJoystick.vector.y ?? vector.y) - vector.y

        if (isLeftHelperShown) {
          setIsLeftHelperShown(false)
        }
      }

      if (instance.position.x > width / 2) {
        if (resetRightMovementTimeoutRef.current) {
          clearTimeout(resetRightMovementTimeoutRef.current)
        }

        mp().cameraMobileJoystick.angle = angle.radian
        mp().cameraMobileJoystick.forceDiff = (mp().cameraMobileJoystick.force ?? force) - force
        mp().cameraMobileJoystick.force = force
        mp().cameraMobileJoystick.vector.x = vector.x
        mp().cameraMobileJoystick.vector.y = vector.y
        mp().cameraMobileJoystick.vectorDiff.x =
          (mp().cameraMobileJoystick.vector.x ?? vector.x) - vector.x
        mp().cameraMobileJoystick.vectorDiff.y =
          (mp().cameraMobileJoystick.vector.y ?? vector.y) - vector.y

        resetRightMovementTimeoutRef.current = setTimeout(() => {
          mp().cameraMobileJoystick.forceDiff = 0
          mp().cameraMobileJoystick.vectorDiff.x = 0
          mp().cameraMobileJoystick.vectorDiff.y = 0
        }, 70)

        if (isRightHelperShown) {
          setIsRightHelperShown(false)
        }
      }
      // The re-render caused by the state change breaks the nipple joystick
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [],
  )

  const handleEnd = (_: EventData, { position }: JoystickOutputData) => {
    const width = ref.current.getBoundingClientRect().width

    if (position.x < width / 2) {
      mp().movementMobileJoystick.angle = undefined
      mp().movementMobileJoystick.force = undefined
      mp().movementMobileJoystick.forceDiff = undefined
      mp().movementMobileJoystick.vector.x = undefined
      mp().movementMobileJoystick.vector.y = undefined
      mp().movementMobileJoystick.vectorDiff.x = undefined
      mp().movementMobileJoystick.vectorDiff.y = undefined
    }

    if (position.x > width / 2) {
      mp().cameraMobileJoystick.angle = undefined
      mp().cameraMobileJoystick.force = undefined
      mp().cameraMobileJoystick.forceDiff = undefined
      mp().cameraMobileJoystick.vector.x = undefined
      mp().cameraMobileJoystick.vector.y = undefined
      mp().cameraMobileJoystick.vectorDiff.x = undefined
      mp().cameraMobileJoystick.vectorDiff.y = undefined
    }
  }

  useEffect(() => {
    const loadNipple = async () => {
      nippleManager = (await import('nipplejs')).default.create({
        zone: ref.current,
        dataOnly: true,
        multitouch: true,
        maxNumberOfNipples: 2,
      })
      nippleManager.on('move', handleMove)
      nippleManager.on('end', handleEnd)
    }

    if (canHover === false) {
      loadNipple()
    }

    return () => {
      nippleManager?.off('move', handleMove)
      nippleManager?.off('end', handleEnd)
      nippleManager?.destroy()
    }
  }, [canHover, handleMove])

  if (canHover) return null

  return (
    <>
      <div ref={ref} className={clsx('hover-hover:hidden', className)} {...props}>
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

export default Nipple
