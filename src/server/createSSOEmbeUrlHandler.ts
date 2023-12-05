/**
 * src/server/createSSOEmbedUrlHandler.ts
 * SSO embed url
 */
import { Request, Response } from 'express'
import axios, { AxiosResponse } from 'axios'
import asyncWrapper from '../async/asyncWrapper'
import { IEmbedUrlResponse } from '@looker/sdk'

export default async function (req: Request, res: Response) {
  const {
    body: { lookerApi, token, requestConfig }
  } = req

  const url = `${lookerApi}/embed/sso_url`

  const p: Promise<AxiosResponse<IEmbedUrlResponse>> = axios.post(url, requestConfig, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })

  const [err, data] = await asyncWrapper(p)
  if (err) {
    res.status(400).send('Failed to generate SSO Embed URL.').end()
  } else {
    res.json({ data: data?.data || {} })
  }
}
