import ExpoTHREE from 'expo-three';
export const loadRunningTextures = async () => {
  const textures = []
  textures.push(await ExpoTHREE.loadAsync(require('../assets/images/running/0.png')))
  textures.push(await ExpoTHREE.loadAsync(require('../assets/images/running/1.png')))
  textures.push(await ExpoTHREE.loadAsync(require('../assets/images/running/2.png')))
  textures.push(await ExpoTHREE.loadAsync(require('../assets/images/running/3.png')))
  textures.push(await ExpoTHREE.loadAsync(require('../assets/images/running/4.png')))

  return textures
}