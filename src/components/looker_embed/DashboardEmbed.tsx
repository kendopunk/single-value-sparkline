/**
 * src/components/looker_embed/DashboardEmbed.tsx
 */
import React, { useCallback, useEffect, useState } from 'react'
import { LookerEmbedDashboard } from '@looker/embed-sdk'

import EmbedContainer from './DashboardEmbedContainer'
import fetchSignedUrl from './fetchSignedUrl'
import embedCallbackRef from './embedCallbackRef'
import { DashboardToolbar } from './DashboardToolbar'

export type DashboardEmbedProps = {
  accessToken: string
  dashboardId: string | number
  embedDomain: string
  forceLogoutLogin?: boolean
  height?: string | number
  hideLookerControls?: boolean
  lookerHost: string
  sessionLength?: string | number
  width?: string | number
}

export default function DashboardEmbed({
  accessToken,
  dashboardId,
  embedDomain,
  forceLogoutLogin = false,
  height = '95vh',
  hideLookerControls = false,
  lookerHost,
  sessionLength = '5000',
  width = '100%'
}: DashboardEmbedProps): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [dashboard, setDashboard] = useState<LookerEmbedDashboard | null>(null)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [dashboardRunning, setDashboardRunning] = useState<boolean>(false)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [dashboardTitle, setDashboardTitle] = useState<string>(`dashboard-${dashboardId}`)
  const [signedUrl, setSignedUrl] = useState<string | null>(null)

  /**
   * This useCallback is for injecting <iframe> once
   * we have a signed URL
   */
  const embedCtrRef = useCallback(
    (el: HTMLDivElement | null) => {
      return embedCallbackRef(el, lookerHost, setDashboard, signedUrl)
    },
    [lookerHost, signedUrl]
  )

  /**
   * this useEffect() will attempt to retrieve a signed URL
   * if both the access token and window.fetch are available
   */
  useEffect(() => {
    if (accessToken && dashboardId && embedDomain && lookerHost && sessionLength) {
      fetchSignedUrl(
        accessToken,
        dashboardId,
        embedDomain,
        lookerHost,
        setSignedUrl,
        false,
        sessionLength
      ).catch((error) => console.error(error))
    }
  }, [accessToken, dashboardId, embedDomain, lookerHost, sessionLength])

  /**
   * this useEffect() will attempt to retrieve a signed URL
   * if both the access token and window.fetch are available
   */
  useEffect(() => {
    if (accessToken && dashboardId && embedDomain && lookerHost && sessionLength) {
      fetchSignedUrl(
        accessToken,
        dashboardId,
        embedDomain,
        lookerHost,
        setSignedUrl,
        forceLogoutLogin,
        sessionLength
      ).catch((error) => console.error(error))
    }
  }, [accessToken, dashboardId, embedDomain, forceLogoutLogin, lookerHost, sessionLength])

  return (
    <div style={{ position: 'relative' }}>
      <DashboardToolbar hideLookerControls={hideLookerControls} />
      <EmbedContainer width={width} height={height} ref={embedCtrRef} />
    </div>
  )
}
