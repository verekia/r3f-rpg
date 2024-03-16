import { Suspense, useEffect, useRef } from 'react'

import clsx from 'clsx'
import { lockPointer, Canvas as ManaCanvas, mp } from 'manapotion'
import { suspend } from 'suspend-react'
import { MeshLambertMaterial, SRGBColorSpace, TextureLoader } from 'three'

import useStore from '#/store'

import type { CanvasProps } from '@react-three/fiber'

const GlobalMaterials = () => {
  console.log('GlobalMaterials')

  suspend(async () => {
    // TODO: This doesn't do anything, it's not async
    const texture = new TextureLoader().load('/models/palette.png')
    texture.flipY = false
    texture.colorSpace = SRGBColorSpace
    const paletteMaterial = new MeshLambertMaterial({ map: texture })
    useStore.getState().setGlobalMaterials({ palette: paletteMaterial })
  }, [])

  return null
}

const Canvas = ({ className, children, ...props }: CanvasProps) => {
  const longLeftClickTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const longRightClickTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  return (
    <ManaCanvas
      className={clsx('top-0 z-0', className)}
      style={{ position: 'absolute' }}
      onContextMenu={e => e.preventDefault()}
      shadows
      onMouseMove={e => {
        // Note: This can cause many exceptions if the fullscreen is not allowed
        if (e.buttons === 1 || e.buttons === 2 || e.buttons === 3) {
          lockPointer()
          longLeftClickTimeoutRef.current && clearTimeout(longLeftClickTimeoutRef.current)
          longRightClickTimeoutRef.current && clearTimeout(longRightClickTimeoutRef.current)
        }
      }}
      onMouseUp={e => {
        if (e.button === 0) {
          longLeftClickTimeoutRef.current && clearTimeout(longLeftClickTimeoutRef.current)
        }
        if (e.button === 2) {
          longRightClickTimeoutRef.current && clearTimeout(longRightClickTimeoutRef.current)
        }
      }}
      onMouseDown={e => {
        if (e.button === 0) {
          longLeftClickTimeoutRef.current = setTimeout(() => {
            if (mp().isLeftMouseDown) {
              lockPointer()
            }
          }, 300)
        }
        if (e.button === 2) {
          longRightClickTimeoutRef.current = setTimeout(() => {
            if (mp().isRightMouseDown) {
              lockPointer()
            }
          }, 300)
        }
      }}
      onClick={() => window.getSelection()?.removeAllRanges()}
      {...props}
    >
      <Suspense fallback={null}>
        {children}
        <GlobalMaterials />
      </Suspense>
    </ManaCanvas>
  )
}

export default Canvas
