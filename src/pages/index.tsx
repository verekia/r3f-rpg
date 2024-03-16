import { KeyState, Listeners, mp, unlockPointer } from 'manapotion'

import Canvas from '#/components/Canvas'
import ForestScene from '#/components/ForestScene'
import UI from '#/components/UI'
import Landing from '#/Landing'
import { FOREST_ROUTE, LANDING_ROUTE } from '#/routes'
import useStore from '#/store'
import { pressedSpace } from '#/systems/ControlsSystem'
import Systems from '#/systems/Systems'

const IndexPage = () => {
  const route = useStore(s => s.route)

  const handleLeftMouseUp = () => {
    if (mp().isPointerLocked && !mp().isRightMouseDown) {
      unlockPointer()
    }
  }

  const handleRightMouseUp = () => {
    if (mp().isPointerLocked && !mp().isLeftMouseDown) {
      unlockPointer()
    }
  }

  const handleKeyDown = (keyState: KeyState) => {
    keyState.code === 'Space' && pressedSpace()
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
      <Listeners
        onRightMouseUp={handleRightMouseUp}
        onLeftMouseUp={handleLeftMouseUp}
        onKeydown={handleKeyDown}
      />
    </div>
  )
}

export default IndexPage
