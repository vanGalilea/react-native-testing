import 'react-native'
import React from 'react'
import {fireEvent, render, waitFor} from '@testing-library/react-native'
import {expect, it} from '@jest/globals'
import ModalScreen from '../src/components/Modal'

//the modal component is automatically mocked by RN and apparently contains a bug which make the modal (and it's children) always visible in the test tree
//this is a hack which fix this issue
jest.mock('react-native/Libraries/Modal/Modal', () => {
  const Modal = jest.requireActual('react-native/Libraries/Modal/Modal')
  // @ts-ignore
  return props => <Modal {...props} />
})

it('renders modal screen correctly', async () => {
  const {getByText, debug} = render(<ModalScreen />)

  expect(() => getByText(/hello world/i)).toThrow(/no instances found/i) //modal is initially closed

  fireEvent.press(getByText(/show modal/i))
  await waitFor(() => getByText(/hello world/i)) //modal is now visible

  fireEvent.press(getByText(/hide modal/i))
  expect(() => getByText(/hide modal/i)).toThrow(/no instances found/i) //modal is closed again
})
