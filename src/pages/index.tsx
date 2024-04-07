import {
  getMouse,
  KeyDownPayload,
  Listeners,
  pauseMainLoop,
  resetJoysticks,
  resetKeyboard,
  resetMouse,
  resumeMainLoop,
  unlockPointer,
} from '@manapotion/react'
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
    if (getMouse().locked && !getMouse().buttons.right) {
      unlockPointer()
    }
  }

  const handleRightMouseUp = () => {
    if (getMouse().locked && !getMouse().buttons.left) {
      unlockPointer()
    }
  }

  const handleLeftMouseDown = () => {
    if (getMouse().buttons.right) {
      pressedBothMouseButtons()
    }
  }

  const handleRightMouseDown = () => {
    if (getMouse().buttons.left) {
      pressedBothMouseButtons()
    }
  }

  const handleKeyDown = ({ code }: KeyDownPayload) => {
    code === 'Space' && pressedSpace()
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
          onRightMouseButtonUp={handleRightMouseUp}
          onLeftMouseButtonUp={handleLeftMouseUp}
          onKeyDown={handleKeyDown}
          onLeftMouseButtonDown={handleLeftMouseDown}
          onRightMouseButtonDown={handleRightMouseDown}
          onPageFocusChange={() => {
            resetKeyboard()
            resetMouse()
            resetJoysticks()
          }}
          onPageVisibilityChange={({ isPageVisible }) => {
            isPageVisible ? resumeMainLoop() : pauseMainLoop()
          }}
        />
      </div>
    </>
  )
}

export default IndexPage
