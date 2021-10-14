import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native'
import * as Animatable from 'react-native-animatable'
import React from 'react'

export default ({style = {}}: {style?: StyleProp<ViewStyle> & object}) => {
  console.log('image ')

  return (
    <Animatable.View
      easing="ease-in"
      duration={800}
      animation={{
        from: {opacity: 0.6},
        to: {opacity: 0},
      }}
      direction={'alternate'}
      iterationCount={'infinite'}
      useNativeDriver={true}
      style={{...styles.innerContainer, ...style}}
    />
  )
}

const styles = StyleSheet.create({
  innerContainer: {
    width: 300,
    height: 500,
    backgroundColor: '#797972',
    borderRadius: 8,
  },
})
