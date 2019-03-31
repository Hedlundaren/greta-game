export const vertexShader = /*glsl*/`


uniform float delta;
varying vec2 vUv;

void main()  {
  vUv = uv;
  vec3 p = position;
  vec4 modelViewPosition = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * modelViewPosition;
}
`
