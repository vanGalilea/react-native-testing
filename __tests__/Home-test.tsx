import 'react-native'
import React from 'react'
import {fireEvent, render, wait} from '@testing-library/react-native'
import App from '../src/components/App'
//import Login from "../src/components/Login"

//mocking async storage module
jest.mock('@react-native-community/async-storage', () => ({setItem: jest.fn()}))


it('renders/navigats throughout app screens', async () => {
  const {getByText} = render(<App/>)
  // const {getByText} = render(<Login onSubmit={() => {{}}} />)
  const homeText = getByText(/home/i)
  expect(homeText).not.toBeNull()
  fireEvent.press(getByText(/counter/i))

  await wait(()=> {
    const counterText = getByText(/Current count:/i)
    expect(counterText.props.children).toEqual(["Current count: ", 0])
  })
});

