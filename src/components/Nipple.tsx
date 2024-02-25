import { useEffect, useRef } from 'react'

import clsx from 'clsx'
import { throttle } from 'radash'

import type { EventData, JoystickManager, JoystickOutputData } from 'nipplejs'

let nippleManager: JoystickManager

const Nipple = ({ className, ...props }: { className?: string }) => {
  const ref = useRef<HTMLDivElement>(null)

  const handleStart = (evt: EventData, data: JoystickOutputData) => {
    // console.log('start')
    // console.log(data)
    // data.el.style.backgroundColor = 'red'
    const joystick = nippleManager.get(data.identifier)
    console.log(joystick)
  }

  const handleEnd = (evt: EventData, data: JoystickOutputData) => {
    // console.log('end')
  }

  // const handleMove = throttle({ interval: 20 }, (evt: EventData, data: JoystickOutputData) => {
  //   // console.log(data)
  // })

  const handleMove = (evt: EventData, data: JoystickOutputData) => {
    // console.log(data)
  }

  useEffect(() => {
    const nippleFn = async () => {
      if (nippleManager) {
        return
      }
      nippleManager = (await import('nipplejs')).default.create({
        mode: 'dynamic',
        zone: ref.current as HTMLDivElement,
      })
      nippleManager.on('start', handleStart)
      nippleManager.on('end', handleEnd)
      nippleManager.on('move', handleMove)
    }
    // media query to detect hover: none
    if (window.matchMedia('(hover: none)').matches) {
      nippleFn()
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
