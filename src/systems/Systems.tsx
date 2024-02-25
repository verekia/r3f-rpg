import CameraFollowSystem from '#/systems/CameraFollow'
import InputSystem from '#/systems/InputSystem'
import MovementSystem from '#/systems/MovementSystem'
import TraToThreeSystem from '#/systems/TraToThreeSystem'
import VelocitySystem from '#/systems/VelocitySystem'

import ControlsSystem from './ControlsSystem'

const Systems = () => (
  <>
    <CameraFollowSystem />
    <InputSystem />
    <ControlsSystem />
    <TraToThreeSystem />
    <VelocitySystem />
    <MovementSystem />
  </>
)

export default Systems
