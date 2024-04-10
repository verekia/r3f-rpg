import FullscreenButton from '#/components/FullscreenButton'
import JumpHelper from '#/components/JumpHelper'
import MidScreenErrorMessage from '#/components/MidScreenErrorMessage'
import MobileJoysticks from '#/components/MobileJoysticks'
import { LANDING_ROUTE } from '#/routes'
import useStore from '#/store'
import { pressedJumpButton } from '#/systems/ControlsSystem'

const UI = () => (
  <>
    <MobileJoysticks className="absolute inset-0 z-10 h-full desktop:hidden" />
    <div className="absolute left-0 top-0 z-10 select-none rounded-br-xl bg-slate-400 px-5 py-2 text-white">
      Health
    </div>
    <div className="absolute bottom-0 left-0 z-10 rounded-tr-xl bg-slate-400 px-5 py-2 text-white">
      Chat
    </div>
    <div className="absolute right-0 top-0 z-10 flex select-none items-center space-x-5 rounded-bl-xl px-5 py-2">
      <FullscreenButton className="bg-black/50 text-white hover:bg-black/60" />
      <button onClick={() => useStore.getState().setRoute(LANDING_ROUTE)}>Menu</button>
    </div>
    <div
      className="absolute bottom-16 right-10 z-10 select-none rounded-md bg-black/50 p-2 text-white desktop:hidden"
      onPointerDown={pressedJumpButton}
    >
      Jump
    </div>
    <div className="absolute bottom-0 right-0 z-10 select-none rounded-tl-xl bg-slate-400 px-5 py-2 text-white">
      Actions
    </div>
    <JumpHelper />
    <MidScreenErrorMessage />
  </>
)

export default UI
