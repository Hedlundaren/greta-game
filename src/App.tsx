import * as React from 'react'
import {
  Platform,
  StatusBar,
  StyleSheet,
  View,
  Text,
} from 'react-native'

import {AppLoading, Asset, Font} from 'expo'
import Scene from './containers/Scene/Scene'
import AppNavigator from './navigation/AppNavigator'


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
          <Scene/>
        </View>
    )
  }
}
