import React from 'react'
import {cleanup, render, screen} from '@testing-library/react-native'
import ListWithFetch from '../src/components/ListWithFetch'
import {server} from '../src/test/mocks/server'
import {rest} from 'msw'

afterEach(cleanup)

test('displays users from the server', async () => {
  render(<ListWithFetch />)
  const {getByLabelText, findAllByLabelText, queryByLabelText} = screen

  expect(getByLabelText(/loader/i)).toBeVisible()
  expect(await findAllByLabelText(/user-container/i)).toHaveLength(10)
  expect(queryByLabelText(/loader/i)).toBeNull()
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

  expect(getByLabelText(/loader/i)).toBeVisible()
  expect(await findByLabelText(/alert/i)).toBeVisible()
  expect(getByText('Error oopsie!')).toBeVisible()
  expect(queryByLabelText(/loader/i)).toBeNull()
})
