import { THREE } from 'expo-three'
import { SceneData } from './Scene'

const GRAVITY_CONSTANT = 9.82
const DASHING_CONSTANT = 29.82
const MIN_FRAMES_BETWEEN_INPUTS = 10

enum PLAYER_STATE {
  RUNNING = "RUNNING",
  JUMPING = "JUMPING",
  FALLING = "FALLING",
  ROLLING = "ROLLING",
  ROLLING_FROM_AIR = "ROLLING_FROM_AIR",
  DASHING = "DASHING",
  DASHING_BACK = "DASHING_BACK",
}

export class Player {

  private _mesh: THREE.Mesh
  private _defaultPosition: THREE.Vector2
  private _position: THREE.Vector2
  private _velocity: THREE.Vector2
  private _state: PLAYER_STATE
  private _jumpCount: number
  private _dashCount: number
  private _rollFrames: number
  private _material: any
  private _sprite: THREE.Sprite
  private _textures: THREE.Texture[]
  private _textureIndex: number
  private _framesPerImage: number
  private _frameCount: number
  private _framesSinceLastInput: number
  private _sceneData: SceneData
  private _scale: number

  constructor(defaultPosition: THREE.Vector2, sceneData: SceneData) {

    this._sceneData = sceneData
    this._material = new THREE.SpriteMaterial({ map: sceneData.runningTextures[0], color: 0xffffff });
    this._sprite = new THREE.Sprite(this._material);
    this._sprite.position.set(defaultPosition.x, defaultPosition.y, 0)
    this._textures = [...sceneData.runningTextures]
    this._framesPerImage = 1
    this._frameCount = 0
    this._textureIndex = 0
    this._velocity = new THREE.Vector2(0, 1)
    this._defaultPosition = new THREE.Vector2(defaultPosition.x, defaultPosition.y)
    this._position = new THREE.Vector2(defaultPosition.x, defaultPosition.y)
    this._state = PLAYER_STATE.RUNNING
    this._jumpCount = 0
    this._dashCount = 0
    this._rollFrames = 0
    this._framesSinceLastInput = 0
    this._scale = 1
    this._sprite.scale.set(20 * this._scale, 30 * this._scale, 1)
  }

  setState(state: PLAYER_STATE) {
    if (this._state !== state) {
      this._state = state
      this._textureIndex = 0
      if (this.isJumping()) {
        if(Math.random() < 0.8) {
          this._textures = [...this._sceneData.jumpingTextures]
        } else {
          this._textures = [...this._sceneData.jumping2Textures]
        }
        this._sprite.scale.set(this._scale * 20, this._scale * 30 , 1)
      }
      if (this.isRolling()) {
        this._textures = [...this._sceneData.rollingTextures]
        this._sprite.scale.set(30 * this._scale, 20 * this._scale, 1)
      }
      if (this.isRollingFromAir()) {
        this._textures = [...this._sceneData.rollingFromAirTextures]
        this._sprite.scale.set(20 * this._scale, 30 * this._scale, 1)
      }
      if (this.isDashing()) {
        this._textures = [...this._sceneData.dashingTextures]
        this._sprite.scale.set(30 * this._scale, 20 * this._scale, 1)
      }
      if (this.isDashingBack()) {
        this._textures = [...this._sceneData.dashingBackTextures]
        this._sprite.scale.set(30 * this._scale, 20 * this._scale, 1)
      }
      if (this.isRunning()) {
        this._textures = [...this._sceneData.runningTextures]
        this._sprite.scale.set(20 * this._scale, 30 * this._scale, 1)
      }
      if (this.isFalling()) {
        this._textures = [...this._sceneData.fallingTextures]
        this._sprite.scale.set(20 * this._scale, 30 * this._scale, 1)
      }
      if (this.isFalling()) {
        this._textures = [...this._sceneData.fallingTextures]
        this._sprite.scale.set(20 * this._scale, 30 * this._scale, 1)
      }
    }
  }

  isDashing() { return this._state === PLAYER_STATE.DASHING }
  isDashingBack() { return this._state === PLAYER_STATE.DASHING_BACK }
  isJumping() { return this._state === PLAYER_STATE.JUMPING }
  isRunning() { return this._state === PLAYER_STATE.RUNNING }
  isRolling() { return this._state === PLAYER_STATE.ROLLING }
  isFalling() { return this._state === PLAYER_STATE.FALLING }
  isRollingFromAir() { return this._state === PLAYER_STATE.ROLLING_FROM_AIR }

