import React from 'react';
import {
  cleanup,
  fireEvent,
  render,
  screen,
} from '@testing-library/react-native';
import App from '../App';

afterEach(cleanup);

//mocking async storage module
const mockedSetItem = jest.fn();
jest.mock('@react-native-community/async-storage', () => ({
  setItem: mockedSetItem,
}));

it('renders/navigates throughout app screens', () => {
  // Render the app from teh root
  render(<App />);

  // Check whether we're in the home screen
  expect(screen.getByText(/home/i)).toBeOnTheScreen();

  // Navigate to counter screen by pressing on button
  fireEvent.press(screen.getByText(/counter/i));
  // Check that navigation was succeeded by inspecting correspondeing text on the screen
  expect(screen.getByText(/current count: 0/i)).toBeOnTheScreen();
});
