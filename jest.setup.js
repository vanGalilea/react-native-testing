import {server} from './src/test/mocks/server';
import '@testing-library/react-native/extend-expect';
import {jest, beforeAll, beforeEach, afterEach, afterAll} from '@jest/globals';

// increasing jest timeout to 10 seconds due to slow ci env
jest.setTimeout(10000);
// surpressing warning resulted by useLinking due to usage of NavigationContainer
jest.mock('@react-navigation/native/lib/commonjs/useLinking.native', () => ({
  default: () => ({getInitialState: {then: () => null}}),
  __esModule: true,
}));

// surpressing Animated: `useNativeDriver` is not supported warning
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

//establish api mocking before all tests
beforeAll(() => server.listen());

beforeEach(() => {
  global.fetch = jest.fn((...args) => {
    console.warn('global.fetch needs to be mocked in tests', ...args);
    throw new Error('global.fetch needs to be mocked in tests');
  });
});

//clean up after the tests are finished
afterAll(() => server.close());

afterEach(() => {
  global.fetch.mockRestore();
  //reset any requests handlers that we may add during the tests,
  //so they don't affect other tests.
  server.resetHandlers();
});
