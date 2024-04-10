import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'

import { queryClient } from '#/lib/react-query'
import { getIsGrounded } from '#/systems/MovementSystem'

const MidScreenErrorMessage = () => {
  const { data: message } = useQuery({
    queryKey: ['MidScreenErrorMessage'],
    queryFn: getIsGrounded,
  })

  useEffect(() => {
    let timeout = null

    if (message) {
      timeout = setTimeout(() => {
        queryClient.setQueryData(['MidScreenErrorMessage'], null)
      }, 2000)
    }

    return () => {
      clearTimeout(timeout)
    }
  }, [message])

  if (!message) return null

  return (
    <div className="pointer-events-none absolute inset-0 z-10 -mt-10 flex items-center justify-center text-red-500">
      {message}
    </div>
  )
}

export default MidScreenErrorMessage
