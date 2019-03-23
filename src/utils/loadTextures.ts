import ExpoTHREE, { Texture } from 'expo-three';
export const loadTextures = async (path: string, numberOfTextures: number) => {
  
  const textures = []
  for (let i = 0; i < numberOfTextures; i++) {
    const p = `${path}${i}.png`
    // const image = require(`../assets/images/${path}${i}.png`)
    const image = require('../assets/images/running-example/0.png')
    const texture = await ExpoTHREE.loadAsync(image)
    textures.push(texture)
  }
  
  return textures
}