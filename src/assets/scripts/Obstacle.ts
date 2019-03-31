import { Texture, THREE } from 'expo-three'
import { SceneData } from './Scene'

export class Obstacle {
  private _sprite: THREE.Sprite
  private _position: THREE.Vector2
  private _material: any
  private _speed: number
  private _sceneData: SceneData
  private _scale: number

  constructor(sceneData: SceneData) {
    this._speed = sceneData.foregroundSpeed
    this._material = new THREE.SpriteMaterial({ map: sceneData.meatTexture, color: 0xffffff })
    this._sprite = new THREE.Sprite(this._material)
    this._scale = 0.8
    this._sprite.scale.set(30 * this._scale, 30 * this._scale, 1)
    this._position = new THREE.Vector2(-60, -25)
    this._sceneData = sceneData
  }

  sprite() {
    return this._sprite
  }

  isCollected(p: THREE.Vector2) {
    const collisionDistance = 14
    if (Math.abs(p.x - this._position.x) < collisionDistance && Math.abs(p.y - this._position.y) < collisionDistance) {
      return true
    }
  }

  getPosition = () => { return this._position }
  setPosition = (p: THREE.Vector2) => { this._position = p }

  reset() {
    const randomValue = Math.round(Math.random() * 3)

    if (randomValue === 0) {
      this._material.map = this._sceneData.meatTexture
      this._sprite.scale.set(30 * this._scale, 30 * this._scale, 1)
    }
    else if (randomValue === 1) {
      this._material.map = this._sceneData.oilTexture
      this._sprite.scale.set(30 * this._scale, 30 * this._scale, 1)
    }
    else if (randomValue === 2) {
      this._material.map = this._sceneData.strawTexture
      this._sprite.scale.set(30 * this._scale, 30 * this._scale, 1)
    }
    else if (randomValue === 3) {
      this._material.map = this._sceneData.trumpTexture
      this._sprite.scale.set(60 * this._scale, 60 * this._scale, 1)
    }

    this._position.x = 60
    this._position.y = -205
  }

  render(deltaTime: number, playerPosition: THREE.Vector2) {

    this._position.x -= this._speed * deltaTime
    if (this._position.x < -60) {
      this.reset()
    }

    this._sprite.position.x = this._position.x
    this._sprite.position.y = this._position.y
  }
}