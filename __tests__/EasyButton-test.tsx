import 'react-native'
import React from 'react'
import EasyButton from '../src/components/EasyButton'
import {render} from '../src/test/test-utils'
import {expect, it} from '@jest/globals'

it('renders with the light styles for the light theme', () => {
  const {getByTestId, getByText} = render(<EasyButton>Click me!</EasyButton>)
  const button = getByTestId(/easy/i)
  const innerText = getByText(/click/i)

  expect(button.props.style).toMatchObject({backgroundColor: 'white'})
  expect(innerText.props.style).toMatchObject({color: 'black'})
})

it('renders with the dark styles for the dark theme', () => {
  const {getByTestId, getByText} = render(<EasyButton>Click me!</EasyButton>, {
    theme: 'dark',
  })
  const button = getByTestId(/easy/i)
  const innerText = getByText(/click/i)

  expect(button.props.style).toMatchObject({backgroundColor: 'black'})
  expect(innerText.props.style).toMatchObject({color: 'white'})
})
