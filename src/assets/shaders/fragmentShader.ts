export const fragmentShader = `
varying vec2 vUv;
uniform sampler2D backgroundTexture;
uniform sampler2D sceneTexture;
uniform float time;

void main() {
  
  vec3 game = texture2D(sceneTexture, vUv).xyx;
  vec3 background = texture2D(backgroundTexture, vUv).xyx;
  gl_FragColor = vec4(game.x, 0, background.x, 1);
  // gl_FragColor = vec4(0, 0, 1, 1);
}
`
