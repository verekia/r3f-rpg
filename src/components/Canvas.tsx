import { Canvas as R3FCanvas } from '@react-three/fiber'

import Engine from '#/components/Engine'
import ForestScene from '#/components/ForestScene'
import { FOREST_ROUTE, LANDING_ROUTE } from '#/routes'
import useStore from '#/store'

const Canvas = () => {
  const route = useStore(s => s.route)

  return (
    <R3FCanvas className="top-0 z-0" style={{ position: 'absolute' }}>
      {route === LANDING_ROUTE ? null : (
        <>
          <Engine />
          {route === FOREST_ROUTE && <ForestScene />}
        </>
      )}
    </R3FCanvas>
  )
}

export default Canvas
