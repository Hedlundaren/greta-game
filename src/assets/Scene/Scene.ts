import ExpoTHREE, { Texture, THREE } from 'expo-three'

import { Background } from '../Background/Background'
import { Collectibles } from '../Collectibles/Collectibles'
import { Foreground } from '../Foreground/Foreground'
import { Player } from '../Player/Player'

export interface SceneData {
  backgroundTexture: Texture,
  foregroundTexture: Texture,
  runningTextures: Texture[],
  jumpingTextures: Texture[],
  dashingTextures: Texture[],
  rollingTextures: Texture[],
  canTextures: Texture[],
  foregroundSpeed: number,
  backgroundSpeed: number,
}

export class Scene {

  private _renderer: ExpoTHREE.Renderer
  private _scene: THREE.Scene
  private _camera: THREE.Camera
  private _deltaTime: number
  private _time: number
  private _player: Player
  private _width: number
  private _height: number
  private _background: Background
  private _foreground: Foreground
  private _collectibles: Collectibles

  constructor(sceneData: SceneData) {
    this._time = 0
    this._deltaTime = 0.05
    this._width = 0
    this._height = 0
    this._background = new Background(sceneData.backgroundTexture, sceneData.backgroundSpeed)
    this._foreground = new Foreground(sceneData.foregroundTexture, sceneData.foregroundSpeed)
    const startingPosition = new THREE.Vector2(-20, -20)
    this._player = new Player(startingPosition, sceneData)
    this._collectibles = new Collectibles(sceneData)
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

  onSwipeLeft() {
    this._player.backDash()
  }

  init = (graphicsData: any) => {
    const { gl, ratio, width, height } = graphicsData
    this._width = width
    this._height = height

    this._renderer = new ExpoTHREE.Renderer({ gl, ratio, width, height })
    this._scene = new THREE.Scene()
    this._camera = new THREE.OrthographicCamera(-width / 10, width / 10, height / 10, -height / 10, 1, 1000);
    this._camera.position.z = 1
    this._camera.lookAt(0, 0, 0)

    this._scene.add(this._player.mesh())
    this._scene.add(this._background.sprite())
    this._scene.add(this._foreground.sprite())
    this._scene.add(this._collectibles.sprites())

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
    this._player.render(this._time, this._deltaTime)
    this._renderer.render(this._scene, this._camera)
    this._background.render(this._deltaTime)
    this._foreground.render(this._deltaTime)
    this._collectibles.render(this._deltaTime, this._player.position())
  }
}