  isMovable = () => {
    if (this._framesSinceLastInput > MIN_FRAMES_BETWEEN_INPUTS) {
      this._framesSinceLastInput = 0
      return true
    } else {
      return false
    }
  }

  async jump() {
    if (this._jumpCount < 2 && this.isMovable()) {
      this._sceneData.jumpingSound.replayAsync({ shouldPlay: true, positionMillis: 0 })
      this._textureIndex = 0
      this._velocity.y = 25
      this._velocity.x = 0
      this._jumpCount++
      this.setState(PLAYER_STATE.JUMPING)
      this._dashCount = 0
    }
  }

  land() {
    this._position.y = this._defaultPosition.y
    this._jumpCount = 0
    this._dashCount = 0
    if (this.isFalling()) {
      this.setState(PLAYER_STATE.RUNNING)
    }
    if (this.isRollingFromAir()) {
      this.setState(PLAYER_STATE.ROLLING)
    }
  }

  roll() {
    if (this.isMovable()) {
      if(this.isJumping() || this.isDashing() || this.isFalling()) {
        this.setState(PLAYER_STATE.ROLLING_FROM_AIR)
      } else {
        this.setState(PLAYER_STATE.ROLLING)
      }

      this._velocity.y = -30
      this._velocity.x = 0
      this._rollFrames = this._framesPerImage * this._textures.length * 2 - 4
      this._dashCount = 0
    }

  }

  rollFinish() {
    this._velocity.x = 0
    this._velocity.y = 0
  }

  dash() {
    if (this._dashCount < 1 && this.isMovable()) {
      this.setState(PLAYER_STATE.DASHING)
      this._velocity.x = 1.6 * DASHING_CONSTANT
      this._dashCount++
    }
  }

  backDash() {
    if (this.isDashing() && this.isMovable()) {
      this.setState(PLAYER_STATE.DASHING_BACK)
      this._velocity.x = -30
    }
  }

  dashFinish() {
    this.setState(PLAYER_STATE.FALLING)
    this._position.x = this._defaultPosition.x
    this._velocity.x = 0
  }

  mesh() {
    return this._sprite
  }

  calculatePosition(deltaTime: number) {
    if (this.isDashing()) {
      this._velocity.x -= DASHING_CONSTANT * deltaTime
      this._velocity.y = 0
    }

    if (this._velocity.y < 0 && this.isJumping()) {
      this.setState(PLAYER_STATE.FALLING)
    }

    if (this.isJumping() || this.isFalling()) {
      this._velocity.y -= GRAVITY_CONSTANT * deltaTime
      this._velocity.x -= GRAVITY_CONSTANT * deltaTime
    }

    if (this.isRunning()) {
      this._velocity.x = 0
      this._velocity.y = 0
    }

    if (this._rollFrames < 0) {
      this._rollFrames = 0
      this.setState(PLAYER_STATE.RUNNING)
    }

    if (this.isRolling()) {
      if (this._position.x > this._defaultPosition.x) {
        this._velocity.x -= GRAVITY_CONSTANT * deltaTime
      } else {
        this._velocity.x = 0
        this._position.x = this._defaultPosition.x
      }

      this._rollFrames -= 1
    }

    this._position.x += this._velocity.x * deltaTime
    this._position.y += this._velocity.y * deltaTime

    if (this._position.y < this._defaultPosition.y) {
      this.land()
    }

    if (this._position.x < this._defaultPosition.x) {
      if (this.isDashing() || this.isDashingBack()) {
        this.dashFinish()
      }
      if (this.isJumping() || this.isFalling()) {
        this._position.x = this._defaultPosition.x
        this._velocity.x = 0
      }
    }
  }

  position() { return this._position }
  velocity() { return this._velocity }

  render(time: number, deltaTime: number) {
    this.calculatePosition(deltaTime)
    this._frameCount++
    if (this._frameCount > this._framesPerImage) {
      this._frameCount = 0
      this._textureIndex++
      if (this._textureIndex > this._textures.length - 1) {
        this._textureIndex = 0
      }
      this._material.map = this._textures[this._textureIndex]
    }
    this._sprite.position.x = this._position.x
    this._sprite.position.y = this._position.y

    this._framesSinceLastInput++
  }
}