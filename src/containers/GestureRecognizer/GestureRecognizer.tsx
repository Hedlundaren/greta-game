import { THREE } from 'expo-three'
import * as React from 'react'
import { View } from 'react-native'

import { styles } from './style'

interface Vector2 {
  x: number
  y: number
}

interface TouchEvent {
  type: 'TOUCH' | 'MOVE' | 'NONE'
  position: { x: number, y: number }
}

interface State {
  latestEvents: TouchEvent[]
}

interface Props {
  onPress: () => void
  onSwipeUp: () => void
  onSwipeDown: () => void
  onSwipeRight: () => void
  onSwipeLeft: () => void
  style: any
}

export default class GestureRecognizer extends React.Component<Props, State> {

  private _position: Vector2
  private _timer: any

  constructor(p: Props) {
    super(p)
    this.state = {
      latestEvents: [{ type: 'NONE', position: { x: 0, y: 0 } }, { type: 'NONE', position: { x: 0, y: 0 } }, { type: 'NONE', position: { x: 0, y: 0 } }]
    }
    this._position = { x: 0, y: 0 }
  }

  onTouchStart = (e: any) => {
    this.addEvent({ type: 'TOUCH', position: { x: e.nativeEvent.locationX, y: e.nativeEvent.locationY } })
  }

  onTouchMove = (e: any) => {
    this.addEvent({ type: 'MOVE', position: { x: e.nativeEvent.locationX, y: e.nativeEvent.locationY } })
  }

  onTouchEnd = (e: any) => {
    this._position.x = 0
    this._position.y = 0
    this.addEvent({ type: 'NONE', position: { x: 0, y: 0 } })
  }

  onStartShouldSetResponder = (e: any) => true
  onStartShouldSetResponderCapture = (e: any) => true
  onMoveShouldSetResponderCapture = (e: any) => true

  onSwipe = (pStart: Vector2, pEnd: Vector2) => {
    const { onSwipeLeft, onSwipeDown, onSwipeRight, onSwipeUp } = this.props
    const swipeDirection = new THREE.Vector2(pEnd.x - pStart.x, pStart.y - pEnd.y).normalize()
    if (Math.abs(swipeDirection.x) > Math.abs(swipeDirection.y)) {
      swipeDirection.x > 0 ? onSwipeRight() : onSwipeLeft()
    } else {
      swipeDirection.y > 0 ? onSwipeUp() : onSwipeDown()
    }
  }

  addEvent = (event: TouchEvent) => {

    const events = [...this.state.latestEvents]
    events.unshift(event)
    this.setState({ latestEvents: [events[0], events[1], events[2]] })
    if (events[0].type === 'MOVE' && events[1].type === 'MOVE' && events[2].type === 'MOVE') {
      this.onSwipe(events[2].position, events[0].position)
    }
  }

  public render() {
    const { children } = this.props

    return (
      <View
        style={styles.gestureContainer}
        onTouchStart={this.onTouchStart}
        onResponderMove={this.onTouchMove}
        onResponderRelease={this.onTouchEnd}
        onStartShouldSetResponder={this.onStartShouldSetResponder}
        onStartShouldSetResponderCapture={this.onStartShouldSetResponderCapture}
        onMoveShouldSetResponderCapture={this.onMoveShouldSetResponderCapture}
      >
        {children}
      </View>
    )
  }
}
