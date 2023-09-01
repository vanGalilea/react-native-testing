import React from 'react';
import {StyleSheet, Text, Pressable, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTheme} from '../utils/theme';

export default (props: any) => {
  const {theme} = useTheme();
  const {backgroundColor, color} = styles[theme];

  return (
    <SafeAreaView style={{padding: 32}}>
      <Pressable
        accessibilityLabel={'easy-button'}
        style={[{backgroundColor}, styles.pressable]}
        {...props}>
        <Text style={{color}}>{props.children || 'Click me!'}</Text>
      </Pressable>
    </SafeAreaView>
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
