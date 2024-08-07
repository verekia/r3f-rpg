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

import {
  pressedBothMouseButtons,
  pressedOne,
  pressedSpace,
  pressedThree,
  pressedTwo,
} from '#/controls/ControlsSystem'
import useStore from '#/core/store'
import Systems from '#/core/Systems'
import Canvas from '#/rendering/Canvas'
import { FOREST_ROUTE, LANDING_ROUTE } from '#/routing/routes'
import ForestScene from '#/scenes/ForestScene'
import UI from '#/ui/UI'
import Landing from '#/website/Landing'

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
    code === 'Digit1' && pressedOne()
    code === 'Digit2' && pressedTwo()
    code === 'Digit3' && pressedThree()
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
