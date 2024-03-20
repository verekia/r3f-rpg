import { useRef, useState } from 'react'

import clsx from 'clsx'
import { mp, useMP } from 'manapotion'

import { createJoystick, JoystickArea } from './JoystickArea'

mp().movementMobileJoystick = createJoystick()
mp().cameraMobileJoystick = createJoystick()

// const MobileJoysticks = ({ className, ...props }: { className?: string }) => {
//   const leftAreaRef = useRef<HTMLDivElement>(null)
//   const rightAreaRef = useRef<HTMLDivElement>(null)
//   const leftJoystickCurrentRef = useRef<HTMLDivElement>(null)
//   const leftJoystickOriginRef = useRef<HTMLDivElement>(null)
//   const leftJoystickFollowRef = useRef<HTMLDivElement>(null)
//   const [isLeftHelperShown, setIsLeftHelperShown] = useState(true)
//   const [isRightHelperShown, setIsRightHelperShown] = useState(true)

//   const leftJoystickRef = useRef<JoystickData>(createJoystick())
//   const rightJoystickRef = useRef<JoystickData>(createJoystick())

//   useFrameBefore(() => {
//     mp().movementMobileJoystick.angle = leftJoystickRef.current.followAngle
//     mp().movementMobileJoystick.force = leftJoystickRef.current.followDistance
//     mp().cameraMobileJoystick.vectorDiff.x = rightJoystickRef.current.movementX
//     mp().cameraMobileJoystick.vectorDiff.y = rightJoystickRef.current.movementY

//     leftJoystickCurrentRef.current.style.opacity = leftJoystickRef.current.isActive ? '1' : '0'
//     leftJoystickFollowRef.current.style.opacity = leftJoystickRef.current.isActive ? '1' : '0'
//     leftJoystickOriginRef.current.style.opacity = leftJoystickRef.current.isActive ? '1' : '0'

//     leftJoystickCurrentRef.current.style.transform = `translate(${leftJoystickRef.current.currentX}px, ${leftAreaRef.current.clientHeight - leftJoystickRef.current.currentY}px)`

//     leftJoystickOriginRef.current.style.transform = `translate(${leftJoystickRef.current.originX}px, ${leftAreaRef.current.clientHeight - leftJoystickRef.current.originY}px)`

//     leftJoystickFollowRef.current.style.transform = `translate(${leftJoystickRef.current.followX}px, ${leftAreaRef.current.clientHeight - leftJoystickRef.current.followY}px)`
//   })

//   return (
//     <div className={className} {...props}>
//       <JoystickArea
//         ref={leftAreaRef}
//         object={leftJoystickRef.current}
//         className="absolute left-0 top-0 z-10 h-full w-1/2 desktop:hidden"
//         onMove={() => setIsLeftHelperShown(false)}
//       >
//         {isLeftHelperShown && (
//           <div className="pointer-events-none absolute flex size-full select-none items-center justify-center">
//             Drag to move
//           </div>
//         )}
//       </JoystickArea>
//       <JoystickArea
//         ref={rightAreaRef}
//         object={rightJoystickRef.current}
//         className="absolute right-0 top-0 z-10 h-full w-1/2 desktop:hidden"
//         onMove={() => setIsRightHelperShown(false)}
//       >
//         {isRightHelperShown && (
//           <div className="pointer-events-none absolute flex size-full select-none items-center justify-center">
//             Drag to rotate the camera
//           </div>
//         )}
//       </JoystickArea>
//       <div
//         ref={leftJoystickCurrentRef}
//         className="pointer-events-none absolute -ml-4 -mt-4 size-8 rounded-full bg-red-500 transition-opacity desktop:hidden"
//       />
//       <div
//         ref={leftJoystickOriginRef}
//         className="pointer-events-none absolute -ml-4 -mt-4 size-8 rounded-full bg-blue-500 desktop:hidden"
//       />
//       <div
//         ref={leftJoystickFollowRef}
//         className="pointer-events-none absolute -ml-4 -mt-4 size-8 rounded-full bg-green-500 desktop:hidden"
//       />
//     </div>
//   )
// }

// const MobileJoysticks = ({ className, ...props }: { className?: string }) => {
//   const leftAreaRef = useRef<HTMLDivElement>(null)
//   const rightAreaRef = useRef<HTMLDivElement>(null)
//   const leftJoystickCurrentRef = useRef<HTMLDivElement>(null)
//   const leftJoystickOriginRef = useRef<HTMLDivElement>(null)
//   const leftJoystickFollowRef = useRef<HTMLDivElement>(null)
//   const [isLeftHelperShown, setIsLeftHelperShown] = useState(true)
//   const [isRightHelperShown, setIsRightHelperShown] = useState(true)

//   useFrameBefore(() => {
//     const { movementMobileJoystick } = mp()
//     leftJoystickCurrentRef.current.style.opacity = movementMobileJoystick.isActive ? '1' : '0'
//     leftJoystickFollowRef.current.style.opacity = movementMobileJoystick.isActive ? '1' : '0'
//     leftJoystickOriginRef.current.style.opacity = movementMobileJoystick.isActive ? '1' : '0'

