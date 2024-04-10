import { useEffect, useRef } from 'react'

import { useQuery } from '@tanstack/react-query'

const MidScreenErrorMessage = () => {
  const { data: message, refetch: reset } = useQuery({
    queryKey: ['MidScreenErrorMessage'],
    queryFn: () => null,
  })
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    clearTimeout(timeoutRef.current)

    if (!message) return

    timeoutRef.current = setTimeout(reset, 2000)

    return () => clearTimeout(timeoutRef.current)
  }, [message, reset])

  if (!message) return null

  return (
    <div className="pointer-events-none absolute inset-0 z-10 -mt-10 flex items-center justify-center text-red-500">
      {message}
    </div>
  )
}

export default MidScreenErrorMessage
