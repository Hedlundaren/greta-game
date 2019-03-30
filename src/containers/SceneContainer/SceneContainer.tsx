import { View as GraphicsView } from 'expo-graphics'
import * as React from 'react'

import { Scene, SceneData } from '../../assets/Scene/Scene';
import { styles } from './style'
import GestureRecognizer from '../GestureRecognizer/GestureRecognizer';

interface State {
  title: string
  paused: boolean
}

interface Props {
  sceneData: SceneData
}

export default class SceneContainer extends React.Component<Props, State> {

  private _scene: Scene
  private _latestX: number
  private _latestY: number

  constructor(p: Props) {
    super(p)
    this._scene = new Scene(p.sceneData)
    this._latestX = 0
    this._latestY = 0
    this.state = {
      title: '||',
      paused: false,
    }
  }

  setTitle = (title: string) => {
    this.setState({ title })
  }
  onSwipeUp = () => {
    this._scene.onSwipeUp()
  }
  onPress = () => {
    this._scene.onSwipeUp()
  }
  onSwipeDown = () => {
    this._scene.onSwipeDown()
  }
  onSwipeRight = () => {
    this._scene.onSwipeRight()
  }
  onTogglePause = () => {
    const { paused } = this.state
    this._scene.onPause()
    this.setState({ title: paused ? '||' : '>', paused: !paused })
  }
  onSwipeLeft = () => {
    this._scene.onSwipeLeft()
  }

  public render() {
    const { title } = this.state

    return (
      <GestureRecognizer
        onPress={this.onPress}
        onSwipeUp={this.onSwipeUp}
        onSwipeDown={this.onSwipeDown}
        onSwipeRight={this.onSwipeRight}
        onSwipeLeft={this.onSwipeLeft}
        style={styles.gestureContainer}
      >
        <GraphicsView
          style={styles.graphicsContainer}
          onContextCreate={this._scene.init}
          onRender={this._scene.render}
        />
      </GestureRecognizer>
    )
  }
}
