import ExpoTHREE, { THREE } from 'expo-three'
const GRAVITY_CONSTANT = 9.82
const DASHING_CONSTANT = 9.82

enum PLAYER_STATE {
  RUNNING = "RUNNING",
  JUMPING = "JUMPING",
  ROLLING = "ROLLING",
  DASHING = "DASHING",
}

export class Player {

  private _cube: THREE.Mesh
  private _defaultPosition: THREE.Vector2
  private _position: THREE.Vector2
  private _velocity: THREE.Vector2
  private _state: PLAYER_STATE
  private _jumpCount: number
  private _dashCount: number
  private _rollFrames: number

  constructor(pos: THREE.Vector2) {
    this._cube = new THREE.Mesh(new THREE.CubeGeometry(15, 15, 15), new THREE.MeshNormalMaterial())
    this._cube.position.set(0, 0, 0)
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

  dashFinish() {
    this._position.x = this._defaultPosition.x
    this.setState(PLAYER_STATE.JUMPING)
    this._velocity.x = 0
  }

  mesh() {
    return this._cube
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

  render(deltaTime: number) {
    this.calculatePosition(deltaTime)
    this._cube.position.x = this._position.x
    this._cube.position.y = this._position.y
  }
}