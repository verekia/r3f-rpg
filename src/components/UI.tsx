import { LANDING_ROUTE } from '#/routes'
import useStore from '#/store'
import { useInputStore } from '#/stores/inputs'

const UI = () => (
  <>
    <div className="absolute left-0 top-0 z-10 rounded-br-xl bg-slate-400 px-5 py-2 text-white">
      Health
    </div>
    <div className="absolute bottom-0 left-0 z-10 rounded-tr-xl bg-slate-400 px-5 py-2 text-white">
      Chat
    </div>
    <div className="absolute right-0 top-0 z-10 space-x-5 rounded-bl-xl bg-slate-400 px-5 py-2 text-white">
      <button
        onClick={() =>
          useInputStore.getState().inputs.fullscreen
            ? useInputStore.getState().exitFullscreen()
            : useInputStore.getState().enterFullscreen()
        }
      >
        Fullscreen
      </button>
      <button onClick={() => useStore.getState().setRoute(LANDING_ROUTE)}>Menu</button>
    </div>
    <div className="absolute bottom-0 right-0 z-10 rounded-tl-xl bg-slate-400 px-5 py-2 text-white">
      Actions
    </div>
  </>
)

export default UI
