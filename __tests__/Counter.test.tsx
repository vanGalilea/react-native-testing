import React from 'react';
import {
  cleanup,
  fireEvent,
  render,
  screen,
} from '@testing-library/react-native';
import Counter from '../src/components/Counter';

afterEach(cleanup);

it('renders correctly after in/decrement action', () => {
  // Render the Counter component
  render(<Counter />);
  const {getByText} = screen;
  // Grab in/decrement Pressables for later use
  // (this will throw an error if not existing in component tree)
  const decrement = getByText(/decrement/i);
  const increment = getByText(/increment/i);

  // Initially check that the current count is 0
  expect(getByText('Current count: 0')).toBeOnTheScreen();

  // Press the increment button and check that the current count is 1
  fireEvent.press(increment);
  expect(getByText('Current count: 1')).toBeOnTheScreen();

  // Press the decrement button and check that the current count is 0
  fireEvent.press(decrement);
  expect(getByText('Current count: 0')).toBeOnTheScreen();
});
