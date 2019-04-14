import { SceneData, Scene } from './Scene'
import { Texture, THREE } from 'expo-three'
import { ACTION } from '../../App';

export class Can {
  private _textures: Texture[]
  private _sprite: THREE.Sprite
  private _position: THREE.Vector2
  private _material: any
  private _framesPerImage: number
  private _frameCount: number
  private _textureIndex: number
  private _speed: number 
  private _sceneData: SceneData

  constructor(sceneData: SceneData) {
    this._sceneData = sceneData
    this._textures = [...sceneData.canTextures]
    this._speed = sceneData.foregroundSpeed
    this._material = new THREE.SpriteMaterial({ map: sceneData.canTextures[0], color: 0xffffff })
    this._sprite = new THREE.Sprite(this._material)
    const spread = 50
    const scale = 10
    this._sprite.scale.set(scale, 1.42 * scale, 1)
    this._position = new THREE.Vector2(Math.random() * spread, -200)
    this._framesPerImage = 2
    this._frameCount = 0
    this._textureIndex = 0
  }

  sprite() {
    return this._sprite
  }

  isCollected(p: THREE.Vector2) {
    const collisionDistance = 10
    if (Math.abs(p.x - this._position.x) < collisionDistance && Math.abs(p.y - this._position.y) < collisionDistance) {
      this._sceneData.useAction(ACTION.COLLECT_CAN)
      return true
    }
  }

  getPosition = () => { return this._position }
  setPosition = (p: THREE.Vector2) => { this._position = p }

  reset() {
    this._position.x = 40
    this._position.y = -200
  }

  render(deltaTime: number, playerPosition: THREE.Vector2) {

    if (this._frameCount > this._framesPerImage) {
      this._frameCount = 0
      this._textureIndex--
      if (this._textureIndex < 0) {
        this._textureIndex = this._textures.length - 1
      }
      this._material.map = this._textures[this._textureIndex]
    }
    this._frameCount++

    this._position.x -= this._speed * deltaTime
    if (this._position.x < -40) {
      this.reset()
    }
    this._sprite.position.x = this._position.x
    this._sprite.position.y = this._position.y
  }
}