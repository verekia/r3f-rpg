import { useEffect, useRef } from 'react'

import clsx from 'clsx'
import { mp, useMP } from 'manapotion'

import type { EventData, JoystickManager, JoystickOutputData } from 'nipplejs'

let nippleManager: JoystickManager

mp().movementMobileJoystick = { angle: undefined, force: undefined }
mp().cameraMobileJoystick = { angle: undefined, force: undefined }

const Nipple = ({ className, ...props }: { className?: string }) => {
  const ref = useRef<HTMLDivElement>(null)
  const canHover = useMP(s => s.canHover)

  const handleMove = (_: EventData, { force, angle, instance }: JoystickOutputData) => {
    const width = ref.current.getBoundingClientRect().width

    if (instance.position.x < width / 2) {
      mp().movementMobileJoystick.angle = angle.radian
      mp().movementMobileJoystick.force = force
    }

    if (instance.position.x > width / 2) {
      mp().cameraMobileJoystick.angle = angle.radian
      mp().cameraMobileJoystick.force = force
    }
  }

  const handleEnd = (_: EventData, { position }: JoystickOutputData) => {
    const width = ref.current.getBoundingClientRect().width

    if (position.x < width / 2) {
      mp().movementMobileJoystick.angle = undefined
      mp().movementMobileJoystick.force = undefined
    }

    if (position.x > width / 2) {
      mp().cameraMobileJoystick.angle = undefined
      mp().cameraMobileJoystick.force = undefined
    }
  }

  useEffect(() => {
    const loadNipple = async () => {
      nippleManager = (await import('nipplejs')).default.create({ zone: ref.current })
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
  }, [canHover])

  if (canHover) return null

  return <div ref={ref} className={clsx('hover-hover:hidden', className)} {...props} />
}

export default Nipple
