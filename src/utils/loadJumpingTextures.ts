import ExpoTHREE from 'expo-three';
export const loadJumpingTextures = async () => {
  const textures = []
  textures.push(await ExpoTHREE.loadAsync(require('../assets/images/jumping-example/0.png')))
  textures.push(await ExpoTHREE.loadAsync(require('../assets/images/jumping-example/1.png')))

  return textures
}