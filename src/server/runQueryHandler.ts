/**
 * src/server/runQueryHandler.ts
 * Run an arbitrary Looker query
 */
import { Request, Response } from 'express'
import axios from 'axios'
import asyncWrapper from '../async/asyncWrapper'

export default async function (req: Request, res: Response) {
  const {
    body: { lookerApi, token, requestConfig }
  } = req

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const queryParams: Record<string, any> = {}

  const { query_id, result_format, ...rest } = requestConfig

  for (const [key, value] of Object.entries(rest)) {
    if (value) {
      queryParams[key] = value
    }
  }

  const url = `${lookerApi}/queries/${query_id}/run/${result_format}?${new URLSearchParams(
    queryParams
  )}`

  const p = axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      'content-type': 'application/json'
    }
  })

  const [err, data] = await asyncWrapper(p)
  if (err) {
    console.log(err)
    res.status(400).send('Failed to retrieve query.').end()
  } else {
    res.json({ data: data?.data || {} })
  }
}
