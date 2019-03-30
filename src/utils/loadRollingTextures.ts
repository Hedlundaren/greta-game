import ExpoTHREE from 'expo-three';
export const loadRollingTextures = async () => {
  const textures = []
  textures.push(await ExpoTHREE.loadAsync(require('../assets/images/rolling/0.png')))
  textures.push(await ExpoTHREE.loadAsync(require('../assets/images/rolling/1.png')))
  textures.push(await ExpoTHREE.loadAsync(require('../assets/images/rolling/2.png')))
  textures.push(await ExpoTHREE.loadAsync(require('../assets/images/rolling/3.png')))
  textures.push(await ExpoTHREE.loadAsync(require('../assets/images/rolling/4.png')))
  textures.push(await ExpoTHREE.loadAsync(require('../assets/images/rolling/5.png')))
  textures.push(await ExpoTHREE.loadAsync(require('../assets/images/rolling/6.png')))
  textures.push(await ExpoTHREE.loadAsync(require('../assets/images/rolling/7.png')))
  textures.push(await ExpoTHREE.loadAsync(require('../assets/images/rolling/8.png')))
  textures.push(await ExpoTHREE.loadAsync(require('../assets/images/rolling/9.png')))
  textures.push(await ExpoTHREE.loadAsync(require('../assets/images/rolling/10.png')))
  textures.push(await ExpoTHREE.loadAsync(require('../assets/images/rolling/11.png')))
  textures.push(await ExpoTHREE.loadAsync(require('../assets/images/rolling/12.png')))
  textures.push(await ExpoTHREE.loadAsync(require('../assets/images/rolling/13.png')))
  textures.push(await ExpoTHREE.loadAsync(require('../assets/images/rolling/14.png')))
  textures.push(await ExpoTHREE.loadAsync(require('../assets/images/rolling/15.png')))
  textures.push(await ExpoTHREE.loadAsync(require('../assets/images/rolling/16.png')))
  textures.push(await ExpoTHREE.loadAsync(require('../assets/images/rolling/17.png')))
  textures.push(await ExpoTHREE.loadAsync(require('../assets/images/rolling/18.png')))
  textures.push(await ExpoTHREE.loadAsync(require('../assets/images/rolling/19.png')))
  textures.push(await ExpoTHREE.loadAsync(require('../assets/images/rolling/20.png')))
  textures.push(await ExpoTHREE.loadAsync(require('../assets/images/rolling/21.png')))
  textures.push(await ExpoTHREE.loadAsync(require('../assets/images/rolling/22.png')))

  return textures
}