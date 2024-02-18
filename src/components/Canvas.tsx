import { useEffect, useState } from 'react'

import { Canvas as R3FCanvas } from '@react-three/fiber'

import ForestScene from '#/components/ForestScene'
import RendererDetector from '#/components/RendererDetector'
import { FOREST_ROUTE, LANDING_ROUTE } from '#/routes'
import useStore from '#/store'
import Systems from '#/systems/Systems'

let WebGPURenderer: any

const Canvas = () => {
  const route = useStore(s => s.route)
  const [isWebGPUAvailable, setIsWebGPUAvailable] = useState(false)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const fn = async () => {
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
        className="top-0 z-0"
        style={{ position: 'absolute' }}
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
        {route === LANDING_ROUTE ? null : (
          <>
            <Systems />
            {route === FOREST_ROUTE && <ForestScene />}
          </>
        )}
        <RendererDetector />
      </R3FCanvas>
    )
  )
}

export default Canvas
