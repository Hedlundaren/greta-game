import { AppLoading, Asset, Font, ScreenOrientation } from 'expo'
import * as React from 'react'
import { StyleSheet, View } from 'react-native'
import SceneContainer from './containers/SceneContainer/SceneContainer'
import ExpoTHREE from 'expo-three';
import { SceneData } from './assets/Scene/Scene';


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
  runningTextures: ExpoTHREE.Texture[]
}

export default class App extends React.Component<Props, States> {
  public state = {
    isLoadingComplete: false,
    backgroundTexture: null,
    runningTextures: []
  }

  constructor(p: Props) {
    super(p)
    ScreenOrientation.allowAsync(ScreenOrientation.Orientation.PORTRAIT)
  }

  private loadResourcesAsync = async () => {
    await Promise.all([
      Asset.loadAsync([
        // this.state.texture = await ExpoTHREE.loadAsync('https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png')
        this.state.backgroundTexture = await ExpoTHREE.loadAsync(require('./assets/images/Background2.png'))

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
    const { isLoadingComplete, backgroundTexture, runningTextures } = this.state
    const { skipLoadingScreen } = this.props
    
    const sceneData: SceneData = {
      backgroundTexture,
      runningTextures: [...runningTextures]
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
