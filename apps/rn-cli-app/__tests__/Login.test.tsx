import React from 'react';
import {
  cleanup,
  fireEvent,
  render,
  screen,
} from '@testing-library/react-native';
import Login from '../src/components/Login';

afterEach(cleanup);

it('fills in the form and handleSubmit is called', async () => {
  const username = 'hi';
  const password = 'qwerty1234';
  // Create a mock function to pass as onSubmit prop
  const handleSubmit = jest.fn();
  // Render the component
  render(<Login onSubmit={handleSubmit} />);

  // Fill in the form and submit it
  await fireEvent.changeText(
    screen.getByPlaceholderText(/username/i),
    username,
  );
  await fireEvent.changeText(
    screen.getByPlaceholderText(/password/i),
    password,
  );
  fireEvent.press(screen.getByText(/submit/i));

  // Verify that handleSubmit was called with the correct arguments and only once
  expect(handleSubmit).toHaveBeenCalledWith({password, username});
  expect(handleSubmit).toHaveBeenCalledTimes(1);
});
