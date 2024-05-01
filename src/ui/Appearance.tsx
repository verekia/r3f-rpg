import useStore from '#/core/store'

const Appearance = () => {
  const chest = useStore(s => s.chest)
  const pants = useStore(s => s.pants)
  const gloves = useStore(s => s.gloves)
  const boots = useStore(s => s.boots)
  const skin = useStore(s => s.skin)
  const hair = useStore(s => s.hair)

  return (
    <>
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
        Chest
        <select
          name="chest"
          value={chest}
          onChange={e => useStore.setState({ chest: e.target.value as 'none' | 'basic' })}
        >
          <option value="none">None</option>
          <option value="basic">Basic</option>
        </select>
      </div>

      <div>
        Pants
        <select
          name="pants"
          value={pants}
          onChange={e => useStore.setState({ pants: e.target.value as 'none' | 'basic' })}
        >
          <option value="none">None</option>
          <option value="basic">Basic</option>
        </select>
      </div>

      <div>
        Gloves
        <select
          name="gloves"
          value={gloves}
          onChange={e => useStore.setState({ gloves: e.target.value as 'none' | 'a' | 'b' })}
        >
          <option value="none">None</option>
          <option value="a">A</option>
          <option value="b">B</option>
        </select>
      </div>

      <div>
        Boots
        <select
          name="boots"
          value={boots}
          onChange={e => useStore.setState({ boots: e.target.value as 'none' | 'a' | 'b' })}
        >
          <option value="none">None</option>
          <option value="a">A</option>
          <option value="b">B</option>
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
