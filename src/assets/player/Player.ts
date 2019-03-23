import ExpoTHREE, { THREE } from 'expo-three'
const GRAVITY_CONSTANT = 9.82
const DASHING_CONSTANT = 9.82

enum PLAYER_STATE {
  RUNNING,
  JUMPING,
  ROLLING,
  DASHING,
}

export class Player {

  private _cube: THREE.Mesh
  private _restingPosition: THREE.Vector2
  private _position: THREE.Vector2
  private _velocity: THREE.Vector2
  private _playerState: PLAYER_STATE
  private _jumpCount: number

  constructor(pos: THREE.Vector2) {
    this._cube = new THREE.Mesh(new THREE.CubeGeometry(30, 30, 30), new THREE.MeshNormalMaterial())
    this._cube.position.set(0, 0, 0)
    this._position = new THREE.Vector2(0, 0)
    this._velocity = new THREE.Vector2(0, 1)
    this._restingPosition = pos
    this._playerState = PLAYER_STATE.RUNNING
  }

  isDashing() { return this._playerState === PLAYER_STATE.DASHING }
  isJumping() { return this._playerState === PLAYER_STATE.JUMPING }
  isRunning() { return this._playerState === PLAYER_STATE.RUNNING }
  isRolling() { return this._playerState === PLAYER_STATE.ROLLING }

  jump() {
    if (this._jumpCount < 2) {
      this._playerState = PLAYER_STATE.JUMPING
      this._velocity.y = 30
      this._jumpCount++
    }
  }

  roll() {
    this._playerState = PLAYER_STATE.ROLLING
    this._velocity.y = -30
  }

  dash() {
    if (this._playerState === PLAYER_STATE.JUMPING) {
      this._playerState = PLAYER_STATE.DASHING
      this._velocity.x = 30
    }
  }

  mesh() {
    return this._cube
  }

  calculatePosition(deltaTime: number) {
    // gravity
    if (this.isDashing) {
      this._velocity.x -= DASHING_CONSTANT * deltaTime
    }

    // if (!this.isDashing) {
    this._velocity.y -= GRAVITY_CONSTANT * deltaTime
    // }

    // position
    this._position.x += this._velocity.x * deltaTime
    this._position.y += this._velocity.y * deltaTime

    // collision ground
    if (this._position.y < 0) {
      this._position.y = 0.1
      this._playerState = PLAYER_STATE.RUNNING
      this._jumpCount = 0
    }

    // returned dash
    if (this.isDashing && this._position.x < 0) {
      this._position.x = 0.1
      this._playerState = PLAYER_STATE.JUMPING
    }
  }

  // set playerState(state: PLAYER_STATE) { this._playerState = state }
  // get playerState() { return this._playerState }

  render(deltaTime: number) {
    this.calculatePosition(deltaTime)
    this._cube.position.x = this._position.x
    this._cube.position.y = this._position.y
  }
}