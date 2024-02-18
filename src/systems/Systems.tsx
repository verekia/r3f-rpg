import InputSystem from '#/systems/InputSystem'
import MovementSystem from '#/systems/MovementSystem'
import TraToThreeSystem from '#/systems/TraToThreeSystem'
import VelocitySystem from '#/systems/VelocitySystem'

const Systems = () => (
  <>
    <InputSystem />
    <TraToThreeSystem />
    <VelocitySystem />
    <MovementSystem />
  </>
)

export default Systems
