import { ExpoWebGLRenderingContext, GLView } from 'expo'
import ExpoTHREE, { THREE } from 'expo-three'
import React from 'react'
import { Text, View } from 'react-native'
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures'
import { styles } from './style'
import { View as GraphicsView } from 'expo-graphics'


interface State {
  // backgroundColor: string
}


export default class Scene extends React.Component<State> {

  private _renderer: ExpoTHREE.Renderer
  private _scene: THREE.Scene
  private _camera: THREE.Camera
  private _cube: THREE.Mesh
  private _time: number

  public state: State = {
    backgroundColor: 'blue'
  }

  constructor() {
    super()
    this._time = 0

  }

  onSwipeUp = () => {
    console.log('up')
    // this.setState()
  }
  onSwipeDown = () => {
    console.log('down')
  }

  public render() {
    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80
    }

    return (
      <GestureRecognizer
        onSwipeUp={this.onSwipeUp}
        onSwipeDown={this.onSwipeDown}
        onPress={this.onSwipeDown}
        config={config}
        style={styles.container}
      >
        <View style={styles.header}>
          <Text style={styles.text}>Greta Game</Text>
        </View>
        <GraphicsView
          style={styles.container}
          onContextCreate={this.onContextCreate}
          onRender={this.render}
        />
      </GestureRecognizer>
    )
  }

  onContextCreate = ({ gl, ratio, width, height }) => {
    console.log('Blablabla')
    this._renderer = new ExpoTHREE.Renderer({ gl, ratio, width, height })
    this._scene = new THREE.Scene()
    this._camera = new THREE.PerspectiveCamera(70, width / height, 1, 1000)
    this._camera.position.z = 100
    this._camera.lookAt(0, 0, 0)
    this._cube = new THREE.Mesh(new THREE.CubeGeometry(50, 50, 50), new THREE.MeshNormalMaterial())
    this._scene.add(this._cube)
    this._cube.position.set(0, 0, 0)
    this._renderer.setClearColor('#FF00FF')
    this.animate()
  }

  animate = () => {
    this.onRender()
    requestAnimationFrame(this.animate)
  }


  onRender = () => {
    this._time += 0.05
    this._cube.rotation.y = this._time;
    this._renderer.render(this._scene, this._camera)
  }
}
