import { useEffect, useRef, useState } from 'react'

import { CanvasProps, Canvas as R3FCanvas } from '@react-three/fiber'

let WebGPURenderer: any

export const WebGPUCanvas = ({
  children,
  forceWebGL = false,
  ...props
}: CanvasProps & { forceWebGL?: boolean }) => {
  const [isWebGPU, setIsWebGPU] = useState(false)
  const [isReady, setIsReady] = useState(false)
  const previousForceWebGLRef = useRef(forceWebGL)

  useEffect(() => {
    const loadWebGPU = async () => {
      if (!forceWebGL) {
        // @ts-expect-error
        const capabilities = (await import('three/addons/capabilities/WebGPU.js')).default
        // @ts-expect-error
        WebGPURenderer = (await import('three/addons/renderers/webgpu/WebGPURenderer.js')).default
        setIsWebGPU(capabilities.isAvailable())
        setIsReady(true)
      }
    }

    // This is to fully unmount the canvas and remount it, otherwise the renderer won't change
    if (previousForceWebGLRef.current !== forceWebGL) {
      setIsReady(false)
      if (forceWebGL) {
        setTimeout(() => setIsReady(true), 0)
      }
      previousForceWebGLRef.current = forceWebGL
    }

    if (!forceWebGL) {
      loadWebGPU()
    }
  }, [forceWebGL])

  if (!isReady) return null

  return (
    <R3FCanvas
      frameloop="never"
      dpr={[1, 1.5]}
      {...(isWebGPU &&
        !forceWebGL && {
          gl: canvas => {
            const r = new WebGPURenderer({ canvas })
            // Note: WebGPURenderer also does have a forceWebGL parameter and falls back to WebGL if WebGPU is not available
            r.setClearColor(0x000000, 0)
            r.xr = { addEventListener: () => {} }
            // From https://github.com/Lunakepio/Mario-Kart-3.js/blob/main/src/App.jsx
            // gl={{ antialias: false, stencil: false, depth:false, powerPreference: 'high-performance' }}
            // mode="concurrent"
            return r
          },
        })}
      {...props}
    >
      {children}
    </R3FCanvas>
  )
}
