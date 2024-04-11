import CameraFollowSystem from '#/systems/CameraFollow'
import ControlsSystem from '#/systems/ControlsSystem'
import EngineSyncSystem from '#/systems/EngineSyncSystem'
import MovementSystem from '#/systems/MovementSystem'
import RemovalSystem from '#/systems/RemovalSystem'
import TraToThreeSystem from '#/systems/TraToThreeSystem'
import VelocitySystem from '#/systems/VelocitySystem'

const Systems = () => (
  <>
    <CameraFollowSystem />
    <ControlsSystem />
    <TraToThreeSystem />
    <VelocitySystem />
    <MovementSystem />
    <RemovalSystem />
    <EngineSyncSystem />
  </>
)

export default Systems
