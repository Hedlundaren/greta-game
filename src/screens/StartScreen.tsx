import * as React from 'react'
import { StyleSheet, View, Text } from 'react-native'

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
})

const StartScreen = () => (
  <View style={styles.container}><Text>Greta</Text></View>
)

StartScreen.navigationOptions = {
  title: 'Start',
}

export default StartScreen
