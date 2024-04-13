import CameraFollowSystem from '#/camera/CameraFollowSystem'
import ControlsSystem from '#/controls/ControlsSystem'
import RemovalSystem from '#/core/RemovalSystem'
import MovementSystem from '#/movement/MovementSystem'
import VelocitySystem from '#/physics/VelocitySystem'
import TraToThreeSystem from '#/rendering/TraToThreeSystem'

const Systems = () => (
  <>
    <CameraFollowSystem />
    <ControlsSystem />
    <TraToThreeSystem />
    <VelocitySystem />
    <MovementSystem />
    <RemovalSystem />
  </>
)

export default Systems
