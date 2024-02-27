import CameraFollowSystem from '#/systems/CameraFollow'
import ControlsSystem from '#/systems/ControlsSystem'
import InputSystem from '#/systems/InputSystem'
import MovementSystem from '#/systems/MovementSystem'
import RemovalSystem from '#/systems/RemovalSystem'
import TraToThreeSystem from '#/systems/TraToThreeSystem'
import VelocitySystem from '#/systems/VelocitySystem'

const Systems = () => (
  <>
    <CameraFollowSystem />
    <InputSystem />
    <ControlsSystem />
    <TraToThreeSystem />
    <VelocitySystem />
    <MovementSystem />
    <RemovalSystem />
  </>
)

export default Systems
