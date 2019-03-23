import ExpoTHREE, { THREE } from 'expo-three'
import { Player } from '../player/Player'

export class Scene {

  private _renderer: ExpoTHREE.Renderer
  private _scene: THREE.Scene
  private _camera: THREE.Camera
  private _deltaTime: number
  private _time: number
  private _player: Player
  private _gl: WebGLRenderingContext
  private _width: number
  private _height: number
  private _ratio: number

  constructor() {
    this._time = 0
    this._deltaTime = 0.05
    const startingPosition = new THREE.Vector2(-20, -10)
    this._player = new Player(startingPosition)
    this._gl = {}
    this._width = 0
    this._height = 0
    this._ratio = 0
  }

  onSwipeUp() {
    this._player.jump()
  }

  onSwipeDown() {
    this._player.roll()
  }

  onSwipeRight() {
    this._player.dash()
  }

  init = (data: any) => {
    const { gl, ratio, width, height } = data
    this._gl = gl
    this._width = width
    this._height = height
    this._ratio = ratio

    this._renderer = new ExpoTHREE.Renderer({ gl, ratio, width, height })
    this._scene = new THREE.Scene()
    this._camera = new THREE.PerspectiveCamera(70, width / height, 1, 1000)
    this._camera.position.z = 100
    this._camera.lookAt(0, 0, 0)
    this._scene.add(this._player.mesh())

    this._renderer.setClearColor('#FF00FF')
    this._renderer.setSize(this._width * 2, this._height * 2)
    this._camera.aspect = this._width / this._height
    this._camera.updateProjectionMatrix()

    this.animate()
  }

  animate = () => {
    this.render()
    requestAnimationFrame(this.animate)
  }

  render = () => {
    this._time += this._deltaTime
    this._player.render(this._deltaTime)
    this._renderer.render(this._scene, this._camera)
  }

}