/**
 * src/async/promises/lookerLoginPromise.ts
 * Execute Looker login from local server
 */
export default function lookerLoginPromise(
  lookerApi: string,
  lookerClientId: string,
  lookerClientSecret: string
): Promise<Response> {
  const url = `http://localhost:3000/login?lookerApi=${lookerApi}&lookerClientId=${lookerClientId}&lookerClientSecret=${lookerClientSecret}`

  return fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
