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
        near: -16,
        far: 40,
        position: [-1, 1, -1],
        left: 40,
        right: 40,
        bottom: 40,
        top: 40,
        zoom: 55,
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
      <pointLight position={[-10, 0, -20]} color="#fff" intensity={0.5} />

      <color attach="background" args={["#fff"]} />
      {/* <fog color="blue" attach="fog" near={8} far={30} /> */}


      <Scene />
      
      <Effects />
      <OrbitControls
        enableZoom={false}
        enableDamping
        // dampingFactor={0.1}
        enableRotate
        enablePan={false}
        // maxDistance={100}
        // minDistance={5}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 3}
      />
    </Canvas>
  );
}

export default App;
