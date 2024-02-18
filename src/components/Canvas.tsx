import { Canvas as R3FCanvas } from '@react-three/fiber'

import Engine from '#/components/Engine'
import ForestScene from '#/components/ForestScene'
import { FOREST_ROUTE, LANDING_ROUTE } from '#/routes'
import useStore from '#/store'

const InnerCanvas = () => {
  const route = useStore(s => s.route)

  if (route === LANDING_ROUTE) {
    return null
  }

  return (
    <>
      {route === FOREST_ROUTE && <ForestScene />}
      <Engine />
    </>
  )
}

const Canvas = () => (
  <R3FCanvas className="top-0 z-[-1]" style={{ position: 'absolute' }}>
    <InnerCanvas />
  </R3FCanvas>
)

export default Canvas
