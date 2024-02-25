import { ReactNode, useEffect, useState } from 'react'

import { Canvas as R3FCanvas } from '@react-three/fiber'

import RendererDetector from '#/components/RendererDetector'

let WebGPURenderer: any

const Canvas = ({ children }: { children: ReactNode }) => {
  const [isWebGPUAvailable, setIsWebGPUAvailable] = useState(false)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const fn = async () => {
      if (import.meta.env.VITE_FORCE_WEBGL) {
        setIsReady(true)
        return
      }
      // @ts-ignore
      const capabilities = (await import('three/addons/capabilities/WebGPU.js')).default
      // @ts-ignore
      WebGPURenderer = (await import('three/addons/renderers/webgpu/WebGPURenderer.js')).default
      setIsWebGPUAvailable(capabilities.isAvailable())
      setIsReady(true)
    }
    fn()
  }, [])

  return (
    isReady && (
      <R3FCanvas
        dpr={[1, 1.5]}
        className="top-0 z-0"
        style={{ position: 'absolute' }}
        onContextMenu={e => e.preventDefault()}
        onPointerMove={e => {
          // if right click, enable pointer lock
          if (e.buttons === 2) {
            document.body.requestPointerLock()
          }
        }}
        onPointerUp={e => {
          // if right click, disable pointer lock
          if (e.button === 2) {
            document.exitPointerLock()
          }
        }}
        shadows
        {...(isWebGPUAvailable && {
          gl: canvas => {
            const r = new WebGPURenderer({ canvas })
            r.setClearColor(0x000000, 0)
            r.xr = { addEventListener: () => {} }
            return r
          },
        })}
      >
        {children}
        <RendererDetector />
      </R3FCanvas>
    )
  )
}

export default Canvas
