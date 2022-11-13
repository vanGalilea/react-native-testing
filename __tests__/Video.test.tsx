import 'react-native'
import React from 'react'
import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
} from '@testing-library/react-native'
import App from '../src/components/App'
import {useNavigationMock} from '../src/test/test-utils'

// 'react-native-video' is being mocked in /__mocks__/react-native-video.ts

const navigationMock = {
  setOptions: jest.fn(),
}

jest.fn(useNavigationMock).mockReturnValue(navigationMock)
jest.mock('@react-native-community/async-storage', () => ({
  setItem: jest.fn(),
}))

afterEach(cleanup)

it('renders/navigates throughout app screens', async () => {
  render(<App />)
  const {getByText, getAllByLabelText} = screen

  fireEvent.press(getByText(/video/i))

  const [video] = getAllByLabelText(/video component/i)

  //video is initially playing and presented not on full screen
  expect(video).toHaveProp('paused', false)
  expect(video).toHaveProp('fullscreen', false)
  expect(video).toHaveStyle({
    width: 200,
    height: 200,
  })

  //pause video and enter full screen mode
  fireEvent.press(getByText(/full screen/i))
  fireEvent.press(getByText(/pause\/start/i))

  expect(video).toHaveProp('paused', true)
  expect(video).toHaveProp('fullscreen', true)
  expect(video).toHaveStyle({
    width: '100%',
    height: 200,
    zIndex: 5,
  })

  //play video and exit full screen mode
  fireEvent.press(getByText(/pause \/ start/i))
  expect(video).toHaveProp('paused', false)

  act(() => fireEvent.press(getByText(/exit full screen/i)))
  expect(video).toHaveProp('fullscreen', false)
})
