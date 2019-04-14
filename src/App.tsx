import { AppLoading, Asset, Audio, Font, ScreenOrientation } from 'expo'
import ExpoTHREE, { THREE } from 'expo-three'
import * as React from 'react'
import { StyleSheet, View, Text } from 'react-native'

import { SceneData } from './assets/scripts/Scene'
import SceneContainer from './containers/SceneContainer/SceneContainer'
import { loadCanTextures } from './utils/loadCanTextures'
import { loadDashingTextures } from './utils/loadDashingTextures'
import { loadDashingBackTextures } from './utils/loadDashingBackTextures'
import { loadFallingTextures } from './utils/loadFallingTextures'
import { loadJumpingTextures } from './utils/loadJumpingTextures'
import { loadJumping2Textures } from './utils/loadJumping2Textures';
import { loadRollingFromAirTextures } from './utils/loadRollingFromAirTextures'
import { loadRollingTextures } from './utils/loadRollingTextures'
import { loadRunningTextures } from './utils/loadRunningTextures'
import { loadExplosionTextures } from './utils/loadExplosionTextures';

console.disableYellowBox = true
THREE.suppressExpoWarnings(true)

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pointsDisplay: {
    height: 60,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    marginRight: 60,
    marginLeft: 60,
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
  }
})

interface Props {
  skipLoadingScreen: boolean
}

interface States extends SceneData {
  isLoadingComplete: boolean
  points: number
  damage: number
  isPaused: boolean
}

export enum ACTION {
  COLLECT_CAN,
  COLLIDE_WITH_OBSTACLE,
  PAUSE,
  PLAY
}

export default class App extends React.Component<Props, States> {

  useAction = (action: ACTION) => {
    switch (action) {
      case ACTION.COLLECT_CAN:
        this.setState({ points: this.state.points + 1 })
        break
      case ACTION.COLLIDE_WITH_OBSTACLE:
        this.setState({ points: this.state.damage + 1 })
        break
      case ACTION.PAUSE:
      this.setState({ isPaused: true })
        break
      case ACTION.PLAY:
      this.setState({ isPaused: false })
      break
    }
  }

  public state = {
    isLoadingComplete: false,
    backgroundTexture: null,
    foregroundTexture: null,
    cloudTexture: null,
    skyTexture: null,
    meatTexture: null,
    oilTexture: null,
    strawTexture: null,
    trumpTexture: null,
    runningTextures: [],
    jumpingTextures: [],
    jumping2Textures: [],
    dashingTextures: [],
    dashingBackTextures: [],
    rollingTextures: [],
    rollingFromAirTextures: [],
    fallingTextures: [],
    canTextures: [],
    explosionTextures: [],
    jumpingSound: new Audio.Sound(),
    foregroundSpeed: 10,
    backgroundSpeed: 2,
    cloudSpeed: 2.4,
    useAction: this.useAction,
    points: 0,
    damage: 0,
    isPaused: false
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
        this.state.jumping2Textures = await loadJumping2Textures(),
        this.state.dashingTextures = await loadDashingTextures(),
        this.state.dashingBackTextures = await loadDashingBackTextures(),
        this.state.rollingTextures = await loadRollingTextures(),
        this.state.rollingFromAirTextures = await loadRollingFromAirTextures(),
        this.state.fallingTextures = await loadFallingTextures(),
        this.state.canTextures = await loadCanTextures(),
        this.state.explosionTextures = await loadExplosionTextures(),
        this.state.meatTexture = await ExpoTHREE.loadAsync(require(`./assets/images/obstacles/meat.png`)),
        this.state.oilTexture = await ExpoTHREE.loadAsync(require('./assets/images/obstacles/oil.png')),
        this.state.strawTexture = await ExpoTHREE.loadAsync(require('./assets/images/obstacles/straw.png')),
        this.state.trumpTexture = await ExpoTHREE.loadAsync(require('./assets/images/obstacles/trump.png')),
        this.state.backgroundTexture = await ExpoTHREE.loadAsync(require('./assets/images/background/Background.png')),
        this.state.foregroundTexture = await ExpoTHREE.loadAsync(require('./assets/images/foreground/Foreground.png')),
        this.state.cloudTexture = await ExpoTHREE.loadAsync(require('./assets/images/clouds/cloud1.png')),
        this.state.skyTexture = await ExpoTHREE.loadAsync(require('./assets/images/sky/Sky.png')),
        await this.state.jumpingSound.loadAsync(Asset.fromModule(require('./assets/sounds/hopp.mp3'))),
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
    const { isLoadingComplete, points, damage } = this.state
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
        <View style={styles.headerContainer}>
          <View style={styles.pointsDisplay}><Text>{damage}</Text></View>
          <View style={styles.pointsDisplay}><Text>{points}</Text></View>
          <View style={styles.pointsDisplay}><Text>{points}</Text></View>
        </View>
        <SceneContainer sceneData={this.state} />
      </View>
    )
  }
}
