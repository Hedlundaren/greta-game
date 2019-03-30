import ExpoTHREE from 'expo-three';
export const loadDashingTextures = async () => {

  const textures: ExpoTHREE.Texture[] = []
  textures.push(await ExpoTHREE.loadAsync(require('../assets/images/dashing/0.png')))
  textures.push(await ExpoTHREE.loadAsync(require('../assets/images/dashing/1.png')))
  textures.push(await ExpoTHREE.loadAsync(require('../assets/images/dashing/2.png')))
  textures.push(await ExpoTHREE.loadAsync(require('../assets/images/dashing/3.png')))
  textures.push(await ExpoTHREE.loadAsync(require('../assets/images/dashing/4.png')))
  textures.push(await ExpoTHREE.loadAsync(require('../assets/images/dashing/5.png')))
  textures.push(await ExpoTHREE.loadAsync(require('../assets/images/dashing/6.png')))
  textures.push(await ExpoTHREE.loadAsync(require('../assets/images/dashing/7.png')))
  textures.push(await ExpoTHREE.loadAsync(require('../assets/images/dashing/8.png')))
  textures.push(await ExpoTHREE.loadAsync(require('../assets/images/dashing/9.png')))

  return textures
}