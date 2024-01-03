import React from 'react';
import {
  act,
  cleanup,
  // fireEvent,
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react-native';
import SectionList from '../src/components/FlatList';

// const SCREEN_SIZE = {
//   height: 500,
//   width: 300,
// };
// const eventData = {
//   nativeEvent: {
//     contentOffset: {
//       y: SCREEN_SIZE.height,
//     },
//     // Dimensions of the scrollable content
//     contentSize: SCREEN_SIZE,
//     // Dimensions of the device
//     layoutMeasurement: SCREEN_SIZE,
//   },
// };

afterEach(cleanup);
jest.useFakeTimers();
it('scrolls to bottom and loads more items', async () => {
  // Render the SectionList component
  render(<SectionList />);

  // First dish is visible
  expect(screen.getByText(/pizza/i)).toBeOnTheScreen();
  // First dish from 2nd page is not visible yet
  expect(() => screen.getByText(/the impossible burger/i)).toThrow(
    'Unable to find an element with text: /the impossible burger/i',
  );
  // We haven't started loading yet
  expect(() => screen.getByText(/loading more dishes/i)).toThrow(
    'Unable to find an element with text: /loading more dishes/i',
  );

  // Simulate scrolling to the bottom of the list
  // TODO: fix this test case when this issue is resolved
  // https://github.com/callstack/react-native-testing-library/issues/1549

  // fireEvent.scroll(screen.getByLabelText('dishes-list'), eventData);
  // await waitForElementToBeRemoved(
  //   () => screen.getByText(/loading more dishes/i),
  //   {
  //     timeout: 1500,
  //   },
  // );
  //
  // expect(await screen.findByText(/the impossible burger/i)).toBeOnTheScreen();
});

it('refreshes when scrolling to the top', async () => {
  // Render the SectionList component
  render(<SectionList />);

  // First dish is visible
  expect(screen.getByText(/pizza/i)).toBeOnTheScreen();

  // Simulate pull to refresh via refreshControl props, this can not be simulated by fireEvent.scroll
  // See discussion https://github.com/callstack/react-native-testing-library/issues/809#issuecomment-984823700
  const flatListTestInstance = screen.getByLabelText('dishes-list');
  const {refreshControl} = flatListTestInstance.props;
  await act(async () => {
    refreshControl.props.onRefresh();
  });

  // First dish is not visible due to refresh and refreshing indicator is visible
  expect(() => screen.getByText(/pizza/i)).toThrow(
    'Unable to find an element with text: /pizza/i',
  );
  await waitForElementToBeRemoved(() => screen.getByText(/refreshing/i), {
    timeout: 1500,
  });
});
