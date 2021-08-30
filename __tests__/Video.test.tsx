import 'react-native'
import React from 'react'
import {fireEvent, render} from '@testing-library/react-native'
import Video from '../src/components/Video'
import {StatusBar} from 'react-native'

const navigationMock = {
  setOptions: jest.fn(),
}

jest.mock('react-native-video', () => {
  const mockComponent = require('react-native/jest/mockComponent')
  return mockComponent('react-native-video')
})

it('renders/navigates throughout app screens', async () => {
  const {getByText, getByA11yLabel} = render(
    <Video navigation={navigationMock} />,
  )
  const video = getByA11yLabel(/video component/i)
  const enterFullScreenButton = getByText(/full screen/i)
  const pauseStartButton = getByText(/pause\/start/i)

  //video is initially playing and presented not on full screen
  expect(video.props.paused).toBeFalsy()
  expect(video.props.fullscreen).toBeFalsy()

  expect(video).toHaveStyle({
    width: 200,
    height: 200,
  })

  //pause video and enter full screen mode
  fireEvent.press(enterFullScreenButton)
  fireEvent.press(pauseStartButton)

  expect(video.props.paused).toBeTruthy()
  expect(video.props.fullscreen).toBeTruthy()
  expect(video).toHaveStyle({
    width: '100%',
    height: 200,
    zIndex: 5,
  })
  // @ts-ignore
  expect(StatusBar._propsStack[0].hidden.value).toBeTruthy()

  //play video and exit full screen mode
  const pauseStartFSButton = getByText(/pause \/ start/i)
  fireEvent.press(pauseStartFSButton)
  expect(video.props.paused).toBeFalsy()

  const exitFullScreenButton = getByText(/exit full screen/i)
  fireEvent.press(exitFullScreenButton)
  expect(video.props.fullscreen).toBeFalsy()
})
