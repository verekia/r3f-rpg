import { customAlphabet } from 'nanoid'

const numbers = '0123456789'
const lowercase = 'abcdefghijkmnopqrstuvwxyz' // Removed l
const uppercase = 'ABCDEFGHJKLMNOPQRSTUVWXYZ' // Removed I

// https://zelark.github.io/nano-id-cc/
// At 10 IDs per second, for these 12 character-long IDs, it would take ~21 years
// or 6 billion IDs to have a 1% probability of at least one collision.
// They look like "9foDHZdztDqP"

const nanoid = customAlphabet(`${numbers}${lowercase}${uppercase}`, 12)

export default nanoid
