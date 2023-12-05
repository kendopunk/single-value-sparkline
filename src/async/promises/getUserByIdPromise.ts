/**
 * src/async/promises/getUserByIdPromise.ts
 */
export default function getUserByIdPromise(
  lookerApi: string,
  token: string | null,
  userId: string
): Promise<Response> {
  const url = 'http://localhost:3000/user_by_id'

  return fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      lookerApi,
      token,
      userId
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
