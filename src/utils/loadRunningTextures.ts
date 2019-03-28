import ExpoTHREE from 'expo-three';
export const loadRunningTextures = async () => {
  const textures = []
  textures.push(await ExpoTHREE.loadAsync(require('../assets/images/running/0.png')))
  textures.push(await ExpoTHREE.loadAsync(require('../assets/images/running/1.png')))
  textures.push(await ExpoTHREE.loadAsync(require('../assets/images/running/2.png')))
  textures.push(await ExpoTHREE.loadAsync(require('../assets/images/running/3.png')))
  textures.push(await ExpoTHREE.loadAsync(require('../assets/images/running/4.png')))
  textures.push(await ExpoTHREE.loadAsync(require('../assets/images/running/5.png')))
  textures.push(await ExpoTHREE.loadAsync(require('../assets/images/running/6.png')))
  textures.push(await ExpoTHREE.loadAsync(require('../assets/images/running/7.png')))
  textures.push(await ExpoTHREE.loadAsync(require('../assets/images/running/8.png')))
  textures.push(await ExpoTHREE.loadAsync(require('../assets/images/running/9.png')))

  return textures
}