import React, { Suspense, useEffect, useState, useMemo, useRef } from "react"
import { useThree } from "react-three-fiber"
import {
  Physics,
  usePlane,
} from 'use-cannon'

import Rake from './rake'

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function Plane(props) {
  const SIZE = 24

  const [ref] = usePlane(() => ({ type: 'Static', ...props }))
  return (
    <group ref={ref}>
      {/* <mesh>
        <planeBufferGeometry attach="geometry" args={[SIZE, SIZE]} />
        <meshBasicMaterial attach="material" color="#ffffff" />
      </mesh> */}
      <mesh receiveShadow>
        <planeBufferGeometry attach="geometry" args={[SIZE, SIZE]} />
        <shadowMaterial attach="material" color="lightsteelblue" />
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

  const rakeCount = 5
  const { viewport } = useThree()

  const rotations = [
    0,
    -Math.PI / 2,
    Math.PI / 2,
    Math.PI / 3,

    -Math.PI / 3,
    -Math.PI / 4,
    Math.PI / 4,
  ]
  

  const ratio = window.innerWidth / window.innerHeight

  
  return (
    <>
      <Physics
        // iterations={10}
        gravity={[0, -40, 0]}
        allowSleep={false}
        iterations={6}
        step={1 / 60}
      // size={10}
      >

        <Suspense fallback={null}>

        {[...Array(rakeCount)].map((_, i) => {

          return [...Array(rakeCount)].map((_, j) => {

            return <Rake 
              key={`${i}${j}`}
              position={[
                (i * 4) + (viewport.height * -0.666) + randomInteger(-2, 2),
                randomInteger(0.1, 4),
                (j * 4) + (viewport.height * -0.666) + randomInteger(-2, 2),
              ]}
              rotation={[
                1.25,
                0,
                rotations[Math.floor(Math.random() * rotations.length)],
              ]}
            />
          })
          
        }

        )}

        </Suspense>


        <Plane rotation={[-Math.PI / 2, 0, 0]} />

      </Physics>
      {/* <Suspense fallback={null}>
        <Rake />
      </Suspense> */}
    </>
  );
}

export default Scene;
