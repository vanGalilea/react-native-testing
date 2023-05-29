import 'react-native';
import React from 'react';
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react-native';
import {useNavigationMock} from '../src/test/test-utils';
import App from '../App';

// 'react-native-video' is being mocked in /__mocks__/react-native-video.ts

const navigationMock = {
  setOptions: jest.fn(),
};

jest.fn(useNavigationMock).mockReturnValue(navigationMock);
jest.mock('@react-native-community/async-storage', () => ({
  setItem: jest.fn(),
}));

afterEach(cleanup);

it('renders/navigates throughout app screens', async () => {
  render(<App />);
  const {getByText, getAllByLabelText} = screen;
  const videoText = getByText(/video/i);
  expect(videoText).not.toBeNull();
  fireEvent.press(getByText(/video/i));

  const [video] = getAllByLabelText(/video component/i);
  const enterFullScreenButton = getByText(/full screen/i);
  const pauseStartButton = getByText(/pause\/start/i);

  //video is initially playing and presented not on full screen
  expect(video.props.paused).toBeFalsy();
  expect(video.props.fullscreen).toBeFalsy();

  expect(video).toHaveStyle({
    width: 200,
    height: 200,
  });

  //pause video and enter full screen mode
  fireEvent.press(enterFullScreenButton);
  fireEvent.press(pauseStartButton);

  expect(video.props.paused).toBeTruthy();
  expect(video.props.fullscreen).toBeTruthy();
  expect(video).toHaveStyle({
    width: '100%',
    height: 200,
    zIndex: 5,
  });
  //play video and exit full screen mode
  const pauseStartFSButton = getByText(/pause \/ start/i);
  fireEvent.press(pauseStartFSButton);
  expect(video.props.paused).toBeFalsy();

  const exitFullScreenButton = getByText(/exit full screen/i);
  fireEvent.press(exitFullScreenButton);
  await waitFor(() => {
    expect(video.props.fullscreen).toBeFalsy();
  });
});
