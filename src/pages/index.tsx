import { KeyState, Listeners, mp, unlockPointer } from '@manapotion/r3f'
import Head from 'next/head'

import Canvas from '#/components/Canvas'
import ForestScene from '#/components/ForestScene'
import UI from '#/components/UI'
import Landing from '#/Landing'
import { FOREST_ROUTE, LANDING_ROUTE } from '#/routes'
import useStore from '#/store'
import { pressedBothMouseButtons, pressedSpace } from '#/systems/ControlsSystem'
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

  const handleLeftMouseDown = () => {
    if (mp().isRightMouseDown) {
      pressedBothMouseButtons()
    }
  }

  const handleRightMouseDown = () => {
    if (mp().isLeftMouseDown) {
      pressedBothMouseButtons()
    }
  }

  const handleKeyDown = (keyState: KeyState) => {
    keyState.code === 'Space' && pressedSpace()
  }

  return (
    <>
      <Head>
        <title>Mana Playground</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
          key="viewport"
        />
      </Head>
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
          onLeftMouseDown={handleLeftMouseDown}
          onRightMouseDown={handleRightMouseDown}
        />
      </div>
    </>
  )
}

export default IndexPage
