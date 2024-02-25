import PointerSystem from '#/components/PointerSystem'
import CameraFollowSystem from '#/systems/CameraFollow'
import InputSystem from '#/systems/InputSystem'
import MovementSystem from '#/systems/MovementSystem'
import TraToThreeSystem from '#/systems/TraToThreeSystem'
import VelocitySystem from '#/systems/VelocitySystem'

const Systems = () => (
  <>
    <CameraFollowSystem />
    <InputSystem />
    <TraToThreeSystem />
    <VelocitySystem />
    <MovementSystem />
    <PointerSystem />
  </>
)

export default Systems
