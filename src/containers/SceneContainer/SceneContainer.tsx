import { View as GraphicsView } from 'expo-graphics'
import * as React from 'react'

import { styles } from './style'
import GestureRecognizer from '../GestureRecognizer/GestureRecognizer';
import { Scene, SceneData } from '../../assets/scripts/Scene';

interface State {
  title: string
  paused: boolean
}

interface Props {
  sceneData: SceneData
}

export default class SceneContainer extends React.Component<Props, State> {

  private _scene: Scene

  constructor(p: Props) {
    super(p)
    this._scene = new Scene(p.sceneData)
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

  init = (e: any) => {
    this._scene.init(e)
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
          onContextCreate={this.init}
          onRender={this._scene.render}
        />
      </GestureRecognizer>
    )
  }
}
