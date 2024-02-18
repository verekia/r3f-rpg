import Canvas from '#/components/Canvas'
import UI from '#/components/UI'
import Landing from '#/Landing'
import { LANDING_ROUTE } from '#/routes'
import useStore from '#/store'

const App = () => {
  const route = useStore(s => s.route)

  if (route === LANDING_ROUTE) {
    return <Landing />
  }

  return (
    <div className="relative h-full">
      <UI />
      <Canvas />
    </div>
  )
}

export default App
