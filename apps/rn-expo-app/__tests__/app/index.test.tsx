import { renderRouter, userEvent, screen } from "expo-router/testing-library";

jest.useFakeTimers();

// Temporary fix for https://github.com/expo/expo/issues/25494
jest.mock('react-native-reanimated', () => null, {
  virtual: true,
});
jest.mock('@testing-library/jest-native/extend-expect', () => null, {
  virtual: true,
});

describe('Smoke test expo router navigation through the app', () => {
  it('displays home screen initially, and navigates to a specific blo screen through blogs screen', async () => {
    renderRouter('./app');

    // validating that we're on the home screen
    // via the path
    expect(screen).toHavePathname('/');
    // via the title text
    expect(screen.getByText(/rn media group/i)).toBeVisible();

    const user = userEvent.setup();
    // navigating to the blogs screen via tab bar
    await user.press(screen.getByText(/blogs/i));

    // validating that we're in the blogs screen
    expect(screen).toHavePathname('/blogs');
    expect(screen.getByText(/blogs page!/i)).toBeVisible();

    // navigating to the blog post screen via a blog post card
    await user.press(screen.getByText(/blog 123/i));

    // validating that we're in the blog post screen
    expect(screen).toHavePathnameWithParams('/blogs/123');
    expect(screen.getByText(/blog post: 123/i)).toBeVisible();
  });

  it('displays home screen initially, and navigates to country screen through settings screen', async () => {
    renderRouter('./app');

    // validating that we're on the home screen
    // via the path
    expect(screen).toHavePathname('/');
    // via the title text
    expect(screen.getByText(/rn media group/i)).toBeVisible();

    const user = userEvent.setup();
    // navigating to the blogs screen via tab bar
    await user.press(screen.getByText(/settings/i));

    // validating that we're in the blogs screen
    expect(screen).toHavePathname('/settings');
    expect(screen.getByText(/settings page!/i)).toBeVisible();

    // navigating to the country screen via a button
    await user.press(screen.getByText(/country/i));

    // validating that we're in the country screen
    expect(screen).toHavePathname('/settings/country');
    expect(screen.getByText(/country page!/i)).toBeVisible();
  });
});
