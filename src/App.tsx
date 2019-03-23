import { AppLoading, Asset, Font, ScreenOrientation } from 'expo'
import * as React from 'react'
import { StyleSheet, View } from 'react-native'

import SceneContainer from './containers/SceneContainer/SceneContainer'


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
}

export default class App extends React.Component<Props, States> {
  public state = {
    isLoadingComplete: false,
  }

  constructor(p: Props) {
    super(p)
    ScreenOrientation.allow(ScreenOrientation.Orientation.PORTRAIT)
  }

  private loadResourcesAsync = async () => {
    await Promise.all([
      Asset.loadAsync([
        // ...
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
          <SceneContainer />
        </View>
    )
  }
}
