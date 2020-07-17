import React from 'react'

jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper')
jest.mock(
    'react-native/Libraries/Components/Touchable/TouchableOpacity.js',
    () => {
        const { TouchableHighlight } = require('react-native')
        const MockTouchable = props => {
            return <TouchableHighlight {...props} />
        }
        MockTouchable.displayName = 'TouchableOpacity'

        return MockTouchable
    }
)


beforeEach(() => {
  global.fetch = jest.fn((...args) => {
    console.warn('global.fetch needs to be mocked in tests', ...args)
    throw new Error('global.fetch needs to be mocked in tests')
  })
})

afterEach(() => {
  global.fetch.mockRestore()
})
