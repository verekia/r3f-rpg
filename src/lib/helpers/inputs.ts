export const lockEscape = () => {
  if ('keyboard' in navigator && 'lock' in (navigator.keyboard as any)) {
    ;((navigator.keyboard as any).lock as any)(['Escape'])
  }
}

export const unlockEscape = () => {
  if ('keyboard' in navigator && 'unlock' in (navigator.keyboard as any)) {
    ;((navigator.keyboard as any).unlock as any)()
  }
}

export const lockLandscape = () => {
  if (screen.orientation.type.startsWith('landscape')) {
    return
  }
  if ('lock' in screen.orientation) {
    screen.orientation.lock('landscape')
  }
}

export const unlockOrientation = () => {
  if ('unlock' in screen.orientation) {
    screen.orientation.unlock()
  }
}

export const enterFullscreen = () => {
  if (document.documentElement.requestFullscreen) {
    document.documentElement.requestFullscreen()
  } else if ((document.documentElement as any).mozRequestFullScreen) {
    ;(document.documentElement as any).mozRequestFullScreen()
  } else if ((document.documentElement as any).webkitRequestFullscreen) {
    ;(document.documentElement as any).webkitRequestFullscreen()
  } else if ((document.documentElement as any).msRequestFullscreen) {
    ;(document.documentElement as any).msRequestFullscreen()
  }

  lockLandscape()
  lockEscape()
}

export const exitFullscreen = () => {
  if (document.exitFullscreen) {
    document.exitFullscreen()
  } else if ((document as any).mozCancelFullScreen) {
    ;(document as any).mozCancelFullScreen()
  } else if ((document as any).webkitExitFullscreen) {
    ;(document as any).webkitExitFullscreen()
  } else if ((document as any).msExitFullscreen) {
    ;(document as any).msExitFullscreen()
  }

  unlockOrientation()
  unlockEscape()
}
