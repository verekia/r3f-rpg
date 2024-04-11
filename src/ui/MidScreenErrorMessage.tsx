import { useEffect, useRef } from 'react'

import { useUIStore } from '#/ui/ui-store'

const MidScreenErrorMessage = () => {
  const message = useUIStore(s => s.ui.midScreenErrorMessage)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    clearTimeout(timeoutRef.current)

    if (!message) return

    timeoutRef.current = setTimeout(
      () => useUIStore.getState().setUI('midScreenErrorMessage', null),
      2000,
    )

    return () => clearTimeout(timeoutRef.current)
  }, [message])

  if (!message) return null

  return (
    <div className="pointer-events-none absolute inset-0 z-10 -mt-10 flex items-center justify-center text-red-500">
      {message}
    </div>
  )
}

export default MidScreenErrorMessage
