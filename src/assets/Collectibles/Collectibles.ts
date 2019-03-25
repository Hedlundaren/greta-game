import { THREE } from 'expo-three';
import { Can } from '../Can/Can';
import { SceneData } from '../Scene/Scene';
export class Collectibles {

  private _cans: Can[]
  private _numberOfCans: number

  constructor(sceneData: SceneData) {

    this._cans = []
    this._numberOfCans = 3

    for (let i = 0; i < this._numberOfCans; i++) {
      const can = new Can(sceneData)
      this._cans.push(can)
    }

  }

  sprites() {
    const sprites = new THREE.Group()
    for (const can of this._cans) {
      sprites.add(can.sprite())
    }
    return sprites
  }


  render(deltaTime: number, playerPosition: THREE.Vector2) {
    for (const can of this._cans) {
      if (can.isCollected(playerPosition)) {
        // for (const can2 of this._cans) {
          // if (can.getPosition().x !== can2.getPosition().x) {
            // if position too close -> generate new
          // }
        // }
        can.setPosition(new THREE.Vector2(-40, Math.random() * 50))
      }
      
      can.render(deltaTime, playerPosition)
    }
  }
}