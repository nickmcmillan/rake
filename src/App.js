import React, { useRef, useState, Suspense } from "react";
import { Canvas, useFrame } from "react-three-fiber";
import { OrbitControls, softShadows } from "drei";
import Effects from "./Effects";
import Scene from "./Scene";

// Inject soft shadow shader
softShadows()

function App() {

  const [soundEnabled, setSoundEnabled] = useState(false)

  return (
    <>
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
          zoom: window.innerWidth > 768 ? 55 : 40,
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

        <Scene soundEnabled={soundEnabled} />
        
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

      <button
        onClick={() => setSoundEnabled(!soundEnabled)}
        className="btn"
      >
        <span className="sr-only">
          Press to {soundEnabled ? 'disable' : 'enable'} sound
        </span>
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" viewBox="0 0 100 100" className="svg">
        <path 
          d="M50,12.8c20.5,0,37.2,16.7,37.2,37.2S70.5,87.2,50,87.2c-20.5,0-37.2-16.7-37.2-37.2S29.5,12.8,50,12.8 M50,5  C25.1,5,5,25.2,5,50c0,24.8,20.1,45,45,45c24.9,0,45-20.2,45-45C95,25.2,74.9,5,50,5 M41.1,40.5c0,3.3-2.7,6-6,6c-3.3,0-6-2.7-6-6  s2.7-6,6-6C38.4,34.6,41.1,37.2,41.1,40.5 M64.9,34.6c-3.3,0-6,2.7-6,6c0,3.3,2.7,6,6,6c3.3,0,6-2.7,6-6  C70.9,37.3,68.2,34.6,64.9,34.6"
          fill="#2B2627"
        />
        {soundEnabled ? (
          <path
            d="M19,17H13a1,1,0,0,0-1,1v3a4,4,0,0,0,8,0V18A1,1,0,0,0,19,17Zm-1,4a2,2,0,0,1-4,0V19h4Z"
            fill="#2B2627"
            transform="
              translate(15 20)
              scale(2.25 2.25)"
          />
        ) : (
              <path d="M55.5,67.6l2.3-2.3c1.5-1.5,1.5-4,0-5.5c-1.5-1.5-4-1.5-5.5,0L50,62.1l-2.3-2.3  c-1.5-1.5-4-1.5-5.5,0c-1.5,1.5-1.5,4,0,5.5l2.3,2.3l-2.3,2.3c-1.5,1.5-1.5,4,0,5.5c1.5,1.5,4,1.5,5.5,0l2.3-2.3l2.3,2.3  c1.5,1.5,4,1.5,5.5,0c1.5-1.5,1.5-4,0-5.5L55.5,67.6z" fill="#2B2627" />
        )}

        </svg>
        
      </button>
      <footer class="footer">made by <a href="https://nick.computer" target="_blank" rel="noopener noreferrer" class="footer_link" >nick.computer</a></footer>
    </>
  );
}

export default App;
