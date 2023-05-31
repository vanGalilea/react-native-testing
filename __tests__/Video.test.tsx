import 'react-native';
import React from 'react';
import {
  cleanup,
  fireEvent,
  render,
  screen,
} from '@testing-library/react-native';
import App from '../App';

// 'react-native-video' is being mocked in /__mocks__/react-native-video.ts
jest.mock('@react-native-community/async-storage', () => ({
  setItem: jest.fn(),
}));

afterEach(cleanup);

it('renders/navigates throughout app screens', async () => {
  // Render the app from the root
  render(<App />);
  // Navigate to video screen
  fireEvent.press(screen.getByText(/video/i));

  // Grab video comp., full-screen and pause/start pressables
  const videoTestInstance = screen.getByLabelText('video-player');
  const enterFullScreenButton = screen.getByText(/full screen/i);
  const pauseStartButton = screen.getByText(/pause\/start/i);

  // We make sure to veify that the video is initially playing and
  // presented not in full screen mode
  expect(videoTestInstance).toHaveProp('paused', false);
  expect(videoTestInstance).toHaveProp('fullscreen', false);
  expect(videoTestInstance).toHaveStyle({
    width: 200,
    height: 200,
  });

  // Simulate pause video and enter full screen mode
  fireEvent.press(enterFullScreenButton);
  fireEvent.press(pauseStartButton);

  // Props indeed changed and match the scenario with the style we expect
  expect(videoTestInstance).toHaveProp('paused', true);
  expect(videoTestInstance).toHaveProp('fullscreen', true);
  expect(videoTestInstance).toHaveStyle({
    width: '100%',
    height: 200,
    zIndex: 5,
  });

  // Play video and assert not paused anymore
  fireEvent.press(pauseStartButton);
  expect(videoTestInstance).toHaveProp('paused', false);

  // Exit full screen mode and assert by value of prop
  fireEvent.press(screen.getByText(/exit full screen/i));
  expect(videoTestInstance).toHaveProp('fullscreen', false);
});
