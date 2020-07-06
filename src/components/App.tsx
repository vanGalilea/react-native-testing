import 'react-native-gesture-handler'
import React from 'react'
import Counter from './Counter'
import LoginSubmission from './LoginSubmission'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import EasyButton from './EasyButton'
import Home from './Home'
import {ThemeProvider} from '../utils/theme'
import Video from './Video'

const Stack = createStackNavigator()

export const SCREENS: Record<string,string> = {HOME: "Home", COUNTER: "Counter", LOGIN: "Login", EASYBUTTON: "EasyButton", VIDEO: "Video"}
export default () => {
  return (
    <>
      <ThemeProvider initialTheme={'dark'}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name={SCREENS.HOME} component={Home} />
            <Stack.Screen name={SCREENS.LOGIN} component={LoginSubmission} />
            <Stack.Screen name={SCREENS.EASYBUTTON} component={EasyButton} />
            <Stack.Screen name={SCREENS.COUNTER} component={Counter} />
            <Stack.Screen name={SCREENS.VIDEO} component={Video} />
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </>
  )
}
