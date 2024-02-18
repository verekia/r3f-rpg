import { useRef, useState } from 'react'

import { MeshProps, Canvas as R3FCanvas, useFrame } from '@react-three/fiber'
import { Mesh } from 'three'

import Engine from '#/components/Engine'

const Box = (props: MeshProps) => {
  const meshRef = useRef<Mesh>(null)
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)

  useFrame((_, dt) => (meshRef.current!.rotation.x += dt))

  return (
    <mesh
      {...props}
      ref={meshRef}
      scale={active ? 1.5 : 1}
      onClick={() => setActive(!active)}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

const Scene = () => (
  <>
    <ambientLight intensity={Math.PI / 2} />
    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
    <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
    <Box position={[-1.2, 0, 0]} />
    <Box position={[1.2, 0, 0]} />
  </>
)

const Canvas = () => (
  <R3FCanvas>
    <Scene />
    <Engine />
  </R3FCanvas>
)

export default Canvas
