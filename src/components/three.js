import React from "react"
import * as THREE from "three"
import { Canvas, useThree, useFrame } from "react-three-fiber"
import Ball from "./ball"
import "../styles/three.scss"

const pixelRatio = window.devicePixelRatio
const winW = window.innerWidth
const winH = window.innerHeight
let skipFrame = false

const Three = React.memo(function Three(props) {

  const Scene = () => {
	  const { size, gl, scene, camera } = useThree()
	  const groupRef = React.useRef(null)

	  useFrame(() => {
	    skipFrame = !skipFrame
	    if (skipFrame || props.hidden) return
	    groupRef.current.rotation.x += 0.0001
	    groupRef.current.rotation.y += 0.001
	    groupRef.current.rotation.z += 0.0001
	    gl.render(scene, camera)
	  }, 1)

    return <group ref={groupRef} position={[0, 0, Math.min(size.width, size.height) * -1.5]}>
      <Ball /><Ball /><Ball /><Ball />
    </group>
  }

  return (
  	<div id="three" className={`blend ${props.show ? 'show' : 'hide'}`}>
	    <Canvas 
	      gl={{ 
	        antialias: true, 
	        alpha: true, 
	        powerPreference: 'high-performance' 
	      }} 
	      aspect={winW / winH} noEvents orthographic 
	      camera={{ 
	        position: [0, 0, 0], 
	        near: 0.01, 
	        far: Math.min(winW, winH) * 4 
	      }} 
	      onCreated={({ gl, camera }) => {
	        gl.setPixelRatio(pixelRatio)
	      }}>
	      <Scene />
	    </Canvas>
    </div>
  )
})

export default Three
