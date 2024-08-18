const BASIC_PRIMARY = '#949494'
const BASIC_SECONDARY = '#8a6b50'

const CYBER_PRIMARY = '#eee'
const CYBER_SECONDARY = '#0fd'

const EVIL_PRIMARY = '#222'
const EVIL_SECONDARY = '#a00'

const SOLE = '#555'

export const chest = {
  chestBasic: {
    name: 'Basic Chestplate',
    mesh: 'ArmorShirt',
    colors: [BASIC_PRIMARY, BASIC_SECONDARY],
  },
  chestCyber: {
    name: 'Cyber Chestplate',
    mesh: 'ArmorShirt',
    colors: [CYBER_PRIMARY, CYBER_SECONDARY],
  },
  chestEvil: {
    name: 'Evil Chestplate',
    mesh: 'ArmorShirt',
    colors: [EVIL_PRIMARY, EVIL_SECONDARY],
  },
} as const

export const legs = {
  shortsBasic: {
    name: 'Basic Shorts',
    mesh: 'ArmorShorts',
    colors: [BASIC_PRIMARY, BASIC_SECONDARY],
  },
  shortsCyber: {
    name: 'Cyber Shorts',
    mesh: 'ArmorShorts',
    colors: [CYBER_PRIMARY, CYBER_SECONDARY],
  },
  shortsEvil: {
    name: 'Evil Shorts',
    mesh: 'ArmorShorts',
    colors: [EVIL_PRIMARY, EVIL_SECONDARY],
  },
  skirtBasic: { name: 'Basic Skirt', mesh: 'ArmorSkirt', colors: [BASIC_PRIMARY, BASIC_SECONDARY] },
  skirtCyber: { name: 'Cyber Skirt', mesh: 'ArmorSkirt', colors: [CYBER_PRIMARY, CYBER_SECONDARY] },
  skirtEvil: { name: 'Evil Skirt', mesh: 'ArmorSkirt', colors: [EVIL_PRIMARY, EVIL_SECONDARY] },
} as const

export const hands = {
  glovesBasic: {
    name: 'Basic Gloves',
    mesh: 'ArmorGloves',
    colors: [BASIC_PRIMARY, BASIC_SECONDARY],
  },
  glovesCyber: {
    name: 'Cyber Gloves',
    mesh: 'ArmorGloves',
    colors: [CYBER_PRIMARY, CYBER_SECONDARY],
  },
  glovesEvil: {
    name: 'Evil Gloves',
    mesh: 'ArmorGloves',
    colors: [EVIL_PRIMARY, EVIL_SECONDARY],
  },
} as const

export const feet = {
  shoesBasic: {
    name: 'Basic Shoes',
    mesh: 'ArmorShoes',
    colors: [BASIC_PRIMARY, BASIC_SECONDARY, SOLE],
  },
  shoesCyber: {
    name: 'Cyber Shoes',
    mesh: 'ArmorShoes',
    colors: [CYBER_PRIMARY, CYBER_SECONDARY, SOLE],
  },
  shoesEvil: {
    name: 'Evil Shoes',
    mesh: 'ArmorShoes',
    colors: [EVIL_PRIMARY, EVIL_SECONDARY, SOLE],
  },
} as const
