import * as THREE from 'three'
import React, { useMemo, useRef } from 'react'
import { useLoader, useFrame } from 'react-three-fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

import vert from "../shaders/default.vert";
import frag from "../shaders/default.frag";

import { CarPaintMaterial } from '../materials/carPaintMaterial'

import glb from './blimp.glb'

export default function Model(props) {
  const group = useRef()
  const { nodes, materials } = useLoader(GLTFLoader, glb)

  const uniforms = useMemo(
    () => ({
      time: {
        type: "f",
        value: 0.0,
      },
    }),
    []
  );

  const material = useRef();
  useFrame(() => {
    material.current.uniforms.time.value += 1;
  });

  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        geometry={nodes.Cylinder.geometry}
        position={[-0.02, 1.09, 0.22]}
        rotation={[Math.PI / 2, 0, -Math.PI / 2]}
      >
        {/* <CarPaintMaterial color={'#BECDDE'} attach="material" /> */}
      <shaderMaterial
        attach="material"
        vertexShader={vert}
        fragmentShader={frag}
        ref={material}
        uniforms={uniforms}
        vertexColors
      />
      </mesh>
    </group>
  )
}