//     leftJoystickCurrentRef.current.style.transform = `translate(${movementMobileJoystick.currentX}px, ${leftAreaRef.current.clientHeight - movementMobileJoystick.currentY}px)`

//     leftJoystickOriginRef.current.style.transform = `translate(${movementMobileJoystick.originX}px, ${leftAreaRef.current.clientHeight - movementMobileJoystick.originY}px)`

//     leftJoystickFollowRef.current.style.transform = `translate(${movementMobileJoystick.followX}px, ${leftAreaRef.current.clientHeight - movementMobileJoystick.followY}px)`
//   })

//   return (
//     <div className={className} {...props}>
//       <JoystickArea
//         ref={leftAreaRef}
//         name="movementMobileJoystick"
//         className="absolute left-0 top-0 z-10 h-full w-1/2 desktop:hidden"
//         onMove={() => setIsLeftHelperShown(false)}
//       >
//         {isLeftHelperShown && (
//           <div className="pointer-events-none absolute flex size-full select-none items-center justify-center">
//             Drag to move
//           </div>
//         )}
//       </JoystickArea>
//       <JoystickArea
//         ref={rightAreaRef}
//         name="cameraMobileJoystick"
//         className="absolute right-0 top-0 z-10 h-full w-1/2 desktop:hidden"
//         onMove={() => setIsRightHelperShown(false)}
//       >
//         {isRightHelperShown && (
//           <div className="pointer-events-none absolute flex size-full select-none items-center justify-center">
//             Drag to rotate the camera
//           </div>
//         )}
//       </JoystickArea>
//       <div
//         ref={leftJoystickCurrentRef}
//         className="pointer-events-none absolute -ml-4 -mt-4 size-8 rounded-full bg-red-500 transition-opacity desktop:hidden"
//       />
//       <div
//         ref={leftJoystickOriginRef}
//         className="pointer-events-none absolute -ml-4 -mt-4 size-8 rounded-full bg-blue-500 desktop:hidden"
//       />
//       <div
//         ref={leftJoystickFollowRef}
//         className="pointer-events-none absolute -ml-4 -mt-4 size-8 rounded-full bg-green-500 desktop:hidden"
//       />
//     </div>
//   )
// }

const MobileJoysticks = ({ className, ...props }: { className?: string }) => {
  const leftAreaRef = useRef<HTMLDivElement>(null)
  const rightAreaRef = useRef<HTMLDivElement>(null)
  const movementMobileJoystick = useMP(s => s.movementMobileJoystick)
  const [isLeftHelperShown, setIsLeftHelperShown] = useState(true)
  const [isRightHelperShown, setIsRightHelperShown] = useState(true)

  return (
    <div className={className} {...props}>
      <JoystickArea
        ref={leftAreaRef}
        name="movementMobileJoystick"
        className="absolute left-0 top-0 z-10 h-full w-1/2 desktop:hidden"
        onMove={() => setIsLeftHelperShown(false)}
      >
        {isLeftHelperShown && (
          <div className="pointer-events-none absolute flex size-full select-none items-center justify-center">
            Drag to move
          </div>
        )}
      </JoystickArea>
      <JoystickArea
        ref={rightAreaRef}
        name="cameraMobileJoystick"
        className="absolute right-0 top-0 z-10 h-full w-1/2 desktop:hidden"
        onMove={() => setIsRightHelperShown(false)}
      >
        {isRightHelperShown && (
          <div className="pointer-events-none absolute flex size-full select-none items-center justify-center">
            Drag to rotate the camera
          </div>
        )}
      </JoystickArea>
      <div
        className={clsx(
          'pointer-events-none absolute -ml-4 -mt-4 size-8 rounded-full bg-red-500 transition-opacity desktop:hidden',
          movementMobileJoystick.isActive ? 'opacity-100' : 'opacity-0',
        )}
        style={{
          transform: `translate(${movementMobileJoystick.currentX}px, ${(leftAreaRef.current?.clientHeight ?? 0) - movementMobileJoystick.currentY}px)`,
        }}
      />
      <div
        className={clsx(
          'pointer-events-none absolute -ml-4 -mt-4 size-8 rounded-full bg-blue-500 desktop:hidden',
          movementMobileJoystick.isActive ? 'opacity-100' : 'opacity-0',
        )}
        style={{
          transform: `translate(${movementMobileJoystick.originX}px, ${(leftAreaRef.current?.clientHeight ?? 0) - movementMobileJoystick.originY}px)`,
        }}
      />
      <div
        className={clsx(
          'pointer-events-none absolute -ml-4 -mt-4 size-8 rounded-full bg-green-500 desktop:hidden',
          movementMobileJoystick.isActive ? 'opacity-100' : 'opacity-0',
        )}
        style={{
          transform: `translate(${movementMobileJoystick.followX}px, ${(leftAreaRef.current?.clientHeight ?? 0) - movementMobileJoystick.followY}px)`,
        }}
      />
    </div>
  )
}

export default MobileJoysticks
