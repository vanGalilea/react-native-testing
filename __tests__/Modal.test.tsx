import React from 'react';
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react-native';
import ModalScreen from '../src/components/Modal';

afterEach(cleanup);

it('renders modal screen correctly', async () => {
  // Render component
  render(<ModalScreen />);

  // Check if modal is initially closed
  expect(() => screen.getByText(/hello world/i)).toThrow(
    'Unable to find an element with text: /hello world/i',
  );

  // Simulate opening the modal
  fireEvent.press(screen.getByText(/show modal/i));
  // Validate that modal is open
  await waitFor(() => screen.getByText(/hello world/i));

  // Simulate closing the modal
  fireEvent.press(screen.getByText(/hide modal/i));
  // Validate that modal is closed
  expect(() => screen.getByText(/hide modal/i)).toThrow(
    'Unable to find an element with text: /hide modal/i',
  );
});
