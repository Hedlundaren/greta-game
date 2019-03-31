export const fragmentShaderSky = `
uniform float time;
uniform vec2 resolution;

void main() {
  vec2 coord = gl_FragCoord.xy / resolution.xy;
  vec2 coord2 = gl_FragCoord.xy / resolution.xx;

  float timeFactor = 0.01;

  vec3 fog = vec3(pow(1.0 - coord.y * 0.4, 2.0) * 2.0);
  vec3 skyColor = vec3(0.2, 0.5, 0.9);
  vec3 finalColor = vec3(0.0);

  vec2 sunPosition = vec2(1.5 + 2.0 * cos(time * timeFactor), 2.0 + 2.0 * sin(time * timeFactor));
  float sunIntensity = clamp(1.0 - length(coord2 - sunPosition), 0.0, 1.0) * 1.0;
  vec3 sunColor = vec3(1.0, 0.5, 0.0);

  skyColor.r = 1.0 - sunPosition.y * 0.2;
  skyColor.g = 0.5 - sunPosition.y * 0.02;
  skyColor.b = 0.0 + (sunPosition.y) * 0.7;

  fog = fog * 0.6 + fog * sunPosition.y * 0.2;

  finalColor = skyColor;
  finalColor = finalColor + sunColor * sunIntensity;
  finalColor = finalColor + fog;

  gl_FragColor = vec4(finalColor, 1);
}
`
