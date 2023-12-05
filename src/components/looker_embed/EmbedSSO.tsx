/**
 * src/components/looker_embed/EmbedSSO.tsx
 */
import { IEmbedSsoParams, IUser } from '@looker/sdk'
import React, { useEffect, useState } from 'react'
import asyncWrapper from '../../async/asyncWrapper'
import getUserByIdPromise from '../../async/promises/getUserByIdPromise'
import lookerLoginPromise from '../../async/promises/lookerLoginPromise'
import {
  fetchEmbedSSOUrl,
  getLookerApiUrl,
  getLookerClientId,
  getLookerClientSecret
} from '../../stories/utils/storyutils'
import StyledButton from '../common/StyledButton'
import EmbedSSOContainer from './EmbedSSOContainer'

export type EmbedSSOProps = {
  userId: string
  forceLogoutLogin?: boolean
  sessionLength?: number
  targetUrl: string
}

export default function EmbedSSO({
  userId,
  forceLogoutLogin = false,
  sessionLength = 300,
  targetUrl
}: EmbedSSOProps): JSX.Element {
  const [error, setError] = useState<string | null>(null)
  const [hasAllProps, setHasAllProps] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [signedUrl, setSignedUrl] = useState<string | null>(null)

  async function generateEmbedUrl() {
    setError(null)
    setLoading(true)

    let accessToken: string | null = null
    let proceed = true
    let userData: Partial<IUser> = {}
    let groupIds: string[] | null | undefined = null
    let external_user_id: string | null | undefined = null

    ////////////////////////////////////////
    // Step 1. Get access token
    ////////////////////////////////////////
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
    } catch (e) {
      setError('Unable to generate Looker access token')
      setLoading(false)
      setSignedUrl(null)
      proceed = false
    }

    ////////////////////////////////////////
    // Step 2. retrieve user
    ////////////////////////////////////////
    if (proceed) {
      try {
        const response = getUserByIdPromise(getLookerApiUrl(), accessToken, userId)

        userData = await (await response).json()
      } catch (e) {
        setError('Unable to retrieve Looker user information')
        setLoading(false)
        setSignedUrl(null)
        proceed = false
      }
    }

    ////////////////////////////////////////
    // Step 3. Check embed user
    // userData?.credentials_embed is an array
    ////////////////////////////////////////
    groupIds = userData?.group_ids
    const credentialsEmbed = userData?.credentials_embed ?? []
    const [first] = credentialsEmbed
    if (first) {
      external_user_id = first?.external_user_id
    }
    if (!external_user_id) {
      setError('Not an embed user.')
      setLoading(false)
      setSignedUrl(null)
      proceed = false
    }

    ////////////////////////////////////////
    // Step 4. Fetch signed URL
    ////////////////////////////////////////
    if (proceed) {
      const requestConfig: IEmbedSsoParams = {
        external_user_id,
        force_logout_login: forceLogoutLogin,
        group_ids: groupIds,
        session_length: sessionLength,
        target_url: targetUrl.trim()
      }

      const [err, url] = await asyncWrapper(fetchEmbedSSOUrl(requestConfig))
      if (err) {
        setError('Unable to generate signed URL.')
        setSignedUrl(null)
      } else {
        setSignedUrl(url)
      }
      setLoading(false)
    }
  }

  /**
   * all props filled out
   */
  useEffect(() => {
    setHasAllProps(!!userId && !!targetUrl)
  }, [userId, targetUrl])

  return (
    <EmbedSSOContainer>
      {error && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '10px',
            color: '#cc3300',
            fontFamily: 'sans-serif',
            fontSize: '14px'
          }}
        >
          {error}
        </div>
      )}
      <div
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '10px' }}
      >
        <div style={{ display: hasAllProps ? 'block' : 'none' }}>
          <StyledButton onClick={generateEmbedUrl}>Generate and Display Embed Content</StyledButton>
        </div>

        <div
          style={{
            display: hasAllProps ? 'none' : 'block',
            fontFamily: 'sans-serif',
            fontSize: '14px'
          }}
        >
          <div>Please fill out all required controls / props </div>
        </div>
      </div>

      {loading && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '10px',
            marginTop: '25px',
            fontFamily: 'sans-serif',
            fontSize: '14px'
          }}
        >
          Loading...
        </div>
      )}

      {signedUrl && hasAllProps && (
        <iframe
          id="lookerIframe"
          title="dashboard"
          className="iframe"
          src={signedUrl}
          style={{ height: '80vh', width: '100%' }}
        />
      )}
    </EmbedSSOContainer>
  )
}
