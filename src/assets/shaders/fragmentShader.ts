export const fragmentShader = `
varying vec2 vUv;
uniform sampler2D texture1;
uniform float time;

void main() {
  
  gl_FragColor = texture2D(texture1, vUv);
}
`
