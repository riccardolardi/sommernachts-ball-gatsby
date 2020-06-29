import React from 'react'
import * as THREE from 'three'
import { useThree } from 'react-three-fiber'

const Ball = React.memo(function Ball(props) {
	const { size } = useThree()
	const rndScale = Math.random() * Math.min(size.width, size.height) / 5 + 
		Math.min(size.width, size.height) / 10
	const rndX = Math.random() * size.width - size.width / 2
	const rndY = Math.random() * size.height - size.height / 2
	const rndZ = Math.random() * size.height - size.height / 2
	const rndPos = [rndX, rndY, rndZ]

	const scale = React.useRef(rndScale)
	const position = React.useRef(rndPos)

  return (
    <mesh position={position.current}>
      <sphereBufferGeometry attach="geometry" args={[scale.current, 64, 64]} />
      <meshBasicMaterial attach="material" color={'#ffffff'} />
    </mesh>
  )
})

export default Ball