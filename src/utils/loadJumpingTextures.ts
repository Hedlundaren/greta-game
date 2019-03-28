import ExpoTHREE from 'expo-three';
export const loadJumpingTextures = async () => {
  const textures = []
  textures.push(await ExpoTHREE.loadAsync(require('../assets/images/jumping/0.png')))
  textures.push(await ExpoTHREE.loadAsync(require('../assets/images/jumping/1.png')))
  textures.push(await ExpoTHREE.loadAsync(require('../assets/images/jumping/2.png')))
  textures.push(await ExpoTHREE.loadAsync(require('../assets/images/jumping/3.png')))
  textures.push(await ExpoTHREE.loadAsync(require('../assets/images/jumping/4.png')))
  textures.push(await ExpoTHREE.loadAsync(require('../assets/images/jumping/5.png')))
  textures.push(await ExpoTHREE.loadAsync(require('../assets/images/jumping/6.png')))
  textures.push(await ExpoTHREE.loadAsync(require('../assets/images/jumping/7.png')))
  textures.push(await ExpoTHREE.loadAsync(require('../assets/images/jumping/8.png')))
  textures.push(await ExpoTHREE.loadAsync(require('../assets/images/jumping/9.png')))
  textures.push(await ExpoTHREE.loadAsync(require('../assets/images/jumping/10.png')))
  textures.push(await ExpoTHREE.loadAsync(require('../assets/images/jumping/11.png')))
  textures.push(await ExpoTHREE.loadAsync(require('../assets/images/jumping/12.png')))
  textures.push(await ExpoTHREE.loadAsync(require('../assets/images/jumping/13.png')))
  textures.push(await ExpoTHREE.loadAsync(require('../assets/images/jumping/14.png')))
  textures.push(await ExpoTHREE.loadAsync(require('../assets/images/jumping/15.png')))
  textures.push(await ExpoTHREE.loadAsync(require('../assets/images/jumping/16.png')))
  textures.push(await ExpoTHREE.loadAsync(require('../assets/images/jumping/17.png')))

  return textures
}