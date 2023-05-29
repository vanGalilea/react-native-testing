import 'react-native'
import React from 'react'
import EasyButton from '../src/components/EasyButton'
import {render} from '../src/test/test-utils'
import {ReactTestInstance} from 'react-test-renderer'
import {cleanup, screen} from '@testing-library/react-native'

afterEach(cleanup)

it('renders with the light styles for the light theme', () => {
  render(<EasyButton>Click me!</EasyButton>)
  const {getByText} = screen

  const innerText = getByText(/click/i)
  const button = innerText.parent as ReactTestInstance

  expect(button.props.style).toMatchObject({backgroundColor: 'white'})
  expect(innerText.props.style).toMatchObject({color: 'black'})
});

it('renders with the dark styles for the dark theme', () => {
  render(<EasyButton>Click me!</EasyButton>, {
    theme: 'dark',
  })
  const {getByText} = screen

  const innerText = getByText(/click/i)
  const button = innerText.parent as ReactTestInstance

  expect(button.props.style).toMatchObject({backgroundColor: 'black'})
  expect(innerText.props.style).toMatchObject({color: 'white'})
});
