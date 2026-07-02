import { http, HttpResponse } from 'msw'

export const handlers = [
  http.get('/api/posts', () => {
    return HttpResponse.json([
      { id: 1, title: 'First post' },
      { id: 2, title: 'Second post' },
    ])
  }),
]
