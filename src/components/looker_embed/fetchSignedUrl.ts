/**
 * src/components/looker_embed/fetchSignedUrl.ts
 * async call to fetch a signed URL
 */
export default async function fetchSignedUrl(
  accessToken: string,
  dashboardId: string | number,
  embedDomain: string,
  lookerHost: string,
  setSignedUrl: (url: string) => void,
  forceLogoutLogin?: boolean,
  sessionLength?: string | number
) {
  // build the request body
  const body: {
    target_url: string
    session_length?: string | number
    force_logout_login?: boolean
  } = {
    target_url: `https://${lookerHost}/embed/dashboards/${dashboardId}?embed_domain=${embedDomain}&sdk=2`
  }

  if (sessionLength && !isNaN(+sessionLength)) {
    body.session_length = +sessionLength
  }

  if (typeof forceLogoutLogin === 'boolean') {
    body.force_logout_login = forceLogoutLogin
  }

  const result = await fetch(`https://${lookerHost}/api/4.0/embed/token_url/me`, {
    body: JSON.stringify(body),
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    method: 'POST'
  })

  if (result?.ok) {
    const data = await result.json()
    setSignedUrl(data?.url)
  }
}
