import {rest} from 'msw'

export const handlers = [
  rest.get(
    'https://4ec38857-2800-4f07-838e-535a78cf7d51.mock.pstmn.io/flavors',
    (req, res, ctx) => {
      return res(
        ctx.json([
          {
            name: 'Mint chip',
            image: 'data:data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASw',
          },
          {
            name: 'Vanilla',
            image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASw',
          },
        ]),
      )
    },
  ),
]
