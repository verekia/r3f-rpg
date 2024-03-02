import { useEffect, useRef } from 'react'

import clsx from 'clsx'
import NippleJS, { EventData, JoystickManager, JoystickOutputData } from 'nipplejs'

import { mobileJoystick1 } from '#/stores/inputs'

let nippleManager: JoystickManager

const Nipple = ({ className, ...props }: { className?: string }) => {
  const ref = useRef<HTMLDivElement>(null)

  const handleStart = () => {
    mobileJoystick1.angle = undefined
    mobileJoystick1.force = undefined
  }

  const handleEnd = () => {
    mobileJoystick1.angle = undefined
    mobileJoystick1.force = undefined
  }

  const handleMove = (_: EventData, { force, angle }: JoystickOutputData) => {
    if (mobileJoystick1) {
      mobileJoystick1.angle = angle.radian
      mobileJoystick1.force = force
    }
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
