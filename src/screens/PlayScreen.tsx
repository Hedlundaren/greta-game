import * as React from 'react'
import { StyleSheet, View, Text } from 'react-native'

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
})


const PlayScreen = () => {

  console.log('starting game...')

  const onTouch = (e: any) => {
    console.log('touch', e)
  }

  return (
    <View
      style={styles.container}
      onTouchMove={onTouch}
    >
      <Text>Player 2</Text>
    </View>
  )
}

PlayScreen.navigationOptions = {
  title: 'Play',
}

export default PlayScreen
