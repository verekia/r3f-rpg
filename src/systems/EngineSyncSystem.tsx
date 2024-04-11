import { useEffect } from 'react'

import emitter from '#/lib/emittery'
import { queryClient } from '#/lib/react-query'

const EngineSyncSystem = () => {
  useEffect(() => {
    const isGroundedUnsub = emitter.on('isGrounded', (isGrounded: boolean) => {
      if (queryClient.getQueryData(['isGrounded']) !== isGrounded) {
        queryClient.setQueryData(['isGrounded'], isGrounded)
      }
    })

    return () => {
      isGroundedUnsub()
    }
  }, [])

  return null
}

export default EngineSyncSystem
