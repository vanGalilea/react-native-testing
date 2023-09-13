import React from 'react';
import {
  cleanup,
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react-native';
import ListWithFetch from '../src/components/ListWithFetch';
import {server} from '../src/test/mocks/server';
import {rest} from 'msw';

afterEach(cleanup);

// In this test suite, we are testing the component that fetches data from the server
// We are using msw to mock the server response

test('displays images from the server', async () => {
  // Render the component
  render(<ListWithFetch />);

  // Loader is initially visible
  expect(screen.getByLabelText(/loader/i)).toBeOnTheScreen();
  await waitForElementToBeRemoved(() => screen.getByLabelText(/loader/i), {
    timeout: 1500,
  });
  // Verify that users are fetched and rendered
  expect(await screen.findAllByLabelText(/user-container/i)).toHaveLength(10);

  // Verifying that the loader is no longer visible
  // There are 2 ways to verify that a component is not in the UI tree
  // 1. Use waitForElementToBeRemoved to wait for the element to be removed from the DOM
  // 2. Use getBy* methods and expect them to throw an error with a corresponding message
  // 3. Use queryBy* methods and expect them to return null (See the next expect statement)
  expect(() => screen.getByLabelText(/loader/i)).toThrow(
    'Unable to find an element with accessibility label: /loader/i',
  );

  // Verifying that there are no errors
  expect(screen.queryByLabelText(/alert/i)).toBeNull();
});

test('displays error upon error response from server', async () => {
  // Simulate an error response from the server
  server.resetHandlers(
    rest.get('https://dummyjson.com/users', (res, req, ctx) => {
      // @ts-ignore
      res(ctx.status(500));
    }),
  );
  // Render the component
  render(<ListWithFetch />);

  // Loader is initially visible
  expect(screen.getByLabelText(/loader/i)).toBeOnTheScreen();
  // Verify that the error is rendered
  expect(await screen.findByText(/error oopsie/i)).toBeOnTheScreen();
  // Verifying that the loader is no longer visible
  expect(screen.queryByLabelText(/loader/i)).toBeNull();
});
