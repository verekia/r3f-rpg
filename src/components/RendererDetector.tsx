import { useThree } from '@react-three/fiber'

import useStore from '#/store'

const RendererDetector = () => {
  const { gl } = useThree()
  const rendererName = useStore(s => s.rendererName)

  // @ts-expect-error
  if (gl.isWebGPURenderer && rendererName !== 'WebGPU') {
    useStore.getState().setRendererName('WebGPU')
  }

  // @ts-expect-error
  if (gl.isWebGLRenderer && rendererName !== 'WebGL') {
    useStore.getState().setRendererName('WebGL')
  }

  return null
}

export default RendererDetector
