import ExpoTHREE from 'expo-three';
export const loadCanTextures = async () => {
  const textures = []
  textures.push(await ExpoTHREE.loadAsync(require('../assets/images/cans/0.png')))
  textures.push(await ExpoTHREE.loadAsync(require('../assets/images/cans/1.png')))
  textures.push(await ExpoTHREE.loadAsync(require('../assets/images/cans/2.png')))
  textures.push(await ExpoTHREE.loadAsync(require('../assets/images/cans/3.png')))
  textures.push(await ExpoTHREE.loadAsync(require('../assets/images/cans/4.png')))
  textures.push(await ExpoTHREE.loadAsync(require('../assets/images/cans/5.png')))
  textures.push(await ExpoTHREE.loadAsync(require('../assets/images/cans/6.png')))
  textures.push(await ExpoTHREE.loadAsync(require('../assets/images/cans/7.png')))
  textures.push(await ExpoTHREE.loadAsync(require('../assets/images/cans/8.png')))

  return textures
}