import { ReactNode, useRef } from 'react'

import { lockPointer, Canvas as V1V2Canvas } from '@v1v2/engine'

const Canvas = ({ children }: { children: ReactNode }) => {
  const longRightClickTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  return (
    <V1V2Canvas
      className="top-0 z-0"
      style={{ position: 'absolute' }}
      onContextMenu={e => e.preventDefault()}
      shadows
      onMouseMove={e => {
        // Note: This can cause many exceptions if the fullscreen is not allowed
        if (e.buttons === 2) {
          lockPointer()
          longRightClickTimeoutRef.current && clearTimeout(longRightClickTimeoutRef.current)
        }
      }}
      onMouseUp={e => {
        if (e.button === 2) {
          longRightClickTimeoutRef.current && clearTimeout(longRightClickTimeoutRef.current)
        }
      }}
      onMouseDown={e => {
        if (e.button === 2) {
          longRightClickTimeoutRef.current = setTimeout(() => {
            lockPointer()
          }, 300)
        }
      }}
    >
      {children}
    </V1V2Canvas>
  )
}

export default Canvas
