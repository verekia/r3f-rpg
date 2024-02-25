import PointerSystem from '#/components/PointerSystem'
import AnimationSystem from '#/systems/AnimationSystem'
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
    <AnimationSystem />
    <PointerSystem />
  </>
)

export default Systems
