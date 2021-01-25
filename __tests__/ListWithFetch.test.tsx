import 'react-native'
import React from 'react'
import {render} from '@testing-library/react-native'
import ListWithFetch from '../src/components/ListWithFetch'
import {server} from '../src/test/mocks/server'
import {rest} from 'msw'

test('displays images from the server', async () => {
  const {getByLabelText, findAllByLabelText, queryByLabelText} = render(
    <ListWithFetch />,
  )

  // show loading spinner
  const loadingSpinner = getByLabelText(/loader/i)
  expect(loadingSpinner).not.toBeUndefined()

  //load images from server
  const images = await findAllByLabelText(/flavor/i)
  expect(images).toHaveLength(2)

  //loading spinner no longer shows
  expect(queryByLabelText(/loader/i)).toBeNull()

  //no error is visible
  expect(queryByLabelText(/alert/i)).toBeNull()
})

test('displays error upon error esponse from server', async () => {
  server.resetHandlers(
    rest.get(
      'https://4ec38857-2800-4f07-838e-535a78cf7d51.mock.pstmn.io/flavors',
      (res, req, ctx) => {
        // @ts-ignore
        res(ctx.status(500))
      },
    ),
  )
  const {getByLabelText, getByText, findByLabelText, queryByLabelText} = render(
    <ListWithFetch />,
  )

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
