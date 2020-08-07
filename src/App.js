import React, { useRef, Suspense } from "react";
import { Canvas, useFrame } from "react-three-fiber";
import { OrbitControls, softShadows } from "drei";
import Effects from "./Effects";
import Scene from "./Scene";

// Inject soft shadow shader
softShadows()

function App() {
  return (
    <Canvas
      concurrent
      colorManagement
      shadowMap
      gl2
      // pixelRatio={window.devicePixelRatio}
      // pixelRatio={1}
      gl={{
        powerPreference: "high-performance",
        alpha: false,
        antialias: false,
        stencil: false,
        depth: false,
      }}
      orthographic
      camera={{
        near: -40,
        far: 400,
        position: [40, 70, 80],
        zoom: 60,
      }}
      resize={{ scroll: false }}
    >
      
      <ambientLight />
      <directionalLight
        castShadow
        position={[2.5, 8, 5]}
        intensity={1.5}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <pointLight position={[-10, 0, -20]} color="#fff" intensity={0.025} />

      <color attach="background" args={["#fff"]} />

      {/* <fog color="#fff" attach="fog" near={100} far={300} /> */}

      <Scene />
      
      <Effects />
      <OrbitControls
        enableDamping
        // dampingFactor={0.1}
        // enableZoom={false}
        maxZoom={100}
        minZoom={40}
        enableRotate
        enablePan={false}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 3}
      />
    </Canvas>
  );
}

export default App;
