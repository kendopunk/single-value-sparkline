/**
 * src/stories/DashboardEmbed.stories.tsx
 */
import React from 'react'
import { ComponentMeta } from '@storybook/react'

import lookerLoginPromise from '../async/promises/lookerLoginPromise'
import DashboardEmbed, { DashboardEmbedProps } from '../components/looker_embed/DashboardEmbed'

import {
  getLookerApiUrl,
  getLookerClientId,
  getLookerClientSecret,
  getLookerHost
} from './utils/storyutils'

export default {
  title: 'Embed/Dashboard Embed',
  component: DashboardEmbed,
  argTypes: {
    accessToken: {
      table: {
        disable: true
      }
    },
    dashboardId: {
      type: 'string'
    },
    embedDomain: {
      table: {
        disable: true
      }
    },
    forceLogoutLogin: {
      table: {
        disable: true
      }
    },
    height: {
      table: {
        disable: true
      }
    },
    lookerHost: {
      table: {
        disable: true
      }
    },
    sessionLength: {
      table: {
        disable: true
      }
    },
    width: {
      table: {
        disable: true
      }
    }
  }
} as ComponentMeta<typeof DashboardEmbed>

/**
 * To get around Storybook reload issues
 * @returns
 */
async function localTokenFetch() {
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const EditableProps = (args: DashboardEmbedProps, { loaded: { data } }: any) => {
  if (!data) {
    return <div>Authorization failed...no token.</div>
  }

  return (
    <DashboardEmbed
      {...args}
      accessToken={data}
      embedDomain={'http://localhost:6006'}
      lookerHost={getLookerHost()}
    />
  )
}

EditableProps.loaders = [
  async () => ({
    data: await localTokenFetch()
  })
]

EditableProps.args = {
  dashboardId: '370',
  hideLookerControls: false
}

EditableProps.argTypes = {
  dashboardId: {
    name: 'Dashboard ID'
  },
  hideLookerControls: {
    name: 'Hide Looker Controls'
  }
}
