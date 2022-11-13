import React from 'react'
import {cleanup, fireEvent, render, screen} from '@testing-library/react-native'
import Login from '../src/components/Login'

afterEach(cleanup)

it('renders correctly', async () => {
  const username = 'hi'
  const password = 'qwerty1234'
  let submittedData = {}
  const handleSubmit = jest.fn(data => (submittedData = data))
  render(<Login onSubmit={handleSubmit} />)
  const {getByText, getByPlaceholderText} = screen
  const button = getByText(/submit/i)

  await fireEvent.changeText(getByPlaceholderText(/username/i), username)
  await fireEvent.changeText(getByPlaceholderText(/password/i), password)
  fireEvent.press(button)

  expect(submittedData).toEqual({password, username})
  expect(handleSubmit).toHaveBeenCalledWith({password, username})
  expect(handleSubmit).toHaveBeenCalledTimes(1)
  expect(getByText(/you are authenticated!/i)).toBeVisible()
})
