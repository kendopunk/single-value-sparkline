import { IEmbedSsoParams } from '@looker/sdk'
import createSSOEmbedUrlPromise from '../../async/promises/createSSOEmbedUrlPromise'
import lookerLoginPromise from '../../async/promises/lookerLoginPromise'
import runQueryPromise from '../../async/promises/runQueryPromise'
import { VisQueryResponse } from '../../types/looker'

/**
 * src/stories/utils/storyutils.ts
 * Utility functions for all stories, with access to process.env.STORYBOOK*
 */

function getLookerApiUrl(): string {
  return `https://${process.env.STORYBOOK_LOOKER_HOST}/${process.env.STORYBOOK_LOOKER_API}`
}

function getLookerClientId(): string {
  return process.env.STORYBOOK_LOOKER_CLIENT_ID ?? ''
}

function getLookerClientSecret(): string {
  return process.env.STORYBOOK_LOOKER_CLIENT_SECRET ?? ''
}

function getLookerHost(): string {
  return `${process.env.STORYBOOK_LOOKER_HOST}`
}

async function fetchAccessToken() {
  try {
    const response = await lookerLoginPromise(
      getLookerApiUrl(),
      getLookerClientId(),
      getLookerClientSecret()
    )

    const resp = await response.json()

    return resp?.data?.access_token
  } catch (e) {
    return null
  }
}

async function fetchEmbedSSOUrl(requestConfig: IEmbedSsoParams) {
  let accessToken: string | null = null

  // auth
  try {
    const response = await lookerLoginPromise(
      getLookerApiUrl(),
      getLookerClientId(),
      getLookerClientSecret()
    )
    const {
      data: { access_token }
    } = await response.json()
    accessToken = access_token
  } catch (e) {}

  // embed URL
  if (accessToken) {
    const response = await createSSOEmbedUrlPromise(getLookerApiUrl(), accessToken, requestConfig)
    const data = await response.json()

    return data?.data?.url || null
  } else {
    return null
  }
}

async function runLookerQuery(queryId: string): Promise<VisQueryResponse | null> {
  let accessToken: string | null = null

  if (!queryId) {
    return {
      data: [],
      fields: {}
    }
  }

  // auth
  try {
    const response = await lookerLoginPromise(
      getLookerApiUrl(),
      getLookerClientId(),
      getLookerClientSecret()
    )
    const {
      data: { access_token }
    } = await response.json()
    accessToken = access_token
  } catch (e) {}

  // query
  if (accessToken) {
    const response = await runQueryPromise(getLookerApiUrl(), accessToken, {
      query_id: queryId,
      result_format: 'json_detail'
    })
    const data = await response.json()
    return data?.data ?? []
  } else {
    return null
  }
}

export {
  fetchAccessToken,
  fetchEmbedSSOUrl,
  getLookerApiUrl,
  getLookerClientId,
  getLookerClientSecret,
  getLookerHost,
  runLookerQuery
}
