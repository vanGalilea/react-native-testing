import {rest} from 'msw';
import mockedApiResponse from './mockedApiResponse.json';
export const handlers = [
  rest.get('https://dummyjson.com/users', (req, res, ctx) => {
    return res(ctx.json(mockedApiResponse));
  }),
];
