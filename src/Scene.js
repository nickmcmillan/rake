import React, { Suspense, useEffect, useState, useMemo, useRef } from "react"
import * as THREE from 'three'
import { Canvas, useFrame, useThree, useLoader } from "react-three-fiber"
import {
  Physics,
  useBox,
  useSphere,
  usePlane,
  useCompoundBody,
} from 'use-cannon'
import throttle from 'lodash.throttle'
import Rake from './rake'

function threeVector(vec) {
  return new THREE.Vector3(vec[0], vec[1], vec[2]);
}


function Plane(props) {
  const [ref] = usePlane(() => ({ type: 'Static', ...props }))
  return (
    <group ref={ref}>
      <mesh>
        <planeBufferGeometry attach="geometry" args={[8, 8]} />
        <meshBasicMaterial attach="material" color="#ffb385" />
      </mesh>
      <mesh receiveShadow>
        <planeBufferGeometry attach="geometry" args={[8, 8]} />
        <shadowMaterial attach="material" color="lightsalmon" />
      </mesh>
    </group>
  )
}



function CompoundBody(props) {
  const [hovered, setHover] = useState(false)
  const { viewport } = useThree()

  const handle = [0.15, 4.35, 0.15]
  const handlePosition = [0, 0, 0]

  const teethDimensions = [1.75, 0.05, 0.42]
  const teethPosition = [0, 2.1, -0.11]

  const [ref, api] = useCompoundBody(() => ({
    mass: 14.5,
    ...props,
    shapes: [
      { type: 'Box', position: handlePosition, rotation: [0, 0, 0], args: handle },
      { type: 'Box', position: teethPosition, rotation: [0, 0, 0], args: teethDimensions },
    ],
  }))

  
  const rotationRef = useRef([0, 0, 0])
  useEffect(() => api.rotation.subscribe((v) => (rotationRef.current = v)), [])

  const refClock = useRef(new Date().getTime())
  const WAIT = 1000

  useEffect(() => {

    if (hovered) {

      if (refClock.current + WAIT < new Date().getTime()) {

        api.applyLocalImpulse(
          [0, 0, rotationRef.current[0] < 0 ? 100 : -100],
          [0, -2, 0],
        )
        refClock.current = new Date().getTime()
      }
    }

  }, [hovered, api])

  return (
    <group
      ref={ref}
      onPointerOver={e => setHover(true)}
      onPointerOut={e => setHover(false)}
    >
      <Suspense fallback={null}>
        <Rake />
      </Suspense>

      <mesh castShadow dispose={null}>
        <boxBufferGeometry attach="geometry" args={handle} />
        <meshNormalMaterial attach="material" transparent opacity={0.3} />
      </mesh>
      <mesh castShadow position={teethPosition} dispose={null}>
        <boxBufferGeometry attach="geometry" args={teethDimensions} />
        <meshNormalMaterial attach="material" />
      </mesh>
    </group>
  )
}

// function InstancedObjects({ count = 20 }) {

//   return (
//     <instancedMesh
//       ref={ref}
//       castShadow
//       receiveShadow
//       args={[null, null, count]}
//       onPointerOver={e => setHover(true)}
//       onPointerOut={e => setHover(false)}
//     >
//       <boxBufferGeometry attach="geometry" args={dimensions} />
//       <meshPhysicalMaterial
//         clearcoat={1}
//         clearcoatRoughness={0.1}
//         normalScale={[1.4, 1.4]}
//         // normalMap={carbon}
//         roughness={0.2}
//         metalness={0.2}
//         // color="black"
//         color={hovered ? 'hotpink' : 'orange'}
//         attach="material"
//         transparent
//       />
//       {/* <boxBufferGeometry attach="geometry" args={dimensions} />
//       <meshPhongMaterial attach="material" color={'orange'} /> */}
//     </instancedMesh>
//   )
// }


function Scene() {

  return (
    <>
      <Physics
        // iterations={10}
        gravity={[0, -25, 0]}
        allowSleep={false}
        iterations={6}
        step={1 / 60}
      // size={10}
      >
        {/* <Cube /> */}
        {/* <InstancedObjects /> */}
        <CompoundBody position={[1.5, 1, 0.5]} rotation={[1.25, 0, 0]} />

        <Plane rotation={[-Math.PI / 2, 0, 0]} />

      </Physics>
      {/* <Suspense fallback={null}>
        <Rake />
      </Suspense> */}
    </>
  );
}

export default Scene;
