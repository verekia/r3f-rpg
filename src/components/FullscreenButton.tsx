import { clsx } from 'clsx'

import { enterFullscreen, exitFullscreen } from '#/lib/helpers/inputs'
import { useInputStore } from '#/stores/inputs'

import { EnterFullscreenIcon, ExitFullscreenIcon } from './icons'

const FullscreenButton = ({ className, ...props }: { className?: string }) => {
  const isFullscreen = useInputStore(s => s.inputs.fullscreen)

  return (
    <button
      className={clsx(
        'inline-flex items-center justify-center rounded-md p-1 outline-none focus-visible:ring-4 focus-visible:ring-blue-400 focus-visible:ring-offset-4',
        className,
      )}
      onClick={() => (isFullscreen ? exitFullscreen() : enterFullscreen())}
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
