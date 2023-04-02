import React from "react"
import { Three as _Three } from "three"
import { Canvas, useThree, useFrame } from "@react-three/fiber"
import Ball from "./ball"
import "../styles/three.scss"

const pixelRatio = typeof window !== "undefined" ? window.devicePixelRatio : 0
const winW = typeof window !== "undefined" ? window.innerWidth : 0
const winH = typeof window !== "undefined" ? window.innerHeight : 0
let skipFrame = false

const Three = React.memo(function _Three(props) {
	const Scene = (props) => {
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

		return props.hidden ? null : (
			<group
				ref={groupRef}
				position={[0, 0, Math.min(size.width, size.height) * -1.5]}
			>
				<Ball />
				<Ball />
				<Ball />
				<Ball />
			</group>
		)
	}

	return (
		<div
			id="three"
			role="complementary"
			className={`blend ${props.show ? "show" : "hide"}`}
		>
			<Canvas
				gl={{
					antialias: true,
					alpha: true,
					powerPreference: "high-performance",
				}}
				aspect={winW / winH}
				noEvents
				orthographic
				camera={{
					position: [0, 0, 0],
					near: 0.01,
					far: Math.min(winW, winH) * 4,
				}}
				onCreated={({ gl, camera }) => {
					gl.setPixelRatio(pixelRatio)
				}}
			>
				<Scene hidden={!props.show} />
			</Canvas>
		</div>
	)
})

export default Three
