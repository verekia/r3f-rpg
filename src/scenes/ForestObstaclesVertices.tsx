import { useMemo } from 'react'

import { MeshProps } from '@react-three/fiber'
import { Shape } from 'three'

import contour from '#/scenes/forest-contour.json'

const { PI: pi } = Math

export const BasicFlatShape = ({
  vertices,
  color,
  y,
  materialProps = {},
  geometryRef,
  isBasicMaterial,
  ...props
}: {
  vertices: number[][]
  y: number
  color: string
  isBasicMaterial?: boolean
  materialProps?: any
  geometryRef?: any
} & MeshProps) => {
  const shape = useMemo(() => {
    const newShape = new Shape()
    newShape.moveTo(vertices[0][0], vertices[0][1])
    vertices.slice(1).forEach(point => newShape.lineTo(point[0], point[1]))
    newShape.closePath()
    return newShape
  }, [vertices])

  return (
    <mesh
      position-y={y}
      receiveShadow
      rotation-x={-pi / 2} // To convert game coordinates to Three coordinates
      {...props}
    >
      <shapeGeometry args={[shape]} ref={geometryRef} />
      {isBasicMaterial ? (
        <meshBasicMaterial color={color} {...materialProps} />
      ) : (
        <meshLambertMaterial color={color} {...materialProps} />
      )}
    </mesh>
  )
}

const ForestObstaclesVertices = () => (
  <>
    <BasicFlatShape scale={1.6} vertices={contour.points} y={0.2} color="green" />
  </>
)

export default ForestObstaclesVertices
