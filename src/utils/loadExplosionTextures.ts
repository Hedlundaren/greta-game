import ExpoTHREE from 'expo-three';
export const loadExplosionTextures = async () => {
  const textures = []
  // textures.push(await ExpoTHREE.loadAsync(require('../assets/images/explosion/0.png')))
  textures.push(await ExpoTHREE.loadAsync(require('../assets/images/explosion/1.png')))
  textures.push(await ExpoTHREE.loadAsync(require('../assets/images/explosion/2.png')))
  textures.push(await ExpoTHREE.loadAsync(require('../assets/images/explosion/3.png')))
  textures.push(await ExpoTHREE.loadAsync(require('../assets/images/explosion/4.png')))
  textures.push(await ExpoTHREE.loadAsync(require('../assets/images/explosion/5.png')))
  textures.push(await ExpoTHREE.loadAsync(require('../assets/images/explosion/6.png')))
  textures.push(await ExpoTHREE.loadAsync(require('../assets/images/explosion/7.png')))
  textures.push(await ExpoTHREE.loadAsync(require('../assets/images/explosion/8.png')))
  textures.push(await ExpoTHREE.loadAsync(require('../assets/images/explosion/9.png')))
  textures.push(await ExpoTHREE.loadAsync(require('../assets/images/explosion/10.png')))
  textures.push(await ExpoTHREE.loadAsync(require('../assets/images/explosion/11.png')))

  return textures
}