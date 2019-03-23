import ExpoTHREE, { THREE } from 'expo-three'

import { fragmentShader } from '../shaders/fragmentShader'
import { vertexShader } from '../shaders/vertexShader'

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

  constructor(pos: THREE.Vector2, texture: any) {

    const loader = new THREE.TextureLoader();
    this._material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 1.0 },
        texture1: { type: 't', value: 0, texture }
      },
      vertexShader,
      fragmentShader
    })

    this._mesh = new THREE.Mesh(new THREE.PlaneGeometry(20, 20), this._material)
    this._mesh.position.set(0, 0, 0)
    this._velocity = new THREE.Vector2(0, 1)
    this._defaultPosition = new THREE.Vector2(pos.x, pos.y)
    this._position = new THREE.Vector2(pos.x, pos.y)
    this._state = PLAYER_STATE.RUNNING
    this._jumpCount = 0
    this._dashCount = 0
    this._rollFrames = 0
  }

  setState(state: PLAYER_STATE) {
    this._state = state
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
    if(this.isJumping()) {
      this.setState(PLAYER_STATE.RUNNING)
    }
  }

  roll() {
    this.setState(PLAYER_STATE.ROLLING)
    this._velocity.y = -30
    this._velocity.x = 0
    this._rollFrames = 420
  }

  rollFinish() {
    this._velocity.x = 0
    this._velocity.y = 0
  }

  dash() {
    if (this.isJumping() && this._dashCount < 1) {
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
    return this._mesh
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

  render(time: number, deltaTime: number) {
    this._material.uniforms.time.value = time
    this.calculatePosition(deltaTime)
    this._mesh.position.x = this._position.x
    this._mesh.position.y = this._position.y
  }
}