import ExpoTHREE from 'expo-three';
export const loadDashingTextures = async () => {
  const textures = []
  textures.push(await ExpoTHREE.loadAsync(require('../assets/images/running-example/0.png')))
  textures.push(await ExpoTHREE.loadAsync(require('../assets/images/running-example/1.png')))
  textures.push(await ExpoTHREE.loadAsync(require('../assets/images/running-example/2.png')))
  textures.push(await ExpoTHREE.loadAsync(require('../assets/images/running-example/3.png')))

  return textures
}