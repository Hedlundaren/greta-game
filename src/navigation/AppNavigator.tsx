import { createAppContainer, createStackNavigator } from 'react-navigation'

import HomeScreen from '../screens/HomeScreen'
import StartScreen from '../screens/StartScreen'
import PlayScreen from '../screens/PlayScreen'

const AppNavigator = createStackNavigator({
  Play: PlayScreen,
  Start: StartScreen,
})

export default createAppContainer(AppNavigator)
