import 'react-native'
import React from 'react'
import {act, fireEvent, render} from '@testing-library/react-native'
import CounterUsesCustomHook from '../src/components/CounterUsesCustomHook'
import useCounter from '../src/hooks/useCounter'
import {renderHook} from '@testing-library/react-hooks'
import {expect, it, test} from '@jest/globals'

//testing with the component
it('exposes the count and increment/decrement functions', () => {
  const {getByText} = render(<CounterUsesCustomHook />)

  const decrement = getByText(/decrement/i)
  const increment = getByText(/increment/i)
  const counterText = getByText(/Current count:/i)

  expect(counterText.props.children).toEqual(['Current count: ', 0])
  fireEvent.press(increment)
  expect(counterText.props.children).toEqual(['Current count: ', 1])
  fireEvent.press(decrement)
  expect(counterText.props.children).toEqual(['Current count: ', 0])
})

// @ts-ignore
function setup({initialProps} = {}) {
  const result: any = {current: null}
  function TestComponent(props: any) {
    result.current = useCounter(props)
    return null
  }
  render(<TestComponent {...initialProps} />)
  return result
}

//testing without component
test('exposes the count and increment/decrement functions', () => {
  const result = setup()
  expect(result.current.count).toBe(0)
  act(() => result.current.increment())
  expect(result.current.count).toBe(1)
  act(() => result.current.decrement())
  expect(result.current.count).toBe(0)
})

test('allows customization of the initial count', () => {
  const result = setup({initialProps: {initialCount: 3}})
  expect(result.current.count).toBe(3)
})

test('allows customization of the step', () => {
  const result = setup({initialProps: {step: 2}})
  expect(result.current.count).toBe(0)
  act(() => result.current.increment())
  expect(result.current.count).toBe(2)
  act(() => result.current.decrement())
  expect(result.current.count).toBe(0)
})

test('exposes the count and increment/decrement functions', () => {
  const {result} = renderHook(useCounter)
  expect(result.current.count).toBe(0)
  act(() => result.current.increment())
  expect(result.current.count).toBe(1)
  act(() => result.current.decrement())
  expect(result.current.count).toBe(0)
})
