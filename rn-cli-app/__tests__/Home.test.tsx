import React from 'react';
import {
  cleanup,
  render,
  screen,
  userEvent,
} from '@testing-library/react-native';
import App from '../App';

afterEach(cleanup);

//mocking async storage module
const mockedSetItem = jest.fn();
jest.mock('@react-native-community/async-storage', () => ({
  setItem: mockedSetItem,
}));
jest.useFakeTimers();

it('renders/navigates throughout app screens', async () => {
  // Render the app from teh root
  render(<App />);

  // Check whether we're in the home screen
  expect(screen.getByText(/home/i)).toBeOnTheScreen();

  // Navigate to counter screen by pressing on button
  const user = userEvent.setup();
  await user.press(screen.getByText(/counter/i));
  // Check that navigation was succeeded by inspecting corresponding text on the screen
  expect(screen.getByText(/current count: 0/i)).toBeOnTheScreen();
});
