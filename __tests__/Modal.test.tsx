import 'react-native'
import React from 'react'
import {fireEvent, render, waitFor, waitForElementToBeRemoved} from 'react-native-testing-library'
import {expect, it} from '@jest/globals'
import Modal from '../src/components/Modal'

it('renders modal screen correctly', async () => {
  const {getByText} = render(<Modal />)
  getByText(/hide modal/i)
  // const showButton = getByText(/show modal/i)
  // fireEvent.press(showButton)
  //
  // const modalContent = getByText(/hello world/i)
  // expect(modalContent).toBeDefined()
  // const hideButton = getByText(/hide modal/i)
  // fireEvent.press(hideButton)
  // // await waitForElementToBeRemoved(() => getByText(/hide modal/i));

});
