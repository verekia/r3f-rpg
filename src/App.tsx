import { useCallback } from 'react'

import {
  CanHoverEvents,
  FullscreenChangeEvents,
  getBrowserState,
  MouseDownEvents,
  MouseMoveEvents,
  PointerLockEvents,
  unlockPointer,
} from '@v1v2/engine'

import Canvas from '#/components/Canvas'
import ForestScene from '#/components/ForestScene'
import RendererInfo from '#/components/RendererInfo'
import UI from '#/components/UI'
import Landing from '#/Landing'
import { FOREST_ROUTE, LANDING_ROUTE } from '#/routes'
import useStore from '#/store'
import Systems from '#/systems/Systems'

const App = () => {
  const route = useStore(s => s.route)

  const handleRightMouseUp = useCallback(() => {
    if (getBrowserState().isPointerLocked) {
      unlockPointer()
    }
  }, [])

  return (
    <div className="relative h-full select-none">
      {route === LANDING_ROUTE ? <Landing /> : <UI />}
      <Canvas>
        {route === LANDING_ROUTE ? null : (
          <>
            <Systems />
            {route === FOREST_ROUTE && <ForestScene />}
          </>
        )}
      </Canvas>
      <RendererInfo />
      <MouseMoveEvents />
      <PointerLockEvents />
      <CanHoverEvents />
      <FullscreenChangeEvents />
      <MouseDownEvents onRightMouseUp={handleRightMouseUp} />
    </div>
  )
}

export default App
