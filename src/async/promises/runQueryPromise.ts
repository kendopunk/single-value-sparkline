/**
 * src/async/promises/runQueryPromise.ts
 * Run a Looker query by ID
 */
import { IRequestRunQuery } from '@looker/sdk'

export default function runQueryPromise(
  lookerApi: string,
  token: string,
  requestConfig: Partial<IRequestRunQuery>
): Promise<Response> {
  const url = 'http://localhost:3000/query'

  return fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      lookerApi,
      token,
      requestConfig
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
