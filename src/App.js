import React, { useRef, Suspense } from "react";
import { Canvas, useFrame } from "react-three-fiber";
import { OrbitControls } from "drei";
import Effects from "./Effects";
import Scene from "./Scene";

const Lighting = () => {
  const light = useRef()

  useFrame(({ clock }) => {
    light.current.position.x = Math.sin(clock.getElapsedTime() * 1) * 300
    light.current.position.y = Math.cos(clock.getElapsedTime() * 1) * 400
    light.current.position.z = Math.cos(clock.getElapsedTime() * 1) * 300
  })

  return (
    <>
      <ambientLight />
      <mesh ref={light}>
        <sphereBufferGeometry args={[4, 8, 8]} attach="geometry" />
        <meshBasicMaterial color="#fff" attach="material" />
        <pointLight color="#fff" intensity={1} />
      </mesh>
    </>
  )
}


function App() {
  return (
    <Canvas
      concurrent
      colorManagement
      shadowMap
      gl2
      pixelRatio={window.devicePixelRatio}
      gl={{
        powerPreference: "high-performance",
        alpha: false,
        antialias: false,
        stencil: false,
        depth: false,
      }}
      orthographic
      camera={{
        position: [-4, 4, -4],
        left: 2,
        right: 2,
        bottom: 2,
        top: 2,
        zoom: 40,
      }}
      
      style={{
        background: "#fff",
      }}
      resize={{ scroll: false }}
      
      
    >
      <color attach="background" args={["#fff"]} />
      {/* <fog color="blue" attach="fog" near={8} far={30} /> */}

      <Suspense fallback={null}>
        <Lighting />
      </Suspense>

      <Scene />
      
      <Effects />
      <OrbitControls />
    </Canvas>
  );
}

export default App;
