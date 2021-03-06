import { Audio } from 'expo'
import ExpoTHREE, { Texture, THREE } from 'expo-three'

import { Background } from './Background'
import { Clouds } from './Clouds'
import { Collectibles } from './Collectibles'
import { Foreground } from './Foreground'
import { Player } from './Player'
import { Sky } from './Sky'

export interface SceneData {
  backgroundTexture: Texture,
  foregroundTexture: Texture,
  skyTexture: Texture,
  meatTexture: Texture,
  oilTexture: Texture,
  cloudTexture: Texture,
  strawTexture: Texture,
  trumpTexture: Texture,
  runningTextures: Texture[],
  jumpingTextures: Texture[],
  jumping2Textures: Texture[],
  dashingTextures: Texture[],
  dashingBackTextures: Texture[],
  rollingTextures: Texture[],
  rollingFromAirTextures: Texture[],
  fallingTextures: Texture[],
  canTextures: Texture[],
  explosionTextures: Texture[],
  jumpingSound: Audio.Sound,
  foregroundSpeed: number,
  backgroundSpeed: number,
  cloudSpeed: number,
  useAction: (data: any) => void
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
  private _sky: Sky
  private _clouds: Clouds
  private _collectibles: Collectibles
  private _pause: boolean
  private _renderTarget: THREE.WebGLRenderTarget
  private _scenePostProcessing: THREE.Scene
  // private _materialPostProcessing: THREE.ShaderMaterial
  private _planePostProcessing: THREE.Plane
  private _sceneData: SceneData
  private _gl: any
  private _textureData: Float32Array
  private _groundGroup: THREE.Group

  constructor(sceneData: SceneData) {
    this._time = 0
    this._pause = false
    this._deltaTime = 0.1
    this._width = 0
    this._height = 0
    
    this._sceneData = sceneData
    this._background = new Background(sceneData.backgroundTexture, sceneData.backgroundSpeed)
    this._clouds = new Clouds(sceneData.cloudTexture, sceneData.cloudSpeed)
    this._foreground = new Foreground(sceneData.foregroundTexture, sceneData.foregroundSpeed)
    this._groundGroup = new THREE.Group()

    const startingPosition = new THREE.Vector2(-24, -20)
    this._player = new Player(startingPosition, sceneData)
    this._collectibles = new Collectibles(sceneData)
    
    this._textureData = new Float32Array(0)
  }

  onUpdate () {

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

  onPause() {
    this._pause = !this._pause
  }

  init = (graphicsData: any) => {
    const { gl, ratio, width, height } = graphicsData
    this._width = width
    this._height = height
    this._gl = gl

    this._renderer = new ExpoTHREE.Renderer({ gl, ratio, width, height, precision: 'lowp' })
    this._renderer.setClearColor('#FF00FF')
    this._renderer.setSize(this._width * 2, this._height * 2)
    this._renderer.antialising = true
    this._scene = new THREE.Scene()
    this._scenePostProcessing = new THREE.Scene()
    this._sky = new Sky(this._width, this._height)

    this._camera = new THREE.OrthographicCamera(-width / 10, width / 10, height / 10, -height / 10, 1, 1000);
    this._camera.position.z = 1
    this._camera.lookAt(0, 0, 0)
    
    this._groundGroup.add(this._background.sprite())
    this._groundGroup.add(this._foreground.sprite())
    this._groundGroup.add(this._clouds.sprite())
    this._groundGroup.add(this._collectibles.sprites())

    this._scene.add(this._groundGroup)
    this._scene.add(this._player.mesh())
    this._scene.add(this._sky.sprite())

    // this._renderTarget = new THREE.WebGLRenderTarget(width, height, { type: THREE.UnsignedByte, format: THREE.RGBAFormat })
    // this._textureData = new Float32Array(width * height * 4)
    // this._textureData.fill(1.0)

    // this._materialPostProcessing = new THREE.ShaderMaterial({
    //   uniforms: {
    //     time: { value: 0.0 },
    //     sceneTexture: { value: this._renderTarget.texture },
    //     backgroundTexture: { value: this._sceneData.backgroundTexture },
    //   },
    //   vertexShader,
    //   fragmentShader
    // })

    // const geometry = new THREE.PlaneGeometry(width / 10, height / 10, 32)
    // this._planePostProcessing = new THREE.Mesh(geometry, this._materialPostProcessing)
    // this._scenePostProcessing.add(this._planePostProcessing)

  }

  render = () => {
    if (!this._pause) {
      this._time += this._deltaTime
      this._player.render(this._time, this._deltaTime)
      this._background.render(this._time, this._deltaTime)
      this._foreground.render(this._time, this._deltaTime)
      this._clouds.render(this._time, this._deltaTime)
      this._sky.render(this._time, this._deltaTime)
      this._collectibles.render(this._time, this._deltaTime, this._player.position())
      this._renderer.render(this._scene, this._camera)
      this._deltaTime += 0.000001
      const lol =  0.1 * Math.sin(this._time) - this._player.position().y * 0.01
      this._groundGroup.position.set(0, lol, 0)
      this._gl.endFrameEXP()

      // Render scene to renderTarget 
      // this._renderer.setRenderTarget(this._renderTarget)
      // this._renderer.clear()
      // this._renderer.render(this._scene, this._camera)

      // // Render renderTarget to plane
      // this._renderer.setRenderTarget(null)
      // this._renderer.clear()
      // this._renderer.render(this._scenePostProcessing, this._camera)

      // Cl3ver
      // this._renderer.render(this._scene, this._camera, this._renderTarget, true)
      // this._renderer.render(this._scenePostProcessing, this._camera, null, true)
      // this._renderer.readRenderTargetPixels(this._renderTarget, 0, 0, this._width, this._height, this._textureData)

      // this._materialPostProcessing.uniforms.sceneTexture.value = new DataTexture(this._width, this._height, this._textureData).texture
      // this._renderer.render(this._scenePostProcessing, this._camera)
    }
  }
}
