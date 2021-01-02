import React from 'react'
import {fireEvent, render, waitFor} from '@testing-library/react-native'
import App from '../src/components/App'
import {expect, it, jest} from '@jest/globals'
//mocking async storage module
const mockedSetItem = jest.fn()
jest.mock('@react-native-community/async-storage', () => ({
  setItem: mockedSetItem,
}))

it('renders/navigates throughout app screens', async () => {
  const {getByText} = render(<App />)
  const homeText = getByText(/home/i)
  expect(homeText).not.toBeNull()
  fireEvent.press(getByText(/counter/i))

  await waitFor(() => {
    const counterText = getByText(/Current count:/i)
    expect(counterText.props.children).toEqual(['Current count: ', 0])
  })
})
