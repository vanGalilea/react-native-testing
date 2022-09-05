import React from 'react'
import {cleanup, render, screen} from '@testing-library/react-native'
import ListWithFetch from '../src/components/ListWithFetch'
import {server} from '../src/test/mocks/server'
import {rest} from 'msw'

afterEach(cleanup)

test('displays images from the server', async () => {
  render(<ListWithFetch />)
  const {getByLabelText, findAllByLabelText, queryByLabelText} = screen

  // show loading spinner
  const loadingSpinner = getByLabelText(/loader/i)
  expect(loadingSpinner).not.toBeUndefined()

  //load images from server
  const userContainers = await findAllByLabelText(/user-container/i)
  expect(userContainers).toHaveLength(10)

  //loading spinner no longer shows
  expect(queryByLabelText(/loader/i)).toBeNull()

  //no error is visible
  expect(queryByLabelText(/alert/i)).toBeNull()
})

test('displays error upon error response from server', async () => {
  server.resetHandlers(
    rest.get('https://random-data-api.com/api/v2/users', (res, req, ctx) => {
      // @ts-ignore
      res(ctx.status(500))
    }),
  )
  render(<ListWithFetch />)
  const {findByLabelText, getByLabelText, getByText, queryByLabelText} = screen

  // show loading spinner
  const loadingSpinner = getByLabelText(/loader/i)
  expect(loadingSpinner).not.toBeUndefined()

  //show error
  const error = await findByLabelText('alert')
  expect(error).not.toBeUndefined()
  // name option doesn't work for this particular dom
  expect(getByText('Error oopsie!')).not.toBeNull()

  //loading spinner no longer shows
  expect(queryByLabelText(/loader/i)).toBeNull()
})
