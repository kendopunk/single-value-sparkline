/**
 * src/components/looker_embed/embedCallbackRef.ts
 * Extrapolating out this callback function for testing
 */
import { LookerEmbedDashboard, LookerEmbedSDK } from '@looker/embed-sdk'
import React from 'react'

function embedCallbackRef(
  el: HTMLDivElement | null,
  // dashboardLoadedHandler: (evt: DashboardEvent) => void,
  // dashboardRunStartHandler: (evt: DashboardEvent) => void,
  // dashboardRunCompleteHandler: (evt: DashboardEvent) => void,
  // filterChangeHandler: (evt: DashboardEvent) => void,
  lookerHost: string,
  setDashboard: React.Dispatch<React.SetStateAction<LookerEmbedDashboard | null>>,
  signedUrl: string | null | undefined
) {
  if (el && lookerHost && signedUrl) {
    el.innerHTML = ''
    LookerEmbedSDK.init(lookerHost)

    const db = LookerEmbedSDK.createDashboardWithUrl(signedUrl)
    db.appendTo(el)
      .withNext()
      // .on("dashboard:loaded", dashboardLoadedHandler)
      // .on("dashboard:filters:changed", filterChangeHandler)
      // .on("dashboard:run:start", dashboardRunStartHandler)
      // .on("dashboard:run:complete", dashboardRunCompleteHandler)
      .on('dashboard:loaded', () => console.log('Dashboard loaded.'))
      .on('dashboard:filters:changed', () => console.log('Dashboard filters changed.'))
      .on('dashboard:run:start', () => console.log('Dashboard run start.'))
      .on('dashboard:run:complete', () => console.log('Dashboard run complete.'))
      .build()
      .connect()
      .then((dash: LookerEmbedDashboard) => {
        setDashboard(dash)
      })
      .catch((error) => {
        console.error('Connection error', error)
      })
  }
}

export default embedCallbackRef
