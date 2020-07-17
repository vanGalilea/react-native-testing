import React from 'react'

jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper')

beforeEach(() => {
  global.fetch = jest.fn((...args) => {
    console.warn('global.fetch needs to be mocked in tests', ...args)
    throw new Error('global.fetch needs to be mocked in tests')
  })
})

afterEach(() => {
  global.fetch.mockRestore()
})
