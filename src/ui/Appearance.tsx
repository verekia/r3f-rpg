import useStore, { Boots, Chest, Glove, Pants } from '#/core/store'
import { players } from '#/player/players-ecs'

const Appearance = () => {
  const chest = useStore(s => s.chest)
  const pants = useStore(s => s.pants)
  const gloves = useStore(s => s.gloves)
  const boots = useStore(s => s.boots)
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
          onChange={e => useStore.setState({ skin: e.target.value as '#FFC0CB' | '#8B4513' })}
        >
          <option value="#FFC0CB">Pink</option>
          <option value="#8B4513">Brown</option>
        </select>
      </div>
      <div>
        Hair length
        <select
          name="hairLength"
          value={hairLength}
          onChange={e => useStore.setState({ hairLength: e.target.value as 'long' | 'short' })}
        >
          <option value="long">Long</option>
          <option value="short">Short</option>
        </select>
      </div>

      <div>
        Chest
        <select
          name="chest"
          value={chest}
          onChange={e => useStore.setState({ chest: e.target.value as Chest })}
        >
          <option value="none">None</option>
          <option value="chestBasic">Basic</option>
          <option value="chestGold">Gold</option>
        </select>
      </div>

      <div>
        Pants
        <select
          name="pants"
          value={pants}
          onChange={e => useStore.setState({ pants: e.target.value as Pants })}
        >
          <option value="none">None</option>
          <option value="pantsBasic">Basic</option>
          <option value="pantsGold">Gold</option>
        </select>
      </div>

      <div>
        Gloves
        <select
          name="gloves"
          value={gloves}
          onChange={e => useStore.setState({ gloves: e.target.value as Glove })}
        >
          <option value="none">None</option>
          <option value="mittensBasic">mittensBasic</option>
          <option value="mittensGold">mittensGold</option>
          <option value="longGlovesBasic">longGlovesBasic</option>
          <option value="longGlovesGold">longGlovesGold</option>
        </select>
      </div>

      <div>
        Boots
        <select
          name="boots"
          value={boots}
          onChange={e => useStore.setState({ boots: e.target.value as Boots })}
        >
          <option value="none">None</option>
          <option value="shoesBasic">shoesBasic</option>
          <option value="shoesGold">shoesGold</option>
          <option value="longBasic">longBasic</option>
          <option value="longGold">longGold</option>
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
