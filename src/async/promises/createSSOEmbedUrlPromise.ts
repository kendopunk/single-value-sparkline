/**
 * src/async/promises/createSSOEmbedUrlPromise.ts
 * Run a Looker query by ID
 */
import { IEmbedSsoParams } from '@looker/sdk'

export default function createSSOEmbedUrlPromise(
  lookerApi: string,
  token: string | null,
  requestConfig: Partial<IEmbedSsoParams>
): Promise<Response> {
  const url = 'http://localhost:3000/sso_embed_url'

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
