import { View as GraphicsView } from 'expo-graphics'
import * as React from 'react'
import { Text, View } from 'react-native'
import GestureRecognizer from 'react-native-swipe-gestures'

import { Scene, SceneData } from '../../assets/Scene/Scene';
import { styles } from './style'


interface State {
  // backgroundColor: string
  title: string
}

interface Props {
  sceneData: SceneData
}

export default class SceneContainer extends React.Component<Props, State> {

  private _scene: Scene

  constructor(p: Props) {
    super(p)
    this._scene = new Scene(p.sceneData)
    this.state ={ 
      title: 'Greta Game'
    }
  }

  setTitle = (title: string) => {
    this.setState({title})
  }
  onSwipeUp = () => {
    this._scene.onSwipeUp()
  }
  onSwipeDown = () => {
    this._scene.onSwipeDown()
  }
  onSwipeRight = () => {
    this._scene.onSwipeRight()
  }
  onSwipeLeft = () => {
    this._scene.onSwipeLeft()
  }

  public render() {
    const { title } = this.state

    const config = {
      velocityThreshold: 0.01,
      directionalOffsetThreshold: 55,
      gestureIsClickThreshold: 1,
    }

    return (
      <GestureRecognizer
        onSwipeUp={this.onSwipeUp}
        onSwipeDown={this.onSwipeDown}
        onSwipeRight={this.onSwipeRight}
        onSwipeLeft={this.onSwipeLeft}
        config={config}
        style={styles.gestureContainer}
      >
        <View style={styles.header}>
          <Text style={styles.text}>{title}</Text>
        </View>
        <GraphicsView
          style={styles.graphicsContainer}
          onContextCreate={this._scene.init}
          onRender={this._scene.render}
        />
      </GestureRecognizer>
    )
  }
}
