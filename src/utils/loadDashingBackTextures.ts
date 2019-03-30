import ExpoTHREE from 'expo-three';
export const loadDashingBackTextures = async () => {

  const textures: ExpoTHREE.Texture[] = []
  textures.push(await ExpoTHREE.loadAsync(require('../assets/images/dashingBack/0.png')))
  textures.push(await ExpoTHREE.loadAsync(require('../assets/images/dashingBack/1.png')))
  textures.push(await ExpoTHREE.loadAsync(require('../assets/images/dashingBack/2.png')))
  textures.push(await ExpoTHREE.loadAsync(require('../assets/images/dashingBack/3.png')))
  textures.push(await ExpoTHREE.loadAsync(require('../assets/images/dashingBack/4.png')))
  textures.push(await ExpoTHREE.loadAsync(require('../assets/images/dashingBack/5.png')))

  return textures
}