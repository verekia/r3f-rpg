import {
  enterFullscreen,
  exitFullscreen,
  lockKeys,
  lockOrientation,
  unlockKeys,
  unlockOrientation,
  useIsFullscreen,
} from '@manapotion/r3f'
import { clsx } from 'clsx'

import { EnterFullscreenIcon, ExitFullscreenIcon } from '#/components/icons'

const FullscreenButton = ({ className, ...props }: { className?: string }) => {
  const isFullscreen = useIsFullscreen()

  return (
    <button
      className={clsx(
        'inline-flex items-center justify-center rounded-md p-1 outline-none focus-visible:ring-4 focus-visible:ring-blue-400 focus-visible:ring-offset-4',
        className,
      )}
      onClick={() => {
        if (isFullscreen) {
          exitFullscreen()
          unlockKeys()
          unlockOrientation()
        } else {
          enterFullscreen()
          lockOrientation('landscape')
          lockKeys(['Escape'])
        }
      }}
      {...props}
    >
      {isFullscreen ? (
        <ExitFullscreenIcon className="size-8" />
      ) : (
        <EnterFullscreenIcon className="size-8" />
      )}
    </button>
  )
}

export default FullscreenButton
