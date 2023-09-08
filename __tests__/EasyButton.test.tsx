import 'react-native';
import React from 'react';
import EasyButton from '../src/components/EasyButton';
import {render} from '../src/test/test-utils';
import {cleanup, screen} from '@testing-library/react-native';

afterEach(cleanup);

// We will right the following test in a scalable way
// At the moment we have only 2 themes, but we can imagine
// that we might have more themes in the future.
const cases = [
  ['dark', 'black', 'white'],
  // ['light', 'white', 'black'],
];

// We will use the jest.each function to run the same test with different
// parameters. This will allow us to write a single test that will run
// for each theme without repeating ourselves.
it.each(cases)(
  'renders with the light styles for the light theme',
  (desiredTheme, expectedBackground, expectedColor) => {
    render(<EasyButton>Click me!</EasyButton>, {
      theme: desiredTheme,
    });
    const innerText = screen.getByText(/click me/i);
    const pressable = screen.getByRole('button');
    expect(pressable).toHaveStyle({
      backgroundColor: expectedBackground,
    });
    expect(innerText).toHaveStyle({
      color: expectedColor,
    });
  },
);
