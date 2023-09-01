import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import {useTheme} from '../utils/theme';

export default (props: any) => {
  const {theme} = useTheme();
  const {backgroundColor, color} = styles[theme];

  return (
    <Pressable
      accessibilityRole="button"
      style={[{backgroundColor}, styles.pressable]}
      {...props}>
      <Text style={{color}}>{props.children || 'Click me!'}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pressable: {
    padding: 8,
  },
  dark: {
    backgroundColor: 'black',
    color: 'white',
  },
  light: {
    color: 'black',
    backgroundColor: 'white',
  },
});
