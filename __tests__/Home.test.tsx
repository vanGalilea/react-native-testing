import React from 'react'
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react-native'
import App from '../src/components/App'

afterEach(cleanup)

//mocking async storage module
const mockedSetItem = jest.fn()
jest.mock('@react-native-community/async-storage', () => ({
  setItem: mockedSetItem,
}))

it('renders/navigates throughout app screens', async () => {
  render(<App />)
  const {getByText} = screen

  expect(getByText(/home/i)).toBeVisible()
  fireEvent.press(getByText(/counter/i))
  await waitFor(() => {
    expect(getByText(/Current count: 0/i)).toBeVisible()
  })
})
