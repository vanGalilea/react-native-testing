import React from 'react';
import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
  renderHook,
} from '@testing-library/react-native';
import CounterUsesCustomHook from '../src/components/CounterUsesCustomHook';
import useCounter, {
  IUseCounterProps,
  IUseCounterResult,
} from '../src/hooks/useCounter';

afterEach(cleanup);

// There are several approaches for testing hooks:
// - Integration approach: Test the using component
// - Integration approach: With a dummy test component
// - Unit approach: In isolation
// Rule of thumb is, when a hook is being used within only one component,
// you should at least test them together

describe('Integration approach: Test the using component', () => {
  it('exposes the count and increment/decrement funcs. and overall func. works', () => {
    // Render the CounterUsesCustomHook component
    render(<CounterUsesCustomHook />);
    const {getByText} = screen;
    // Grab in/decrement Pressables for later use
    // (this will throw an error if not existing in component tree)
    const decrement = getByText(/decrement/i);
    const increment = getByText(/increment/i);

    // Initially check that the current count is 0
    expect(getByText('Current count: 0')).toBeOnTheScreen();

    // Press the increment button and check that the current count is 1
    fireEvent.press(increment);
    expect(getByText('Current count: 1')).toBeOnTheScreen();

    // Press the decrement button and check that the current count is 0
    fireEvent.press(decrement);
    expect(getByText('Current count: 0')).toBeOnTheScreen();
  });
});

describe('Integration approach: With a dummy test component', () => {
  const renderHookAndSetup = (componentProps: IUseCounterProps = {}) => {
    const result: {current: IUseCounterResult | undefined} = {
      current: undefined,
    };
    const TestComponent = (props: any) => {
      result.current = useCounter(props);
      return null;
    };
    render(<TestComponent {...componentProps} />);
    return result;
  };
  it('exposes the count and increment/decrement functions-  without component', () => {
    const result = renderHookAndSetup();
    expect(result.current?.count).toBe(0);
    act(() => result.current?.increment());
    expect(result.current?.count).toBe(1);
    act(() => result.current?.decrement());
    expect(result.current?.count).toBe(0);
  });

  it('allows customization of the initial count', () => {
    const result = renderHookAndSetup({initialCount: 3});
    expect(result.current?.count).toBe(3);
  });

  it('allows customization of the step', () => {
    const result = renderHookAndSetup({step: 2});
    expect(result.current?.count).toBe(0);
    act(() => result.current?.increment());
    expect(result.current?.count).toBe(2);
    act(() => result.current?.decrement());
    expect(result.current?.count).toBe(0);
  });
});

describe('Unit approach: In isolation', () => {
  it('exposes the count and increment/decrement functions- hook only', () => {
    const {result} = renderHook(useCounter);
    expect(result.current.count).toBe(0);
    act(() => result.current.increment());
    expect(result.current.count).toBe(1);
    act(() => result.current.decrement());
    expect(result.current.count).toBe(0);
  });
});
