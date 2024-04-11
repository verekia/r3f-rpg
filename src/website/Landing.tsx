import useStore from '#/core/store'
import { FOREST_ROUTE } from '#/routing/routes'

const Landing = () => (
  <div className="relative z-10 flex h-full items-center justify-center">
    <button
      className="rounded-xl bg-slate-400 px-5 py-3 text-white"
      onClick={() => useStore.getState().setRoute(FOREST_ROUTE)}
    >
      Play
    </button>
  </div>
)

export default Landing
