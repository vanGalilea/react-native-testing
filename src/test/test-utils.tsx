import React, {ComponentType} from 'react'
import {render as rtlRender} from 'react-native-testing-library'
import {ThemeProvider} from '../utils/theme'
import {createStackNavigator} from '@react-navigation/stack'
import {NavigationContainer} from '@react-navigation/native'

function render(ui: any, {theme = 'light', ...options} = {}) {
  // @ts-ignore
  const Wrapper = ({children}): ComponentType => (
    <ThemeProvider initialTheme={theme}>{children}</ThemeProvider>
  )
  // @ts-ignore
  return rtlRender(ui, {wrapper: Wrapper, ...options})
}

export * from 'react-native-testing-library'
// override React Testing Library's render with our own
export {render}

const Stack = createStackNavigator()

export const renderWithNavigation = ({ screens = {}, navigatorConfig = {} } = {})=>
  render(
    <NavigationContainer>
      <Stack.Navigator {...navigatorConfig}>
        {
          // @ts-ignore
          Object.keys(screens).map(name=> <Stack.Screen key={name} name={name} component={screens[name]} />)
        }
      </Stack.Navigator>
    </NavigationContainer>
  )
