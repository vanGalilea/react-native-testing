import React from 'react'
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react-native'
import SectionList from '../src/components/FlatList'

const eventData = {
  nativeEvent: {
    contentOffset: {
      y: 500,
    },
    contentSize: {
      // Dimensions of the scrollable content
      height: 500,
      width: 100,
    },
    layoutMeasurement: {
      // Dimensions of the device
      height: 100,
      width: 100,
    },
  },
}

afterEach(cleanup)

it('scrolls to top and refreshes all items', async () => {
  render(<SectionList />)
  const {getByText, getByTestId} = screen

  getByText(/pizza/i)
  expect(() => getByText(/the impossible burger/i)).toThrow(
    'Unable to find an element with text: /the impossible burger/i',
  ) //intially not shown
  fireEvent.scroll(getByTestId('flat-list'), eventData)
  await waitForElementToBeRemoved(() => getByText(/loading more dishes/i), {
    timeout: 1500,
  })

  await waitFor(() => {
    expect(getByText(/the impossible burger/i)).toBeTruthy()
  });
})
