import 'react-native'
import React from 'react'
import {fireEvent, render} from 'react-native-testing-library'
import Login from '../src/components/Login'
import {expect, it, jest} from '@jest/globals'

it('renders correctly', async () => {
  const username = 'hi'
  const password = 'qwerty1234'
  let submittedData = {}
  // @ts-ignore
  const handleSubmit = jest.fn(data => (submittedData = data))
  const {getByText, getByPlaceholder} = render(
    <Login onSubmit={handleSubmit} />,
  )
  const button = getByText(/submit/i)

  await fireEvent.changeText(getByPlaceholder(/username/i), username)
  await fireEvent.changeText(getByPlaceholder(/password/i), password)
  fireEvent.press(button)

  expect(submittedData).toEqual({password, username})
  expect(handleSubmit).toHaveBeenCalledWith({password, username})
  expect(handleSubmit).toHaveBeenCalledTimes(1)
})
