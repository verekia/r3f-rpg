import { MeshLambertMaterial, SRGBColorSpace, TextureLoader } from 'three'

const texture = new TextureLoader().load('/models/palette.png')
texture.flipY = false
texture.colorSpace = SRGBColorSpace

export const paletteMaterial = new MeshLambertMaterial({ map: texture })
