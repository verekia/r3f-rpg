export const gloves = {
  mittensBasic: { mesh: 'GlovesMittens', colors: ['#8a6b50', '#949494'] },
  mittensGold: { mesh: 'GlovesMittens', colors: ['#f0ac54', '#ab6915'] },
  longGlovesBasic: { mesh: 'GlovesLong', colors: ['#8a6b50', '#949494'] },
  longGlovesGold: { mesh: 'GlovesLong', colors: ['#f0ac54', '#ab6915'] },
} as const

export const boots = {
  shoesBasic: { mesh: 'ArmorShoes', colors: ['#949494', '#8a6b50', '#444'] },
}

export const chests = {
  chestBasic: { mesh: 'ArmorShirt', colors: ['#949494', '#8a6b50'] },
}

export const pants = {
  pantsBasic: { mesh: 'ArmorShorts', colors: ['#949494', '#8a6b50'] },
}
