export const vertexShaderSky = /*glsl*/`

void main()  {
  vec3 p = position;
  vec4 modelViewPosition = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * modelViewPosition;
}
`
