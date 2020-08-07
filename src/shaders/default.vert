uniform float time;
uniform vec2 resolution;

varying vec3 vNormal;

#pragma glslify: snoise3 = require(glsl-noise/simplex/3d)

void main()	{
    vNormal = normal;
    float updateTime = time / 2000.0;

    float noise = snoise3(vec3(position * 0.2 + updateTime * 5.0));
    vec4 mvPosition = modelViewMatrix * vec4(position * (noise * pow(1., 9.) + 15.0), 15.0);

    gl_Position = projectionMatrix * mvPosition;
}
