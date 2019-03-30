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
  textures.push(await ExpoTHREE.loadAsync(require('../assets/images/cans/9.png')))
  textures.push(await ExpoTHREE.loadAsync(require('../assets/images/cans/10.png')))
  textures.push(await ExpoTHREE.loadAsync(require('../assets/images/cans/11.png')))
  textures.push(await ExpoTHREE.loadAsync(require('../assets/images/cans/12.png')))
  textures.push(await ExpoTHREE.loadAsync(require('../assets/images/cans/13.png')))
  textures.push(await ExpoTHREE.loadAsync(require('../assets/images/cans/14.png')))
  textures.push(await ExpoTHREE.loadAsync(require('../assets/images/cans/15.png')))
  textures.push(await ExpoTHREE.loadAsync(require('../assets/images/cans/16.png')))
  textures.push(await ExpoTHREE.loadAsync(require('../assets/images/cans/17.png')))
  textures.push(await ExpoTHREE.loadAsync(require('../assets/images/cans/18.png')))
  textures.push(await ExpoTHREE.loadAsync(require('../assets/images/cans/19.png')))
  textures.push(await ExpoTHREE.loadAsync(require('../assets/images/cans/20.png')))
  textures.push(await ExpoTHREE.loadAsync(require('../assets/images/cans/21.png')))
  textures.push(await ExpoTHREE.loadAsync(require('../assets/images/cans/22.png')))

  return textures
}