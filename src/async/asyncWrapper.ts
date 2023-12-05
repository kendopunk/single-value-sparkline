/**
 * src/async/asyncWrapper.ts
 * Asynchronous related functions
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function asyncWrapper(promise: Promise<any>) {
  return promise
    .then((data) => [null, data])
    .catch((err) => [
      {
        status: err?.response?.status || '',
        statusText: err?.response?.statusText || 'unknown',
        data: err?.response?.data || 'no error data'
      },
      null
    ])
}
