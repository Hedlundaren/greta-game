import ExpoTHREE from 'expo-three';
export const loadFallingTextures = async () => {
  const textures = []
  textures.push(await ExpoTHREE.loadAsync(require('../assets/images/falling/0.png')))
  textures.push(await ExpoTHREE.loadAsync(require('../assets/images/falling/1.png')))
  textures.push(await ExpoTHREE.loadAsync(require('../assets/images/falling/2.png')))
  textures.push(await ExpoTHREE.loadAsync(require('../assets/images/falling/3.png')))
  textures.push(await ExpoTHREE.loadAsync(require('../assets/images/falling/4.png')))
  textures.push(await ExpoTHREE.loadAsync(require('../assets/images/falling/5.png')))
  textures.push(await ExpoTHREE.loadAsync(require('../assets/images/falling/6.png')))
  textures.push(await ExpoTHREE.loadAsync(require('../assets/images/falling/7.png')))
  textures.push(await ExpoTHREE.loadAsync(require('../assets/images/falling/8.png')))

  return textures
}