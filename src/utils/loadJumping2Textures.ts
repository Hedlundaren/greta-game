import ExpoTHREE from 'expo-three';
export const loadJumping2Textures = async () => {
  const textures = []
  // textures.push(await ExpoTHREE.loadAsync(require('../assets/images/jumping2/0.png')))
  textures.push(await ExpoTHREE.loadAsync(require('../assets/images/jumping2/1.png')))
  textures.push(await ExpoTHREE.loadAsync(require('../assets/images/jumping2/2.png')))
  textures.push(await ExpoTHREE.loadAsync(require('../assets/images/jumping2/3.png')))
  // textures.push(await ExpoTHREE.loadAsync(require('../assets/images/jumping2/4.png')))
  // textures.push(await ExpoTHREE.loadAsync(require('../assets/images/jumping2/5.png')))
  // textures.push(await ExpoTHREE.loadAsync(require('../assets/images/jumping2/6.png')))
  // textures.push(await ExpoTHREE.loadAsync(require('../assets/images/jumping2/7.png')))
  // textures.push(await ExpoTHREE.loadAsync(require('../assets/images/jumping2/8.png')))

  return textures
}