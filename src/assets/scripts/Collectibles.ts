import { THREE } from 'expo-three'
import { Can } from './Can'
import { SceneData } from './Scene'
import { Haptic } from 'expo'

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

  collectCan(can: Can) {
    Haptic.selection()
    can.setPosition(new THREE.Vector2(-40, Math.random() * 50))
  }

  render(deltaTime: number, playerPosition: THREE.Vector2) {
    for (const can of this._cans) {
      if (can.isCollected(playerPosition)) {
        this.collectCan(can)
      }

      can.render(deltaTime, playerPosition)
    }
  }
}
