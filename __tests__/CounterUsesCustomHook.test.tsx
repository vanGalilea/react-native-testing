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
import useCounter from '../src/hooks/useCounter';

afterEach(cleanup);

it('exposes the count and increment/decrement functions', () => {
  render(<CounterUsesCustomHook />);
  const {getByText} = screen;

  const decrement = getByText(/decrement/i);
  const increment = getByText(/increment/i);
  const counterText = getByText(/Current count:/i);

  expect(counterText.props.children).toEqual(['Current count: ', 0]);
  fireEvent.press(increment);
  expect(counterText.props.children).toEqual(['Current count: ', 1]);
  fireEvent.press(decrement);
  expect(counterText.props.children).toEqual(['Current count: ', 0]);
});

// @ts-ignore
const setup = ({initialProps} = {}) => {
  const result: any = {current: null};
  const TestComponent = (props: any) => {
    result.current = useCounter(props);
    return null;
  };
  render(<TestComponent {...initialProps} />);
  return result;
};

it('exposes the count and increment/decrement functions-  without component', () => {
  const result = setup();
  expect(result.current.count).toBe(0);
  act(() => result.current.increment());
  expect(result.current.count).toBe(1);
  act(() => result.current.decrement());
  expect(result.current.count).toBe(0);
});

it('allows customization of the initial count', () => {
  const result = setup({initialProps: {initialCount: 3}});
  expect(result.current.count).toBe(3);
});

it('allows customization of the step', () => {
  const result = setup({initialProps: {step: 2}});
  expect(result.current.count).toBe(0);
  act(() => result.current.increment());
  expect(result.current.count).toBe(2);
  act(() => result.current.decrement());
  expect(result.current.count).toBe(0);
});

it('exposes the count and increment/decrement functions- hook only', () => {
  const {result} = renderHook(useCounter);
  expect(result.current.count).toBe(0);
  act(() => result.current.increment());
  expect(result.current.count).toBe(1);
  act(() => result.current.decrement());
  expect(result.current.count).toBe(0);
});
