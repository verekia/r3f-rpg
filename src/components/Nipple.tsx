import { useEffect, useRef } from 'react'

import clsx from 'clsx'
import { mp } from 'manapotion'
import NippleJS, { EventData, JoystickManager, JoystickOutputData } from 'nipplejs'

let nippleManager: JoystickManager

mp().mobileJoystick1 = { angle: undefined, force: undefined }

const Nipple = ({ className, ...props }: { className?: string }) => {
  const ref = useRef<HTMLDivElement>(null)

  const handleStart = () => {
    mp().mobileJoystick1.angle = undefined
    mp().mobileJoystick1.force = undefined
  }

  const handleEnd = () => {
    mp().mobileJoystick1.angle = undefined
    mp().mobileJoystick1.force = undefined
  }

  const handleMove = (_: EventData, { force, angle }: JoystickOutputData) => {
    mp().mobileJoystick1.angle = angle.radian
    mp().mobileJoystick1.force = force
  }

  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) {
      nippleManager = NippleJS.create({ zone: ref.current as HTMLDivElement })
      nippleManager.on('start', handleStart)
      nippleManager.on('end', handleEnd)
      nippleManager.on('move', handleMove)
    }

    return () => {
      nippleManager?.off('start', handleStart)
      nippleManager?.off('end', handleEnd)
      nippleManager?.off('move', handleMove)
      nippleManager?.destroy()
    }
  }, [])

  return <div ref={ref} className={clsx('hover-hover:hidden', className)} {...props} />
}

export default Nipple
