import 'react-native'
import React from 'react'
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react-native'
import LoginSubmission from '../src/components/LoginSubmission'
import AsyncStorage from '@react-native-community/async-storage'
import {useNavigationMock} from '../src/test/test-utils'

jest.mock('@react-native-community/async-storage', () => ({setItem: jest.fn()}))
jest.mock('@react-navigation/native', () => {
  return {
    createNavigatorFactory: jest.fn(),
    useNavigation: jest.fn(),
  }
})
jest.mock('@react-navigation/stack', () => ({
  createStackNavigator: jest.fn(),
}))
jest.mock('@react-native-community/masked-view', () => ({}))

afterEach(cleanup)
beforeEach(() => {
  useNavigationMock.mockReset()
})
it('renders correctly', async () => {
  const fetchMock = global.fetch as jest.MockedFunction<typeof global.fetch>
  const mockNavigate = jest.fn()
  useNavigationMock.mockImplementation(() => ({navigate: mockNavigate}))
  fetchMock.mockResolvedValueOnce({
    json: () => Promise.resolve({token: 'fake-token'}),
  } as Response | Awaited<Response>)
  const username = 'chucknorris'
  const password = 'i need no password'

  render(<LoginSubmission />)
  const {getByText, getByPlaceholderText} = screen
  const button = getByText(/submit/i)

  fireEvent.changeText(getByPlaceholderText(/username/i), username)
  fireEvent.changeText(getByPlaceholderText(/password/i), password)
  fireEvent.press(button)

  getByText(/loading/i)
  expect(fetchMock).toHaveBeenCalledWith(
    'https://e2c168f9-97f3-42e1-8b31-57f4ab52a3bc.mock.pstmn.io/api/login',
    {
      method: 'POST',
      body: JSON.stringify({username, password}),
      headers: {'content-type': 'application/json'},
    },
  )
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
  `)

  await waitFor(() => expect(mockNavigate).toHaveBeenCalledTimes(1))
  expect(mockNavigate).toHaveBeenCalledWith('Home')
  expect(AsyncStorage.setItem).toHaveBeenCalledWith('token', 'fake-token')
})
