import 'react-native'
import React from 'react'
import {fireEvent, render} from '@testing-library/react-native'
import Login from '../src/components/Login'
import {expect, it, jest} from '@jest/globals'

it('renders correctly', async () => {
  const username = 'hi'
  const password = 'qwerty1234'
  let submittedData = {}
  // @ts-ignore
  const handleSubmit = jest.fn(data => (submittedData = data))
  const {getByText, getByPlaceholderText} = render(
    <Login onSubmit={handleSubmit} />,
  )
  const button = getByText(/submit/i)

  await fireEvent.changeText(getByPlaceholderText(/username/i), username)
  await fireEvent.changeText(getByPlaceholderText(/password/i), password)
  fireEvent.press(button)

  expect(submittedData).toEqual({password, username})
  expect(handleSubmit).toHaveBeenCalledWith({password, username})
  expect(handleSubmit).toHaveBeenCalledTimes(1)
})
