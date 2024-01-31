import Home from '../../app/index';
import Blogs from '../../app/blogs/index';
import BlogSlug from '../../app/blogs/[slug]';
import Settings from '../../app/settings/index';
import Country from '../../app/settings/country';
import { renderRouter, userEvent, screen } from "expo-router/testing-library";

jest.useFakeTimers();

// Temporary fix for https://github.com/expo/expo/issues/25494
jest.mock('react-native-reanimated', () => null, {
  virtual: true,
});
jest.mock('@testing-library/jest-native/extend-expect', () => null, {
  virtual: true,
});

describe('<App />', () => {
  it('has 2 child', async () => {
    renderRouter(
      {
        index: Home,
        'blogs/index': Blogs,
        'blogs/[slug]': BlogSlug,
        'settings/index': Settings,
        'settings/country': Country,
      },
      {
        initialUrl: '/',
      },
    );

    const user = userEvent.setup();
    await user.press(screen.getByText(/blogs/i));

    expect(screen.getByText(/blogs page!/i)).toBeTruthy();
  });
});
