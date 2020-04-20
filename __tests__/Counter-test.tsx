import 'react-native'
import React from 'react'
import {fireEvent, getByTestId, render} from '@testing-library/react-native'
import Counter from "../src/components/Counter"

it('renders correctly', () => {
  const {getByText, getByTestId, debug} = render(<Counter />)
  // debug()
  const decrement = getByTestId(/decrement/i)
  const increment = getByTestId(/increment/i)
  const counterText = getByText(/Current count:/i)

  expect(counterText.props.children).toEqual(["Current count: ", 0])
  fireEvent.press(increment)
  expect(counterText.props.children).toEqual(["Current count: ", 1])
  fireEvent.press(decrement)
  expect(counterText.props.children).toEqual(["Current count: ", 0])

});
