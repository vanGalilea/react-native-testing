import React, {ComponentType} from 'react';
import {render as rtlRender} from '@testing-library/react-native';
import type {ThemeType} from '../utils/theme';
import {ThemeProvider} from '../utils/theme';
import {useNavigation} from '@react-navigation/native';

const render = (ui: any, {theme = 'light', ...options} = {}) => {
  // @ts-ignore
  const Wrapper = ({children}): ComponentType => (
    <ThemeProvider initialTheme={theme as ThemeType}>{children}</ThemeProvider>
  );
  // @ts-ignore
  return rtlRender(ui, {wrapper: Wrapper, ...options});
};

export * from '@testing-library/react-native';
// override React Testing Library's render with our own
export {render};

export const useNavigationMock = useNavigation as jest.MockedFunction<
  typeof useNavigation
>;
