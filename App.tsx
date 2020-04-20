import 'react-native-gesture-handler'
import React from 'react'
import Counter from './src/components/Counter'
import LoginSubmission from './src/components/LoginSubmission'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import EasyButton from './src/components/EasyButton'
import Home from './src/components/Home'
import {ThemeProvider} from './src/utils/theme'

const Stack = createStackNavigator()

export const SCREENS = {HOME: "Home", COUNTER: "Counter", LOGIN: "Login", EASYBUTTON: "EasyButton"}
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
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </>
  )
}
