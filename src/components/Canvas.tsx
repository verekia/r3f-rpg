import { Canvas as R3FCanvas } from '@react-three/fiber'

import ForestScene from '#/components/ForestScene'
import { FOREST_ROUTE, LANDING_ROUTE } from '#/routes'
import useStore from '#/store'
import Systems from '#/systems/Systems'

const Canvas = () => {
  const route = useStore(s => s.route)

  return (
    <R3FCanvas className="top-0 z-0" style={{ position: 'absolute' }}>
      {route === LANDING_ROUTE ? null : (
        <>
          <Systems />
          {route === FOREST_ROUTE && <ForestScene />}
        </>
      )}
    </R3FCanvas>
  )
}

export default Canvas
