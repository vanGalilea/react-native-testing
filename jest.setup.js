import React from 'react'
import '@testing-library/jest-native/extend-expect'
import {jest} from '@jest/globals'
import {server} from './src/test/mocks/server'

// Setting global.Promise takes care of act warnings that may occur due to 2 waitFor,
// as suggested https://github.com/callstack/react-native-testing-library/issues/379
import Promise from 'promise-polyfill'
global.Promise = Promise

jest.mock('react-native-gesture-handler', () => {
  const View = require('react-native/Libraries/Components/View/View')
  return {
    Swipeable: View,
    DrawerLayout: View,
    State: {},
    ScrollView: View,
    Slider: View,
    Switch: View,
    TextInput: View,
    ToolbarAndroid: View,
    ViewPagerAndroid: View,
    DrawerLayoutAndroid: View,
    WebView: View,
    NativeViewGestureHandler: View,
    TapGestureHandler: View,
    FlingGestureHandler: View,
    ForceTouchGestureHandler: View,
    LongPressGestureHandler: View,
    PanGestureHandler: View,
    PinchGestureHandler: View,
    RotationGestureHandler: View,
    /* Buttons */
    RawButton: View,
    BaseButton: View,
    RectButton: View,
    BorderlessButton: View,
    /* Other */
    FlatList: View,
    gestureHandlerRootHOC: () => null,
    Directions: {},
  }
})

// surpressing warning resulted by useLinking due to usage of NavigationContainer
jest.mock('@react-navigation/native/lib/commonjs/useLinking.native', () => ({
  default: () => ({getInitialState: {then: () => null}}),
  __esModule: true,
}))

// surpressing Animated: `useNativeDriver` is not supported warning
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper')

//establish api mocking before all tests
beforeAll(() => server.listen())

beforeEach(() => {
  global.fetch = jest.fn((...args) => {
    console.warn('global.fetch needs to be mocked in tests', ...args)
    throw new Error('global.fetch needs to be mocked in tests')
  })
})

//clean up after the tests are finished
afterAll(() => server.close())

afterEach(() => {
  global.fetch.mockRestore()
  //reset any requests handlers that we may add during the tests,
  //so they don't affect other tests.
  server.resetHandlers()
})
