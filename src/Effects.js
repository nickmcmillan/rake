import React, { Suspense } from "react";
import {
  EffectComposer,
  DepthOfField,
  Bloom,
  Noise,
  Vignette,
} from "react-postprocessing";

function Effects() {
  return (
    <Suspense fallback={null}>
      <EffectComposer>
        {/* <DepthOfField focusDistance={0} focalLength={0.02} bokehScale={2} height={480} /> */}
        {/* <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} opacity={0.2} /> */}
        <Noise opacity={0.025} />
        {/* <Vignette eskil={false} offset={0.1} darkness={1.1} /> */}
      </EffectComposer>
    </Suspense>
  );
}

export default Effects;
