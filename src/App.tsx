import { AppLoading, Asset, Font, ScreenOrientation } from 'expo'
import ExpoTHREE from 'expo-three'
import * as React from 'react'
import { StyleSheet, View } from 'react-native'

import { SceneData } from './assets/Scene/Scene'
import SceneContainer from './containers/SceneContainer/SceneContainer'
import { loadDashingTextures } from './utils/loadDashingTextures'
import { loadJumpingTextures } from './utils/loadJumpingTextures'
import { loadRollingTextures } from './utils/loadRollingTextures'
import { loadRunningTextures } from './utils/loadRunningTextures'
import { loadCanTextures } from './utils/loadCanTextures';


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

interface Props {
  skipLoadingScreen: boolean
}

interface States {
  isLoadingComplete: boolean
  backgroundTexture: ExpoTHREE.Texture
  foregroundTexture: ExpoTHREE.Texture
  runningTextures: ExpoTHREE.Texture[]
  jumpingTextures: ExpoTHREE.Texture[]
  dashingTextures: ExpoTHREE.Texture[]
  rollingTextures: ExpoTHREE.Texture[]
  canTextures: ExpoTHREE.Texture[]
}

export default class App extends React.Component<Props, States> {
  public state = {
    isLoadingComplete: false,
    backgroundTexture: null,
    foregroundTexture: null,
    runningTextures: [],
    jumpingTextures: [],
    dashingTextures: [],
    rollingTextures: [],
    canTextures: [],
  }

  constructor(p: Props) {
    super(p)
    ScreenOrientation.allowAsync(ScreenOrientation.Orientation.PORTRAIT)
  }

  private loadResourcesAsync = async () => {
    await Promise.all([
      Asset.loadAsync([
        this.state.runningTextures = await loadRunningTextures(),
        this.state.jumpingTextures = await loadJumpingTextures(),
        this.state.dashingTextures = await loadDashingTextures(),
        this.state.rollingTextures = await loadRollingTextures(),
        this.state.canTextures = await loadCanTextures(),
        this.state.backgroundTexture = await ExpoTHREE.loadAsync(require('./assets/images/background/Background.png')),
        this.state.foregroundTexture = await ExpoTHREE.loadAsync(require('./assets/images/foreground/Foreground.png')),
      ]),
      Font.loadAsync({
        // ...
      }),
    ])
  }

  private handleLoadingError = () => {
    // ...
  }

  private handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true })
  }

  public render() {
    const { isLoadingComplete, backgroundTexture, foregroundTexture } = this.state
    const { skipLoadingScreen } = this.props
    
    const sceneData: SceneData = {
      backgroundTexture,
      foregroundTexture,
      runningTextures: [...this.state.runningTextures],
      jumpingTextures: [...this.state.jumpingTextures],
      dashingTextures: [...this.state.dashingTextures],
      rollingTextures: [...this.state.rollingTextures],
      canTextures: [...this.state.canTextures],
      foregroundSpeed: 10,
      backgroundSpeed: 2,
    } 

    if (!isLoadingComplete && !skipLoadingScreen) {
      return (
          <AppLoading
            startAsync={this.loadResourcesAsync}
            onError={this.handleLoadingError}
            onFinish={this.handleFinishLoading}
          />
      )
    }

    return (
        <View style={styles.container}>
          <SceneContainer sceneData={sceneData} />
        </View>
    )
  }
}
