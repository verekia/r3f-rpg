import FullscreenButton from '#/components/FullscreenButton'
import Nipple from '#/components/Nipple'
import { LANDING_ROUTE } from '#/routes'
import useStore from '#/store'
import { pressedJumpButton, pressedUTurnButton } from '#/systems/ControlsSystem'

const UI = () => (
  <>
    <Nipple className="absolute inset-0 z-10 h-full" />
    <div className="absolute left-0 top-0 z-10 rounded-br-xl bg-slate-400 px-5 py-2 text-white">
      Health
    </div>
    <div className="absolute bottom-0 left-0 z-10 rounded-tr-xl bg-slate-400 px-5 py-2 text-white">
      Chat
    </div>
    <div className="absolute right-0 top-0 z-10 flex items-center space-x-5 rounded-bl-xl px-5 py-2">
      <FullscreenButton className="bg-black/50 text-white hover:bg-black/60" />
      <button onClick={() => useStore.getState().setRoute(LANDING_ROUTE)}>Menu</button>
    </div>
    <div
      className="absolute bottom-10 left-10 z-10 rounded-md bg-black/50 p-2 text-white hover-hover:hidden"
      onPointerDown={pressedUTurnButton}
    >
      U-turn
    </div>
    <div
      className="absolute bottom-16 right-10 z-10 rounded-md bg-black/50 p-2 text-white hover-hover:hidden"
      onPointerDown={pressedJumpButton}
    >
      Jump
    </div>
    <div className="absolute bottom-10 left-10 z-10 rounded-tl-xl px-5  py-2 hover-none:hidden">
      X: U-Turn, Space: Jump
    </div>
    <div className="absolute bottom-0 right-0 z-10 rounded-tl-xl bg-slate-400 px-5 py-2 text-white">
      Actions
    </div>
  </>
)

export default UI
