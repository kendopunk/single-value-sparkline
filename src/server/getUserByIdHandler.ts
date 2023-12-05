/**
 * src/server/getUserByIdHandler.ts
 * Fetch user by ID
 */
import { Request, Response } from 'express'
import axios from 'axios'
import asyncWrapper from '../async/asyncWrapper'

export default async function (req: Request, res: Response) {
  const {
    body: { lookerApi, token, userId }
  } = req

  const url = `${lookerApi}/users/${userId}`

  const p = axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      'content-type': 'application/json'
    }
  })

  const [err, data] = await asyncWrapper(p)
  if (err) {
    console.log(err)
    res.status(400).send('Failed to retrieve user.').end()
  } else {
    res.json(data?.data || {})
  }
}
