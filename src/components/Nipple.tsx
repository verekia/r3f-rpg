import { useEffect, useRef } from 'react'

import clsx from 'clsx'
import NippleJS, { EventData, JoystickManager, JoystickOutputData } from 'nipplejs'
import { throttle } from 'radash'

import { setInput } from '#/stores/inputs'

let nippleManager: JoystickManager

const Nipple = ({ className, ...props }: { className?: string }) => {
  const ref = useRef<HTMLDivElement>(null)

  const handleStart = (_: EventData, { force, angle }: JoystickOutputData) => {
    setInput('nippleAngle', undefined)
    setInput('nippleForce', undefined)
  }

  const handleEnd = (_: EventData, { force, angle }: JoystickOutputData) => {
    setInput('nippleAngle', undefined)
    setInput('nippleForce', undefined)
  }

  const handleMove = throttle(
    { interval: 20 },
    (_: EventData, { force, angle }: JoystickOutputData) => {
      setInput('nippleAngle', angle.radian)
      setInput('nippleForce', force)
    },
  )

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