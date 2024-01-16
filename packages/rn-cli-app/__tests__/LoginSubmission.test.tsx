import 'react-native';
import React from 'react';
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react-native';
import LoginSubmission from '../src/components/LoginSubmission';
import AsyncStorage from '@react-native-community/async-storage';
import {useNavigationMock} from '../src/test/test-utils';

jest.mock('@react-native-community/async-storage', () => ({
  setItem: jest.fn(),
}));
jest.mock('@react-navigation/native', () => {
  return {
    createNavigatorFactory: jest.fn(),
    useNavigation: jest.fn(),
  };
});
jest.mock('@react-navigation/stack', () => ({
  createStackNavigator: jest.fn(),
}));

afterEach(cleanup);
beforeEach(() => {
  useNavigationMock.mockReset();
});

jest.useFakeTimers();

it('verifies happy flow of login', async () => {
  // Mock navigate function from useNavigation hook, in order to verify that
  // it's called with the correct arguments and not to actually navigate
  const mockNavigate = jest.fn();
  useNavigationMock.mockImplementation(() => ({navigate: mockNavigate}));

  // Ensuring correct typing of the mock
  const fetchMock = global.fetch as jest.MockedFunction<typeof global.fetch>;
  // We're not going to implement all members of the fetch API, only what's needed
  // @ts-ignore
  fetchMock.mockResolvedValueOnce({
    json: jest.fn().mockResolvedValue({token: 'fake-token'}),
  });
  const username = 'chucknorris';
  const password = 'i need no password';

  // Render the component
  render(<LoginSubmission />);

  // Fill in the form and submit it
  fireEvent.changeText(screen.getByPlaceholderText(/username/i), username);
  fireEvent.changeText(screen.getByPlaceholderText(/password/i), password);
  fireEvent.press(screen.getByText(/submit/i));

  // Verify that the loading indicator is shown
  expect(screen.getByLabelText(/submission-in-process/i)).toBeVisible();
  // Verify that the fetch function was called with the correct arguments
  // Can be done in 2 ways:
  // 1. Using toHaveBeenCalledWith
  expect(fetchMock).toHaveBeenCalledWith(
    'https://e2c168f9-97f3-42e1-8b31-57f4ab52a3bc.mock.pstmn.io/api/login',
    {
      method: 'POST',
      body: JSON.stringify({username, password}),
      headers: {'content-type': 'application/json'},
    },
  );
  // 2. Using toMatchInlineSnapshot in combination with mock.calls property
  expect(fetchMock.mock.calls).toMatchInlineSnapshot(`
    [
      [
        "https://e2c168f9-97f3-42e1-8b31-57f4ab52a3bc.mock.pstmn.io/api/login",
        {
          "body": "{"username":"chucknorris","password":"i need no password"}",
          "headers": {
            "content-type": "application/json",
          },
          "method": "POST",
        },
      ],
    ]
  `);
  // Advance timers by 2.5 seconds to allow the simulated delay after fetch to complete
  jest.advanceTimersByTime(2500);
  // // Verify that the navigate function was called with the correct arguments and only once
  await waitFor(() => expect(mockNavigate).toHaveBeenCalledTimes(1), {
    timeout: 2500,
  });
  expect(mockNavigate).toHaveBeenCalledWith('Home');
  // Verify that the token was saved to AsyncStorage
  expect(AsyncStorage.setItem).toHaveBeenCalledWith('token', 'fake-token');
});
