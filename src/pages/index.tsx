import { KeyState, Listeners, mp, unlockPointer } from 'manapotion'

import Canvas from '#/components/Canvas'
import ForestScene from '#/components/ForestScene'
// import RendererInfo from '#/components/RendererInfo'
import UI from '#/components/UI'
import Landing from '#/Landing'
import { FOREST_ROUTE, LANDING_ROUTE } from '#/routes'
import useStore from '#/store'
import { pressedSpace, pressedX } from '#/systems/ControlsSystem'
import Systems from '#/systems/Systems'

const IndexPage = () => {
  const route = useStore(s => s.route)

  const handleRightMouseUp = () => {
    if (mp().isPointerLocked) {
      unlockPointer()
    }
  }

  const handleKeyDown = (keyState: KeyState) => {
    keyState.code === 'Space' && pressedSpace()
    keyState.code === 'KeyX' && pressedX()
  }

  return (
    <div className="relative h-full">
      {route === LANDING_ROUTE ? <Landing /> : <UI />}
      <Canvas className="select-none">
        {route === LANDING_ROUTE ? null : (
          <>
            <Systems />
            {route === FOREST_ROUTE && <ForestScene />}
          </>
        )}
      </Canvas>
      {/* <RendererInfo /> */}
      <Listeners onRightMouseUp={handleRightMouseUp} onKeydown={handleKeyDown} />
    </div>
  )
}

export default IndexPage
