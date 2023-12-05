/**
 * src/server/lookerLoginHandler.ts
 * POST /login
 * Get Looker "regular" API token
 */
import { Request, Response } from 'express'
import axios, { AxiosResponse } from 'axios'
import { IAccessToken } from '@looker/sdk'
import asyncWrapper from '../async/asyncWrapper'

export default async function (req: Request, res: Response) {
  const {
    query: { lookerApi = '', lookerClientId = '', lookerClientSecret = '' }
  } = req

  const p: Promise<AxiosResponse<IAccessToken>> = axios.post(
    `${lookerApi}/login?client_id=${lookerClientId}&client_secret=${lookerClientSecret}`,
    {},
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )

  const [err, data] = await asyncWrapper(p)

  if (err) {
    console.log(err)
    res.status(400).send('Looker token access request failed.').end()
  } else {
    res.json({ data: data?.data || {} })
  }
}
