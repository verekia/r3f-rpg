import { Suspense, useRef } from 'react'

import { getMouse, lockPointer, useMainLoop } from '@manapotion/react'
import { Html, useProgress, useTexture } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import clsx from 'clsx'
import { MeshLambertMaterial, SRGBColorSpace } from 'three'

import { STAGE_RENDER } from '#/core/core-constants'
import useStore from '#/core/store'
import { WebGPUCanvas } from '#/rendering/WebGPUCanvas'

import type { CanvasProps } from '@react-three/fiber'

const { round } = Math

const GlobalMaterials = () => {
  useTexture('/models/palette.png', texture => {
    texture.flipY = false
    texture.colorSpace = SRGBColorSpace
    const paletteMaterial = new MeshLambertMaterial({ map: texture })
    useStore.getState().setGlobalMaterials({ palette: paletteMaterial })
  })

  return null
}

const SyncMainLoop = () => {
  const advance = useThree(s => s.advance)

  useMainLoop(({ elapsed }) => advance(elapsed), { stage: STAGE_RENDER })

  return null
}

const Loader = () => {
  const { progress } = useProgress()

  return <Html center>{round(progress)} % loaded</Html>
}

const Canvas = ({ className, children, ...props }: CanvasProps) => {
  const longLeftClickTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const longRightClickTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  return (
    <WebGPUCanvas
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
        const { left, right } = getMouse().buttons
        if (e.button === 0) {
          longLeftClickTimeoutRef.current = setTimeout(() => {
            if (left) {
              lockPointer()
            }
          }, 300)
        }
        if (e.button === 2) {
          longRightClickTimeoutRef.current = setTimeout(() => {
            if (right) {
              lockPointer()
            }
          }, 300)
        }
      }}
      onClick={() => window.getSelection()?.removeAllRanges()}
      {...props}
    >
      <Suspense fallback={<Loader />}>
        {children}
        <GlobalMaterials />
        <SyncMainLoop />
      </Suspense>
    </WebGPUCanvas>
  )
}

export default Canvas
