import { useQuery } from '@tanstack/react-query'

import { getIsGrounded } from '#/systems/MovementSystem'

const JumpHelper = () => {
  const { data: isGrounded } = useQuery({ queryKey: ['isGrounded'], queryFn: getIsGrounded })

  if (!isGrounded) return null

  return (
    <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center text-white">
      You can jump now!
    </div>
  )
}

export default JumpHelper
