import React from 'react';
import {Text, View} from 'react-native';
import {render} from '@testing-library/react-native';

const HelloWorld = () => (
  <View>
    <Text>Hello from the machine!</Text>
  </View>
);

describe('<App />', () => {
  it('has 2 child', () => {
    render(<HelloWorld />);
  });
});
