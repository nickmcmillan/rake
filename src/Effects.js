import React, { Suspense } from "react";
import {
  EffectComposer,
  DepthOfField,
  Bloom,
  Noise,
  Vignette,
  ColorAverage,
  Grid,
  DotScreen,
} from "react-postprocessing";
import { BlendFunction } from 'postprocessing'

function Effects() {
  return (
    <Suspense fallback={null}>
      <EffectComposer>
        {/* <DepthOfField focusDistance={0} focalLength={0.02} bokehScale={2} height={480} /> */}
        {/* <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} opacity={0.2} /> */}
        <Noise
          opacity={0.025}
          premultiply // enables or disables noise premultiplication
          blendFunction={BlendFunction.ADD} // blend mode
        />
        {/* <DotScreen
          blendFunction={BlendFunction.NORMAL} // blend mode
          angle={Math.PI * 0.5} // angle of the dot pattern
          scale={1.0} // scale of the dot pattern
        /> */}
        {/* <Grid
          blendFunction={BlendFunction.OVERLAY} // blend mode
          scale={1.0} // grid pattern scale
          lineWidth={0.0} // grid pattern line width
          // size={{ width, height }} // overrides the default pass width and height
        /> */}
        {/* <Vignette 
          offset={0.6} // vignette offset
          darkness={0.4} // vignette darkness
          eskill={false} // Eskil's vignette technique
          // blendFunction={BlendFunction.SUBTRACT} // blend mode
         /> */}
      </EffectComposer>
    </Suspense>
  );
}

export default Effects;
