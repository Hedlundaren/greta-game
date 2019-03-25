import ExpoTHREE, { THREE } from 'expo-three'

import { fragmentShader } from '../shaders/fragmentShader'
import { vertexShader } from '../shaders/vertexShader'
import { Sprite } from 'expo-three';
import Texture from 'expo-three';
import { SceneData } from '../Scene/Scene';

const GRAVITY_CONSTANT = 9.82
const DASHING_CONSTANT = 9.82

enum PLAYER_STATE {
  RUNNING = "RUNNING",
  JUMPING = "JUMPING",
  ROLLING = "ROLLING",
  DASHING = "DASHING",
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
  private _sceneData: SceneData

  constructor(pos: THREE.Vector2, sceneData: SceneData) {

    this._sceneData = sceneData
    this._material = new THREE.SpriteMaterial({ map: sceneData.runningTextures[0], color: 0xffffff });
    this._sprite = new THREE.Sprite(this._material);
    this._sprite.scale.set(20, 30, 1)
    this._sprite.position.set(pos.x, pos.y, 0)
    this._textures = [...sceneData.runningTextures]
    this._framesPerImage = 6
    this._frameCount = 0
    this._textureIndex = 0
    this._velocity = new THREE.Vector2(0, 1)
    this._defaultPosition = new THREE.Vector2(pos.x, pos.y)
    this._position = new THREE.Vector2(pos.x, pos.y)
    this._state = PLAYER_STATE.RUNNING
    this._jumpCount = 0
    this._dashCount = 0
    this._rollFrames = 0
  }

  setState(state: PLAYER_STATE) {
    if (this._state !== state) {
      this._state = state
      this._textureIndex = 0
      if (this.isJumping()) {
        this._textures = [...this._sceneData.jumpingTextures]
      }
      if (this.isRolling()) {
        this._textures = [...this._sceneData.rollingTextures]
      }
      if (this.isDashing()) {
        this._textures = [...this._sceneData.dashingTextures]
      }
      if (this.isRunning()) {
        this._textures = [...this._sceneData.runningTextures]
      }
    }
  }

  isDashing() { return this._state === PLAYER_STATE.DASHING }
  isJumping() { return this._state === PLAYER_STATE.JUMPING }
  isRunning() { return this._state === PLAYER_STATE.RUNNING }
  isRolling() { return this._state === PLAYER_STATE.ROLLING }

  jump() {
    if (this._jumpCount < 2) {
      this.setState(PLAYER_STATE.JUMPING)
      this._velocity.y = 30
      this._velocity.x = 0
      this._jumpCount++
    }
  }

  land() {
    this._position.y = this._defaultPosition.y
    this._jumpCount = 0
    this._dashCount = 0
    if (this.isJumping()) {
      this.setState(PLAYER_STATE.RUNNING)
    }
  }

  roll() {
    this.setState(PLAYER_STATE.ROLLING)
    this._velocity.y = -30
    this._velocity.x = 0
    this._rollFrames = 120
  }

  rollFinish() {
    this._velocity.x = 0
    this._velocity.y = 0
  }

  dash() {
    if ((this.isJumping() || this.isRunning()) && this._dashCount < 1) {
      this.setState(PLAYER_STATE.DASHING)
      this._velocity.x = 30
      this._dashCount++
    }
  }

  backDash() {
    if (this.isDashing()) {
      this._velocity.x = -30
    }
  }

  dashFinish() {
    this._position.x = this._defaultPosition.x
    this.setState(PLAYER_STATE.JUMPING)
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

    if (this.isJumping()) {
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
      if (this.isDashing() || this.isJumping()) {
        this.dashFinish()
      }
    }
  }

  position() { return this._position }

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
  }
}