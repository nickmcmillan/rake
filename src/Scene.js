import React, { Suspense, useEffect, useState, useMemo, useRef } from "react"
import { useThree } from "react-three-fiber"
import {
  Physics,
  usePlane,
} from 'use-cannon'
import useSound from 'use-sound'
import { Html } from "drei";

import Rake from './rake'
import whack from './audio/mp3/whack.mp3'
import bob from './audio/mp3/bob.mp3'
import drop from './audio/mp3/drop.mp3'

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function Plane(props) {
  const SIZE = 40

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


function Scene({ soundEnabled }) {

  const rakeCount = 6
  const { viewport } = useThree()

  const rotations = [
    0,
    -Math.PI / 2,
    Math.PI / 2,
    -Math.PI / 3,
    Math.PI / 3,
  ]

  const [playWhack] = useSound(whack, { interrupt: true, soundEnabled });
  const [playBob] = useSound(bob, { interrupt: true, soundEnabled })
  const [playDrop, { isPlaying }] = useSound(drop, { interrupt: true, soundEnabled })

  const readyForBobSound = useRef(false)
  const soundClock = useRef(new Date().getTime())

  useEffect(() => {
    if (!isPlaying && readyForBobSound.current) {
      if (soundClock.current + 3000 < new Date().getTime()) {
        playBob()
        soundClock.current = new Date().getTime()
      }
    }
    
    // // otherwise it plays on load
    if (soundEnabled) {
      setTimeout(() => {
        readyForBobSound.current = true
      }, 4000)
    }
  }, [isPlaying, playBob, soundEnabled])

  return (
    <Physics
      gravity={[0, -40, 0]}
      // allowSleep={false}
      iterations={6}
      step={1 / 40}
      size={rakeCount * rakeCount + 1}
    >

      <Suspense fallback={<Html>holup</Html>}>

        {[...Array(rakeCount)].map((_, i) => {

          return [...Array(rakeCount)].map((_, j) => {

            return <Rake 
              key={`${i}${j}`}
              position={[
                (i * 4) + (viewport.height * -0.666) + randomInteger(-3, 2),
                randomInteger(0.1, 4),
                (j * 4) + (viewport.height * -0.666) + randomInteger(-3, 2),
              ]}
              rotation={[
                1.25,
                0,
                rotations[Math.floor(Math.random() * rotations.length)],
              ]}
              onWhack={playWhack}
              onWhackRest={playDrop}
            />
          })
          
        })}

      </Suspense>

      <Plane rotation={[-Math.PI / 2, 0, 0]} />

    </Physics>

  )
}

export default Scene
