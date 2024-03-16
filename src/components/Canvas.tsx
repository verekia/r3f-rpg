import { useRef } from 'react'

import clsx from 'clsx'
import { lockPointer, Canvas as ManaCanvas } from 'manapotion'

import type { CanvasProps } from '@react-three/fiber'

const Canvas = ({ className, ...props }: CanvasProps) => {
  const longRightClickTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  return (
    <ManaCanvas
      className={clsx('top-0 z-0', className)}
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
      onClick={() => window.getSelection()?.removeAllRanges()}
      {...props}
    />
  )
}

export default Canvas
