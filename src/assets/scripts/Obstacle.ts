import { Texture, THREE } from 'expo-three'
import { SceneData } from './Scene'

export class Obstacle {
  private _sprite: THREE.Sprite
  private _position: THREE.Vector2
  private _material: THREE.SpriteMaterial
  private _explosionTextures: Texture[]
  private _speed: number
  private _sceneData: SceneData
  private _scale: number
  private _framesPerImage: number
  private _frameCount: number
  private _textureIndex: number
  private _state: 'EXPLODING' | 'ACTIVE'

  constructor(sceneData: SceneData) {
    this._speed = sceneData.foregroundSpeed
    this._material = new THREE.SpriteMaterial({ map: sceneData.meatTexture, color: 0xffffff })
    this._sprite = new THREE.Sprite(this._material)
    this._scale = 0.8
    this._sprite.scale.set(30 * this._scale, 30 * this._scale, 1)
    this._sprite.position.set(-60, -200, 0)
    this._position = new THREE.Vector2(-60, -25)
    this._sceneData = sceneData
    this._explosionTextures = sceneData.explosionTextures
    this._framesPerImage = 2
    this._frameCount = 0
    this._textureIndex = 0
    this._state = 'ACTIVE'
  }

  getPosition = () => { return this._position }
  setPosition = (p: THREE.Vector2) => { this._position = p }

  sprite() {
    return this._sprite
  }

  isActive = () => this._state === 'ACTIVE'
  isExploding = () => this._state === 'EXPLODING'

  isCollected(p: THREE.Vector2) {
    if (this.isActive()) {
      const collisionDistance = 14
      if (Math.abs(p.x - this._position.x) < collisionDistance && Math.abs(p.y - this._position.y) < collisionDistance) {
        return true
      }
    }
  }

  explode() {
    this._material.map = this._explosionTextures[0]
    this._state = 'EXPLODING'
    this._sprite.scale.set(60 * this._scale, 60 * this._scale, 1)
    this._position.y += 7
    this._sprite.position.z = .1
    this._frameCount = 0
    this._textureIndex = 0
  }

  reset() {
    const randomValue = Math.round(Math.random() * 3)
    this._state = 'ACTIVE'

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

    if (this._frameCount > this._framesPerImage && this._state === 'EXPLODING') {
      this._frameCount = 0
      if (this._textureIndex === this._explosionTextures.length) {
        this._textureIndex = 0
        this.reset()
      }
      this._material.map = this._explosionTextures[this._textureIndex]
      this._textureIndex++
    }
    this._frameCount++

    this._sprite.position.x = this._position.x
    this._sprite.position.y = this._position.y
  }
}