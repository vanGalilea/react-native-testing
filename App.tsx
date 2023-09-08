import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import Home from './src/components/Home';
import EasyButton from './src/components/EasyButton';
import Video from './src/components/Video';
import FlatList from './src/components/FlatList';
import Modal from './src/components/Modal';
import {ThemeProvider} from './src/utils/theme';
import ListWithFetch from './src/components/ListWithFetch';
import LoginSubmission from './src/components/LoginSubmission';
import Counter from './src/components/Counter';
import {Alert} from 'react-native';

export type RootStackParamList = {
  Home: undefined;
  Counter: undefined;
  Login: undefined;
  EasyButton: undefined;
  Video: undefined;
  Modal: undefined;
  FlatList: undefined;
  ListWithFetch: undefined;
};
export type NavigationProps = StackNavigationProp<RootStackParamList>;

export const Stack = createStackNavigator<RootStackParamList>();

export const SCREENS: Record<string, keyof RootStackParamList> = {
  HOME: 'Home',
  COUNTER: 'Counter',
  LOGIN: 'Login',
  EASYBUTTON: 'EasyButton',
  VIDEO: 'Video',
  MODAL: 'Modal',
  FLATLIST: 'FlatList',
  LIST_WITH_FETCH: 'ListWithFetch',
};
const EasyButtonScreen = () => {
  const handleOnPress = () => {
    Alert.alert('EasyButton', 'You clicked me!');
  };
  return <EasyButton onPress={handleOnPress} />;
};
export default () => {
  return (
    <>
      <ThemeProvider initialTheme={'dark'}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
              headerBackTestID: 'go-back-home-button',
            }}>
            <Stack.Screen name={SCREENS.HOME} component={Home} />
            <Stack.Screen name={SCREENS.LOGIN} component={LoginSubmission} />
            <Stack.Screen
              name={SCREENS.EASYBUTTON}
              component={EasyButtonScreen}
            />
            <Stack.Screen name={SCREENS.COUNTER} component={Counter} />
            <Stack.Screen name={SCREENS.VIDEO} component={Video} />
            <Stack.Screen name={SCREENS.MODAL} component={Modal} />
            <Stack.Screen name={SCREENS.FLATLIST} component={FlatList} />
            <Stack.Screen
              name={SCREENS.LIST_WITH_FETCH}
              component={ListWithFetch}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </>
  );
};
