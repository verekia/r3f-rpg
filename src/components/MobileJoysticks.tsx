import { useRef, useState } from 'react'

import { getJoysticks, JoystickArea, useFrameEffect } from '@manapotion/r3f'

const MobileJoysticks = ({ className, ...props }: { className?: string }) => {
  const leftAreaRef = useRef<HTMLDivElement>(null)
  const rightAreaRef = useRef<HTMLDivElement>(null)
  const leftJoystickCurrentRef = useRef<HTMLDivElement>(null)
  const leftJoystickFollowRef = useRef<HTMLDivElement>(null)
  const [isLeftHelperShown, setIsLeftHelperShown] = useState(true)
  const [isRightHelperShown, setIsRightHelperShown] = useState(true)

  useFrameEffect(() => {
    const movementJoystick = getJoysticks().movement

    if (!leftJoystickCurrentRef.current || !leftJoystickFollowRef.current) {
      return
    }

    leftJoystickCurrentRef.current.style.opacity = movementJoystick.isActive ? '1' : '0'
    leftJoystickFollowRef.current.style.opacity = movementJoystick.isActive ? '1' : '0'

    leftJoystickCurrentRef.current.style.transform = `translate(${movementJoystick.current.x}px, ${-movementJoystick.current.y}px)`

    leftJoystickFollowRef.current.style.transform = `translate(${movementJoystick.follow.x}px, ${-movementJoystick.follow.y}px)`
  })

  return (
    <div className={className} {...props}>
      <JoystickArea
        ref={leftAreaRef}
        joystick={getJoysticks().movement}
        maxFollowDistance={50}
        className="absolute left-0 top-0 z-10 h-full w-1/2 desktop:hidden"
        onMove={() => setIsLeftHelperShown(false)}
      >
        {isLeftHelperShown && (
          <div className="pointer-events-none absolute flex size-full select-none items-center justify-center">
            Drag to move
          </div>
        )}
        <div
          ref={leftJoystickCurrentRef}
          className="pointer-events-none absolute -bottom-6 -left-6 size-12 rounded-full bg-red-500 transition-opacity desktop:hidden"
        />
        <div
          ref={leftJoystickFollowRef}
          className="pointer-events-none absolute -bottom-6 -left-6 size-12 rounded-full bg-green-500 transition-opacity desktop:hidden"
        />
      </JoystickArea>
      <JoystickArea
        ref={rightAreaRef}
        joystick={getJoysticks().rotation}
        maxFollowDistance={50}
        className="absolute right-0 top-0 z-10 h-full w-1/2 desktop:hidden"
        onMove={() => setIsRightHelperShown(false)}
      >
        {isRightHelperShown && (
          <div className="pointer-events-none absolute flex size-full select-none items-center justify-center">
            Drag to rotate the camera
          </div>
        )}
      </JoystickArea>
    </div>
  )
}

export default MobileJoysticks
