import { AppLoading, Asset, Audio, Font, ScreenOrientation } from 'expo'
import ExpoTHREE from 'expo-three'
import * as React from 'react'
import { StyleSheet, View } from 'react-native'

import { SceneData } from './assets/scripts/Scene'
import SceneContainer from './containers/SceneContainer/SceneContainer'
import { loadCanTextures } from './utils/loadCanTextures'
import { loadDashingTextures } from './utils/loadDashingTextures'
import { loadDashingBackTextures } from './utils/loadDashingBackTextures'
import { loadFallingTextures } from './utils/loadFallingTextures'
import { loadJumpingTextures } from './utils/loadJumpingTextures'
import { loadRollingFromAirTextures } from './utils/loadRollingFromAirTextures'
import { loadRollingTextures } from './utils/loadRollingTextures'
import { loadRunningTextures } from './utils/loadRunningTextures'

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

interface States extends SceneData{
  isLoadingComplete: boolean
}

export default class App extends React.Component<Props, States> {
  public state = {
    isLoadingComplete: false,
    backgroundTexture: null,
    foregroundTexture: null,
    skyTexture: null,
    meatTexture: null,
    oilTexture: null,
    strawTexture: null,
    trumpTexture: null,
    runningTextures: [],
    jumpingTextures: [],
    dashingTextures: [],
    dashingBackTextures: [],
    rollingTextures: [],
    rollingFromAirTextures: [],
    fallingTextures: [],
    canTextures: [],
    jumpingSound: new Audio.Sound(),
    foregroundSpeed: 10,
    backgroundSpeed: 2,
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
        this.state.dashingBackTextures = await loadDashingBackTextures(),
        this.state.rollingTextures = await loadRollingTextures(),
        this.state.rollingFromAirTextures = await loadRollingFromAirTextures(),
        this.state.fallingTextures = await loadFallingTextures(),
        this.state.canTextures = await loadCanTextures(),
        this.state.meatTexture = await ExpoTHREE.loadAsync(require(`./assets/images/obstacles/meat.png`)),
        this.state.oilTexture = await ExpoTHREE.loadAsync(require('./assets/images/obstacles/oil.png')),
        this.state.strawTexture = await ExpoTHREE.loadAsync(require('./assets/images/obstacles/straw.png')),
        this.state.trumpTexture = await ExpoTHREE.loadAsync(require('./assets/images/obstacles/trump.png')),
        this.state.backgroundTexture = await ExpoTHREE.loadAsync(require('./assets/images/background/Background.png')),
        this.state.foregroundTexture = await ExpoTHREE.loadAsync(require('./assets/images/foreground/Foreground.png')),
        this.state.skyTexture = await ExpoTHREE.loadAsync(require('./assets/images/sky/Sky.png')),
        await this.state.jumpingSound.loadAsync(Asset.fromModule(require('./assets/sounds/pop.mp3'))),
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
    const { isLoadingComplete } = this.state
    const { skipLoadingScreen } = this.props
    
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
          <SceneContainer sceneData={this.state} />
        </View>
    )
  }
}
