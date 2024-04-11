import { useMovementStore } from '#/movement/movement-store'

const JumpHelper = () => {
  const isGrounded = useMovementStore(s => s.isGrounded)

  if (!isGrounded) return null

  return (
    <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center text-white">
      You can jump now!
    </div>
  )
}

export default JumpHelper
