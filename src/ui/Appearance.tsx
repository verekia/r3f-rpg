import useStore, { Chest, Feet, Hands, Legs } from '#/core/store'
import { chest, feet, hands, legs } from '#/gear/gear'
import { players } from '#/player/players-ecs'

const Appearance = () => {
  const chestValue = useStore(s => s.chest)
  const legsValue = useStore(s => s.legs)
  const handsValue = useStore(s => s.hands)
  const feetValue = useStore(s => s.feet)
  const skin = useStore(s => s.skin)
  const hair = useStore(s => s.hair)
  const hairLength = useStore(s => s.hairLength)

  return (
    <>
      <div>
        <div>Weapon</div>
        <button
          onClick={() => {
            const [player] = players

            if (!player) return

            player.player.usePlayerStore.getState().setWeapon('sword')
          }}
        >
          Sword
        </button>
        <button
          onClick={() => {
            const [player] = players

            if (!player) return

            player.player.usePlayerStore.getState().setWeapon('gun')
          }}
        >
          Gun
        </button>
        <button
          onClick={() => {
            const [player] = players

            if (!player) return

            player.player.usePlayerStore.getState().setWeapon('dagger')
          }}
        >
          Dagger
        </button>
      </div>
      <div>
        <div>Weapon Tier</div>
        <button
          onClick={() => {
            const [player] = players

            if (!player) return

            player.player.usePlayerStore.getState().setWeaponTier('wooden')
          }}
        >
          Wooden
        </button>
        <button
          onClick={() => {
            const [player] = players

            if (!player) return

            player.player.usePlayerStore.getState().setWeaponTier('cyber')
          }}
        >
          Cyber
        </button>
        <button
          onClick={() => {
            const [player] = players

            if (!player) return

            player.player.usePlayerStore.getState().setWeaponTier('evil')
          }}
        >
          Evil
        </button>
      </div>
      <div>
        Skin
        <select
          name="skin"
          value={skin}
          onChange={e => useStore.setState({ skin: e.target.value as '#fa9' | '#8B4513' })}
        >
          <option value="#fa9">Pink</option>
          <option value="#8B4513">Brown</option>
        </select>
      </div>
      <div>
        Hair length
        <select
          name="hairLength"
          value={hairLength}
          onChange={e =>
            useStore.setState({ hairLength: e.target.value as 'long' | 'short' | 'punk' })
          }
        >
          <option value="long">Long</option>
          <option value="short">Short</option>
          <option value="punk">Punk</option>
        </select>
      </div>

      <div>
        Chest
        <select
          name="chest"
          value={chestValue}
          onChange={e => useStore.setState({ chest: e.target.value as Chest })}
        >
          <option value="none">None</option>
          {Object.entries(chest).map(([k, v]) => (
            <option key={k} value={k}>
              {v.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        Pants
        <select
          name="legs"
          value={legsValue}
          onChange={e => useStore.setState({ legs: e.target.value as Legs })}
        >
          <option value="none">None</option>
          {Object.entries(legs).map(([k, v]) => (
            <option key={k} value={k}>
              {v.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        Hands
        <select
          name="hands"
          value={handsValue}
          onChange={e => useStore.setState({ hands: e.target.value as Hands })}
        >
          <option value="none">None</option>
          {Object.entries(hands).map(([k, v]) => (
            <option key={k} value={k}>
              {v.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        Feet
        <select
          name="feet"
          value={feetValue}
          onChange={e => useStore.setState({ feet: e.target.value as Feet })}
        >
          <option value="none">None</option>
          {Object.entries(feet).map(([k, v]) => (
            <option key={k} value={k}>
              {v.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        Hair
        <select
          name="hair"
          value={hair}
          onChange={e => useStore.setState({ hair: e.target.value as '#A0522D' | '#F5DEB3' })}
        >
          <option value="#A0522D">Brown</option>
          <option value="#F5DEB3">Blonde</option>
        </select>
      </div>
    </>
  )
}

export default Appearance
