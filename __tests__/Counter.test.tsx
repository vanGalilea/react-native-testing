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
  render(<Counter />);
  const {getByText} = screen;

  const decrement = getByText(/decrement/i);
  const increment = getByText(/increment/i);

  expect(getByText('Current count: 0')).toBeOnTheScreen();
  fireEvent.press(increment);
  expect(getByText('Current count: 1')).toBeOnTheScreen();
  fireEvent.press(decrement);
  expect(getByText('Current count: 0')).toBeOnTheScreen();
});
