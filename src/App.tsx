import Canvas from '#/components/Canvas'
import RendererInfo from '#/components/RendererInfo'
import UI from '#/components/UI'
import Landing from '#/Landing'
import { LANDING_ROUTE } from '#/routes'
import useStore from '#/store'

const App = () => {
  const route = useStore(s => s.route)

  return (
    <div className="relative h-full">
      {route === LANDING_ROUTE ? <Landing /> : <UI />}
      <Canvas />
      <RendererInfo />
    </div>
  )
}

export default App
