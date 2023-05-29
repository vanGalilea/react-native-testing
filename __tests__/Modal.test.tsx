import React from 'react'
import {
  fireEvent,
  render,
  waitFor,
  cleanup,
  screen,
} from '@testing-library/react-native'
import ModalScreen from '../src/components/Modal'
import {ModalProps} from 'react-native'

//the modal component is automatically mocked by RN and apparently contains a bug which make the modal (and it's children) always visible in the test tree
//this is a hack which fix this issue
jest.mock('react-native/Libraries/Modal/Modal', () => {
  const Modal = jest.requireActual('react-native/Libraries/Modal/Modal')
  return (props: ModalProps) => <Modal {...props} />
});

afterEach(cleanup)

it('renders modal screen correctly', async () => {
  render(<ModalScreen />)
  const {getByText} = screen

  expect(() => getByText(/hello world/i)).toThrow(
    'Unable to find an element with text: /hello world/i',
  ) //modal is initially closed

  fireEvent.press(getByText(/show modal/i))
  await waitFor(() => getByText(/hello world/i)) //modal is now visible

  fireEvent.press(getByText(/hide modal/i))
  expect(() => getByText(/hide modal/i)).toThrow(
    'Unable to find an element with text: /hide modal/i',
  ) //modal is closed again
});
